
import React, { useState } from "react";
import { AIFeature } from "@/components/AIFeature";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader, Image } from "lucide-react";
import { cn } from "@/lib/utils";

const API_KEY = "guzO";
const API_ENDPOINT = "https://aihorde.net/api/v2/generate/async";
const STATUS_ENDPOINT = "https://aihorde.net/api/v2/generate/status/";
const CHECK_ENDPOINT = "https://aihorde.net/api/v2/generate/check/";

const ImageGeneration = () => {
  const [prompt, setPrompt] = useState("");
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [steps, setSteps] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [useAIHorde, setUseAIHorde] = useState(true);
  const { toast } = useToast();

  const generateWithAIHorde = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "You need to provide a description for the image you want to generate.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setGeneratedImage(null);

    try {
      // Step 1: Create generation request
      const requestBody = {
        prompt: prompt,
        params: {
          n: 1,
          width: width,
          height: height,
          steps: steps,
          sampler_name: "k_euler"
        }
      };

      const response = await fetch(API_ENDPOINT, {
        method: "POST",
        headers: {
          "apikey": API_KEY,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(requestBody)
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = await response.json();
      const requestId = data.id;

      if (!requestId) {
        throw new Error("Failed to get request ID");
      }

      // Step 2: Poll for completion
      let isComplete = false;
      let imageUrl = null;

      while (!isComplete) {
        // Check if request is complete
        const checkResponse = await fetch(`${CHECK_ENDPOINT}${requestId}`);
        const checkData = await checkResponse.json();
        
        if (checkData.done) {
          isComplete = true;
          
          // Get the final result
          const statusResponse = await fetch(`${STATUS_ENDPOINT}${requestId}`);
          const statusData = await statusResponse.json();
          
          if (statusData.generations && statusData.generations.length > 0) {
            imageUrl = statusData.generations[0].img;
          } else {
            throw new Error("No image was generated");
          }
        } else {
          // Wait before polling again
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }

      setGeneratedImage(imageUrl);
      toast({
        title: "Image generated successfully",
        description: "Your image has been created using AI Horde.",
      });

    } catch (error) {
      console.error("Error generating image:", error);
      toast({
        title: "Error generating image",
        description: `${error instanceof Error ? error.message : "There was an error generating the image. Please try again."}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Image Generation for Question Paper</h1>
        <p className="text-muted-foreground mb-6">
          Generate images and visual aids to enhance your question papers and learning materials.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Panel */}
          <div className="space-y-4">
            <Textarea
              placeholder="Describe the image you need (e.g., 'Create a diagram showing the TCP/IP protocol layers for a networking question')"
              className="min-h-[200px]"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            
            <div className="space-y-4 pt-4">
              <div>
                <div className="flex justify-between mb-2">
                  <Label>Width: {width}px</Label>
                </div>
                <Slider
                  value={[width]}
                  min={256}
                  max={1024}
                  step={64}
                  onValueChange={(value) => setWidth(value[0])}
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <Label>Height: {height}px</Label>
                </div>
                <Slider
                  value={[height]}
                  min={256}
                  max={1024}
                  step={64}
                  onValueChange={(value) => setHeight(value[0])}
                />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <Label>Detail Level (Steps): {steps}</Label>
                </div>
                <Slider
                  value={[steps]}
                  min={10}
                  max={50}
                  step={5}
                  onValueChange={(value) => setSteps(value[0])}
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button 
                onClick={generateWithAIHorde} 
                disabled={isLoading || !prompt.trim()}
                className="w-full"
              >
                {isLoading ? (
                  <>
                    <Loader className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  "Generate Image"
                )}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setUseAIHorde(false)}
                className="w-full"
              >
                Use LangChain (Text-only)
              </Button>
            </div>
          </div>
          
          {/* Result Panel */}
          <Card className={cn(
            "p-4 relative min-h-[200px] bg-muted/30 flex items-center justify-center",
            generatedImage ? "p-0 overflow-hidden" : "p-4"
          )}>
            {generatedImage ? (
              <img 
                src={generatedImage} 
                alt="AI Generated Image"
                className="w-full h-auto object-contain"
              />
            ) : (
              <div className="text-center text-muted-foreground h-full flex items-center justify-center">
                {isLoading ? (
                  <Loader className="h-8 w-8 animate-spin" />
                ) : (
                  <div className="flex flex-col items-center">
                    <Image className="h-16 w-16 mb-4 opacity-20" />
                    <p>Generated image will appear here</p>
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>

        {!useAIHorde && (
          <div className="mt-8">
            <AIFeature
              title="Text-Based Image Description"
              description="Generate textual image descriptions using LangChain."
              placeholder="Describe the image you need (e.g., 'Create a diagram showing the TCP/IP protocol layers for a networking question')"
              feature="image"
            />
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
};

export default ImageGeneration;
