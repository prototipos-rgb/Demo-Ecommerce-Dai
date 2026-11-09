# Demo Oficial E-Commerce B2B + Módulo ERP (ETL)
### Importadora y Exportadora Daisekai Limitada &bull; Osakansai Group
**Desarrollado por División de Ingeniería Comercial, Aerys IT**

---

## 📌 Visión de la Demo
Esta demo oficial materializa la propuesta de valor del **"Empleado Digital 24/7"** para la alta dirección de **Daisekai Limitada**, abordando sus desafíos operativos críticos en el Recinto Amurallado de la **Zona Franca de Iquique (ZOFRI)**:

1. **Erradicación del Trabajo Manual (ETL Multiem):** Módulo Drag & Drop que parsea el Excel diario del Kardex legacy, corrige caracteres corruptos de versiones 2007 y actualiza stock/precios en vivo.
2. **Catálogo Ciego & Captación SEO:** Más de 26.000 SKUs visibles para captación comercial, pero con precios y existencias ocultos para proteger los márgenes de los talleres mecánicos.
3. **Buscador Especializado por OEM y Chasis (VIN):** Búsqueda instantánea con filtros para fabricantes asiáticos (Toyota, Nissan, Hyundai, Mitsubishi, Kia, Mazda, Suzuki, Isuzu, Subaru).
4. **Motor de Reglas Comerciales:** Descuento automático por compras masivas (> $20.000.000 CLP).
5. **Backordering & Proforma Condicionada:** Si una pieza no tiene stock físico inmediato, el pedido no se frena ni se cobra; se emite una proforma condicionada para reconfirmar con bodega.
6. **Múltiples Salidas de Cotización y Pago:**
   - Descarga e impresión de Proforma formal con membrete corporativo.
   - Envío de proforma por correo al cliente y ejecutivo de ventas.
   - Simulación de pasarela de pago Webpay Plus (Transbank) / Transferencia B2B ZOFRI.

---

## 🚀 Puestas en Marcha Rápidas

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build
npm run start
```

El servidor estará disponible en `http://localhost:3000`.

---

## 🧭 Guía de Navegación para la Presentación a Daisekai

La demo incluye un **Demo Control Bar** en la parte superior para cambiar de rol en 1 clic durante la reunión con el cliente:

1. **Rol 1: Catálogo Ciego (Público):**
   - Muestra la Landing institucional de 5 secciones (Infraestructura en Galpones 7 y 8, línea Osakansai, labor comunitaria con BLIA/Templo Fo Guang Shan en Tarapacá).
   - En el catálogo, los precios aparecen con candado: *"Precio reservado para clientes mayoristas"*.
2. **Rol 2: Mayorista B2B (Flotas del Norte SpA):**
   - Desbloquea precios netos, IVA, disponibilidad en ZOFRI y agrega al carrito con descuentos por volumen.
3. **Rol 3: Admin / Vendedor Daisekai:**
   - Acceso a `/admin` para probar la ingestión Drag & Drop de Excel, ver el scraper de fotos y aprobar solicitudes de talleres.
