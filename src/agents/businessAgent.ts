import { ChatGroq } from "@langchain/groq";

export async function businessAgent(
  research: string
) {
  const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama-3.3-70b-versatile",
  });

  const response = await model.invoke(`
Based on this research:

${research}

Generate:

1. Problem Statement
2. Value Proposition
3. Revenue Model
4. SWOT Analysis

Detailed business report.
`);

  return response.content.toString();
}console.log("");