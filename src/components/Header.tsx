
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Mail, Phone } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu when navigating
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mainNavLinks = [
    { name: "Testimonials", path: "/#testimonials" },
    { name: "FAQ", path: "/faq" }, // Changed from "/#faq" to "/faq" for dedicated page
    { name: "About Us", path: "/#about" },
  ];

  const featureLinks = [
    { name: "Content Generator", path: "/content-generator" },
    { name: "Quiz Generator", path: "/quiz-generator" },
    { name: "E-learning Materials", path: "/learning-materials" },
    { name: "AI Notes Generator", path: "/notes-generator" },
    { name: "Flashcard Generator", path: "/flashcard-generator" },
    { name: "AI Learning Assistant", path: "/learning-assistant" },
  ];

  // Handle smooth scrolling for section links
  const handleSectionClick = (e, sectionId) => {
    e.preventDefault();
    
    // If we're not on the homepage, navigate there first
    if (location.pathname !== '/') {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const section = document.getElementById(sectionId);
    if (section) {
      const offsetTop = section.offsetTop;
      window.scrollTo({
        top: offsetTop - 80, // Offset for header
        behavior: 'smooth'
      });
      // Close mobile menu after clicking
      setIsOpen(false);
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out w-full",
        scrolled
          ? "py-3 bg-white/90 backdrop-blur-md shadow-sm dark:bg-black/70"
          : "py-5 bg-transparent"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <span className="font-bold text-xl">Aptora</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {/* Home Link */}
          <Link 
            to="/" 
            className="nav-link font-medium text-sm text-foreground/80 hover:text-foreground"
          >
            Home
          </Link>
          
          {/* Features Dropdown - Desktop - VERTICAL LAYOUT */}
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent">
                  <span className="nav-link font-medium text-sm text-foreground/80 hover:text-foreground">Features</span>
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="flex flex-col w-48 p-2 bg-white dark:bg-gray-900 rounded-md shadow-md">
                    {featureLinks.map((link) => (
                      <Link
                        key={link.name}
                        to={link.path}
                        className="px-3 py-2 text-sm font-medium rounded-md text-foreground/80 hover:text-foreground hover:bg-muted transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          
          {/* Section navigation links */}
          {mainNavLinks.map((link) => {
            // Only apply smooth scrolling for links with hash
            if (link.path.includes('#')) {
              const sectionId = link.path.split('#')[1];
              return (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => handleSectionClick(e, sectionId)}
                  className="nav-link font-medium text-sm text-foreground/80 hover:text-foreground cursor-pointer"
                >
                  {link.name}
                </a>
              );
            } else {
              // Use regular Link for non-section links (like FAQ)
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className="nav-link font-medium text-sm text-foreground/80 hover:text-foreground"
                >
                  {link.name}
                </Link>
              );
            }
          })}

          {/* Contact Link with Popover */}
          <TooltipProvider>
            <Popover>
              <PopoverTrigger className="nav-link font-medium text-sm text-foreground/80 hover:text-foreground">
                Contact
              </PopoverTrigger>
              <PopoverContent 
                className="w-64 p-4 bg-white dark:bg-gray-900 rounded-md shadow-md"
                sideOffset={5}
              >
                <div className="space-y-3">
                  <h3 className="text-sm font-medium mb-2">Contact Information</h3>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-4 w-4 text-primary" />
                    <a href="mailto:aaronsonnie@gmail.com" className="text-foreground/80 hover:text-foreground">
                      aaronsonnie@gmail.com
                    </a>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-4 w-4 text-primary" />
                    <a href="tel:+919944226180" className="text-foreground/80 hover:text-foreground">
                      +91 9944226180
                    </a>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </TooltipProvider>
        </nav>

        {/* Mobile Navigation Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-md text-foreground/80 hover:text-foreground"
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-md transition-all duration-300 ease-in-out overflow-hidden z-50",
          isOpen ? "max-h-[100vh] py-4" : "max-h-0"
        )}
      >
        <div className="container mx-auto px-4 flex flex-col space-y-4">
          <Link
            to="/"
            className="py-2 text-foreground/80 hover:text-foreground"
          >
            Home
          </Link>
          
          {/* Features Dropdown - Mobile - VERTICAL LAYOUT */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center justify-between py-2 text-foreground/80 hover:text-foreground bg-transparent border-none w-full text-left">
              Features <ChevronDown className="h-4 w-4 ml-1" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white dark:bg-gray-900 w-full min-w-[200px] z-50">
              {featureLinks.map((link) => (
                <DropdownMenuItem key={link.name} asChild>
                  <Link 
                    to={link.path}
                    className="py-2 w-full text-foreground/80 hover:text-foreground hover:bg-muted"
                  >
                    {link.name}
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* Section links - Mobile */}
          {mainNavLinks.map((link) => {
            // Only apply smooth scrolling for links with hash
            if (link.path.includes('#')) {
              const sectionId = link.path.split('#')[1];
              return (
                <a
                  key={link.name}
                  href={link.path}
                  onClick={(e) => handleSectionClick(e, sectionId)}
                  className="py-2 text-foreground/80 hover:text-foreground cursor-pointer"
                >
                  {link.name}
                </a>
              );
            } else {
              // Use regular Link for non-section links (like FAQ)
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  className="py-2 text-foreground/80 hover:text-foreground"
                >
                  {link.name}
                </Link>
              );
            }
          })}
          
          {/* Contact Information Display - Mobile */}
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center justify-between py-2 text-foreground/80 hover:text-foreground bg-transparent border-none w-full text-left">
              Contact <ChevronDown className="h-4 w-4 ml-1" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-white dark:bg-gray-900 w-full p-3 min-w-[200px] z-50">
              <div className="space-y-3 py-1">
                <div className="flex items-center gap-2 text-sm">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href="mailto:aaronsonnie@gmail.com" className="text-foreground/80 hover:text-foreground">
                    aaronsonnie@gmail.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-primary" />
                  <a href="tel:+919944226180" className="text-foreground/80 hover:text-foreground">
                    +91 9944226180
                  </a>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default Header;
