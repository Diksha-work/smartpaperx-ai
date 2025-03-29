
import React from "react";
import { AIFeature } from "@/components/AIFeature";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

const QuizGenerator = () => {
  return (
    <ProtectedRoute>
      <AIFeature
        title="Question Paper Generator"
        description="Create customized question papers with varying difficulty levels to test your knowledge."
        placeholder="Describe the question paper you need (e.g., '10 questions about World War II with 30% easy, 40% medium, and 30% difficult questions for high school students')"
        feature="question paper"
      />
    </ProtectedRoute>
  );
};

export default QuizGenerator;
