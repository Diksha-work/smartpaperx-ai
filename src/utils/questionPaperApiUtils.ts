
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
  const url = "https://0ec2-2401-4900-8839-1ae3-18b8-ae45-eb28-b4c1.ngrok-free.app/generate_raw_questions";
  
  const apiSubject = subject === "data-science" ? "ds" : subject === "computer-networks" ? "cn" : "dbms";
  
  const requestBody: QuestionPaperRequest = {
    subject: apiSubject,
    num_questions: numQuestions,
    percent_btl: btlDistribution
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error(`API returned status ${response.status}`);
    }

    const data = await response.json();
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
