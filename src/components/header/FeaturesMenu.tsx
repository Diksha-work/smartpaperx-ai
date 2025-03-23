
import React from "react";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
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

interface FeaturesMenuProps {
  isMobile?: boolean;
}

export const FeaturesMenu: React.FC<FeaturesMenuProps> = ({ isMobile = false }) => {
  const featureLinks = [
    { name: "Content Generator", path: "/content-generator" },
    { name: "Quiz Generator", path: "/quiz-generator" },
    { name: "E-learning Materials", path: "/learning-materials" },
    { name: "AI Notes Generator", path: "/notes-generator" },
    { name: "Flashcard Generator", path: "/flashcard-generator" },
    { name: "AI Learning Assistant", path: "/learning-assistant" },
  ];

  if (isMobile) {
    return (
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
    );
  }

  return (
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
  );
};
