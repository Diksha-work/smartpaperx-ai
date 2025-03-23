
import React from "react";
import { Github, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface TeamMemberProps {
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  linkedin?: string;
  github?: string;
  email?: string;
  className?: string;
}

export const TeamMember = ({
  name,
  role,
  bio,
  photoUrl,
  linkedin,
  github,
  email,
  className,
}: TeamMemberProps) => {
  return (
    <Card className={cn("overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-105", className)}>
      <div className="w-full h-72 overflow-hidden">
        <img
          src={photoUrl}
          alt={`${name} - ${role}`}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>
      <CardContent className="pt-6">
        <h3 className="text-xl font-bold">{name}</h3>
        <p className="text-primary font-medium mb-2">{role}</p>
        <p className="text-muted-foreground text-sm mb-4">{bio}</p>
        
        <div className="flex justify-center space-x-4 mt-auto">
          {linkedin && (
            <a 
              href={linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label={`${name}'s LinkedIn profile`}
            >
              <Linkedin size={20} />
            </a>
          )}
          {github && (
            <a 
              href={github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label={`${name}'s GitHub profile`}
            >
              <Github size={20} />
            </a>
          )}
          {email && (
            <a 
              href={`mailto:${email}`}
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label={`Email ${name}`}
            >
              <Mail size={20} />
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
