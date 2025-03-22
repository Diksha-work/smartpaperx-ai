
import React from "react";
import { AIFeature } from "@/components/AIFeature";

const NotesGenerator = () => {
  return (
    <AIFeature
      title="AI Notes Generator"
      description="Transform complex topics into concise, easy-to-understand notes with AI assistance."
      placeholder="Paste text to summarize or describe what you need notes on (e.g., 'Summarize the key principles of quantum mechanics')"
      feature="notes"
    />
  );
};

export default NotesGenerator;
