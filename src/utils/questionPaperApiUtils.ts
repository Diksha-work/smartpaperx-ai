
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

export async function generateQuestionPaper(
  subject: string,
  numQuestions: number,
  btlDistribution: BtlDistribution
): Promise<QuestionPaperResponse> {
  const url = "https://a9b5-2401-4900-33b6-d7b2-d46c-f7ae-6faf-9147.ngrok-free.app/generate_raw_questions";
  
  const apiSubject = subject === "data-science" ? "ds" : subject === "computer-networks" ? "cn" : "dbms";
  
  const requestBody: QuestionPaperRequest = {
    subject: apiSubject,
    num_questions: numQuestions,
    percent_btl: btlDistribution
  };

  try {
    console.log("Sending request to API:", url);
    console.log("Request body:", JSON.stringify(requestBody));
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
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
