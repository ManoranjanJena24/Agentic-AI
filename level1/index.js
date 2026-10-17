import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { GoogleGenAI } from "@google/genai";

const app = express();

const port = process.env.PORT || 5000;
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

app.use(express.json());

// ==========================================================================

// const main = async () => {
//   const response = await ai.interactions.create({
//     model: "gemini-3.8-flash",
//     input: "Explain how AI works in a few words",
//   });

//   console.log(response.output_text);
// };

// main();

// ====================================================================================

// async function main(){
//     const stream = await ai.interactions.create({
//       model: "gemini-3.8-flash",
//       input: "Explain how AI works",
//       stream: true,
//     });

//     for await (const event of stream) {
//       console.log(event);
//     }
// }

// main()

// ========================================================================================

app.post("/chat", async (req, res) => {
  const { prompt } = req.body;
  const interaction = await ai.interactions.create({
    model: "gemini-3.8-flash",
    input: prompt,
  });
  return res.json(interaction.output_text);
});

app.listen(port, () => {
  console.log("Server started at ", port);
});
