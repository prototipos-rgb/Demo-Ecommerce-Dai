"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, INITIAL_PRODUCTS } from "@/data/mockProducts";
import { KardexRow, SAMPLE_KARDEX_DATA } from "@/data/mockKardexSample";

export type UserRole = "blind_guest" | "b2b_client" | "admin_vendor";

export interface CartItem {
  product: Product;
  quantity: number;
  isBackorder: boolean;
}

export interface ETLRunLog {
  id: string;
  timestamp: string;
  filename: string;
  recordsCount: number;
  updatedSkus: number;
  newSkus: number;
  characterFixes: number;
  status: "success" | "warning";
}

interface OrderSummary {
  subtotalNeto: number;
  qualifiesForVolumeDiscount: boolean;
  volumeDiscountPercent: number;
  volumeDiscountAmount: number;
  subtotalDiscounted: number;
  estimatedFreightCLP: number;
  ivaCLP: number;
  totalFinalCLP: number;
  totalWeightKg: number;
  itemsCount: number;
  backorderItemsCount: number;
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  applyKardexData: (data: KardexRow[], filename?: string) => { updated: number; newItems: number };
  etlLogs: ETLRunLog[];
  orderSummary: OrderSummary;
  clientInfo: {
    razonSocial: string;
    rutEmpresa: string;
    giro: string;
    tipoCliente: string;
    despachoDefault: string;
    creditoDisponible: number;
  };
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const VOLUME_DISCOUNT_THRESHOLD = 20000000; // 20M CLP rule from proposal
const VOLUME_DISCOUNT_RATE = 0.12; // 12% extra discount on bulk orders over 20M

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>("blind_guest");
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [etlLogs, setEtlLogs] = useState<ETLRunLog[]>([
    {
      id: "etl-init-01",
      timestamp: "Hoy, 08:30 AM (Automático Multiem)",
      filename: "Kardex_Diario_Zofri_08112026.xlsx",
      recordsCount: 8520,
      updatedSkus: 8520,
      newSkus: 14,
      characterFixes: 142,
      status: "success"
    }
  ]);

  const clientInfo = {
    razonSocial: "Servicios Mecánicos y Flotas del Norte SpA",
    rutEmpresa: "76.842.190-K",
    giro: "Mantenimiento y reparación de vehículos de transporte pesado y flotas",
    tipoCliente: "Mayorista VIP ZOFRI - Categoría A",
    despachoDefault: "Starken Express - Sucursal Iquique Terminal",
    creditoDisponible: 45000000,
  };

  // Add sample items to cart initially for instant demo appeal when switching to B2B
  useEffect(() => {
    if (cart.length === 0 && products.length > 0) {
      setCart([
        { product: products[0], quantity: 20, isBackorder: false },
        { product: products[1], quantity: 10, isBackorder: false },
        { product: products[7], quantity: 4, isBackorder: true }, // Cremallera en backorder
      ]);
    }
  }, [products]);

  const addToCart = (product: Product, quantity = product.minWholesaleQty || 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      const isBackorder = product.stock <= 0;
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, isBackorder }];
    });
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyKardexData = (rows: KardexRow[], filename = "Kardex_Multiem_Manual.xlsx") => {
    let updated = 0;
    let newItems = 0;
    let characterFixes = Math.floor(Math.random() * 25) + 12;

    setProducts(prevProducts => {
      const map = new Map(prevProducts.map(p => [p.sku.toUpperCase(), { ...p }]));

      rows.forEach(row => {
        const key = row.COD_ARTICULO.trim().toUpperCase();
        if (map.has(key)) {
          const existing = map.get(key)!;
          existing.stock = Number(row.STOCK_BODEGA_ZOFRI);
          existing.priceNeto = Number(row.PRECIO_VENTA_NETO);
          existing.oem = row.COD_OEM;
          updated++;
        } else {
          // New SKU ingested from Excel
          map.set(key, {
            id: `prod-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
            sku: row.COD_ARTICULO,
            oem: row.COD_OEM,
            oemCrossReference: [],
            title: row.DESCRIPCION_MULTIEDICION,
            category: "General Automotriz",
            brand: row.MARCA_REPUESTO || "Osakansai",
            origin: row.ORIGEN || "Japón",
            vehicleCompatibility: [row.APLICACION_VEHICULAR || "Universal Multimarca"],
            vinPrefix: [],
            stock: Number(row.STOCK_BODEGA_ZOFRI),
            priceNeto: Number(row.PRECIO_VENTA_NETO),
            minWholesaleQty: 5,
            weightKg: 2.5,
            dimensionsCm: { length: 20, width: 20, height: 15 },
            image: "https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=600&auto=format&fit=crop&q=80",
            isOsakansaiBrand: true,
          });
          newItems++;
        }
      });

      return Array.from(map.values());
    });

    const newLog: ETLRunLog = {
      id: `etl-${Date.now()}`,
      timestamp: "Ahora mismo (Módulo Drag & Drop)",
      filename,
      recordsCount: rows.length,
      updatedSkus: updated,
      newSkus: newItems,
      characterFixes,
      status: "success"
    };

    setEtlLogs(prev => [newLog, ...prev]);

    return { updated, newItems };
  };

  // Order calculation
  const subtotalNeto = cart.reduce((acc, item) => acc + (item.product.priceNeto * item.quantity), 0);
  const totalWeightKg = cart.reduce((acc, item) => acc + ((item.product.weightKg || 1) * item.quantity), 0);
  const qualifiesForVolumeDiscount = subtotalNeto >= VOLUME_DISCOUNT_THRESHOLD;
  const volumeDiscountPercent = qualifiesForVolumeDiscount ? VOLUME_DISCOUNT_RATE * 100 : 0;
  const volumeDiscountAmount = qualifiesForVolumeDiscount ? Math.round(subtotalNeto * VOLUME_DISCOUNT_RATE) : 0;
  const subtotalDiscounted = subtotalNeto - volumeDiscountAmount;
  
  // Freight calculation: base + volumetric weight rate
  const estimatedFreightCLP = cart.length > 0 ? Math.round(15000 + (totalWeightKg * 420)) : 0;
  // B2B ZOFRI operations can be exempt or 19% IVA if nationalized. We show standard 19% IVA with Zofri breakdown
  const ivaCLP = Math.round(subtotalDiscounted * 0.19);
  const totalFinalCLP = subtotalDiscounted + ivaCLP + estimatedFreightCLP;
  const itemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const backorderItemsCount = cart.filter(item => item.product.stock <= 0).reduce((acc, item) => acc + item.quantity, 0);

  const orderSummary: OrderSummary = {
    subtotalNeto,
    qualifiesForVolumeDiscount,
    volumeDiscountPercent,
    volumeDiscountAmount,
    subtotalDiscounted,
    estimatedFreightCLP,
    ivaCLP,
    totalFinalCLP,
    totalWeightKg: Math.round(totalWeightKg * 10) / 10,
    itemsCount,
    backorderItemsCount,
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        products,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        applyKardexData,
        etlLogs,
        orderSummary,
        clientInfo,
        searchQuery,
        setSearchQuery,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
