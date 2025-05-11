
// This file has been completely redesigned to use AI Horde instead of LangChain/Gemini

// Define feature types
type FeatureType = "content" | "question paper" | "materials" | "notes" | "flashcards" | "image";

/**
 * Generate content using AI Horde API
 * Note: AI Horde is primarily for image generation, but we're adapting it for text
 * by using its worker infrastructure to process text-based prompts
 */
export const generateWithLangChain = async (
  feature: FeatureType,
  userPrompt: string,
  subject?: string
): Promise<string> => {
  try {
    const API_KEY = import.meta.env.VITE_HORDE_API_KEY;
    
    if (!API_KEY) {
      throw new Error("VITE_HORDE_API_KEY is not defined");
    }
    
    // Create a prompt based on the feature type
    const formattedPrompt = formatPromptForFeature(feature, userPrompt, subject);
    
    // For AI Horde text generation, we'll use their text generation endpoint
    const response = await fetch("https://stablehorde.net/api/v2/generate/text/async", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": API_KEY
      },
      body: JSON.stringify({
        prompt: formattedPrompt,
        params: {
          max_length: 512,
          max_context_length: 1024,
          n: 1,
          use_story: false,
          use_memory: false,
          use_authors_note: false,
          use_world_info: false,
          singleline: false
        },
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorText}`);
    }

    const data = await response.json();
    const generationId = data.id;
    
    // Poll for the generation result
    const result = await checkTextGenerationStatus(generationId, API_KEY);
    return result;
  } catch (error) {
    console.error("Error in AI Horde generation:", error);
    throw error;
  }
};

/**
 * Helper function to check the status of a text generation request
 */
const checkTextGenerationStatus = async (id: string, apiKey: string): Promise<string> => {
  try {
    let isComplete = false;
    let result = "";
    
    while (!isComplete) {
      // Wait for 2 seconds between checks
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const statusResponse = await fetch(`https://stablehorde.net/api/v2/generate/text/status/${id}`);
      if (!statusResponse.ok) {
        throw new Error(`HTTP error! Status: ${statusResponse.status}`);
      }
      
      const statusData = await statusResponse.json();
      
      // Check if the generation is done
      if (statusData.done) {
        isComplete = true;
        result = statusData.generations[0].text;
      }
    }
    
    return result || "AI Horde couldn't generate a response. Please try again.";
  } catch (err) {
    return `Error generating content: ${err instanceof Error ? err.message : "Unknown error"}`;
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
  console.warn("createGenerationChain is deprecated, using AI Horde instead");
  return null;
};
