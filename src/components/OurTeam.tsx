
import React from "react";
import { TeamMember } from "./TeamMember";

export const OurTeam = () => {
  const teamMembers = [
    {
      name: "Diksha Annamalai",
      role: "Co-Founder & Lead Developer",
      bio: "Passionate about creating innovative educational solutions. Leads the technical development and strategic direction of AptoraX AI.",
      photoUrl: "/lovable-uploads/0f712d8c-3801-46cd-aeb7-0ef18e1312e4.png",
      linkedin: "https://in.linkedin.com/in/diksha-annamalai",
      github: "https://github.com/diksha-annamalai",
      email: "diksha.annamalai@gmail.com"
    },
    {
      name: "Namratha B",
      role: "Co-Founder & Frontend Developer",
      bio: "Creates beautiful, intuitive interfaces that make the AI learning platform accessible and engaging for all users.",
      photoUrl: "/lovable-uploads/fc483f2a-1699-43ef-980d-b5c62321c0ac.png",
      linkedin: "https://linkedin.com/in/namrathab1412",
      github: "https://github.com/namratha-b",
      email: "namrathab2730@gmail.com"
    },
    {
      name: "Pranav C",
      role: "Co-Founder & Backend Developer",
      bio: "Develops the robust infrastructure that powers AptoraX AI's educational features and data processing capabilities.",
      photoUrl: "/lovable-uploads/5f13c994-1aed-434c-a15d-2e7ad161af0c.png",
      linkedin: "https://linkedin.com/in/pranav-chintalapudi",
      github: "https://github.com/pranav-c",
      email: "pranavchintalapudi@gmail.com"
    }
  ];

  return (
    <section id="team" className="py-16">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Our Team
          </h2>
          <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
            Meet the talented individuals behind AptoraX AI's mission to transform education with AI.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <TeamMember key={member.name} {...member} />
          ))}
        </div>
      </div>
    </section>
  );
};
