
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import { OurTeam } from "@/components/OurTeam";

const Index = () => {
  const location = useLocation();

  // Handle scrolling when navigating from another page
  useEffect(() => {
    // Check if we have a scrollTo state from navigation
    if (location.state && location.state.scrollTo) {
      const sectionId = location.state.scrollTo;
      const section = document.getElementById(sectionId);
      
      if (section) {
        // Add a slight delay to ensure the page is fully loaded
        setTimeout(() => {
          section.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      
      // Clear the state to prevent scrolling on page refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  // Add smooth revealing of content as user scrolls
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
          entry.target.classList.remove("opacity-0");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Select all section headers
    const sections = document.querySelectorAll("section > div > div:first-child");
    sections.forEach((section) => {
      section.classList.add("opacity-0");
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  // Preload hero image for better UX
  useEffect(() => {
    const img = new Image();
    img.src = "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80";
  }, []);

  // Update document title
  useEffect(() => {
    document.title = "SmartQPX AI | AI-Powered Question Paper Generation Platform";
  }, []);

  // Add smooth scrolling for anchor links
  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href')?.substring(1);
        if (!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
        
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Offset for header
          behavior: 'smooth'
        });
      });
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main>
        <Hero />
        
        <Features />
        
        <Testimonials />
        
        <section id="about" className="py-20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12 opacity-0">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                About SmartQPX AI
              </h2>
              <p className="text-xl text-muted-foreground max-w-[700px] mx-auto">
                Transforming how you create and practice with question papers using AI technology.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="aspect-video rounded-xl overflow-hidden relative shadow-md">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80" 
                  alt="Student using SmartQPX AI" 
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
              
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Our Mission</h3>
                <p className="text-muted-foreground">
                  At SmartQPX AI, we believe in making question paper generation accessible and efficient for everyone. 
                  Our AI-powered platform allows users to enter a subject to instantly generate customized question papers 
                  with defined difficulty level distributions, helping students practice effectively and enabling teachers 
                  to create assessment materials effortlessly.
                </p>
                <h3 className="text-2xl font-bold">How It Works</h3>
                <p className="text-muted-foreground">
                  Our platform uses advanced machine learning algorithms to understand subject matter requirements. 
                  Simply specify your subject, set the percentage of easy, medium, and difficult questions you want, 
                  and SmartQPX AI instantly generates a tailored question paper that matches your exact specifications. 
                  Students can use it for practice, while teachers save countless hours on assessment creation.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        <OurTeam />
      </main>
    </div>
  );
};

export default Index;
