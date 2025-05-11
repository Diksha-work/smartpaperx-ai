
import React, { useState } from "react";
import { AIFeature } from "@/components/AIFeature";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Loader2, ImageDown } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";

const ImageGeneration = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("textToImage");
  
  // AI Horde state
  const [prompt, setPrompt] = useState("");
  const [width, setWidth] = useState(512);
  const [height, setHeight] = useState(512);
  const [steps, setSteps] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [generationId, setGenerationId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  // AI Horde image generation
  const startImageGeneration = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a prompt for the image generation",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);
    
    try {
      // Start an async generation request
      const response = await fetch("https://stablehorde.net/api/v2/generate/async", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": import.meta.env.VITE_HORDE_API_KEY
        },
        body: JSON.stringify({
          prompt: prompt,
          params: {
            width: width,
            height: height,
            steps: steps,
            sampler_name: "k_euler_ancestral",
            n: 1
          },
          nsfw: false,
          trusted_workers: true,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setGenerationId(data.id);
      
      // Poll for results
      await checkGenerationStatus(data.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to generate image");
      setIsLoading(false);
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to generate image",
        variant: "destructive",
      });
    }
  };

  const checkGenerationStatus = async (id: string) => {
    try {
      let isComplete = false;
      
      while (!isComplete) {
        // Wait for 2 seconds between checks
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const statusResponse = await fetch(`https://stablehorde.net/api/v2/generate/check/${id}`);
        if (!statusResponse.ok) {
          throw new Error(`HTTP error! Status: ${statusResponse.status}`);
        }
        
        const statusData = await statusResponse.json();
        
        // Check if the generation is done
        if (statusData.done) {
          isComplete = true;
          
          // Get the results
          const resultsResponse = await fetch(`https://stablehorde.net/api/v2/generate/status/${id}`);
          if (!resultsResponse.ok) {
            throw new Error(`HTTP error! Status: ${resultsResponse.status}`);
          }
          
          const resultsData = await resultsResponse.json();
          
          if (resultsData.generations && resultsData.generations.length > 0) {
            setGeneratedImage(resultsData.generations[0].img);
            toast({
              title: "Success",
              description: "Image generated successfully!",
            });
          } else {
            throw new Error("No images were generated");
          }
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to check generation status");
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Failed to check generation status",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const downloadImage = () => {
    if (!generatedImage) return;
    
    const link = document.createElement("a");
    link.href = generatedImage;
    link.download = `generated-image-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Image Generation for Question Paper</h1>
        <p className="text-muted-foreground mb-6">Generate images and visual aids to enhance your question papers and learning materials.</p>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 mb-6 w-full md:w-1/2">
            <TabsTrigger value="textToImage">AI Horde Text-to-Image</TabsTrigger>
            <TabsTrigger value="aihorde">AI Horde Generator</TabsTrigger>
          </TabsList>
          
          <TabsContent value="textToImage" className="w-full">
            <AIFeature
              title="Image Generation for Question Paper"
              description="Generate images and visual aids to enhance your question papers and learning materials."
              placeholder="Describe the image you need (e.g., 'Create a diagram showing the TCP/IP protocol layers for a networking question')"
              feature="image"
            />
          </TabsContent>
          
          <TabsContent value="aihorde" className="w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="prompt">Image Prompt</Label>
                    <Textarea
                      id="prompt"
                      placeholder="Describe the image you want to generate (e.g., 'A detailed diagram of the solar system with planets labeled')"
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-[150px]"
                    />
                  </div>
                  
                  <div>
                    <Label className="mb-2 block">Image Size</Label>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="width" className="text-sm">Width: {width}px</Label>
                        <Input 
                          id="width"
                          type="number"
                          value={width}
                          onChange={(e) => setWidth(Number(e.target.value))}
                          min={384}
                          max={1024}
                          step={64}
                        />
                      </div>
                      <div>
                        <Label htmlFor="height" className="text-sm">Height: {height}px</Label>
                        <Input 
                          id="height"
                          type="number"
                          value={height}
                          onChange={(e) => setHeight(Number(e.target.value))}
                          min={384}
                          max={1024}
                          step={64}
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="steps" className="mb-2 block">Detail Level: {steps}</Label>
                    <Slider 
                      id="steps"
                      value={[steps]} 
                      onValueChange={(values) => setSteps(values[0])} 
                      min={10} 
                      max={50}
                      step={1}
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Low Detail</span>
                      <span>High Detail</span>
                    </div>
                  </div>
                  
                  <Button
                    onClick={startImageGeneration}
                    disabled={isLoading || !prompt.trim()}
                    className="w-full"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      "Generate Image"
                    )}
                  </Button>
                  
                  {error && (
                    <div className="text-destructive text-sm">{error}</div>
                  )}
                </div>
              </Card>
              
              <Card className="p-6 flex flex-col items-center justify-center min-h-[400px] relative">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center h-full">
                    <Loader2 className="h-12 w-12 animate-spin mb-4" />
                    <p className="text-center text-sm text-muted-foreground">Generating your image...<br />This may take a minute or two.</p>
                  </div>
                ) : generatedImage ? (
                  <div className="flex flex-col items-center w-full">
                    <img 
                      src={generatedImage} 
                      alt="Generated image" 
                      className="object-contain max-w-full max-h-[400px] rounded-md shadow-md"
                    />
                    <Button 
                      onClick={downloadImage}
                      className="mt-4 flex items-center"
                      variant="outline"
                    >
                      <ImageDown className="mr-2 h-4 w-4" />
                      Download Image
                    </Button>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground">
                    <p>Generated image will appear here</p>
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
