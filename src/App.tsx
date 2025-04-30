
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ContentGenerator from "./pages/ContentGenerator";
import QuizGenerator from "./pages/SubjectSelection";
import LearningMaterials from "./pages/LearningMaterials";
import NotesGenerator from "./pages/NotesGenerator";
import FlashcardGenerator from "./pages/FlashcardGenerator";
import ImageGeneration from "./pages/ImageGeneration";
import FAQ from "./pages/FAQ";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CookiePolicy from "./pages/CookiePolicy";
import { Layout } from "./components/Layout";
import { useState } from "react";
import { AuthProvider } from "./contexts/AuthContext";
import QuestionPaperGenerator from "./pages/QuestionPaperGenerator";

const App = () => {
  // Create QueryClient inside the component
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Index />} />
              <Route path="/content-generator" element={<ContentGenerator />} />
              <Route path="/quiz-generator" element={<QuizGenerator />} />
              <Route path="/question-paper-generator/:subject" element={<QuestionPaperGenerator />} />
              <Route path="/learning-materials" element={<LearningMaterials />} />
              <Route path="/notes-generator" element={<NotesGenerator />} />
              <Route path="/flashcard-generator" element={<FlashcardGenerator />} />
              <Route path="/image-generation" element={<ImageGeneration />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/cookie-policy" element={<CookiePolicy />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
