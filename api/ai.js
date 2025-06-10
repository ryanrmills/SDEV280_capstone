// ai.js
import express from "express";
import { GoogleGenAI, createUserContent, createPartFromUri } from "@google/genai";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GOOGLE_API_KEY });
const app = express();
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost",
  })
);


let aIcontext = '';

app.post("/ai-context", async (req, res) => {
  try {
    const { context } = req.body;
    // console.log("Context" + context);
    aIcontext = "You are a disc golf analytics expert named 'Birdie'. If questions and requests do not relate to disc golf player performance and disc golf analytics, kindly apologize and decline to answer. Be concise and answer a question in 50 words or less, if you can." + context;
    console.log(aIcontext);
  } catch (e){
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
})


app.post("/ai", async (req, res) => {
  try {
    const histories = [];
    console.log(req.body);
    const { prompt } = req.body;

    const modelName = "gemini-2.0-flash";
    
    const chat = ai.chats.create({
      model: modelName,
      history: histories,
      config: {
        systemInstruction: aIcontext
      }
    })

    const response1 = await chat.sendMessage(
      {
        message: prompt
      },
      {
        maxOutputTokens: 200
      }
    )

    let userJsonRes = {role:"user", parts:[{text: prompt}]};
    histories.push(userJsonRes);

    let mlJsonRes = {role:"model", parts:[{text: response1.candidates[0].content.parts[0].text}]};
    histories.push(mlJsonRes);

    // console.log(histories);

    return res.json({ summary: response1.text.trim() });
    
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: e.message });
  }
});

const port = process.env.AI_PORT || 4000;
app.listen(port, () => console.log(`AI proxy listening on ${port}`));
