const { jsPDF } = require("jspdf");
const autoTableImport = require("jspdf-autotable");
const autoTable = autoTableImport.default || autoTableImport;
const fs = require("fs");
const path = require("path");

function formatCLP(val) {
  return `$${Math.round(val).toLocaleString("es-CL")} CLP`;
}

function applyWatermark(docRef, watermarkText = "DOCUMENTO NO VALIDO") {
  const totalPages = docRef.getNumberOfPages ? docRef.getNumberOfPages() : docRef.internal.pages.length - 1;
  const pageWidth = docRef.internal.pageSize.getWidth();
  const pageHeight = docRef.internal.pageSize.getHeight();

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

function generateCotizacionSample() {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
  });

  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 14;
  const printableWidth = pageWidth - (margin * 2);

  doc.setFillColor(15, 23, 42);
  doc.rect(0, 0, pageWidth, 4, "F");

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
  doc.text("COTIZACION MAYORISTA", rightBoxX + (rightBoxW / 2), rightBoxY + 6, { align: "center" });

  doc.setFontSize(11);
  doc.setTextColor(30, 58, 138);
  doc.text("N° 6,781", rightBoxX + (rightBoxW / 2), rightBoxY + 12.5, { align: "center" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text("Fecha: 10/11/2026", rightBoxX + (rightBoxW / 2), rightBoxY + 18, { align: "center" });
  doc.text("Vendedor: EVANGELYN / V", rightBoxX + (rightBoxW / 2), rightBoxY + 22.5, { align: "center" });

  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.4);
  doc.line(margin, 36.5, pageWidth - margin, 36.5);

  const clientCardY = 40;
  const clientCardH = 34;

  doc.setFillColor(251, 249, 245);
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.4);
  doc.roundedRect(margin, clientCardY, printableWidth, clientCardH, 2, 2, "FD");

  const col1X = margin + 4;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text("DATOS DEL CLIENTE / SOLICITANTE:", col1X, clientCardY + 5.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  doc.text("Razon Social: HIPER PARTS CLAUDIA ALTAMIRANO HURTADO", col1X, clientCardY + 11.5);
  doc.text("Cod. Cliente / RUT: C 020-539", col1X, clientCardY + 17);
  doc.text("Direccion: FATSURI ENTRE SANTIVANES", col1X, clientCardY + 22.5);
  doc.text("Ciudad: CBBA (Cochabamba - Bolivia)", col1X, clientCardY + 28);

  const col2X = margin + 92;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(8.5);
  doc.setTextColor(15, 23, 42);
  doc.text("CONDICIONES COMERCIALES Y DESPACHO:", col2X, clientCardY + 5.5);

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(51, 65, 85);
  doc.text("Regimen: Venta Mayorista Regimen ZOFRI Iquique", col2X, clientCardY + 11.5);
  doc.text("Validez de la Oferta: 7 Dias Corridos", col2X, clientCardY + 17);
  doc.text("Glosa Doc: Repuestos y empaquetaduras para despacho internacional ZOFRI", col2X, clientCardY + 22.5);
  doc.text("Fono Contacto: (+591) 67561046", col2X, clientCardY + 28);

  const tableHead = [
    ["#", "CODIGO PRODUCTO", "COD. FACT.", "DESCRIPCION TECNICA", "CANT.", "U/M", "UNIT. US$", "TOTAL US$"]
  ];

  const tableBody = [
    ["1", "2727-0", "1004033TY0080", "AMORTIGUADOR OSAKANSAI KYB: 343039=553041 TRASERO GAS", "10.00", "UN", "$7.80", "$78.00"],
    ["2", "11115-37030-KJ-SL", "009B0033TY239", "EMP CULATA OSAKANSAI NK TY 2ZRFE 2009 COROLLA MATRIX", "20.00", "UN", "$4.50", "$90.00"],
    ["3", "13101-74100-I", "218CJ047TY279", "PISTON NEW IZUMI II STD NO ALFIN TY 3S-FE MOTOR", "1.00", "SET", "$38.33", "$38.33"]
  ];

  autoTable(doc, {
    startY: 78,
    head: tableHead,
    body: tableBody,
    theme: "grid",
    headStyles: {
      fillColor: [15, 23, 42],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      fontSize: 8,
      halign: "center",
      cellPadding: 3,
    },
    styles: {
      font: "helvetica",
      fontSize: 8,
      cellPadding: 2.8,
      textColor: [30, 41, 59],
      lineColor: [226, 232, 240],
      lineWidth: 0.2,
    },
    columnStyles: {
      0: { cellWidth: 8, halign: "center" },
      1: { cellWidth: 32, fontStyle: "bold" },
      2: { cellWidth: 26, fontStyle: "normal" },
      3: { cellWidth: "auto" },
      4: { cellWidth: 16, halign: "center", fontStyle: "bold" },
      5: { cellWidth: 12, halign: "center" },
      6: { cellWidth: 22, halign: "right" },
      7: { cellWidth: 24, halign: "right", fontStyle: "bold" },
    },
    margin: { left: margin, right: margin },
  });

  const lastTable = doc.lastAutoTable;
  let summaryY = lastTable ? lastTable.finalY + 6 : 140;

  const totalCardW = 80;
  const totalCardH = 22;
  const totalCardX = pageWidth - margin - totalCardW;

  doc.setFillColor(15, 23, 42);
  doc.roundedRect(totalCardX, summaryY, totalCardW, totalCardH, 2, 2, "F");

  doc.setFont("helvetica", "normal");
  doc.setFontSize(8);
  doc.setTextColor(203, 213, 225);
  doc.text("TOTAL A PAGAR (USD):", totalCardX + 5, summaryY + 8);

  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(255, 255, 255);
  doc.text("$206.33 US$", totalCardX + totalCardW - 5, summaryY + 16, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(7.5);
  doc.setTextColor(100, 116, 139);
  doc.text("Cantidad Total N° Productos: 31 un.", margin, summaryY + 8);
  doc.text("* Cotizacion emitida bajo regimen franco ZOFRI Iquique.", margin, summaryY + 14);
  doc.text("* Precios sujetos a confirmacion fisica en Galpon 7 y 8.", margin, summaryY + 19);

  doc.setFontSize(7);
  doc.setTextColor(148, 163, 184);
  doc.text(
    "Daisekai Limitada & Osakansai Group • Documento emitido bajo Sistema Multiem B2B • Iquique, Chile",
    pageWidth / 2,
    pageHeight - 8,
    { align: "center" }
  );

  applyWatermark(doc);
  return Buffer.from(doc.output("arraybuffer"));
}

try {
  const cotiBuffer = generateCotizacionSample();
  const publicCotiPath = path.join(__dirname, "..", "public", "Cotizacion_Multiem_6781_Elegante.pdf");
  const rootCotiPath = path.join(__dirname, "..", "Cotizacion_Multiem_6781_Elegante.pdf");
  fs.writeFileSync(publicCotiPath, cotiBuffer);
  fs.writeFileSync(rootCotiPath, cotiBuffer);
  console.log("Cotizacion PDF generated successfully!");
} catch (e) {
  console.error("Error generating cotizacion sample:", e);
}
