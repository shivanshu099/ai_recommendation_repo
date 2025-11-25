import { GoogleGenAI } from "@google/genai";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;


const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});



export async function getAIRecommendations(userInput, products) {
  try {
    // Convert products array to JSON string for prompt
    const productsJSON = JSON.stringify(products);

    // Use backticks for template literal
    const prompt = `Here is user input: ${userInput} and here is JSON of products: ${productsJSON}. You are a product recommender. Reply ONLY with a JSON array of product IDs.`;

    // Generate content
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    // Check response structure (adjust if Gemini API structure differs)
    const textOutput = response.text || response.output?.[0]?.content?.[0]?.text;

    if (!textOutput) {
      throw new Error("No response text from AI model.");
    }

    console.log("AI Response:", textOutput);

    // Parse JSON safely
    const recommendedProductIds = JSON.parse(textOutput);
    return recommendedProductIds;
  } catch (error) {
    console.error("Error generating AI recommendations:", error);
    return [];
  }
}













