
import { PromptTemplate } from "@langchain/core/prompts";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenerativeAIEmbeddings } from "@langchain/google-genai";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { RunnableSequence } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";

// Initialize the Google Generative AI model
const getGoogleAI = () => {
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!API_KEY) {
    throw new Error("VITE_GEMINI_API_KEY is not defined in environment variables");
  }
  
  return new ChatGoogleGenerativeAI({
    apiKey: API_KEY,
    modelName: "gemini-1.5-pro",
    maxOutputTokens: 2048,
    temperature: 0.7,
    topK: 40,
    topP: 0.95,
  });
};

// Define subject specific context
const subjectContext = {
  "data-science": `You are a Data Science expert specialized in creating questions about statistics, machine learning, data analysis, visualization, and Python programming for data science.
  Focus on concepts like regression, classification, clustering, dimensionality reduction, neural networks, feature engineering, and data preprocessing.`,
  
  "dbms": `You are a Database Management Systems expert specialized in creating questions about SQL, database design, normalization, transactions, concurrency control, and recovery.
  Focus on concepts like ER modeling, relational algebra, SQL queries, stored procedures, triggers, and database optimization.`,
  
  "computer-networks": `You are a Computer Networks expert specialized in creating questions about network protocols, layers, routing, switching, addressing, and security.
  Focus on concepts like TCP/IP, OSI model, IP addressing, subnetting, routing protocols, and network security.`
};

// Define prompt templates for each feature with formatting guidelines
const promptTemplates = {
  content: PromptTemplate.fromTemplate(
    `Generate structured educational content based on the following prompt. 
    Include headings, explanations, examples, and key points.
    
    {subjectContextPrompt}
    
    IMPORTANT FORMATTING GUIDELINES:
    - DO NOT use markdown syntax (no **, *, _, or backticks)
    - Use plain text with clear section headings
    - Use simple bullet points or numbered lists where needed
    - Add spacing between sections for readability
    - If code examples are needed, present them as plain text (without syntax highlighting markers)
    
    PROMPT: {userPrompt}`
  ),
  
  "question paper": PromptTemplate.fromTemplate(
    `Generate a question paper based on the following prompt. 
    Include a mix of multiple choice, true/false, and short answer questions.
    
    {subjectContextPrompt}
    
    IMPORTANT FORMATTING GUIDELINES:
    - DO NOT use markdown syntax (no **, *, _, or backticks)
    - Use plain text with clear section headings
    - Use simple bullet points or numbered lists for questions
    - Add spacing between questions and sections
    - If code examples are needed, present them as plain text (without syntax highlighting markers)
    
    PROMPT: {userPrompt}`
  ),
  
  materials: PromptTemplate.fromTemplate(
    `Generate a comprehensive learning roadmap or materials list based on the following prompt. 
    Include resources, steps, and recommendations.
    
    {subjectContextPrompt}
    
    IMPORTANT FORMATTING GUIDELINES:
    - DO NOT use markdown syntax (no **, *, _, or backticks)
    - Use plain text with clear section headings
    - Use simple bullet points or numbered lists where needed
    - Add spacing between sections for readability
    - If code examples are needed, present them as plain text (without syntax highlighting markers)
    
    PROMPT: {userPrompt}`
  ),
  
  notes: PromptTemplate.fromTemplate(
    `Generate concise, organized notes based on the following prompt. 
    Include key concepts, definitions, and important information.
    
    {subjectContextPrompt}
    
    IMPORTANT FORMATTING GUIDELINES:
    - DO NOT use markdown syntax (no **, *, _, or backticks)
    - Use plain text with clear section headings
    - Use simple bullet points or numbered lists for key points
    - Add spacing between sections for readability
    - If code examples are needed, present them as plain text (without syntax highlighting markers)
    
    PROMPT: {userPrompt}`
  ),
  
  flashcards: PromptTemplate.fromTemplate(
    `Generate flashcards based on the following prompt. 
    Format as Question: [question] and Answer: [answer] pairs. 
    Make them concise and focused on key information.
    
    {subjectContextPrompt}
    
    IMPORTANT FORMATTING GUIDELINES:
    - DO NOT use markdown syntax (no **, *, _, or backticks)
    - Use plain text with clear labeling for questions and answers
    - Add spacing between each flashcard for readability
    - If code examples are needed, present them as plain text (without syntax highlighting markers)
    
    PROMPT: {userPrompt}`
  ),
  
  image: PromptTemplate.fromTemplate(
    `You are an educational image generator. Generate a detailed description for an image based on the following prompt.
    The description should be detailed enough that it could be used with an image generation AI.
    
    {subjectContextPrompt}
    
    IMPORTANT FORMATTING GUIDELINES:
    - Focus on describing visual elements clearly
    - Include important details like layout, objects, text, colors, etc.
    - The image will be used in an educational context, so be appropriate and accurate
    
    PROMPT: {userPrompt}
    
    Begin your response with "IMAGE DESCRIPTION:" followed by the detailed description.`
  ),
};

// Create a chain for generating content with Gemini
export const createGenerationChain = (feature: keyof typeof promptTemplates, subjectCtx?: string) => {
  const model = getGoogleAI();
  
  // Create the chain
  const chain = RunnableSequence.from([
    // Format the prompt using the appropriate template
    promptTemplates[feature],
    // Generate content using the model
    model,
    // Parse the output to a string
    new StringOutputParser(),
  ]);
  
  return chain;
};

// Execute the chain with the user's prompt
export const generateWithLangChain = async (
  feature: keyof typeof promptTemplates, 
  userPrompt: string,
  subject?: string
): Promise<string> => {
  try {
    const chain = createGenerationChain(feature, subject);
    
    // Add subject context if available
    let subjectContextPrompt = "";
    
    if (subject && subjectContext[subject as keyof typeof subjectContext]) {
      subjectContextPrompt = subjectContext[subject as keyof typeof subjectContext];
    }
    
    const result = await chain.invoke({ 
      userPrompt,
      subjectContextPrompt
    });
    
    return result;
  } catch (error) {
    console.error("Error in LangChain generation:", error);
    throw error;
  }
};
