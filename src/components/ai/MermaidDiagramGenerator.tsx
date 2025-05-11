
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface MermaidDiagramGeneratorProps {
  initialCode?: string;
}

export function MermaidDiagramGenerator({ initialCode }: MermaidDiagramGeneratorProps) {
  const [diagramCode, setDiagramCode] = useState<string>(
    `flowchart TD
  A[Start] --> B{Decision}
  B -- Yes --> C[Do Something]
  B -- No --> D[Do Something Else]`
  );
  const outputRef = useRef<HTMLDivElement>(null);
  const [mermaidInstance, setMermaidInstance] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Update diagram code when initialCode changes
  useEffect(() => {
    if (initialCode) {
      setDiagramCode(initialCode);
      // If mermaid is already loaded, render the new diagram
      if (mermaidInstance) {
        renderDiagram(initialCode);
      }
    }
  }, [initialCode, mermaidInstance]);

  // Load Mermaid from CDN
  useEffect(() => {
    // Check if Mermaid script is already loaded
    if (window.mermaid) {
      setMermaidInstance(window.mermaid);
      return;
    }

    setIsLoading(true);
    // Create script element to load Mermaid from CDN
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/mermaid@10.7.0/dist/mermaid.min.js';
    script.async = true;
    script.onload = () => {
      // Initialize mermaid after script is loaded
      if (window.mermaid) {
        window.mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
          securityLevel: 'loose',
        });
        setMermaidInstance(window.mermaid);
      }
      setIsLoading(false);
    };
    script.onerror = () => {
      setError("Failed to load Mermaid library");
      setIsLoading(false);
    };
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  // Render the diagram
  const renderDiagram = async (code = diagramCode) => {
    if (!code.trim() || !mermaidInstance) return;
    setError(null);

    try {
      if (outputRef.current) {
        // Clear previous content
        outputRef.current.innerHTML = '';
        
        // Create a unique ID for this rendering
        const id = `mermaid-diagram-${Date.now()}`;
        
        // Render using the mermaid instance
        await mermaidInstance.render(id, code).then((result: any) => {
          if (outputRef.current) {
            outputRef.current.innerHTML = result.svg;
          }
        });
      }
    } catch (err) {
      if (outputRef.current) {
        outputRef.current.innerHTML = '';
      }
      setError(`Error: ${err instanceof Error ? err.message : "An error occurred rendering the diagram"}`);
      console.error("Mermaid rendering error:", err);
    }
  };

  // Open Mermaid documentation
  const openMermaidDocs = () => {
    window.open('https://mermaid.js.org/intro/', '_blank');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Live Mermaid Diagram Generator</h2>
      
      <Button
        variant="default"
        onClick={openMermaidDocs}
        className="mb-4 flex items-center gap-2"
      >
        <ExternalLink className="h-4 w-4" />
        <span>Read Me – Tutorial on how to render diagrams</span>
      </Button>
      
      <Textarea
        id="diagramInput"
        placeholder="Enter your Mermaid diagram code here..."
        className="min-h-[200px] font-mono text-sm mb-4"
        value={diagramCode}
        onChange={(e) => setDiagramCode(e.target.value)}
      />
      
      <Button
        onClick={() => renderDiagram()}
        className="mb-6"
        disabled={isLoading || !mermaidInstance}
      >
        {isLoading ? "Loading Mermaid..." : "Render Diagram"}
      </Button>
      
      {error && (
        <div className="text-red-500 mb-4 p-2 border border-red-300 rounded bg-red-50">
          {error}
        </div>
      )}
      
      <Card className="p-4">
        <div 
          ref={outputRef}
          id="diagramOutput"
          className="w-full overflow-auto"
        />
      </Card>
    </div>
  );
}

// Add TypeScript declaration for window.mermaid
declare global {
  interface Window {
    mermaid: any;
  }
}
