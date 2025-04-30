
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronRight, BookOpen, Database, Network } from "lucide-react";

const SubjectSelection = () => {
  const [subject, setSubject] = useState<string>("");
  const navigate = useNavigate();

  const handleContinue = () => {
    if (subject) {
      navigate(`/question-paper-generator/${subject}`);
    }
  };

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Question Paper Generator</h1>
        <p className="text-muted-foreground mb-6">
          Create customized question papers with varying difficulty levels to test your knowledge.
        </p>

        <Card className="max-w-lg mx-auto">
          <CardHeader>
            <CardTitle>Select a Subject</CardTitle>
            <CardDescription>
              Choose the subject for your question paper. Each subject has its own specialized database and syllabus.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="subject-select" className="text-sm font-medium">
                  Subject
                </label>
                <Select value={subject} onValueChange={setSubject}>
                  <SelectTrigger id="subject-select" className="w-full">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="data-science">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4" />
                        <span>Data Science</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="dbms">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4" />
                        <span>DBMS</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="computer-networks">
                      <div className="flex items-center gap-2">
                        <Network className="h-4 w-4" />
                        <span>Computer Networks</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button 
              onClick={handleContinue} 
              disabled={!subject} 
              className="w-full flex items-center justify-center gap-2"
            >
              Continue <ChevronRight className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      </div>
    </ProtectedRoute>
  );
};

export default SubjectSelection;
