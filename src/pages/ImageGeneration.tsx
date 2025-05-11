
import React, { useState, useEffect } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AIFeature } from "@/components/AIFeature";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Download } from "lucide-react";
import { MermaidDiagramGenerator } from "@/components/ai/MermaidDiagramGenerator";

// AI Horde types for image generation
interface AIHordeResponse {
  id: string;
}

interface GenerationStatus {
  done: boolean;
  processing: number;
  waiting: number;
  finished: number;
  generations?: Array<{
    img: string;
  }>;
}

const ImageGeneration = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("diagram");
  
  // AI Horde state
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationId, setGenerationId] = useState<string | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [statusMessage, setStatusMessage] = useState("");

  // Stop the polling when component unmounts
  useEffect(() => {
    let interval: number | undefined;
    
    if (generationId) {
      interval = window.setInterval(() => {
        checkStatus(generationId);
      }, 3000);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [generationId]);

  // Function to generate images with AI Horde
  const generateImage = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "You need to provide a description for image generation.",
        variant: "destructive",
      });
      return;
    }
    
    setIsGenerating(true);
    setStatusMessage("Submitting request to AI Horde...");
    
    try {
      const response = await fetch("https://stablehorde.net/api/v2/generate/async", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": "0000000000" // Anonymous API key for AI Horde
        },
        body: JSON.stringify({
          prompt: prompt,
          params: {
            steps: 30,
            n: 1,
            sampler_name: "k_euler_a",
            width: 512,
            height: 512,
          },
          nsfw: false,
          censor_nsfw: true,
          trusted_workers: false,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json() as AIHordeResponse;
      setGenerationId(data.id);
      setStatusMessage(`Request submitted. Waiting in queue...`);
      
    } catch (error) {
      console.error("Error generating image:", error);
      setIsGenerating(false);
      toast({
        title: "Error generating image",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  // Function to check the status of the image generation
  const checkStatus = async (id: string) => {
    try {
      const response = await fetch(`https://stablehorde.net/api/v2/generate/check/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json() as GenerationStatus;
      
      if (data.done) {
        // Fetch the actual images
        const imagesResponse = await fetch(`https://stablehorde.net/api/v2/generate/status/${id}`);
        if (!imagesResponse.ok) {
          throw new Error(`HTTP error! Status: ${imagesResponse.status}`);
        }
        
        const imagesData = await imagesResponse.json() as GenerationStatus;
        
        if (imagesData.generations && imagesData.generations.length > 0) {
          const newImages = imagesData.generations.map(gen => gen.img);
          setImages(prev => [...prev, ...newImages]);
          setGenerationId(null);
          setIsGenerating(false);
          setStatusMessage("");
          
          toast({
            title: "Images generated",
            description: "Your images have been successfully generated.",
          });
        } else {
          throw new Error("No images were generated.");
        }
      } else {
        // Update status message with queue position
        setStatusMessage(
          `Waiting in queue: ${data.waiting} ahead of you, processing: ${data.processing}`
        );
      }
    } catch (error) {
      console.error("Error checking status:", error);
      setGenerationId(null);
      setIsGenerating(false);
      setStatusMessage("");
      
      toast({
        title: "Error generating image",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      });
    }
  };

  // Function to download an image
  const downloadImage = async (imageUrl: string, index: number) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = blobUrl;
      a.download = `generated-image-${index + 1}.webp`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(blobUrl);
      document.body.removeChild(a);
    } catch (error) {
      console.error("Error downloading image:", error);
      toast({
        title: "Error downloading image",
        description: "There was an error downloading the image.",
        variant: "destructive",
      });
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Image Generation</h1>
        <p className="text-muted-foreground mb-6">Create custom images and diagrams for your educational content using AI. Choose between diagram generation or direct image generation.</p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6 w-full md:w-1/2">
            <TabsTrigger value="diagram">Mermaid Diagram Generator</TabsTrigger>
            <TabsTrigger value="aihorde">AI Horde Image Generator</TabsTrigger>
          </TabsList>
          
          <TabsContent value="diagram" className="w-full">
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Generate Diagrams for Education</h2>
              <p className="text-muted-foreground mb-4">
                Create flowcharts, sequence diagrams, class diagrams, and more using Mermaid syntax. 
                Perfect for educational materials and visualizing concepts.
              </p>
              <MermaidDiagramGenerator />
            </div>
          </TabsContent>
          
          <TabsContent value="aihorde" className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Textarea
                  placeholder="Describe the image you want to generate (e.g., 'A colorful classroom with students learning about science')"
                  className="min-h-[200px]"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
                <Button 
                  onClick={generateImage} 
                  disabled={isGenerating || !prompt.trim()}
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    "Generate Images"
                  )}
                </Button>
                {statusMessage && (
                  <p className="text-sm text-muted-foreground">{statusMessage}</p>
                )}
              </div>
              
              <Card className="p-4 overflow-y-auto max-h-[600px]">
                {images.length > 0 ? (
                  <div className="grid grid-cols-1 gap-4">
                    {images.map((img, index) => (
                      <div key={index} className="relative">
                        <img 
                          src={img} 
                          alt={`Generated image ${index + 1}`} 
                          className="w-full rounded-md"
                        />
                        <Button
                          variant="outline"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => downloadImage(img, index)}
                        >
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground h-[200px] flex items-center justify-center">
                    {isGenerating ? (
                      <Loader2 className="h-8 w-8 animate-spin" />
                    ) : (
                      "Generated images will appear here"
                    )}
                  </div>
                )}
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </ProtectedRoute>
  );
};

export default ImageGeneration;
