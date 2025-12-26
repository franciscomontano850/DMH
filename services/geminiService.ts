
import { GoogleGenAI } from "@google/genai";
import { SearchResult } from "../types";

export const searchHvacQuotes = async (query: string, focusCompany: boolean = true): Promise<SearchResult> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const companyContext = focusCompany 
    ? "Context: Searching for solutions compatible with Anthony & Son HVAC (anthonyandsonhac.com). Prioritize brands like Carrier, Trane, Mitsubishi Electric, and Rheem."
    : "Context: Open market search for any HVAC manufacturers and suppliers.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `${companyContext} 
                 User Request: ${query}. 
                 Please provide:
                 1. A detailed list of current market prices for these specific models.
                 2. Technical specifications (SEER rating, tonnage, voltage).
                 3. Supplier reliability and estimated lead times.
                 Format the output for a professional quotation assistant named Dayana (DMH).`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "No results found.";
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    const sources = chunks
      .filter(chunk => chunk.web)
      .map(chunk => ({
        title: chunk.web?.title || 'Source',
        uri: chunk.web?.uri || '#'
      }));

    return {
      text,
      sources
    };
  } catch (error) {
    console.error("Error searching HVAC quotes:", error);
    throw error;
  }
};
