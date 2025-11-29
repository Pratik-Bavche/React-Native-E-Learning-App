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
  // You can switch to "gemini-1.5-flash" if 2.0 gives errors
  model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
} catch (e) {
  console.log("❌ Model load error:", e);
}

// Export chat session for Topics (smaller limit is fine)
export const GenerateTopicsAIModel = model?.startChat({
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 4000, 
  },
  history: [],
});

// Export chat session for Courses (Increased to 8000 to prevent cutoff)
export const GenerateCourseAIModel = model?.startChat({
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 8000, 
  },
  history: [],
});