import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY 
});
async function getRecipeFromGemini(ingredientsArr) {
  const ingredientsString = ingredientsArr.join(", ");

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    config: {
      systemInstruction: `
        You are a recipe assistant.
        Format responses in markdown.
      `
    },
    contents: `
      I have ${ingredientsString}.
      Suggest a recipe.
    `
  });

  return response.text;
}

export { getRecipeFromGemini };