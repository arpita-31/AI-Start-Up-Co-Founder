import pptxgen from "pptxgenjs";
import path from "path";

export async function generatePitchDeck(
  content: string
) {
  const pptx = new pptxgen();

  pptx.layout = "LAYOUT_WIDE";
  pptx.author = "CoFounder AI";
  pptx.company = "CoFounder AI";
  pptx.subject = "Investor Pitch Deck";
  pptx.title = "Investor Pitch Deck";

  // Clean AI output
  content = content
    .replace(/\*\*/g, "")
    .replace(/#/g, "")
    .replace(/`/g, "")
    .replace(/\r/g, "")
    .trim();

  console.log("PITCH CONTENT:");
  console.log(content);

  const sections = content
    .split("---")
    .map((s) => s.trim())
    .filter((s) => s.length > 0);

  for (const section of sections) {
    const lines = section
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    if (lines.length === 0) continue;

    const slide = pptx.addSlide();

    slide.background = {
      color: "FFFFFF",
    };

    let slideTitle = "Slide";

    const slideLine = lines.find((line) =>
      line.startsWith("SLIDE:")
    );

    if (slideLine) {
      slideTitle = slideLine
        .replace("SLIDE:", "")
        .trim();
    }

    slide.addText(slideTitle, {
      x: 0.5,
      y: 0.3,
      w: 10,
      h: 0.5,
      fontSize: 24,
      bold: true,
      color: "1E293B",
    });

    let currentY = 1.0;

    const titleLine = lines.find((line) =>
      line.startsWith("Title:")
    );

    if (titleLine) {
      slide.addText(
        titleLine.replace("Title:", "").trim(),
        {
          x: 0.6,
          y: currentY,
          w: 11,
          h: 0.5,
          fontSize: 18,
          bold: true,
          color: "2563EB",
        }
      );

      currentY += 0.7;
    }

    const bulletLines = lines.filter(
      (line) =>
        line.startsWith("-") &&
        !line.startsWith("---")
    );

    if (bulletLines.length > 0) {
      const bullets = bulletLines
        .map((item) => ({
          text: item.replace("-", "").trim(),
          options: { bullet: { indent: 18 } },
        }));

      slide.addText(bullets, {
        x: 0.8,
        y: currentY,
        w: 11,
        h: 4,
        fontSize: 16,
        color: "000000",
        breakLine: true,
      });
    }
  }

  const filePath = path.join(
    process.cwd(),
    "public",
    "PitchDeck.pptx"
  );

  await pptx.writeFile({
    fileName: filePath,
  });

  return "/PitchDeck.pptx";
}