
import React, { useState, useEffect, useRef } from "react";
import mermaid from "mermaid";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Loader2, Download, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function MermaidDiagramGenerator() {
  const [diagramCode, setDiagramCode] = useState<string>(
    `flowchart TD
  A[Start] --> B{Decision}
  B -- Yes --> C[Do Something]
  B -- No --> D[Do Something Else]`
  );
  const [renderedSvg, setRenderedSvg] = useState<string>("");
  const [isRendering, setIsRendering] = useState<boolean>(false);
  const outputRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Initialize mermaid
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: 'default',
      securityLevel: 'loose',
    });
  }, []);

  // Render the diagram
  const renderDiagram = async () => {
    if (!diagramCode.trim()) {
      toast({
        title: "Empty diagram code",
        description: "Please enter some Mermaid syntax to generate a diagram.",
        variant: "destructive",
      });
      return;
    }

    setIsRendering(true);
    try {
      const { svg } = await mermaid.render("liveDiagram", diagramCode);
      setRenderedSvg(svg);
    } catch (err) {
      toast({
        title: "Diagram rendering error",
        description: err instanceof Error ? err.message : "An error occurred while rendering the diagram",
        variant: "destructive",
      });
      console.error("Mermaid rendering error:", err);
    } finally {
      setIsRendering(false);
    }
  };

  // Download the SVG as a file
  const downloadSvg = () => {
    if (!renderedSvg) return;
    
    const blob = new Blob([renderedSvg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `diagram-${new Date().toISOString().slice(0, 10)}.svg`;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    toast({
      title: "Diagram downloaded",
      description: "Your diagram has been downloaded as an SVG file.",
    });
  };

  // Open Mermaid documentation
  const openMermaidDocs = () => {
    window.open('https://mermaid.js.org/intro/', '_blank');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Diagram Code</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={openMermaidDocs}
            className="flex items-center gap-1"
          >
            <ExternalLink className="h-4 w-4" />
            <span>Tutorial</span>
          </Button>
        </div>
        
        <Textarea
          placeholder="Enter your Mermaid diagram code here..."
          className="min-h-[200px] font-mono text-sm"
          value={diagramCode}
          onChange={(e) => setDiagramCode(e.target.value)}
        />
        
        <Button
          onClick={renderDiagram}
          disabled={isRendering || !diagramCode.trim()}
          className="w-full"
        >
          {isRendering ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Rendering...
            </>
          ) : (
            "Render Diagram"
          )}
        </Button>
      </div>
      
      <Card className="p-4 relative min-h-[200px] bg-muted/30">
        {renderedSvg ? (
          <>
            <div className="absolute right-2 top-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={downloadSvg}
                title="Download as SVG"
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
            
            <div 
              ref={outputRef}
              className="overflow-auto"
              dangerouslySetInnerHTML={{ __html: renderedSvg }}
            />
          </>
        ) : (
          <div className="flex items-center justify-center h-full text-muted-foreground">
            {isRendering ? (
              <Loader2 className="h-8 w-8 animate-spin" />
            ) : (
              "Your diagram will appear here after rendering"
            )}
          </div>
        )}
      </Card>
    </div>
  );
}
