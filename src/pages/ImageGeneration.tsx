
import React from "react";
import { AIFeature } from "@/components/AIFeature";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const ImageGeneration = () => {
  return (
    <ProtectedRoute>
      <AIFeature
        title="Image Generation for Question Paper"
        description="Generate images and visual aids to enhance your question papers and learning materials."
        placeholder="Describe the image you need (e.g., 'Create a diagram showing the TCP/IP protocol layers for a networking question')"
        feature="image"
      />
    </ProtectedRoute>
  );
};

export default ImageGeneration;
