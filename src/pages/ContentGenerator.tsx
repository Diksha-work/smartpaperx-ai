
import React, { useState } from "react";
import { AIFeature } from "@/components/AIFeature";

const ContentGenerator = () => {
  return (
    <AIFeature
      title="Content Generator"
      description="Generate tailored learning content based on your curriculum and learning objectives."
      placeholder="Describe the learning content you need (e.g., 'Create a lesson plan about photosynthesis for 9th grade students')"
      feature="content"
    />
  );
};

export default ContentGenerator;
