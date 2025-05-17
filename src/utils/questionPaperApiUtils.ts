
interface BtlDistribution {
  [key: string]: number;
}

interface QuestionPaperRequest {
  subject: string;
  num_questions: number;
  percent_btl: BtlDistribution;
}

interface QuestionPaperResponse {
  questions: string[];
  success: boolean;
  error?: string;
}

// This is the API URL that should be used - hardcoded here to ensure it's used
const API_BASE_URL = "https://a9b5-2401-4900-33b6-d7b2-d46c-f7ae-6faf-9147.ngrok-free.app";

export async function generateQuestionPaper(
  subject: string,
  numQuestions: number,
  btlDistribution: BtlDistribution
): Promise<QuestionPaperResponse> {
  // Add timestamp to ensure we don't get a cached version
  const timestamp = Date.now();
  const url = `${API_BASE_URL}/generate_raw_questions?_t=${timestamp}`;
  
  const apiSubject = subject === "data-science" ? "ds" : subject === "computer-networks" ? "cn" : "dbms";
  
  const requestBody: QuestionPaperRequest = {
    subject: apiSubject,
    num_questions: numQuestions,
    percent_btl: btlDistribution
  };

  try {
    console.log(`Using API URL: ${url} at ${new Date().toISOString()}`);
    console.log("Request body:", JSON.stringify(requestBody));
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        "Pragma": "no-cache",
        "Expires": "0"
      },
      body: JSON.stringify(requestBody),
      // Prevent browser from using cached responses
      cache: "no-store"
    });

    console.log("API response status:", response.status);
    
    if (!response.ok) {
      throw new Error(`API returned status ${response.status}`);
    }

    const data = await response.json();
    console.log("API response data:", data);
    
    return { 
      questions: data.questions || [], 
      success: true 
    };
  } catch (error) {
    console.error("Error generating question paper:", error);
    return {
      questions: [],
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
}

// Export this function to test if the correct URL is being used
export function getApiBaseUrl() {
  return API_BASE_URL;
}
