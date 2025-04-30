
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
      photoUrl: "https://images.unsplash.com/photo-1598550880863-4e8aa3d0edb4?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
      linkedin: "https://linkedin.com/in/namrathab1412",
      github: "https://github.com/namratha-b",
      email: "namrathab2730@gmail.com"
    },
    {
      name: "Pranav C",
      role: "Co-Founder & Backend Developer",
      bio: "Develops the robust infrastructure that powers AptoraX AI's educational features and data processing capabilities.",
      photoUrl: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
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
