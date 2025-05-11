
import React from "react";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { MermaidDiagramGenerator } from "@/components/ai/MermaidDiagramGenerator";

const ImageGeneration = () => {
  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Diagram Generation</h1>
        <p className="text-muted-foreground mb-6">Create custom diagrams for your educational content using the Mermaid syntax.</p>
        
        <MermaidDiagramGenerator />
      </div>
    </ProtectedRoute>
  );
};

export default ImageGeneration;
