import { ChatGroq } from "@langchain/groq";

export async function pitchAgent(
  business: string,
  product: string
) {
  const model = new ChatGroq({
    apiKey: process.env.GROQ_API_KEY,
    model: "llama-3.3-70b-versatile",
  });

  const response = await model.invoke(`
Business:

${business}

Product:

${product}

Create an Investor Pitch Deck.

VERY IMPORTANT:

Separate every slide using exactly:

---

Format:

SLIDE: Problem

Title: Problem

- Point
- Point
- Point

---

SLIDE: Solution

Title: Solution

- Point
- Point
- Point

---

SLIDE: Market Opportunity

Title: Market Opportunity

- Point
- Point
- Point

---

SLIDE: Business Model

Title: Business Model

- Point
- Point
- Point

---

SLIDE: MVP

Title: MVP

- Point
- Point
- Point

---

SLIDE: Team

Title: Team

- Point
- Point
- Point

---

SLIDE: Funding Ask

Title: Funding Ask

- Point
- Point
- Point

Rules:

- Output plain text only
- No markdown
- No **
- No #
- No image instructions
- No Slide 1, Slide 2, Slide 3
- Use exactly "SLIDE:"
- Use exactly "---" between slides
`);

  const content = response.content
    .toString()
    .replace(/\*\*/g, "")
    .replace(/#/g, "")
    .trim();

  console.log("PITCH OUTPUT:");
  console.log(content);

  return response.content.toString();
}