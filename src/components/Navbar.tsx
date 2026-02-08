import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex gap-0.5">
              <div className="w-2 h-5 bg-primary rounded-full" />
              <div className="w-2 h-5 bg-primary rounded-full" />
              <div className="w-2 h-5 bg-primary rounded-full" />
            </div>
            <span className="font-bold text-xl text-foreground">ShortlistAI</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Product
            </a>
            <a href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>

            <a href="#" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Enterprise
            </a>
          </div>

          {/* CTA Buttons */}
          <div className="flex items-center gap-3">
            <Link to="/auth">
              <Button variant="ghost" size="sm" className="hidden sm:inline-flex">
                Log In
              </Button>
            </Link>
            <Link to="/auth">
              <Button variant="hero" size="sm">
                <Zap className="w-4 h-4" />
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
