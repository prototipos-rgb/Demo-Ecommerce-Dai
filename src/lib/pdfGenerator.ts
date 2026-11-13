import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { formatCLP } from "./utils";

export interface ProformaPDFData {
  proformaNumber: string;
  date: string;
  validityDays: number;
  client: {
    razonSocial: string;
    rut: string;
    giro: string;
    contacto: string;
    telefono: string;
    correo: string;
    ciudad: string;
  };
  items: Array<{
    sku: string;
    oem: string;
    title: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    isFrozenWait?: boolean;
  }>;
  taxRegime: "nacional" | "zofri_reexpedicion";
  deliveryOption: "retiro" | "envio";
  shippingCompany?: string;
  deliveryDays?: string;
  subtotalNeto: number;
  discountAmount?: number;
  discountPercentage?: number;
  iva: number;
  shippingCost: number;
  totalFinal: number;
}

export interface CotizacionMultiemPDFData {
  numCotizacion: string;
  reservaNum: string;
  vendedor: string;
  fechaEmision: string;
  clienteNombre: string;
  codCliente: string;
  direccion: string;
  ciudad: string;
  fono: string;
  glosaDoc: string;
  lineas: Array<{
    codigoProducto: string;
    codFact: string;
    descripcion: string;
    cantidad: number;
    um: string;
    unitUsd: number;
    totalUsd: number;
  }>;
  totalUsd: number;
  totalCantidad: number;
}

export interface FacturaDTEPDFData {
  invoiceNumber: string;
  fechaEmision: string;
  fechaVencimiento: string;
  tipoDocumento: "Factura Electrónica Afecta (DTE 19% IVA)" | "Factura de Reexpedición ZOFRI (0% IVA Exento)";
  cliente: {
    razonSocial: string;
    rut: string;
    giro: string;
    direccion: string;
    ciudad: string;
    contacto: string;
    telefono: string;
  };
  items: Array<{
    sku: string;
    oem: string;
    title: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }>;
  subtotalNeto: number;
  iva: number;
  flete: number;
  totalFinal: number;
  condicionPago: string;
  trackingNumber?: string;
}

/**
 * Función central para aplicar la marca de agua requerida: "DOCUMENTO NO VALIDO"
 */
function applyWatermark(doc: jsPDF, watermarkText: string = "DOCUMENTO NO VALIDO"): void {
  const totalPages =
    typeof (doc as any).getNumberOfPages === "function"
      ? (doc as any).getNumberOfPages()
      : (doc.internal.pages ? doc.internal.pages.length - 1 : 1);
  for (let i = 1; i <= totalPages; i++) {
    doc.setPage(i);
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    doc.saveGraphicsState();
    try {
      if ((doc as any).GState) {
        doc.setGState(new (doc as any).GState({ opacity: 0.12 }));
        doc.setTextColor(220, 38, 38);
      } else {
        doc.setTextColor(245, 215, 215);
      }
    } catch {
      doc.setTextColor(245, 215, 215);
    }

    doc.setFont("helvetica", "bold");
    doc.setFontSize(38);
    doc.text(watermarkText, pageWidth / 2, pageHeight / 2, {
      align: "center",
      angle: 45,
    });
    doc.restoreGraphicsState();
  }
}

/**
 * 1. Generador de PROFORMA OFICIAL B2B (Márgenes perfectos y datos legibles)
 */
export function generateProformaPDF(data: ProformaPDFData): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const margin = 14;
  const printableWidth = pageWidth - (margin * 2); // 182mm

  // --- 1. BARRA SUPERIOR DE ACENTO ---
  doc.setFillColor(15, 23, 42); // Slate 900
  doc.rect(0, 0, pageWidth, 4, "F");

  // --- 2. ENCABEZADO CORPORATIVO (IZQUIERDA) ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text("IMPORTADORA Y EXPORTADORA DAISEKAI LTDA.", margin, 14);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(220, 38, 38);
  doc.text("DAISEKAI AUTOMOTIVE", margin, 19);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text("Firma Hermana: Osakansai Group | R.U.T.: 76.549.821-3", margin, 23.5);
  doc.text("Centro Operativo: Manzana 11, Galpones 7 y 8, Recinto Amurallado ZOFRI, Iquique", margin, 27.5);
  doc.text("Sede Administrativa: Huantajaya 3036, Iquique | Tel: +56 9 7523 6397 / +56 57 2 544220", margin, 31.5);

  // --- 3. RECUADRO DERECHO: IDENTIFICADOR PROFORMA ---
  const rightBoxW = 58;
  const rightBoxH = 26;
  const rightBoxX = pageWidth - margin - rightBoxW;
  const rightBoxY = 8.5;

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.4);
  doc.roundedRect(rightBoxX, rightBoxY, rightBoxW, rightBoxH, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text("PROFORMA OFICIAL B2B", rightBoxX + (rightBoxW / 2), rightBoxY + 6, { align: "center" });

  doc.setFontSize(11);
  doc.setTextColor(30, 58, 138);
  doc.text(`N° ${data.proformaNumber}`, rightBoxX + (rightBoxW / 2), rightBoxY + 12.5, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text(`Fecha: ${data.date}`, rightBoxX + (rightBoxW / 2), rightBoxY + 18, { align: "center" });
  doc.text(`Validez: ${data.validityDays} Días Hábiles`, rightBoxX + (rightBoxW / 2), rightBoxY + 22.5, { align: "center" });

  // Línea divisoria
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.4);
  doc.line(margin, 36.5, pageWidth - margin, 36.5);

  // --- 4. BLOQUE DEL CLIENTE Y CONDICIONES (2 COLUMNAS) ---
  const clientCardY = 40;
  const clientCardH = 34;

  doc.setFillColor(251, 249, 245);
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, clientCardY, printableWidth, clientCardH, 2, 2, "FD");

  // Columna Izquierda: Identificación del Cliente (Ancho 86mm)
  const col1X = margin + 4;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text("DATOS DEL CLIENTE / SOLICITANTE:", col1X, clientCardY + 5.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);

  const cleanRazonSocial = data.client.razonSocial.length > 42
    ? data.client.razonSocial.substring(0, 40) + "..."
    : data.client.razonSocial;
  doc.text(`Razón Social: ${cleanRazonSocial}`, col1X, clientCardY + 11.5);
  doc.text(`R.U.T. Empresa: ${data.client.rut}`, col1X, clientCardY + 17);

  const cleanGiro = data.client.giro.length > 46
    ? data.client.giro.substring(0, 44) + "..."
    : data.client.giro;
  doc.text(`Giro Comercial: ${cleanGiro}`, col1X, clientCardY + 22.5);
  doc.text(`Ciudad / Destino: ${data.client.ciudad}`, col1X, clientCardY + 28);

  // Columna Derecha: Régimen Fiscal y Logística
  const col2X = margin + 92;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text("CONDICIONES FISCALES Y ENTREGA:", col2X, clientCardY + 5.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);

  const regimeLabel = data.taxRegime === "zofri_reexpedicion"
    ? "Reexpedición ZOFRI (0% IVA Exento)"
    : "Factura Electrónica (19% IVA Nacional)";
  doc.text(`Régimen: ${regimeLabel}`, col2X, clientCardY + 11.5);

  const deliveryLabel = data.deliveryOption === "envio"
    ? `Envío: ${data.shippingCompany?.substring(0, 32) || "Trans-Bolivia Cargo"}...`
    : "Retiro Directo en Bodega ZOFRI (Galpón 7 y 8)";
  doc.text(`Entrega: ${deliveryLabel}`, col2X, clientCardY + 17);

  const cleanContacto = data.client.contacto.length > 38
    ? data.client.contacto.substring(0, 36) + "..."
    : data.client.contacto;
  doc.text(`Contacto: ${cleanContacto}`, col2X, clientCardY + 22.5);
  doc.text(`Tel: ${data.client.telefono}  •  Email: ${data.client.correo}`, col2X, clientCardY + 28);

  // --- 5. TABLA VECTORIAL DE LÍNEAS (ANCHO TOTAL 182mm) ---
  const tableHead = [
    ["#", "CÓDIGO SKU", "CÓDIGO OEM", "DESCRIPCIÓN TÉCNICA DEL REPUESTO", "CANT.", "U/M", "PRECIO UNIT.", "TOTAL NETO"]
  ];

  const tableBody = data.items.map((it, idx) => {
    const isWait = it.isFrozenWait;
    const desc = isWait
      ? `${it.title} [EN ESPERA / CONTENEDOR EN TRÁNSITO]`
      : it.title;
    const unitFormatted = isWait ? "Condicionado" : formatCLP(it.unitPrice);
    const totalFormatted = isWait ? "$0 CLP (Espera)" : formatCLP(it.totalPrice);

    return [
      (idx + 1).toString(),
      it.sku,
      it.oem,
      desc,
      it.quantity.toString(),
      "UN",
      unitFormatted,
      totalFormatted
    ];
  });

  autoTable(doc, {
    startY: 78,
    head: tableHead,
    body: tableBody,
    theme: "grid",
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255],
      font: "helvetica",
      fontStyle: "bold",
      fontSize: 8,
      halign: "center",
      cellPadding: { top: 3.5, bottom: 3.5, left: 1.5, right: 1.5 },
    },
    styles: {
      font: "helvetica",
      fontSize: 8,
      cellPadding: { top: 2.8, bottom: 2.8, left: 2, right: 2 },
      textColor: [30, 41, 59],
      lineColor: [226, 232, 240],
      lineWidth: 0.2,
      overflow: "linebreak",
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    columnStyles: {
      0: { cellWidth: 8, halign: "center" },
      1: { cellWidth: 24, halign: "center", fontStyle: "bold" },
      2: { cellWidth: 26, halign: "center" },
      3: { cellWidth: 54, halign: "left" },
      4: { cellWidth: 14, halign: "center", fontStyle: "bold" },
      5: { cellWidth: 12, halign: "center" },
      6: { cellWidth: 22, halign: "right" },
      7: { cellWidth: 22, halign: "right", fontStyle: "bold" },
    },
    margin: { left: margin, right: margin },
  });

  // --- 6. RESUMEN Y CONDICIONES INFERIORES ---
  const lastTable = (doc as any).lastAutoTable;
  let finalY = lastTable ? lastTable.finalY + 7 : 175;

  if (finalY > pageHeight - 55) {
    doc.addPage();
    finalY = 18;
  }

  // Cuadro Izquierdo: Términos Comerciales ZOFRI
  const termsBoxW = 96;
  const termsBoxH = 40;

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, finalY, termsBoxW, termsBoxH, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text("CONDICIONES COMERCIALES Y BANCARIAS ZOFRI:", margin + 4, finalY + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.2);
  doc.setTextColor(71, 85, 105);
  doc.text("• Valores netos expresados en Pesos Chilenos (CLP) para el mercado B2B.", margin + 4, finalY + 12);
  doc.text("• Modalidad de Pago: Factura con Línea de Crédito a 30 Días / Transferencia.", margin + 4, finalY + 17.5);
  doc.text("• Banco de Chile: Cuenta Corriente N° 00-128-49201-02 (Daisekai Ltda.).", margin + 4, finalY + 23);
  doc.text("• Despacho con precinto y control aduanero desde Recinto Amurallado ZOFRI.", margin + 4, finalY + 28.5);
  doc.text("• Repuestos garantizados con estándar y certificación de origen asiático.", margin + 4, finalY + 34);

  // Cuadro Derecho: Desglose Económico
  const summaryBoxW = 80;
  const summaryBoxX = pageWidth - margin - summaryBoxW;
  const summaryBoxH = 40;

  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(summaryBoxX, finalY, summaryBoxW, summaryBoxH, 2, 2, "FD");

  let sumY = finalY + 5.5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.8);
  doc.setTextColor(71, 85, 105);

  doc.text("Subtotal Repuestos Netos:", summaryBoxX + 4, sumY);
  doc.text(formatCLP(data.subtotalNeto), summaryBoxX + summaryBoxW - 4, sumY, { align: "right" });

  if (data.discountAmount && data.discountAmount > 0) {
    sumY += 5;
    doc.setTextColor(16, 185, 129);
    doc.text(`Descuento Volumen VIP (${data.discountPercentage || 15}%):`, summaryBoxX + 4, sumY);
    doc.text(`-${formatCLP(data.discountAmount)}`, summaryBoxX + summaryBoxW - 4, sumY, { align: "right" });
    doc.setTextColor(71, 85, 105);
  }

  sumY += 5;
  const ivaTitle = data.taxRegime === "zofri_reexpedicion" ? "IVA ZOFRI (0% Exento):" : "I.V.A. (19% DTE):";
  doc.text(ivaTitle, summaryBoxX + 4, sumY);
  doc.text(formatCLP(data.iva), summaryBoxX + summaryBoxW - 4, sumY, { align: "right" });

  sumY += 5;
  doc.text("Flete / Despacho Logístico:", summaryBoxX + 4, sumY);
  doc.text(data.shippingCost > 0 ? formatCLP(data.shippingCost) : "GRATIS ($0)", summaryBoxX + summaryBoxW - 4, sumY, { align: "right" });

  // Cuadro Total Destacado (Franja Azul Oscuro)
  sumY += 4.5;
  const totalH = 11;
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(summaryBoxX + 2, sumY, summaryBoxW - 4, totalH, 1.5, 1.5, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text("TOTAL FACTURACIÓN:", summaryBoxX + 5, sumY + 7);
  doc.setFontSize(10.5);
  doc.text(formatCLP(data.totalFinal), summaryBoxX + summaryBoxW - 5, sumY + 7, { align: "right" });

  // --- 7. PIE DE PÁGINA ---
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text(
    "Daisekai Limitada & Osakansai Group • Documento emitido electrónicamente a través del Portal Mayorista B2B • Iquique, Chile",
    pageWidth / 2,
    pageHeight - 8,
    { align: "center" }
  );

  // --- 8. APLICAR MARCA DE AGUA REQUERIDA: "DOCUMENTO NO VALIDO" ---
  applyWatermark(doc);

  doc.save(`Proforma_Daisekai_${data.proformaNumber}.pdf`);
}

/**
 * 2. Generador de COTIZACIÓN MAYORISTA B2B (Mismo formato PDF que Proforma, misma librería y colores)
 */
export function generateCotizacionPDF(data: CotizacionMultiemPDFData): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210mm
  const pageHeight = doc.internal.pageSize.getHeight(); // 297mm
  const margin = 14;
  const printableWidth = pageWidth - (margin * 2); // 182mm

  // --- 1. BARRA SUPERIOR DE ACENTO ---
  doc.setFillColor(15, 23, 42); // Slate 900
  doc.rect(0, 0, pageWidth, 4, "F");

  // --- 2. ENCABEZADO CORPORATIVO (IZQUIERDA) ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.setTextColor(15, 23, 42);
  doc.text("IMPORTADORA Y EXPORTADORA DAISEKAI LTDA.", margin, 14);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9.5);
  doc.setTextColor(220, 38, 38);
  doc.text("DAISEKAI AUTOMOTIVE", margin, 19);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text("Firma Hermana: Osakansai Group | R.U.T.: 76.549.821-3", margin, 23.5);
  doc.text("Centro Operativo: Manzana 11, Galpones 7 y 8, Recinto Amurallado ZOFRI, Iquique", margin, 27.5);
  doc.text("Sede Administrativa: Huantajaya 3036, Iquique | Tel: +56 9 7523 6397 / +56 57 2 544220", margin, 31.5);

  // --- 3. RECUADRO DERECHO: IDENTIFICADOR COTIZACIÓN ---
  const rightBoxW = 58;
  const rightBoxH = 26;
  const rightBoxX = pageWidth - margin - rightBoxW;
  const rightBoxY = 8.5;

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.setLineWidth(0.4);
  doc.roundedRect(rightBoxX, rightBoxY, rightBoxW, rightBoxH, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(15, 23, 42);
  doc.text("COTIZACIÓN MAYORISTA", rightBoxX + (rightBoxW / 2), rightBoxY + 6, { align: "center" });

  doc.setFontSize(11);
  doc.setTextColor(30, 58, 138); // Azul marino elegante
  doc.text(`N° ${data.numCotizacion}`, rightBoxX + (rightBoxW / 2), rightBoxY + 12.5, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  const todayFormatted = new Date().toLocaleDateString("es-CL");
  doc.text(`Fecha: ${todayFormatted}`, rightBoxX + (rightBoxW / 2), rightBoxY + 18, { align: "center" });
  doc.text(`Vendedor: ${data.vendedor}`, rightBoxX + (rightBoxW / 2), rightBoxY + 22.5, { align: "center" });

  // Línea divisoria
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.4);
  doc.line(margin, 36.5, pageWidth - margin, 36.5);

  // --- 4. BLOQUE DEL CLIENTE Y CONDICIONES (2 COLUMNAS) ---
  const clientCardY = 40;
  const clientCardH = 34;

  doc.setFillColor(251, 249, 245); // Color piedra cálido Mod Journey
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, clientCardY, printableWidth, clientCardH, 2, 2, "FD");

  // Columna Izquierda: Identificación del Solicitante
  const col1X = margin + 4;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text("DATOS DEL DESTINATARIO / CLIENTE:", col1X, clientCardY + 5.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);

  const cleanCliente = data.clienteNombre.length > 42
    ? data.clienteNombre.substring(0, 40) + "..."
    : data.clienteNombre;
  doc.text(`Razón Social: ${cleanCliente}`, col1X, clientCardY + 11.5);
  doc.text(`Código Cliente: ${data.codCliente}`, col1X, clientCardY + 17);
  doc.text(`Dirección: ${data.direccion}`, col1X, clientCardY + 22.5);
  doc.text(`Ciudad / Destino: ${data.ciudad}`, col1X, clientCardY + 28);

  // Columna Derecha: Parámetros Comerciales
  const col2X = margin + 92;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text("CONDICIONES DE COTIZACIÓN ZOFRI:", col2X, clientCardY + 5.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  doc.text("Moneda de Cotización: Dólares Americanos (US$)", col2X, clientCardY + 11.5);
  doc.text(`Reserva Multiem: ${data.reservaNum}  •  Factura: 0`, col2X, clientCardY + 17);
  doc.text(`Contacto / Fono: ${data.fono}`, col2X, clientCardY + 22.5);
  doc.text(`Glosa: ${data.glosaDoc?.substring(0, 40) || "Despacho internacional ZOFRI"}...`, col2X, clientCardY + 28);

  // --- 5. TABLA VECTORIAL DE LÍNEAS (ANCHO TOTAL 182mm) ---
  const tableHead = [
    ["#", "CÓDIGO SKU", "CÓD. FACT.", "DESCRIPCIÓN / ESPECIFICACIÓN", "CANT.", "U/M", "UNIT. US$", "TOTAL US$"]
  ];

  const tableBody = data.lineas.map((line, idx) => [
    (idx + 1).toString(),
    line.codigoProducto,
    line.codFact,
    line.descripcion,
    Number(line.cantidad).toFixed(2),
    line.um,
    `$${Number(line.unitUsd).toFixed(2)}`,
    `$${Number(line.totalUsd).toFixed(2)}`,
  ]);

  autoTable(doc, {
    startY: 78,
    head: tableHead,
    body: tableBody,
    theme: "grid",
    headStyles: {
      fillColor: [15, 23, 42], // Slate 900
      textColor: [255, 255, 255],
      font: "helvetica",
      fontStyle: "bold",
      fontSize: 8,
      halign: "center",
      cellPadding: { top: 3.5, bottom: 3.5, left: 1.5, right: 1.5 },
    },
    styles: {
      font: "helvetica",
      fontSize: 8,
      cellPadding: { top: 2.8, bottom: 2.8, left: 2, right: 2 },
      textColor: [30, 41, 59],
      lineColor: [226, 232, 240],
      lineWidth: 0.2,
      overflow: "linebreak",
    },
    alternateRowStyles: {
      fillColor: [248, 250, 252],
    },
    columnStyles: {
      0: { cellWidth: 8, halign: "center" },
      1: { cellWidth: 24, halign: "center", fontStyle: "bold" },
      2: { cellWidth: 24, halign: "center" },
      3: { cellWidth: 56, halign: "left" },
      4: { cellWidth: 14, halign: "center", fontStyle: "bold" },
      5: { cellWidth: 12, halign: "center" },
      6: { cellWidth: 22, halign: "right" },
      7: { cellWidth: 22, halign: "right", fontStyle: "bold" },
    },
    margin: { left: margin, right: margin },
  });

  // --- 6. RESUMEN Y CONDICIONES INFERIORES ---
  const lastTable = (doc as any).lastAutoTable;
  let finalY = lastTable ? lastTable.finalY + 7 : 175;

  if (finalY > pageHeight - 55) {
    doc.addPage();
    finalY = 18;
  }

  // Cuadro Izquierdo: Términos Comerciales ZOFRI
  const termsBoxW = 96;
  const termsBoxH = 40;

  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(226, 232, 240);
  doc.roundedRect(margin, finalY, termsBoxW, termsBoxH, 2, 2, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text("CONDICIONES DE COTIZACIÓN MULTIEM ZOFRI:", margin + 4, finalY + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.2);
  doc.setTextColor(71, 85, 105);
  doc.text("• Precios fijados en Dólares Americanos (US$) bajo régimen ZOFRI Iquique.", margin + 4, finalY + 12);
  doc.text("• Válido para reserva aduanera y tramitación de embarques internacionales.", margin + 4, finalY + 17.5);
  doc.text("• Disponibilidad sujeta a verificación física en Galpones 7 y 8 ZOFRI.", margin + 4, finalY + 23);
  doc.text("• Despacho directo a todo Chile y exportación en convoy internacional.", margin + 4, finalY + 28.5);
  doc.text("• Garantía de fábrica y certificación OEM para todas las líneas de repuesto.", margin + 4, finalY + 34);

  // Cuadro Derecho: Desglose Económico
  const summaryBoxW = 80;
  const summaryBoxX = pageWidth - margin - summaryBoxW;
  const summaryBoxH = 40;

  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(summaryBoxX, finalY, summaryBoxW, summaryBoxH, 2, 2, "FD");

  let sumY = finalY + 5.5;
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.8);
  doc.setTextColor(71, 85, 105);

  doc.text("Subtotal Repuestos (US$):", summaryBoxX + 4, sumY);
  doc.text(`$${data.totalUsd.toFixed(2)} US$`, summaryBoxX + summaryBoxW - 4, sumY, { align: "right" });

  sumY += 5;
  doc.text("Cantidad Total Repuestos:", summaryBoxX + 4, sumY);
  doc.text(`${data.totalCantidad.toFixed(0)} un.`, summaryBoxX + summaryBoxW - 4, sumY, { align: "right" });

  sumY += 5;
  doc.text("Régimen Arancelario:", summaryBoxX + 4, sumY);
  doc.text("Exento IVA ZOFRI", summaryBoxX + summaryBoxW - 4, sumY, { align: "right" });

  sumY += 5;
  doc.text("Validez de la Oferta:", summaryBoxX + 4, sumY);
  doc.text("15 Días Hábiles", summaryBoxX + summaryBoxW - 4, sumY, { align: "right" });

  // Cuadro Total Destacado (Franja Azul Oscuro)
  sumY += 4.5;
  const totalH = 11;
  doc.setFillColor(15, 23, 42);
  doc.roundedRect(summaryBoxX + 2, sumY, summaryBoxW - 4, totalH, 1.5, 1.5, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text("TOTAL COTIZADO:", summaryBoxX + 5, sumY + 7);
  doc.setFontSize(10.5);
  doc.text(`$${data.totalUsd.toFixed(2)} US$`, summaryBoxX + summaryBoxW - 5, sumY + 7, { align: "right" });

  // --- 7. PIE DE PÁGINA ---
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text(
    "Daisekai Limitada & Osakansai Group • Documento emitido electrónicamente a través del Portal Mayorista B2B • Iquique, Chile",
    pageWidth / 2,
    pageHeight - 8,
    { align: "center" }
  );

  // --- 8. APLICAR MARCA DE AGUA REQUERIDA: "DOCUMENTO NO VALIDO" ---
  applyWatermark(doc);

  doc.save(`Cotizacion_Daisekai_${data.numCotizacion.replace(/,/g, "")}.pdf`);
}

/**
 * 3. Generador de FACTURA ELECTRÓNICA DTE / FACTURA DE REEXPEDICIÓN ZOFRI
 */
export function generateFacturaDTEPDF(data: FacturaDTEPDFData): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const printableWidth = pageWidth - (margin * 2);

  // Timbre Rojo DTE (Estilo Oficial SII / ZOFRI)
  const stampW = 68;
  const stampH = 26;
  const stampX = pageWidth - margin - stampW;

  doc.setDrawColor(220, 38, 38);
  doc.setLineWidth(0.8);
  doc.rect(stampX, 10, stampW, stampH);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(9);
  doc.setTextColor(220, 38, 38);
  doc.text("R.U.T.: 76.549.821-3", stampX + (stampW / 2), 15.5, { align: "center" });

  doc.setFontSize(10);
  doc.text("FACTURA ELECTRÓNICA", stampX + (stampW / 2), 21.5, { align: "center" });

  doc.setFontSize(11);
  doc.text(`N° ${data.invoiceNumber}`, stampX + (stampW / 2), 28, { align: "center" });

  doc.setFontSize(7);
  doc.text("S.I.I. - IQUIQUE / RÉGIMEN ZOFRI", stampX + (stampW / 2), 33.5, { align: "center" });

  // Datos Emisor (Izquierda)
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12.5);
  doc.setTextColor(15, 23, 42);
  doc.text("IMPORTADORA Y EXPORTADORA DAISEKAI LTDA.", margin, 15);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text("Giro: Importación, fabricación y exportación de repuestos automotrices", margin, 20);
  doc.text("Casa Matriz: Recinto Amurallado ZOFRI, Manzana 11, Galpones 7 y 8, Iquique", margin, 24.5);
  doc.text("Dirección Administrativa: Huantajaya 3036, Iquique, Chile", margin, 29);
  doc.text("Fono: +56 9 7523 6397 | +56 57 2 544220 | Correo: facturacion@daisekai.cl", margin, 33.5);

  // Línea
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.4);
  doc.line(margin, 39, pageWidth - margin, 39);

  // Cuadro Cliente
  const clientY = 42;
  const clientH = 28;
  doc.setFillColor(250, 250, 250);
  doc.setDrawColor(210, 210, 210);
  doc.roundedRect(margin, clientY, printableWidth, clientH, 1.5, 1.5, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8);
  doc.setTextColor(15, 23, 42);
  doc.text("SEÑOR(ES):", margin + 4, clientY + 6);
  doc.setFont("helvetica", "normal");
  doc.text(data.cliente.razonSocial, margin + 25, clientY + 6);

  doc.setFont("helvetica", "bold");
  doc.text("R.U.T.:", margin + 4, clientY + 12);
  doc.setFont("helvetica", "normal");
  doc.text(data.cliente.rut, margin + 25, clientY + 12);

  doc.setFont("helvetica", "bold");
  doc.text("GIRO:", margin + 4, clientY + 18);
  doc.setFont("helvetica", "normal");
  doc.text(data.cliente.giro, margin + 25, clientY + 18);

  doc.setFont("helvetica", "bold");
  doc.text("DIRECCIÓN:", margin + 4, clientY + 24);
  doc.setFont("helvetica", "normal");
  doc.text(`${data.cliente.direccion}, ${data.cliente.ciudad}`, margin + 25, clientY + 24);

  // Metadatos a la derecha
  const rx = pageWidth - margin - 65;
  doc.setFont("helvetica", "bold");
  doc.text("FECHA EMISIÓN:", rx, clientY + 6);
  doc.setFont("helvetica", "normal");
  doc.text(data.fechaEmision, rx + 26, clientY + 6);

  doc.setFont("helvetica", "bold");
  doc.text("VENCIMIENTO:", rx, clientY + 12);
  doc.setFont("helvetica", "normal");
  doc.text(data.fechaVencimiento, rx + 26, clientY + 12);

  doc.setFont("helvetica", "bold");
  doc.text("COND. PAGO:", rx, clientY + 18);
  doc.setFont("helvetica", "normal");
  doc.text(data.condicionPago, rx + 26, clientY + 18);

  doc.setFont("helvetica", "bold");
  doc.text("TIPO DTE:", rx, clientY + 24);
  doc.setFont("helvetica", "normal");
  doc.text(data.tipoDocumento.split("(")[0].trim(), rx + 26, clientY + 24);

  // Tabla
  const tableHead = [["Item", "Código SKU", "OEM", "Descripción", "Cantidad", "Precio Unit.", "Total Neto"]];
  const tableBody = data.items.map((it, idx) => [
    (idx + 1).toString(),
    it.sku,
    it.oem,
    it.title,
    it.quantity.toString(),
    formatCLP(it.unitPrice),
    formatCLP(it.totalPrice),
  ]);

  autoTable(doc, {
    startY: 74,
    head: tableHead,
    body: tableBody,
    theme: "grid",
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255],
      font: "helvetica",
      fontStyle: "bold",
      fontSize: 8,
      halign: "center",
      cellPadding: 2.5,
    },
    styles: {
      font: "helvetica",
      fontSize: 8,
      cellPadding: 2.2,
      textColor: [30, 41, 59],
    },
    columnStyles: {
      0: { cellWidth: 10, halign: "center" },
      1: { cellWidth: 26, halign: "center", fontStyle: "bold" },
      2: { cellWidth: 26, halign: "center" },
      3: { cellWidth: "auto" },
      4: { cellWidth: 16, halign: "center", fontStyle: "bold" },
      5: { cellWidth: 26, halign: "right" },
      6: { cellWidth: 28, halign: "right", fontStyle: "bold" },
    },
    margin: { left: margin, right: margin },
  });

  const lastTable = (doc as any).lastAutoTable;
  let finalY = lastTable ? lastTable.finalY + 6 : 185;

  if (finalY > pageHeight - 50) {
    doc.addPage();
    finalY = 18;
  }

  // Cuadro de Resumen Totales
  const sw = 76;
  const sx = pageWidth - margin - sw;
  doc.setFillColor(255, 255, 255);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(sx, finalY, sw, 32, 1, 1, "FD");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.8);
  doc.setTextColor(71, 85, 105);

  doc.text("Monto Neto:", sx + 3, finalY + 6);
  doc.text(formatCLP(data.subtotalNeto), sx + sw - 3, finalY + 6, { align: "right" });

  doc.text("I.V.A. (19% o 0% Exento):", sx + 3, finalY + 12);
  doc.text(formatCLP(data.iva), sx + sw - 3, finalY + 12, { align: "right" });

  doc.text("Flete / Despacho:", sx + 3, finalY + 18);
  doc.text(data.flete > 0 ? formatCLP(data.flete) : "$0", sx + sw - 3, finalY + 18, { align: "right" });

  doc.setFillColor(15, 23, 42);
  doc.roundedRect(sx + 1.5, finalY + 21, sw - 3, 9.5, 1, 1, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(255, 255, 255);
  doc.text("TOTAL FACTURADO:", sx + 4, finalY + 27.5);
  doc.text(formatCLP(data.totalFinal), sx + sw - 4, finalY + 27.5, { align: "right" });

  if (data.trackingNumber) {
    doc.setFont("courier", "bold");
    doc.setFontSize(8);
    doc.setTextColor(15, 23, 42);
    doc.text(`N° GUÍA / TRACKING: ${data.trackingNumber}`, margin + 3, finalY + 12);
  }

  // --- APLICAR MARCA DE AGUA REQUERIDA ---
  applyWatermark(doc);

  doc.save(`Factura_${data.invoiceNumber}.pdf`);
}

/**
 * 4. Generador del PDF EXPLICATIVO DEL FLUJO COMPLETO DEL SISTEMA
 */
export function generateManualFlujoPDF(): void {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const printableWidth = pageWidth - (margin * 2);

  // --- PÁGINA 1: ARQUITECTURA, ROLES Y CLIENTE MAYORISTA ---
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 5, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(15, 23, 42);
  doc.text("MANUAL TÉCNICO Y OPERATIVO DEL SISTEMA B2B", margin, 16);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(220, 38, 38);
  doc.text("DAISEKAI AUTOMOTIVE & OSAKANSAI GROUP • ZOFRI IQUIQUE", margin, 21.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text("Documentación Oficial de Flujo de Navegación, Botones, Acciones, Formularios y Cargas/Descargas", margin, 26.5);

  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.4);
  doc.line(margin, 30, pageWidth - margin, 30);

  // Sección 1: Arquitectura y Roles
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text("1. ARQUITECTURA GENERAL Y CONMUTACIÓN DE ROLES", margin, 36);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.8);
  doc.setTextColor(51, 65, 85);
  doc.text(
    "La plataforma opera con un portal privado B2B segregado de la landing pública. Dispone de una barra superior con 3 roles interactivos:",
    margin,
    41
  );

  const rolesTable = [
    ["ROL", "ACCESO & VISTA", "FUNCIONALIDAD CLAVE", "EXPORTACIONES / DESCARGAS"],
    [
      "1. Cliente Mayorista",
      "Catálogo privado (5 cols) y Mi Perfil comercial",
      "Búsqueda por patente/VIN/OEM, selector de cantidad directa, carrito, régimen ZOFRI y pasarela 30 días.",
      "Proforma Oficial B2B (PDF), Factura DTE y Guía de Despacho.",
    ],
    [
      "2. Rol Vendedor",
      "4 apartados independientes",
      "Cotizaciones & Proformas (Multiem), Ingestión Kardex (Excel 2007), Cartera de Clientes y Auditoría de Stock.",
      "Cotización Mayorista Multiem (PDF) y carga masiva .xlsx.",
    ],
    [
      "3. Administrador",
      "2 submódulos centrales",
      "Evaluación de solicitudes (Cuentas nuevas, administrativas y cambios) y Gestión central de despachos ZOFRI.",
      "Aprobación de crédito, actualización de tracking y DTE.",
    ],
  ];

  autoTable(doc, {
    startY: 44,
    head: [rolesTable[0]],
    body: rolesTable.slice(1),
    theme: "grid",
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 7.5,
      halign: "center",
      cellPadding: 2,
    },
    styles: {
      font: "helvetica",
      fontSize: 7.2,
      cellPadding: 2,
      textColor: [30, 41, 59],
      lineColor: [226, 232, 240],
      lineWidth: 0.2,
    },
    columnStyles: {
      0: { cellWidth: 32, fontStyle: "bold" },
      1: { cellWidth: 38 },
      2: { cellWidth: 70 },
      3: { cellWidth: 42 },
    },
    margin: { left: margin, right: margin },
  });

  // Sección 2: Flujo Detallado Cliente Mayorista
  const lastT1 = (doc as any).lastAutoTable;
  const sec2Y = lastT1.finalY + 7;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text("2. FLUJO OPERATIVO: ROL CLIENTE MAYORISTA", margin, sec2Y);

  const clientFlowData = [
    ["COMPONENTE / BOTÓN", "TIPO DE ACCIÓN", "COMPORTAMIENTO DEL SISTEMA & EFECTO TÉCNICO"],
    [
      "Botón 'Ingresar al Portal'",
      "Acceso directo",
      "Autenticación simulada sin trabas. Si no tiene cuenta, el formulario envía solicitud con validación SII a administración.",
    ],
    [
      "Bot Identificador Patente",
      "Filtro inteligente",
      "Resuelve patentes chilenas (LJ-RG-42, BB-CL-19) cruzando Patente Marca, Modelo, Chasis (VIN) y Año del Multiem.",
    ],
    [
      "Consola de Búsqueda",
      "Búsqueda técnica",
      "Menú flotante de autocompletado en vivo por código OEM, SKU o modelo, más 5 filtros desplegables de categoría y año.",
    ],
    [
      "Catálogo en Fila de 5",
      "Navegación visual",
      "22 repuestos técnicos con blueprint 'ESPACIO PARA FOTO OEM' y condicional de precios según estado de aprobación.",
    ],
    [
      "Modal Chicureo 200",
      "Ficha de producto",
      "Contiene selector de 'Cantidad' (+/-) para definir el volumen antes de agregar. El botón añade directamente al carrito.",
    ],
    [
      "Drawer del Carrito",
      "Proceso Checkout",
      "Soporta paginación si >10 ítems, desglose de IVA 19% o 0% ZOFRI, flete Trans-Bolivia y descarga de Proforma en PDF.",
    ],
    [
      "Pasarela de Pago B2B",
      "Transacción comercial",
      "Soporta Línea de Crédito a 30 Días (verifica cupo disponible de $45M), Webpay Plus o Transferencia Banco de Chile.",
    ],
    [
      "Mi Perfil B2B",
      "Gestión de cuenta",
      "3 pestañas: Ficha Comercial editable, Cuenta Corriente con abono parcial de facturas, y Seguimiento en vivo de despachos.",
    ],
  ];

  autoTable(doc, {
    startY: sec2Y + 3,
    head: [clientFlowData[0]],
    body: clientFlowData.slice(1),
    theme: "grid",
    headStyles: {
      fillColor: [30, 58, 138],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 7.5,
      halign: "center",
      cellPadding: 2,
    },
    styles: {
      font: "helvetica",
      fontSize: 7.2,
      cellPadding: 2,
      textColor: [30, 41, 59],
      lineColor: [226, 232, 240],
      lineWidth: 0.2,
    },
    columnStyles: {
      0: { cellWidth: 42, fontStyle: "bold" },
      1: { cellWidth: 32 },
      2: { cellWidth: "auto" },
    },
    margin: { left: margin, right: margin },
  });

  // --- PÁGINA 2: VENDEDOR, ADMINISTRADOR Y AUDITORÍA ---
  doc.addPage();

  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 4, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text("3. FLUJO OPERATIVO: ROL VENDEDOR (COTIZACIONES & KARDEX MULTIEM)", margin, 14);

  const vendorFlowData = [
    ["APARTADO DEL VENDEDOR", "OPERACIÓN", "DESCRIPCIÓN DEL FLUJO & EXPORTACIÓN"],
    [
      "1. Cotizaciones & Proformas",
      "Emisión formal",
      "Alternador Cliente Cartera vs. NO Cliente. Selector para incorporar repuestos del catálogo en tiempo real con precios en USD.",
    ],
    [
      "Descargar en PDF (Cotización)",
      "Descarga directa",
      "Genera documento oficial idéntico al formato de Proforma (mismo estándar gráfico y colores) con marca de agua 'DOCUMENTO NO VALIDO'.",
    ],
    [
      "2. Ingestión Kardex Multiem",
      "Carga de archivo",
      "Procesa hojas Excel 2007 (.xlsx/.xls) depurando codificación UTF-8 y actualizando stock físico en Galpón 7 y 8.",
    ],
    [
      "3. Cartera de Clientes",
      "Gestión de cuentas",
      "Directorio de talleres y flotas con códigos Multiem (C 020-539), RUT, teléfonos y destinos (Cochabamba, Iquique, Arica).",
    ],
    [
      "4. Inventario Subido Kardex",
      "Auditoría",
      "Visualizador de existencias cargadas desde el Kardex con filtros por contenedor y estatus aduanero.",
    ],
  ];

  autoTable(doc, {
    startY: 18,
    head: [vendorFlowData[0]],
    body: vendorFlowData.slice(1),
    theme: "grid",
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 7.5,
      halign: "center",
      cellPadding: 2,
    },
    styles: {
      font: "helvetica",
      fontSize: 7.2,
      cellPadding: 2,
      textColor: [30, 41, 59],
      lineColor: [226, 232, 240],
      lineWidth: 0.2,
    },
    columnStyles: {
      0: { cellWidth: 46, fontStyle: "bold" },
      1: { cellWidth: 32 },
      2: { cellWidth: "auto" },
    },
    margin: { left: margin, right: margin },
  });

  const lastT2 = (doc as any).lastAutoTable;
  const sec4Y = lastT2.finalY + 7;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text("4. FLUJO OPERATIVO: ROL ADMINISTRADOR (EVALUACIÓN & DESPACHOS)", margin, sec4Y);

  const adminFlowData = [
    ["MÓDULO DE ADMINISTRACIÓN", "ACCIÓN ADMINISTRATIVA", "IMPACTO EN LA PLATAFORMA"],
    [
      "Filtro 1: Cuentas Nuevas",
      "Aprobar / Rechazar",
      "Valida antecedentes tributarios de talleres. Al aprobar, el cliente pasa inmediatamente a estado 'Aprobado' con precios netos visibles.",
    ],
    [
      "Filtro 2: Solicitudes Admin",
      "Gestión de cupos",
      "Control de ampliación de cupos de crédito (ej. de $45M a $60M) y convenios de flete internacional.",
    ],
    [
      "Filtro 3: Registro de Cambios",
      "Auditoría legal",
      "Aprobación de cambios de dirección tributaria o poderes de compra DTE de empresas contratistas.",
    ],
    [
      "Gestión Central de Pedidos",
      "Control logístico ZOFRI",
      "Permite cambiar estados de orden ('Confirmado' -> 'Preparación' -> 'En Camino' -> 'Entregado'), actualizando en tiempo real la barra de tracking en el perfil del cliente.",
    ],
  ];

  autoTable(doc, {
    startY: sec4Y + 3,
    head: [adminFlowData[0]],
    body: adminFlowData.slice(1),
    theme: "grid",
    headStyles: {
      fillColor: [30, 58, 138],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 7.5,
      halign: "center",
      cellPadding: 2,
    },
    styles: {
      font: "helvetica",
      fontSize: 7.2,
      cellPadding: 2,
      textColor: [30, 41, 59],
      lineColor: [226, 232, 240],
      lineWidth: 0.2,
    },
    columnStyles: {
      0: { cellWidth: 46, fontStyle: "bold" },
      1: { cellWidth: 36 },
      2: { cellWidth: "auto" },
    },
    margin: { left: margin, right: margin },
  });

  const lastT3 = (doc as any).lastAutoTable;
  const sec5Y = lastT3.finalY + 7;

  // Cuadro de Resumen de Cargas y Descargas
  doc.setFillColor(248, 250, 252);
  doc.setDrawColor(203, 213, 225);
  doc.roundedRect(margin, sec5Y, printableWidth, 36, 1.5, 1.5, "FD");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text("5. MATRIZ DE CARGAS Y DESCARGAS DEL SISTEMA:", margin + 4, sec5Y + 6);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  doc.text("• CARGA (Upload): Archivos Excel 2007 (.xlsx/.xls) en Módulo Kardex con pipeline de normalización UTF-8.", margin + 4, sec5Y + 12);
  doc.text("• DESCARGA 1: Proforma Oficial B2B (.pdf) desde el Drawer del Carrito y módulo de Checkout.", margin + 4, sec5Y + 17.5);
  doc.text("• DESCARGA 2: Cotización Mayorista Multiem (.pdf) desde el Rol Vendedor en formato idéntico a Proforma.", margin + 4, sec5Y + 23);
  doc.text("• DESCARGA 3: Factura Electrónica DTE (.pdf) descargable tras compra o desde el historial de Mi Perfil.", margin + 4, sec5Y + 28.5);
  doc.text("• MARCA DE AGUA: Todos los documentos descargables incluyen la marca transversal 'DOCUMENTO NO VALIDO'.", margin + 4, sec5Y + 33.5);

  // Pie de página
  doc.setFont("helvetica", "normal");
  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text(
    "Manual Operativo Sistema B2B Daisekai & Osakansai • Plataforma Demostrativa Oficial ZOFRI • Iquique, Chile",
    pageWidth / 2,
    pageHeight - 8,
    { align: "center" }
  );

  applyWatermark(doc);

  doc.save("Manual_Flujo_Completo_Sistema_Daisekai_B2B.pdf");
}
