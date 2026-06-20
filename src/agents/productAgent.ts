import { ChatGroq } from "@langchain/groq";

export async function productAgent(
  business: string
) {
  const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama-3.3-70b-versatile",
  });

  const response = await model.invoke(`
Based on:

${business}

Generate:

1. MVP Features
2. Product Roadmap
3. Timeline
4. Team Structure

Detailed roadmap.
`);

  return response.content.toString();
}