
// This file has been redesigned to use OpenRouter instead of AI Horde/LangChain

// Define feature types
type FeatureType = "content" | "question paper" | "materials" | "notes" | "flashcards" | "image";

/**
 * Generate content using OpenRouter API with Deepseek Prover model
 */
export const generateWithLangChain = async (
  feature: FeatureType,
  userPrompt: string,
  subject?: string
): Promise<string> => {
  try {
    const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
    
    if (!API_KEY) {
      throw new Error("VITE_OPENROUTER_API_KEY is not defined");
    }
    
    // Create a prompt based on the feature type
    const formattedPrompt = formatPromptForFeature(feature, userPrompt, subject);
    
    // OpenRouter API request
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`,
        "HTTP-Referer": window.location.origin,
        "X-Title": "EduGenius AI"
      },
      body: JSON.stringify({
        model: "deepseek/deepseek-prover-v2:free",
        messages: [
          { role: "user", content: formattedPrompt }
        ]
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorText}`);
    }

    const data = await response.json();
    
    // Extract the response content from the OpenRouter API response
    if (data.choices && data.choices.length > 0 && data.choices[0].message) {
      return data.choices[0].message.content || "No content was generated.";
    } else {
      return "Unexpected response format from the AI model.";
    }
  } catch (error) {
    console.error("Error in OpenRouter generation:", error);
    throw error;
  }
};

/**
 * Format the prompt based on the feature type
 */
const formatPromptForFeature = (feature: FeatureType, userPrompt: string, subject?: string): string => {
  // Add subject context if available
  let subjectContext = "";
  if (subject) {
    switch (subject) {
      case "data-science":
        subjectContext = "You are a Data Science expert. ";
        break;
      case "dbms":
        subjectContext = "You are a Database Management Systems expert. ";
        break;
      case "computer-networks":
        subjectContext = "You are a Computer Networks expert. ";
        break;
      default:
        subjectContext = "";
    }
  }

  // Format prompt based on feature type
  switch (feature) {
    case "content":
      return `${subjectContext}Generate structured educational content on the following: ${userPrompt}. Include headings, explanations, examples, and key points.`;
    
    case "question paper":
      return `${subjectContext}Generate a question paper with a mix of multiple choice, true/false, and short answer questions on: ${userPrompt}.`;
    
    case "materials":
      return `${subjectContext}Generate a comprehensive learning roadmap or materials list for: ${userPrompt}. Include resources, steps, and recommendations.`;
    
    case "notes":
      return `${subjectContext}Generate concise, organized notes on: ${userPrompt}. Include key concepts, definitions, and important information.`;
    
    case "flashcards":
      return `${subjectContext}Generate flashcards on: ${userPrompt}. Format as Question: [question] and Answer: [answer] pairs.`;
    
    case "image":
      return `${subjectContext}Create a detailed description for an educational image about: ${userPrompt}. The description should be detailed enough for image generation.`;
    
    default:
      return `${subjectContext}${userPrompt}`;
  }
};

// These functions are kept for backward compatibility but are now empty
export const createGenerationChain = () => {
  console.warn("createGenerationChain is deprecated, using OpenRouter instead");
  return null;
};
