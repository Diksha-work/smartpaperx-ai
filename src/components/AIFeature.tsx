
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Copy, Loader2, Download, FileDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface AIFeatureProps {
  title: string;
  description: string;
  placeholder: string;
  feature: "content" | "quiz" | "materials" | "notes" | "flashcards" | "assistant";
}

export function AIFeature({ title, description, placeholder, feature }: AIFeatureProps) {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPdfDialog, setShowPdfDialog] = useState(false);
  const [pdfFilename, setPdfFilename] = useState("");
  const { toast } = useToast();
  
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const resultRef = React.useRef<HTMLDivElement>(null);

  const generateContent = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "You need to provide some input for the AI to generate content.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setResult("");

    try {
      // Create a prompt based on the feature type
      let systemPrompt = "";
      switch (feature) {
        case "content":
          systemPrompt = "Generate structured educational content based on the following prompt. Include headings, explanations, examples, and key points. Format your response in markdown.";
          break;
        case "quiz":
          systemPrompt = "Generate a quiz based on the following prompt. Include a mix of multiple choice, true/false, and short answer questions. Format your response in markdown.";
          break;
        case "materials":
          systemPrompt = "Generate a comprehensive learning roadmap or materials list based on the following prompt. Include resources, steps, and recommendations. Format your response in markdown.";
          break;
        case "notes":
          systemPrompt = "Generate concise, organized notes based on the following prompt. Include key concepts, definitions, and important information. Format your response in markdown.";
          break;
        case "flashcards":
          systemPrompt = "Generate flashcards based on the following prompt. Format as Question: [question] and Answer: [answer] pairs. Make them concise and focused on key information.";
          break;
        case "assistant":
          systemPrompt = "You are an educational assistant. Provide a helpful, accurate response to the following question or request.";
          break;
      }

      // Updated API endpoint to use gemini-1.5-pro model which is recommended
      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${API_KEY}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                { text: `${systemPrompt}\n\n${prompt}` }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 2048,
          },
        }),
      });

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts?.length > 0) {
        setResult(data.candidates[0].content.parts[0].text);
        // Set default PDF filename based on feature type
        setPdfFilename(`${feature}_${new Date().toISOString().slice(0, 10)}`);
      } else if (data.error) {
        throw new Error(`API Error: ${data.error.message || JSON.stringify(data.error)}`);
      } else {
        throw new Error("No response generated");
      }
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result);
    toast({
      title: "Copied to clipboard",
      description: "The generated content has been copied to your clipboard.",
    });
  };

  const openPdfDialog = () => {
    setShowPdfDialog(true);
  };

  const downloadAsPdf = async () => {
    if (!resultRef.current) return;
    
    try {
      const filename = pdfFilename.trim() || `${feature}_${new Date().toISOString().slice(0, 10)}`;
      
      // Create a temporary div to properly render the markdown content
      const contentDiv = document.createElement('div');
      contentDiv.innerHTML = result.replace(/\n/g, '<br>');
      contentDiv.style.padding = '20px';
      contentDiv.style.color = 'black';
      contentDiv.style.backgroundColor = 'white';
      contentDiv.style.width = '595px'; // A4 width in pixels at 72 dpi
      document.body.appendChild(contentDiv);
      
      // Capture the content as an image
      const canvas = await html2canvas(contentDiv, {
        scale: 2, // Higher resolution
        backgroundColor: '#ffffff',
      });
      
      document.body.removeChild(contentDiv);
      
      // Create PDF with A4 dimensions
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });
      
      // Add title
      pdf.setFontSize(16);
      pdf.text(title, 20, 20);
      pdf.setFontSize(12);
      
      // Add image of content
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 10, 30, 190, 0, '', 'FAST');
      
      // Download the PDF
      pdf.save(`${filename}.pdf`);
      
      setShowPdfDialog(false);
      
      toast({
        title: "PDF downloaded",
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-muted-foreground mb-6">{description}</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <Textarea
            placeholder={placeholder}
            className="min-h-[200px]"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button 
            onClick={generateContent} 
            disabled={isLoading || !prompt.trim()}
            className="w-full"
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              "Generate"
            )}
          </Button>
        </div>
        
        <Card className="p-4 relative min-h-[200px] bg-muted/30">
          {result ? (
            <>
              <div className="absolute right-2 top-2 flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyToClipboard}
                  title="Copy to clipboard"
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={openPdfDialog}
                  title="Download as PDF"
                >
                  <FileDown className="h-4 w-4" />
                </Button>
              </div>
              <div className="whitespace-pre-wrap" ref={resultRef}>{result}</div>
            </>
          ) : (
            <div className="text-center text-muted-foreground h-full flex items-center justify-center">
              {isLoading ? (
                <Loader2 className="h-8 w-8 animate-spin" />
              ) : (
                "AI-generated content will appear here"
              )}
            </div>
          )}
        </Card>
      </div>
      
      <Dialog open={showPdfDialog} onOpenChange={setShowPdfDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Download as PDF</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="filename" className="text-sm font-medium">
                Enter a filename for your PDF:
              </label>
              <Input
                id="filename"
                value={pdfFilename}
                onChange={(e) => setPdfFilename(e.target.value)}
                placeholder="Enter filename (without .pdf)"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPdfDialog(false)}>
              Cancel
            </Button>
            <Button onClick={downloadAsPdf}>
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
