import { PDFDocument, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";

export async function generateBusinessPlan(content: string) {
  content = content
  .replace(/₹/g,"Rs.")
  .replace(/\*\*/g,"")
  .replace(/\*/g,"")
  .replace(/#/g,"")
  .replace(/[^\x00-\x7F]/g,"");
  // content = content
  //   .replace(/₹/g, "Rs.")
  //   .replace(/[^\x00-\x7F]/g, "");

  const pdfDoc = await PDFDocument.create();

  const font = await pdfDoc.embedFont(
    StandardFonts.Helvetica
  );

  let page = pdfDoc.addPage([595, 842]);

  let y = 800;
  const lineHeight = 15;

  const lines = content.split("\n");

  for (const line of lines) {
    if (y < 50) {
      page = pdfDoc.addPage([595, 842]);
      y = 800;
    }

    page.drawText(line.substring(0, 120), {
      x: 30,
      y,
      size: 10,
      font,
    });

    y -= lineHeight;
  }

  const pdfBytes = await pdfDoc.save();

  fs.writeFileSync(
    path.join(
      process.cwd(),
      "public",
      "BusinessPlan.pdf"
    ),
    pdfBytes
  );

  return "/BusinessPlan.pdf";
}