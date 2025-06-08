// ai.js
import express from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config(); // load GOOGLE_API_KEY

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost", // or whatever host/port your XAMPP site is on
  })
);

// POST /api/ai/player-summary
app.post("/ai", async (req, res) => {
  try {
    const { pdga_number, period = "last 12 months" } = req.body;

    // 1) pull that player’s stats however you like (MySQL / PHP / etc)
    // e.g. const stats = await fetchPlayerStats(pdga_number, period);

    // 2) build a prompt
    // const prompt = `
    //   Summarize Player #${pdga_number}'s disc-golf performance over the ${period}.
    //   Here are their key stats:
    //   • Events: ${stats.total_events}
    //   • Wins:   ${stats.wins}
    //   • Avg Rating: ${stats.average_rating}
    //   • Top‐3 Metrics: ${stats.top_metrics
    //     .map((m) => `${m.abbreviation} at ${m.value}%`)
    //     .join(", ")}
    //   Produce a 2–3 sentence highlight.
    // `;
    // const prompt = `tell me a funny story using number ${pdga_number} in the ${period}`;
    const prompt = "What was my last request to you?"

    // 3) call the Generative AI API
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });

    return res.json({ summary: response.text.trim() });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
});

const port = process.env.AI_PORT || 4000;
app.listen(port, () => console.log(`AI proxy listening on ${port}`));
