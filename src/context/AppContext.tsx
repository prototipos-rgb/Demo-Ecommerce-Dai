"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { Product, INITIAL_PRODUCTS } from "@/data/mockProducts";
import { KardexRow, SAMPLE_KARDEX_DATA } from "@/data/mockKardexSample";

export type UserRole = "b2b_client" | "vendedor" | "admin_vendor";
export type ClientApprovalStatus = "aprobado" | "sin_aprobar";

export interface CartItem {
  product: Product;
  quantity: number;
  isBackorder: boolean;
  isFrozenWait: boolean; // Item congelado en espera de stock
}

export interface InvoiceAccount {
  id: string; // ej: "FAC-10428"
  date: string;
  dueDate: string;
  totalAmount: number;
  paidAmount: number;
  balanceDue: number;
  status: "pendiente" | "pagada" | "abono_parcial";
  concept: string;
}

export interface PurchaseItem {
  id: string;
  sku: string;
  oem: string;
  title: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface PurchaseOrder {
  id: string;
  date: string;
  items: PurchaseItem[];
  subtotalNeto: number;
  iva: number;
  shippingCost: number;
  totalFinal: number;
  deliveryType: "retiro" | "envio";
  shippingCompany: string;
  trackingNumber: string;
  deliveryDays: string;
  status: "confirmado" | "preparacion" | "en_camino" | "entregado";
  contactEmail: string;
  taxRegime: "nacional" | "zofri_reexpedicion";
  documentType: string;
  paymentMethod: "webpay" | "credito_30d" | "transferencia";
}

export interface ClientProfileData {
  razonSocial: string;
  rutEmpresa: string;
  giro: string;
  contacto: string;
  telefono: string;
  correo: string;
  ciudad: string;
  tipoCliente: string;
  tarifaActiva: string;
  despachoDefault: string;
  creditoTotal: number;
  creditoUtilizado: number;
  creditoDisponible: number;
  invoices: InvoiceAccount[];
}

export interface ToastNotice {
  id: string;
  title: string;
  message: string;
  type: "success" | "warning" | "info";
  timestamp: string;
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
  taxRegime: "nacional" | "zofri_reexpedicion";
  documentType: string;
  shippingCostCLP: number;
  estimatedFreightCLP: number;
  ivaCLP: number;
  totalFinalCLP: number;
  totalWeightKg: number;
  itemsCount: number;
  frozenItemsCount: number;
  payableItemsCount: number;
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  clientApprovalStatus: ClientApprovalStatus;
  setClientApprovalStatus: (status: ClientApprovalStatus) => void;
  products: Product[];
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  applyKardexData: (data: KardexRow[], filename?: string) => { updated: number; newItems: number };
  etlLogs: ETLRunLog[];
  orderSummary: OrderSummary;
  clientInfo: ClientProfileData;
  clientProfile: ClientProfileData;
  updateClientProfile: (data: Partial<ClientProfileData>) => void;
  payInvoiceBalance: (invoiceId: string, amount: number) => void;
  purchaseHistory: PurchaseOrder[];
  allOrders: PurchaseOrder[];
  updateOrderStatus: (orderId: string, newStatus: PurchaseOrder["status"]) => void;
  addPurchaseOrder: (order: Omit<PurchaseOrder, "id" | "date" | "trackingNumber">) => PurchaseOrder;
  deliveryOption: "retiro" | "envio";
  setDeliveryOption: (opt: "retiro" | "envio") => void;
  taxRegime: "nacional" | "zofri_reexpedicion";
  setTaxRegime: (regime: "nacional" | "zofri_reexpedicion") => void;
  updateProduct: (productId: string, updates: Partial<Product>) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  toasts: ToastNotice[];
  addToast: (title: string, message: string, type?: "success" | "warning" | "info") => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const VOLUME_DISCOUNT_THRESHOLD = 20000000;
const VOLUME_DISCOUNT_RATE = 0.12;

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>("b2b_client");
  const [clientApprovalStatus, setClientApprovalStatus] = useState<ClientApprovalStatus>("aprobado");
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [toasts, setToasts] = useState<ToastNotice[]>([]);
  const [etlLogs, setEtlLogs] = useState<ETLRunLog[]>([
    {
      id: "etl-01",
      timestamp: "Hoy, 08:30 AM (Multiem Kardex)",
      filename: "Kardex_Diario_Multiem_09112026.xlsx",
      recordsCount: 8520,
      updatedSkus: 8520,
      newSkus: 14,
      characterFixes: 142,
      status: "success"
    }
  ]);

  const [clientProfile, setClientProfile] = useState<ClientProfileData>({
    razonSocial: "Servicios Mecánicos y Flotas del Norte SpA",
    rutEmpresa: "76.842.190-K",
    giro: "Mantenimiento y reparación de vehículos y flotas mineras",
    contacto: "Carlos Villalobos (Jefe de Adquisiciones)",
    telefono: "+56 9 8412 9931",
    correo: "adquisiciones@flotasnorte.cl",
    ciudad: "Iquique / Alto Hospicio",
    tipoCliente: "Mayorista VIP - Categoría A (ZOFRI)",
    tarifaActiva: "Tarifa VIP ZOFRI (-15% sobre Lista Base)",
    despachoDefault: "Trans-Bolivia Heavy Logistics - Terminal Carga",
    creditoTotal: 45000000,
    creditoUtilizado: 12450000,
    creditoDisponible: 32550000,
    invoices: [
      {
        id: "FAC-10428",
        date: "15/10/2026",
        dueDate: "15/11/2026",
        totalAmount: 7850000,
        paidAmount: 0,
        balanceDue: 7850000,
        status: "pendiente",
        concept: "Lote de 20 un. Cilindros y Empaquetaduras Osakansai",
      },
      {
        id: "FAC-09841",
        date: "28/09/2026",
        dueDate: "28/10/2026",
        totalAmount: 4600000,
        paidAmount: 0,
        balanceDue: 4600000,
        status: "pendiente",
        concept: "Kit Embragues HD y Pastillas Cerámicas",
      },
    ],
  });

  // Requisito explícito: Si no tiene compras, NO se inventan en el cliente. Inicia vacío.
  const [purchaseHistory, setPurchaseHistory] = useState<PurchaseOrder[]>([]);

  // Pedidos globales del sistema para visualización de Vendedor y Administrador
  const [allOrders, setAllOrders] = useState<PurchaseOrder[]>([
    {
      id: "PED-2026-6713",
      date: "28/10/2026 14:22",
      items: [
        {
          id: "prod-001",
          sku: "OSK-BP-7701",
          oem: "04465-0K260",
          title: "Pastillas de Freno Cerámicas HD",
          quantity: 20,
          unitPrice: 18900,
          totalPrice: 378000,
        },
        {
          id: "prod-002",
          sku: "OSK-BC-4119",
          oem: "47550-35280",
          title: "Cilindro de Rueda Freno Trasero",
          quantity: 15,
          unitPrice: 14200,
          totalPrice: 213000,
        },
      ],
      subtotalNeto: 591000,
      iva: 0,
      shippingCost: 45000,
      totalFinal: 636000,
      deliveryType: "envio",
      shippingCompany: "Trans-Bolivia Heavy Logistics & Cargo S.R.L.",
      trackingNumber: "TRK-BOL-812903",
      deliveryDays: "5 a 7 días hábiles",
      status: "en_camino",
      contactEmail: "adquisiciones@hiperparts.bo",
      taxRegime: "zofri_reexpedicion",
      documentType: "Factura de Reexpedición ZOFRI (0% IVA)",
      paymentMethod: "credito_30d",
    },
    {
      id: "PED-2026-6690",
      date: "04/11/2026 09:15",
      items: [
        {
          id: "prod-003",
          sku: "OSK-BC-4125",
          oem: "44100-EB70A",
          title: "Cilindro Maestro de Freno Principal",
          quantity: 8,
          unitPrice: 42500,
          totalPrice: 340000,
        },
      ],
      subtotalNeto: 340000,
      iva: 64600,
      shippingCost: 0,
      totalFinal: 404600,
      deliveryType: "retiro",
      shippingCompany: "Retiro Directo ZOFRI Galpón 7",
      trackingNumber: "TRK-RET-901244",
      deliveryDays: "Inmediato",
      status: "preparacion",
      contactEmail: "contacto@repuestoselfaro.cl",
      taxRegime: "nacional",
      documentType: "Factura Afecta DTE (19% IVA)",
      paymentMethod: "webpay",
    },
  ]);

  const [deliveryOption, setDeliveryOption] = useState<"retiro" | "envio">("retiro");
  const [taxRegime, setTaxRegime] = useState<"nacional" | "zofri_reexpedicion">("nacional");

  const updateClientProfile = (data: Partial<ClientProfileData>) => {
    setClientProfile((prev) => ({ ...prev, ...data }));
    addToast("Perfil Actualizado", "Los datos comerciales de su empresa han sido guardados.", "success");
  };

  const payInvoiceBalance = (invoiceId: string, amount: number) => {
    setClientProfile((prev) => {
      const updatedInvoices = prev.invoices.map((inv) => {
        if (inv.id !== invoiceId) return inv;
        const newPaid = inv.paidAmount + amount;
        const newBalance = Math.max(0, inv.totalAmount - newPaid);
        return {
          ...inv,
          paidAmount: newPaid,
          balanceDue: newBalance,
          status: (newBalance === 0 ? "pagada" : "abono_parcial") as InvoiceAccount["status"],
        };
      });
      const newCreditoUtilizado = Math.max(0, prev.creditoUtilizado - amount);
      const newCreditoDisponible = prev.creditoTotal - newCreditoUtilizado;
      return {
        ...prev,
        creditoUtilizado: newCreditoUtilizado,
        creditoDisponible: newCreditoDisponible,
        invoices: updatedInvoices,
      };
    });
    addToast(
      "Abono Imputado con Éxito",
      `Se registró abono de $${amount.toLocaleString("es-CL")} a la factura ${invoiceId}. Cupo de crédito liberado.`,
      "success"
    );
  };

  const updateOrderStatus = (orderId: string, newStatus: PurchaseOrder["status"]) => {
    const statusLabels: Record<PurchaseOrder["status"], string> = {
      confirmado: "Confirmado",
      preparacion: "Preparación en Galpón 7",
      en_camino: "Despachado en Convoy Internacional",
      entregado: "Entregado en Destino",
    };
    setAllOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    setPurchaseHistory((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
    );
    addToast(
      "Estado de Orden Actualizado",
      `Pedido ${orderId} actualizado a estado: "${statusLabels[newStatus]}".`,
      "info"
    );
  };

  const updateProduct = (productId: string, updates: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, ...updates } : p))
    );
    addToast(
      "SKU Actualizado",
      "Las especificaciones técnicas, precio o stock fueron modificados exitosamente.",
      "success"
    );
  };

  const addPurchaseOrder = (orderData: Omit<PurchaseOrder, "id" | "date" | "trackingNumber">): PurchaseOrder => {
    const orderNumber = `PED-2026-${Math.floor(6700 + Math.random() * 200)}`;
    const trackingNum = `TRK-BOL-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();
    const formattedDate = `${now.toLocaleDateString("es-CL")} ${now.toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit" })}`;

    const newOrder: PurchaseOrder = {
      ...orderData,
      id: orderNumber,
      date: formattedDate,
      trackingNumber: trackingNum,
    };

    setPurchaseHistory((prev) => [newOrder, ...prev]);
    setAllOrders((prev) => [newOrder, ...prev]);

    // Si pagó con crédito a 30 días, imputar a cuenta corriente
    if (orderData.paymentMethod === "credito_30d") {
      setClientProfile((prev) => {
        const newUtilizado = prev.creditoUtilizado + orderData.totalFinal;
        const newDisponible = Math.max(0, prev.creditoTotal - newUtilizado);
        const newInvoice: InvoiceAccount = {
          id: `FAC-${Math.floor(10500 + Math.random() * 500)}`,
          date: now.toLocaleDateString("es-CL"),
          dueDate: new Date(Date.now() + 30 * 24 * 3600 * 1000).toLocaleDateString("es-CL"),
          totalAmount: orderData.totalFinal,
          paidAmount: 0,
          balanceDue: orderData.totalFinal,
          status: "pendiente",
          concept: `Facturación Orden ${orderNumber} (${orderData.items.length} SKUs)`,
        };
        return {
          ...prev,
          creditoUtilizado: newUtilizado,
          creditoDisponible: newDisponible,
          invoices: [newInvoice, ...prev.invoices],
        };
      });
    }

    return newOrder;
  };

  const addToast = (title: string, message: string, type: "success" | "warning" | "info" = "success") => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newToast: ToastNotice = {
      id,
      title,
      message,
      type,
      timestamp: new Date().toLocaleTimeString("es-CL", { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
    };
    setToasts((prev) => [newToast, ...prev]);

    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  useEffect(() => {
    if (cart.length === 0 && products.length > 0) {
      setCart([
        { product: products[0], quantity: 15, isBackorder: false, isFrozenWait: false },
        { product: products[1], quantity: 10, isBackorder: false, isFrozenWait: false },
        // Item sin stock: se congela en espera de inventario
        { product: products[9], quantity: 2, isBackorder: true, isFrozenWait: true },
      ]);
    }
  }, [products]);

  const addToCart = (product: Product, quantity = product.minWholesaleQty || 1) => {
    const isOutOfStock = product.stock <= 0;
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [
        ...prev,
        {
          product,
          quantity,
          isBackorder: isOutOfStock,
          isFrozenWait: isOutOfStock,
        },
      ];
    });

    if (isOutOfStock) {
      addToast(
        "Ítem en Espera de Stock (Budget Congelado)",
        `"${product.title}" no cuenta con stock inmediato. Se agregó en modo proforma condicionada y no generará cargo hasta reconfirmación.`,
        "warning"
      );
    } else {
      addToast(
        "Repuesto Agregado a Cotización",
        `Se agregaron ${quantity} unidades de "${product.title}" (${product.oem}) al pedido.`,
        "success"
      );
    }
  };

  const updateCartQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    addToast("Línea Eliminada", "El repuesto fue retirado de la cotización actual.", "info");
  };

  const clearCart = () => {
    setCart([]);
    addToast("Cotización Reiniciada", "Se han vaciado todas las líneas del pedido.", "info");
  };

  const applyKardexData = (rows: KardexRow[], filename = "Kardex_Multiem_Manual.xlsx") => {
    let updated = 0;
    let newItems = 0;
    let characterFixes = Math.floor(Math.random() * 25) + 12;

    setProducts((prevProducts) => {
      const map = new Map(prevProducts.map((p) => [p.sku.toUpperCase(), { ...p }]));

      rows.forEach((row) => {
        const key = row.COD_ARTICULO.trim().toUpperCase();
        if (map.has(key)) {
          const existing = map.get(key)!;
          existing.stock = Number(row.STOCK_BODEGA_ZOFRI);
          existing.priceNeto = Number(row.PRECIO_VENTA_NETO);
          existing.oem = row.COD_OEM;
          updated++;
        } else {
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
            isOsakansaiBrand: true,
          });
          newItems++;
        }
      });

      return Array.from(map.values());
    });

    const newLog: ETLRunLog = {
      id: `etl-${Date.now()}`,
      timestamp: "Ahora mismo (Ingestión Kardex Vendedor)",
      filename,
      recordsCount: rows.length,
      updatedSkus: updated,
      newSkus: newItems,
      characterFixes,
      status: "success",
    };

    setEtlLogs((prev) => [newLog, ...prev]);

    addToast(
      "Kardex Multiem Procesado",
      `Sincronización de ${updated} SKUs completada exitosamente sin interrupciones.`,
      "success"
    );

    return { updated, newItems };
  };

  // Solo se calcula el cobro sobre los ítems que NO están congelados en espera de stock
  const payableItems = cart.filter((item) => !item.isFrozenWait);
  const subtotalNeto = payableItems.reduce(
    (acc, item) => acc + item.product.priceNeto * item.quantity,
    0
  );
  const totalWeightKg = payableItems.reduce(
    (acc, item) => acc + (item.product.weightKg || 1) * item.quantity,
    0
  );
  const qualifiesForVolumeDiscount = subtotalNeto >= VOLUME_DISCOUNT_THRESHOLD;
  const volumeDiscountPercent = qualifiesForVolumeDiscount ? VOLUME_DISCOUNT_RATE * 100 : 0;
  const volumeDiscountAmount = qualifiesForVolumeDiscount
    ? Math.round(subtotalNeto * VOLUME_DISCOUNT_RATE)
    : 0;
  const subtotalDiscounted = subtotalNeto - volumeDiscountAmount;

  // Costo de flete según opción seleccionada:
  // "retiro": $0 CLP (Retiro en ZOFRI)
  // "envio": $45.000 CLP (Empresa Internacional: Trans-Bolivia Heavy Logistics & Cargo S.R.L. en camiones de carga pesada)
  const shippingCostCLP =
    payableItems.length > 0 && deliveryOption === "envio" ? 45000 : 0;

  // Régimen Tributario ZOFRI:
  // "nacional": Factura Electrónica Afecta a IVA 19% (DTE Nacional)
  // "zofri_reexpedicion": Factura de Reexpedición ZOFRI Exenta de IVA (0% Régimen Franco a Bolivia/Sudamérica)
  const ivaCLP =
    taxRegime === "zofri_reexpedicion" ? 0 : Math.round(subtotalDiscounted * 0.19);
  const documentType =
    taxRegime === "zofri_reexpedicion"
      ? "Factura de Reexpedición ZOFRI (Exenta de IVA 0% - Régimen Franco)"
      : "Factura Electrónica Afecta DTE (19% IVA Nacional)";
  const totalFinalCLP = subtotalDiscounted + ivaCLP + shippingCostCLP;
  const itemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const frozenItemsCount = cart
    .filter((item) => item.isFrozenWait)
    .reduce((acc, item) => acc + item.quantity, 0);
  const payableItemsCount = payableItems.reduce((acc, item) => acc + item.quantity, 0);

  const orderSummary: OrderSummary = {
    subtotalNeto,
    qualifiesForVolumeDiscount,
    volumeDiscountPercent,
    volumeDiscountAmount,
    subtotalDiscounted,
    taxRegime,
    documentType,
    shippingCostCLP,
    estimatedFreightCLP: shippingCostCLP,
    ivaCLP,
    totalFinalCLP,
    totalWeightKg: Math.round(totalWeightKg * 10) / 10,
    itemsCount,
    frozenItemsCount,
    payableItemsCount,
  };

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        clientApprovalStatus,
        setClientApprovalStatus,
        products,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        applyKardexData,
        etlLogs,
        orderSummary,
        clientInfo: clientProfile,
        clientProfile,
        updateClientProfile,
        payInvoiceBalance,
        purchaseHistory,
        allOrders,
        updateOrderStatus,
        addPurchaseOrder,
        deliveryOption,
        setDeliveryOption,
        taxRegime,
        setTaxRegime,
        updateProduct,
        searchQuery,
        setSearchQuery,
        toasts,
        addToast,
        removeToast,
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
