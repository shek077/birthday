
import { GoogleGenAI } from "@google/genai";

export async function generateBirthdayWish(name: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `The user wants to wish their best friend Haritha a happy birthday. 
      Use this EXACT message as the base but you can add 2-3 extra relevant emojis at the end: 
      "HAPPIEST BIRTHDAY TO MY DEAREST BEST FRIEND HARITHA, MAY U RECEIVE WHATEVR u wish in life. Thank you for being my safe place, my biggest supporter, and the one who makes life so much fun. I’m so lucky to have you in my life Wishing you endless happiness, love, and success — you truly deserve it all 💕"`,
      config: {
        temperature: 0.7,
      },
    });

    return response.text || `HAPPIEST BIRTHDAY TO MY DEAREST BEST FRIEND HARITHA! 💕✨`;
  } catch (error) {
    console.error("Error generating wish:", error);
    return `HAPPIEST BIRTHDAY TO MY DEAREST BEST FRIEND HARITHA, MAY U RECEIVE WHATEVR u wish in life. Thank you for being my safe place, my biggest supporter, and the one who makes life so much fun. 💕`;
  }
}
