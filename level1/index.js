import express from "express"
import dotenv from "dotenv"
dotenv.config()
import { GoogleGenAI } from "@google/genai";

const app = express()

const port  =process.env.PORT || 5000
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});



// const main = async () => {
//   const response = await ai.interactions.create({
//     model: "gemini-3.8-flash",
//     input: "Explain how AI works in a few words",
//   });

//   console.log(response.output_text);
// };

// main();


async function main(){
    const stream = await ai.interactions.create({
      model: "gemini-3.8-flash",
      input: "Explain how AI works",
      stream: true,
    });

    for await (const event of stream) {
      console.log(event);
    }
}

main()

app.listen(port ,()=>{
    console.log("Server started at ", port)
})