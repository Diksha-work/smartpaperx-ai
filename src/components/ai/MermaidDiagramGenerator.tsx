
import React, { useState, useEffect, useRef } from "react";
import mermaid from "mermaid";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

export function MermaidDiagramGenerator() {
  const [diagramCode, setDiagramCode] = useState<string>(
    `flowchart TD
  A[Start] --> B{Decision}
  B -- Yes --> C[Do Something]
  B -- No --> D[Do Something Else]`
  );
  const outputRef = useRef<HTMLDivElement>(null);

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
    if (!diagramCode.trim()) return;

    try {
      if (outputRef.current) {
        const { svg } = await mermaid.render("liveDiagram", diagramCode);
        outputRef.current.innerHTML = svg;
      }
    } catch (err) {
      if (outputRef.current) {
        outputRef.current.innerHTML = `<p style="color: red;">Error: ${err instanceof Error ? err.message : "An error occurred"}</p>`;
      }
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
        onClick={renderDiagram}
        className="mb-6"
      >
        Render Diagram
      </Button>
      
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
