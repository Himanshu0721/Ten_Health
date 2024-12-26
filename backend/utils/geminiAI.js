import GoogleGenerativeAI from "google-generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyAM1T6li4pgjil1q55wbC_UvYq-cbNJs2I");

export const generateAIContent = async (prompt, savedResponse) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(
      savedResponse
        ? `Previous context: ${JSON.stringify(
            savedResponse
          )}. New prompt: ${prompt}`
        : prompt
    );
    return result.response.text();
  } catch (error) {
    throw new Error(`Failed to get response from Gemini API: ${error.message}`);
  }
};
