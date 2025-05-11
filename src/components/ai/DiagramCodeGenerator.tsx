
import React, { useState } from "react";
import { generateWithLangChain } from "@/utils/langchainUtils";
import { PromptInput } from "@/components/ai/PromptInput";
import { useToast } from "@/hooks/use-toast";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";

interface DiagramCodeGeneratorProps {
  onCodeGenerated: (code: string) => void;
}

export function DiagramCodeGenerator({ onCodeGenerated }: DiagramCodeGeneratorProps) {
  const [prompt, setPrompt] = useState("");
  const [generatedCode, setGeneratedCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a description",
        description: "You need to provide some input to generate a diagram.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      const result = await generateWithLangChain("image", prompt);
      
      // Extract code from the result (assuming it's markdown formatted)
      let codeBlock = result;
      
      // If result contains markdown code blocks, extract just the code
      const codeBlockRegex = /```(?:mermaid)?\s*([\s\S]*?)```/;
      const match = result.match(codeBlockRegex);
      
      if (match && match[1]) {
        codeBlock = match[1].trim();
      }
      
      setGeneratedCode(codeBlock);
      onCodeGenerated(codeBlock); // Pass the code to the parent component
    } catch (error) {
      console.error("Error generating diagram code:", error);
      toast({
        title: "Error generating code",
        description: "There was an error generating the diagram code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode);
    toast({
      title: "Copied to clipboard",
      description: "The generated code has been copied to your clipboard.",
    });
  };

  const useGeneratedCode = () => {
    onCodeGenerated(generatedCode);
    toast({
      title: "Code applied",
      description: "The generated code has been applied to the diagram editor.",
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <PromptInput
          prompt={prompt}
          onPromptChange={setPrompt}
          placeholder="Describe the diagram you want to create, e.g., 'Create a flowchart showing the steps of photosynthesis' or 'Generate a sequence diagram for user authentication'"
          isLoading={isLoading}
          onGenerate={handleGenerate}
        />
      </div>

      <div>
        <Card className="p-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-medium">Generated Mermaid Code</h3>
            {generatedCode && (
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="flex items-center gap-2"
              >
                <Copy className="h-4 w-4" />
                Copy Code
              </Button>
            )}
          </div>
          
          <pre className="bg-gray-50 p-4 rounded-md overflow-auto text-sm font-mono max-h-[300px]">
            {generatedCode || "Your generated Mermaid code will appear here..."}
          </pre>
          
          {generatedCode && (
            <Button 
              onClick={useGeneratedCode}
              className="mt-4"
            >
              Apply to Diagram Editor
            </Button>
          )}
        </Card>
      </div>
    </div>
  );
}
