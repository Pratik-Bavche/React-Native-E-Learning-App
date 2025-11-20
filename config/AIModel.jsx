import { GoogleGenerativeAI } from "@google/generative-ai";
import Constants from "expo-constants";

// Correct way to access env in Expo
const apiKey = Constants.expoConfig.extra?.EXPO_PUBLIC_GEMINI_API_KEY;

if (!apiKey) {
  console.log("❌ Gemini API Key missing in app.json");
}

const genAI = new GoogleGenerativeAI(apiKey);

// Load the Gemini model
let model;
try {
 model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
//  model = genAI.getGenerativeModel({ model: "gemini-2.0-pro" });
} catch (e) {
  console.log("❌ Model load error:", e);
}

// Export chat session
export const GenerateTopicsAIModel = model?.startChat({
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 2048,
  },
  history: [],
});


export const GenerateCourseAIModel = model?.startChat({
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 2048,
  },
  history: [],
});
