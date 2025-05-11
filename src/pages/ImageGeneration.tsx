
import React, { useState } from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { MermaidDiagramGenerator } from "@/components/ai/MermaidDiagramGenerator";
import { DiagramCodeGenerator } from "@/components/ai/DiagramCodeGenerator";

const ImageGeneration = () => {
  const [generatedCode, setGeneratedCode] = useState<string>("");

  const handleCodeGenerated = (code: string) => {
    setGeneratedCode(code);
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Diagram Generation</h1>
        <p className="text-muted-foreground mb-6">Create custom diagrams for your educational content using the Mermaid syntax.</p>
        
        <div className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Step 1: Generate Mermaid Code</h2>
          <p className="text-muted-foreground mb-4">
            Describe what kind of diagram you want, and the AI will generate Mermaid code for you.
          </p>
          <DiagramCodeGenerator onCodeGenerated={handleCodeGenerated} />
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-4">Step 2: Visualize and Edit</h2>
          <p className="text-muted-foreground mb-4">
            Edit the generated code or write your own Mermaid syntax to create custom diagrams.
          </p>
        </div>
        
        <MermaidDiagramGenerator initialCode={generatedCode} />
      </div>
    </ProtectedRoute>
  );
};

export default ImageGeneration;
