
import React from "react";
import { AIFeature } from "@/components/AIFeature";

const QuizGenerator = () => {
  return (
    <AIFeature
      title="Quiz Generator"
      description="Create customized quizzes with varying difficulty levels to test your knowledge."
      placeholder="Describe the quiz you need (e.g., '10 multiple choice questions about World War II for high school students')"
      feature="quiz"
    />
  );
};

export default QuizGenerator;
