
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AIFeature } from "@/components/AIFeature";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useToast } from "@/hooks/use-toast";

const subjectInfo = {
  "data-science": {
    title: "Data Science Question Paper Generator",
    description: "Create customized Data Science question papers with varying difficulty levels.",
    placeholder: "Describe the question paper you need (e.g., '10 questions about statistical analysis with 30% easy, 40% medium, and 30% difficult questions')"
  },
  "dbms": {
    title: "Database Management Systems Question Paper Generator",
    description: "Create customized DBMS question papers with varying difficulty levels.",
    placeholder: "Describe the question paper you need (e.g., '10 questions about SQL queries with 30% easy, 40% medium, and 30% difficult questions')"
  },
  "computer-networks": {
    title: "Computer Networks Question Paper Generator",
    description: "Create customized Computer Networks question papers with varying difficulty levels.",
    placeholder: "Describe the question paper you need (e.g., '10 questions about network protocols with 30% easy, 40% medium, and 30% difficult questions')"
  }
};

const QuestionPaperGenerator = () => {
  const { subject = "" } = useParams<{ subject: string }>();
  const { toast } = useToast();
  const [subjectData, setSubjectData] = useState(subjectInfo["data-science"]);

  useEffect(() => {
    if (subject && subjectInfo[subject as keyof typeof subjectInfo]) {
      setSubjectData(subjectInfo[subject as keyof typeof subjectInfo]);
    } else {
      toast({
        title: "Invalid subject",
        description: "The selected subject is not valid. Redirecting to Data Science.",
        variant: "destructive",
      });
      setSubjectData(subjectInfo["data-science"]);
    }
  }, [subject, toast]);

  return (
    <ProtectedRoute>
      <AIFeature
        title={subjectData.title}
        description={subjectData.description}
        placeholder={subjectData.placeholder}
        feature="question paper"
        subjectContext={subject}
      />
    </ProtectedRoute>
  );
};

export default QuestionPaperGenerator;
