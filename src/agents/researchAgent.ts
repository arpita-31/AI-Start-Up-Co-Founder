import { ChatGroq } from "@langchain/groq";

export async function researchAgent(
  idea: string,
  market: string
) {
  const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama-3.3-70b-versatile",
  });

  const response = await model.invoke(`
Startup Idea:
${idea}

Target Market:
${market}

Generate:

1. Market Analysis
2. Competitors
3. Industry Trends
4. Opportunities

Detailed report.
`);

  return response.content.toString();
}