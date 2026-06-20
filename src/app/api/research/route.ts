import { NextResponse } from "next/server";

import { researchAgent } from "../../../agents/researchAgent";
import { businessAgent } from "../../../agents/businessAgent";
import { productAgent } from "../../../agents/productAgent";
import { pitchAgent } from "../../../agents/pitchAgent";

import { generateBusinessPlan } from "../../../lib/generateBusinessPlan";
import { generateSWOTReport } from "../../../lib/generateSWOTReport";
import { generateRoadmap } from "../../../lib/generateRoadmap";
import { generatePitchDeck } from "../../../lib/generatePitchDeck";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { idea, market } = body;

    console.log("=================================");
    console.log("STARTUP IDEA:", idea);
    console.log("TARGET MARKET:", market);
    console.log("=================================");

    // Research Agent
    const research = await researchAgent(
      idea,
      market
    );

    console.log("========== RESEARCH ==========");
    console.log(research);

    // Business Agent
    const businessRaw = await businessAgent(
  String(research)
);

const business = String(businessRaw)
  .replace(/\*\*/g, "")
  .replace(/\*/g, "")
  .replace(/#/g, "")
  .trim();

    console.log("========== BUSINESS ==========");
    console.log(business);

    // Product Agent
  const productRaw = await productAgent(
  String(business)
);

const product = String(productRaw)
  .replace(/\*\*/g, "")
  .replace(/\*/g, "")
  .replace(/#/g, "")
  .trim();

    console.log("========== PRODUCT ==========");
    console.log(product);

    // Pitch Agent
    const pitchRaw = await pitchAgent(
  String(business),
  String(product)
);

const pitch = String(pitchRaw)
  .replace(/\*\*/g, "")
  .replace(/\*/g, "")
  .replace(/#/g, "")
  .trim();

    console.log("========== PITCH ==========");
    console.log(pitch);
    console.log("===========================");

    // Generate PDFs
    const businessPlanPdf =
      await generateBusinessPlan(
        String(business)
      );

    const swotPdf =
      await generateSWOTReport(
        String(business)
      );

    const roadmapPdf =
      await generateRoadmap(
        String(product)
      );

    // Generate PPT
    const pitchDeck =
      await generatePitchDeck(
        String(pitch)
      );

    console.log("========== FILES ==========");
    console.log("Business Plan:", businessPlanPdf);
    console.log("SWOT Report:", swotPdf);
    console.log("Roadmap:", roadmapPdf);
    console.log("Pitch Deck:", pitchDeck);

    return NextResponse.json({
      success: true,

      research,
      business,
      product,
      pitch,

      businessPlanPdf,
      swotPdf,
      roadmapPdf,
      pitchDeck,
    });

  } catch (error) {
    console.error("ROUTE ERROR:");
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Agent Execution Error",
        error:
          error instanceof Error
            ? error.message
            : "Unknown Error",
      },
      {
        status: 500,
      }
    );
  }
}