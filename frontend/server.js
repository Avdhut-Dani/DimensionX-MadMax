import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const { message, model } = req.body;

  const ollamaRes = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: model || "mistral",
      prompt: message,
      stream: true,
    }),
  });

  res.setHeader("Content-Type", "text/plain");

  for await (const chunk of ollamaRes.body) {
    res.write(chunk);
  }

  res.end();
});

app.listen(3001, () =>
  console.log("✅ Ollama bridge running on http://localhost:3001")
);
