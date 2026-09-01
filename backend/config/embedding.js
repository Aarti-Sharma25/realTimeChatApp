export const generateEmbedding = async (text) => {
  if (!text || text.trim().length === 0) return null;

  try {
    let response = await fetch(
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent?key=${process.env.GEMINI_API_KEY}`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      content: { parts: [{ text }] }
    })
  }
);

    let data = await response.json();

    if (!response.ok || !data.embedding) {
      console.log("Embedding API error:", JSON.stringify(data));
      return null;
    }

    return data.embedding.values; // yeh numbers ka array hai
  } catch (error) {
    console.log("generateEmbedding error:", error.message);
    return null;
  }
}