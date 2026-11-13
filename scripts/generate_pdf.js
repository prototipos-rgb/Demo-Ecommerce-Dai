const { jsPDF } = require("jspdf");
const autoTableImport = require("jspdf-autotable");
const autoTable = autoTableImport.default || autoTableImport;
const fs = require("fs");
const path = require("path");

function generateManualFlujo() {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth(); // 210
  const pageHeight = doc.internal.pageSize.getHeight(); // 297
  const margin = 14;
  const printableWidth = pageWidth - (margin * 2); // 182

  function applyWatermark(docRef, watermarkText = "DOCUMENTO NO VALIDO") {
    const totalPages = docRef.getNumberOfPages ? docRef.getNumberOfPages() : docRef.internal.pages.length - 1;
    for (let i = 1; i <= totalPages; i++) {
      docRef.setPage(i);
      docRef.saveGraphicsState();
      try {
        if (docRef.GState) {
          docRef.setGState(new docRef.GState({ opacity: 0.12 }));
          docRef.setTextColor(220, 38, 38);
        } else {
          docRef.setTextColor(245, 215, 215);
        }
      } catch {
        docRef.setTextColor(245, 215, 215);
      }

      docRef.setFont("helvetica", "bold");
      docRef.setFontSize(36);
      docRef.text(watermarkText, pageWidth / 2, pageHeight / 2, {
        align: "center",
        angle: 45,
      });

      docRef.restoreGraphicsState();
    }
  }

  // --- PÁGINA 1: ARQUITECTURA, ROLES Y CLIENTE MAYORISTA ---
  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 5, "F");

  doc.setFont("helvetica", "bold");
  doc.setFontSize(15);
  doc.setTextColor(15, 23, 42);
  doc.text("MANUAL TECNICO Y OPERATIVO DEL SISTEMA B2B", margin, 16);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(220, 38, 38);
  doc.text("DAISEKAI AUTOMOTIVE & OSAKANSAI GROUP • ZOFRI IQUIQUE", margin, 21.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text("Documentacion Oficial de Flujo de Navegacion, Botones, Acciones, Formularios y Cargas/Descargas", margin, 26.5);

  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.4);
  doc.line(margin, 30, pageWidth - margin, 30);

  // Sección 1: Arquitectura y Roles
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text("1. ARQUITECTURA GENERAL Y CONMUTACION DE ROLES", margin, 36);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.8);
  doc.setTextColor(51, 65, 85);
  doc.text(
    "La plataforma opera con un portal privado B2B segregado de la landing publica. Dispone de una barra superior con 3 roles interactivos:",
    margin,
    41
  );

  const rolesTable = [
    ["ROL", "ACCESO & VISTA", "FUNCIONALIDAD CLAVE", "EXPORTACIONES / DESCARGAS"],
    [
      "1. Cliente Mayorista",
      "Catalogo privado (5 cols) y Mi Perfil comercial",
      "Busqueda por patente/VIN/OEM, selector de cantidad directa, carrito, regimen ZOFRI y pasarela 30 dias.",
      "Proforma Oficial B2B (PDF), Factura DTE y Guia de Despacho.",
    ],
    [
      "2. Rol Vendedor",
      "4 apartados independientes",
      "Cotizaciones & Proformas (Multiem), Ingestion Kardex (Excel 2007), Cartera de Clientes y Auditoria de Stock.",
      "Cotizacion Mayorista Multiem (PDF) y carga masiva .xlsx.",
    ],
    [
      "3. Administrador",
      "2 submodulos centrales",
      "Evaluacion de solicitudes (Cuentas nuevas, administrativas y cambios) y Gestion central de despachos ZOFRI.",
      "Aprobacion de credito, actualizacion de tracking y DTE.",
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
  const lastT1 = doc.lastAutoTable;
  const sec2Y = lastT1.finalY + 7;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text("2. FLUJO OPERATIVO: ROL CLIENTE MAYORISTA", margin, sec2Y);

  const clientFlowData = [
    ["COMPONENTE / BOTON", "TIPO DE ACCION", "COMPORTAMIENTO DEL SISTEMA & EFECTO TECNICO"],
    [
      "Boton 'Ingresar al Portal'",
      "Acceso directo",
      "Autenticacion simulada sin trabas. Si no tiene cuenta, el formulario envia solicitud con validacion SII a administracion.",
    ],
    [
      "Bot Identificador Patente",
      "Filtro inteligente",
      "Resuelve patentes chilenas (LJ-RG-42, BB-CL-19) cruzando Patente Marca, Modelo, Chasis (VIN) y Ano del Multiem.",
    ],
    [
      "Consola de Busqueda",
      "Busqueda tecnica",
      "Menu flotante de autocompletado en vivo por codigo OEM, SKU o modelo, mas 5 filtros desplegables de categoria y ano.",
    ],
    [
      "Catalogo en Fila de 5",
      "Navegacion visual",
      "22 repuestos tecnicos con blueprint 'ESPACIO PARA FOTO OEM' y condicional de precios segun estado de aprobacion.",
    ],
    [
      "Modal Chicureo 200",
      "Ficha de producto",
      "Contiene selector de 'Cantidad' (+/-) para definir el volumen antes de agregar. El boton anade directamente al carrito.",
    ],
    [
      "Drawer del Carrito",
      "Proceso Checkout",
      "Soporta paginacion si >10 items, desglose de IVA 19% o 0% ZOFRI, flete Trans-Bolivia y descarga de Proforma en PDF.",
    ],
    [
      "Pasarela de Pago B2B",
      "Transaccion comercial",
      "Soporta Linea de Credito a 30 Dias (verifica cupo disponible de $45M), Webpay Plus o Transferencia Banco de Chile.",
    ],
    [
      "Mi Perfil B2B",
      "Gestion de cuenta",
      "3 pestanas: Ficha Comercial editable, Cuenta Corriente con abono parcial de facturas, y Seguimiento en vivo de despachos.",
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
    ["APARTADO DEL VENDEDOR", "OPERACION", "DESCRIPCION DEL FLUJO & EXPORTACION"],
    [
      "1. Cotizaciones & Proformas",
      "Emision formal",
      "Alternador Cliente Cartera vs. NO Cliente. Selector para incorporar repuestos del catalogo en tiempo real con precios en USD.",
    ],
    [
      "Descargar en PDF (Cotizacion)",
      "Descarga directa",
      "Genera documento oficial identico al formato de Proforma (mismo estandar grafico y colores) con marca de agua 'DOCUMENTO NO VALIDO'.",
    ],
    [
      "2. Ingestion Kardex Multiem",
      "Carga de archivo",
      "Procesa hojas Excel 2007 (.xlsx/.xls) depurando codificacion UTF-8 y actualizando stock fisico en Galpon 7 y 8.",
    ],
    [
      "3. Cartera de Clientes",
      "Gestion de cuentas",
      "Directorio de talleres y flotas con codigos Multiem (C 020-539), RUT, telefonos y destinos (Cochabamba, Iquique, Arica).",
    ],
    [
      "4. Inventario Subido Kardex",
      "Auditoria",
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

  const lastT2 = doc.lastAutoTable;
  const sec4Y = lastT2.finalY + 7;

  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.setTextColor(15, 23, 42);
  doc.text("4. FLUJO OPERATIVO: ROL ADMINISTRADOR (EVALUACION & DESPACHOS)", margin, sec4Y);

  const adminFlowData = [
    ["MODULO DE ADMINISTRACION", "ACCION ADMINISTRATIVA", "IMPACTO EN LA PLATAFORMA"],
    [
      "Filtro 1: Cuentas Nuevas",
      "Aprobar / Rechazar",
      "Valida antecedentes tributarios de talleres. Al aprobar, el cliente pasa inmediatamente a estado 'Aprobado' con precios netos visibles.",
    ],
    [
      "Filtro 2: Solicitudes Admin",
      "Gestion de cupos",
      "Control de ampliacion de cupos de credito (ej. de $45M a $60M) y convenios de flete internacional.",
    ],
    [
      "Filtro 3: Registro de Cambios",
      "Auditoria legal",
      "Aprobacion de cambios de direccion tributaria o poderes de compra DTE de empresas contratistas.",
    ],
    [
      "Gestion Central de Pedidos",
      "Control logistico ZOFRI",
      "Permite cambiar estados de orden ('Confirmado' -> 'Preparacion' -> 'En Camino' -> 'Entregado'), actualizando en tiempo real la barra de tracking en el perfil del cliente.",
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

  const lastT3 = doc.lastAutoTable;
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
  doc.text("• CARGA (Upload): Archivos Excel 2007 (.xlsx/.xls) en Modulo Kardex con pipeline de normalizacion UTF-8.", margin + 4, sec5Y + 12);
  doc.text("• DESCARGA 1: Proforma Oficial B2B (.pdf) desde el Drawer del Carrito y modulo de Checkout.", margin + 4, sec5Y + 17.5);
  doc.text("• DESCARGA 2: Cotizacion Mayorista Multiem (.pdf) desde el Rol Vendedor en formato identico a Proforma.", margin + 4, sec5Y + 23);
  doc.text("• DESCARGA 3: Factura Electronica DTE (.pdf) descargable tras compra o desde el historial de Mi Perfil.", margin + 4, sec5Y + 28.5);
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

  const pdfOutput = doc.output("arraybuffer");
  return Buffer.from(pdfOutput);
}

try {
  const pdfBuffer = generateManualFlujo();
  const publicPath = path.join(__dirname, "..", "public", "Manual_Flujo_Completo_Sistema_Daisekai_B2B.pdf");
  const rootPath = path.join(__dirname, "..", "Manual_Flujo_Completo_Sistema_Daisekai_B2B.pdf");
  const brainPath = "C:\\Users\\kenji\\.gemini\\antigravity\\brain\\6745cd18-dca8-4a62-83b1-4e94fe48c996\\Manual_Flujo_Completo_Sistema_Daisekai_B2B.pdf";

  fs.writeFileSync(publicPath, pdfBuffer);
  fs.writeFileSync(rootPath, pdfBuffer);
  try {
    fs.writeFileSync(brainPath, pdfBuffer);
  } catch(e) {}
  console.log("PDF generated successfully! Size:", pdfBuffer.length);
} catch (err) {
  console.error("Error generating PDF:", err);
}
