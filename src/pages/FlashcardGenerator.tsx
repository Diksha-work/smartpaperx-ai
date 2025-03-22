
import React from "react";
import { AIFeature } from "@/components/AIFeature";

const FlashcardGenerator = () => {
  return (
    <AIFeature
      title="Flashcard Generator"
      description="Create interactive flashcards to boost memorization and enhance learning retention."
      placeholder="Describe the flashcards you need (e.g., 'Create 10 flashcards about human anatomy terms')"
      feature="flashcards"
    />
  );
};

export default FlashcardGenerator;
