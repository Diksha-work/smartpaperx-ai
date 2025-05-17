import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { MermaidDiagramGenerator } from "@/components/ai/MermaidDiagramGenerator";
import { DiagramCodeGenerator } from "@/components/ai/DiagramCodeGenerator";
import { generateQuestionPaper, getApiBaseUrl } from "@/utils/questionPaperApiUtils";
import { generateWithLangChain } from "@/utils/langchainUtils";
import { generatePDF } from "@/utils/pdfUtils";
import { FileText, Download, RefreshCw } from "lucide-react";

const subjectInfo = {
  "data-science": {
    title: "Data Science Question Paper Generator",
    description: "Create customized Data Science question papers with varying difficulty levels.",
    placeholder: "Describe the question paper you need (e.g., '10 questions about statistical analysis with 30% easy, 40% medium, and 30% difficult questions')"
  },
  "dbms": {
    title: "Database Management Systems Question Paper Generator",
    description: "Create customized DBMS question papers with varying difficulty levels.",
    placeholder: "Describe the question paper you need (e.g., '10 questions about SQL queries with 30% easy, 40% medium, and 30% difficult questions')"
  },
  "computer-networks": {
    title: "Computer Networks Question Paper Generator",
    description: "Create customized Computer Networks question papers with varying difficulty levels.",
    placeholder: "Describe the question paper you need (e.g., '10 questions about network protocols with 30% easy, 40% medium, and 30% difficult questions')"
  }
};

interface BtlLevel {
  level: number;
  percentage: number;
}

const QuestionPaperGenerator = () => {
  const { subject = "" } = useParams<{ subject: string }>();
  const { toast } = useToast();
  const [subjectData, setSubjectData] = useState(subjectInfo["data-science"]);
  
  // State for the form inputs
  const [prompt, setPrompt] = useState("");
  const [numQuestions, setNumQuestions] = useState(10);
  const [btlLevels, setBtlLevels] = useState<BtlLevel[]>([
    { level: 1, percentage: 20 },
    { level: 2, percentage: 30 },
    { level: 3, percentage: 30 },
    { level: 4, percentage: 20 }
  ]);
  
  // State for the question paper generation
  const [isLoading, setIsLoading] = useState(false);
  const [questions, setQuestions] = useState<string[]>([]);
  const [isLocalApi, setIsLocalApi] = useState(false);
  
  // State for diagram generation
  const [generatedCode, setGeneratedCode] = useState<string>("");
  // Add state to track rerenders for cache busting
  const [refreshCounter, setRefreshCounter] = useState(0);
  
  // Force refresh to ensure updated API URL is used
  const forceRefresh = () => {
    console.log("Force refreshing component to use updated API URL");
    setRefreshCounter(prev => prev + 1);
    setIsLoading(false);
    setQuestions([]);
    // Show the current API URL
    toast({
      title: "Using API URL",
      description: getApiBaseUrl(),
    });
  };
  
  useEffect(() => {
    if (subject && subjectInfo[subject as keyof typeof subjectInfo]) {
      setSubjectData(subjectInfo[subject as keyof typeof subjectInfo]);
      setIsLocalApi(["data-science", "dbms", "computer-networks"].includes(subject));
      setQuestions([]);
    } else {
      toast({
        title: "Invalid subject",
        description: "The selected subject is not valid. Redirecting to Data Science.",
        variant: "destructive",
      });
      setSubjectData(subjectInfo["data-science"]);
      setIsLocalApi(true);
    }
  }, [subject, toast]);

  const handleBtlChange = (level: number, value: number) => {
    const newLevels = btlLevels.map(btl => 
      btl.level === level ? { ...btl, percentage: value } : btl
    );
    setBtlLevels(newLevels);
  };

  const generateQuestionPaperUsingLocalApi = async () => {
    setIsLoading(true);
    
    try {
      console.log(`Generating question paper with API URL: ${getApiBaseUrl()} (refresh count: ${refreshCounter})`);
      // Convert BtlLevels array to the format expected by the API
      const btlDistribution: {[key: string]: number} = {};
      btlLevels.forEach(btl => {
        btlDistribution[btl.level.toString()] = btl.percentage;
      });
      
      console.log("Subject:", subject);
      console.log("Number of questions:", numQuestions);
      console.log("BTL distribution:", btlDistribution);
      
      const result = await generateQuestionPaper(subject, numQuestions, btlDistribution);
      
      if (result.success && result.questions.length > 0) {
        setQuestions(result.questions);
        toast({
          title: "Question Paper Generated",
          description: `Generated ${result.questions.length} questions successfully.`,
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Unable to generate question paper. Please try again later.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Unable to generate question paper. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const generateQuestionPaperUsingAI = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "You need to provide some input for the AI to generate content.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setQuestions([]);

    try {
      const generatedContent = await generateWithLangChain("question paper", prompt, subject);
      
      // Split the content into an array of questions
      const questionsList = generatedContent
        .split(/\d+\.\s+/)
        .filter(q => q.trim().length > 0)
        .map(q => q.trim());
      
      setQuestions(questionsList);
    } catch (error) {
      console.error("Error generating content:", error);
      toast({
        title: "Error generating content",
        description: `${error instanceof Error ? error.message : "There was an error generating content. Please try again."}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerate = () => {
    if (isLocalApi) {
      generateQuestionPaperUsingLocalApi();
    } else {
      generateQuestionPaperUsingAI();
    }
  };

  const downloadAsPdf = async () => {
    if (questions.length === 0) {
      toast({
        title: "No content to download",
        description: "Please generate a question paper first.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Format the questions for PDF
      const questionsHtml = questions.map((q, i) => `<p><strong>${i+1}.</strong> ${q}</p>`).join('');
      const content = `
        <h1>${subjectData.title}</h1>
        <p>Number of Questions: ${questions.length}</p>
        <hr />
        <div>${questionsHtml}</div>
      `;

      // Generate filename
      const today = new Date();
      const dateStr = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
      const filename = `QuestionPaper_${subject}_${dateStr}`;

      await generatePDF(content, subjectData.title, filename);

      toast({
        title: "Download ready",
        description: `${filename}.pdf has been downloaded successfully.`,
      });
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast({
        title: "Error downloading PDF",
        description: "There was an error generating the PDF. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCodeGenerated = (code: string) => {
    setGeneratedCode(code);
  };
  
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">{subjectData.title}</h1>
        <p className="text-muted-foreground mb-6">{subjectData.description}</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Configure Questions</h2>
              <Button 
                variant="outline" 
                size="sm"
                onClick={forceRefresh}
                title="Refresh to use the latest API URL"
              >
                <RefreshCw className="h-4 w-4 mr-1" /> Refresh API
              </Button>
            </div>
            
            {isLocalApi ? (
              <>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="numQuestions">Number of Questions</Label>
                    <Input 
                      id="numQuestions" 
                      type="number" 
                      min="1" 
                      max="50"
                      value={numQuestions}
                      onChange={(e) => setNumQuestions(parseInt(e.target.value) || 10)}
                      className="mt-1"
                    />
                  </div>
                  
                  <div className="space-y-6">
                    <h3 className="text-lg font-medium">Bloom's Taxonomy Level Distribution</h3>
                    {btlLevels.map((btl) => (
                      <div key={btl.level} className="space-y-2">
                        <div className="flex justify-between">
                          <Label>Level {btl.level}</Label>
                          <span>{btl.percentage}%</span>
                        </div>
                        <Slider
                          value={[btl.percentage]}
                          min={0}
                          max={100}
                          step={5}
                          onValueChange={(value) => handleBtlChange(btl.level, value[0])}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="prompt">Describe Your Requirements</Label>
                    <textarea
                      id="prompt"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder={subjectData.placeholder}
                      rows={5}
                      className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                    ></textarea>
                  </div>
                </div>
              </>
            )}
            
            <Button 
              onClick={handleGenerate}
              disabled={isLoading || ((!isLocalApi && !prompt.trim()))}
              className="mt-6 w-full"
            >
              {isLoading ? "Generating..." : "Generate Question Paper"}
            </Button>
          </Card>
          
          <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Generated Questions</h2>
              
              {questions.length > 0 && (
                <Button variant="outline" onClick={downloadAsPdf}>
                  <Download className="mr-2 h-4 w-4" />
                  Download PDF
                </Button>
              )}
            </div>
            
            {isLoading ? (
              <div className="flex justify-center items-center h-60">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : questions.length > 0 ? (
              <div className="space-y-4 max-h-[500px] overflow-y-auto">
                {questions.map((question, index) => (
                  <div key={index} className="p-3 border rounded-md">
                    <p><span className="font-bold">{index + 1}.</span> {question}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-60 text-center text-muted-foreground">
                <FileText className="h-12 w-12 mb-2" />
                <p>Generated questions will appear here.</p>
                <p className="text-sm">Configure your question paper and click Generate.</p>
              </div>
            )}
          </Card>
        </div>
        
        {/* Diagram tools - now always visible */}
        <div className="mt-8 border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">Create Diagrams for Your Question Paper</h2>
          <p className="text-muted-foreground mb-6">
            Use the diagram generator below to create visual aids for your question paper.
          </p>
          
          <div className="mb-10">
            <h3 className="text-lg font-semibold mb-4">Step 1: Generate Mermaid Code</h3>
            <p className="text-muted-foreground mb-4">
              Describe what kind of diagram you want, and the AI will generate Mermaid code for you.
            </p>
            <DiagramCodeGenerator onCodeGenerated={handleCodeGenerated} />
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Step 2: Visualize and Edit</h3>
            <p className="text-muted-foreground mb-4">
              Edit the generated code or write your own Mermaid syntax to create custom diagrams.
            </p>
            <MermaidDiagramGenerator initialCode={generatedCode} compact={true} />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default QuestionPaperGenerator;
