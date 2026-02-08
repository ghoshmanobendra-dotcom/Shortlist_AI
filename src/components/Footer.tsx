import { Link } from "react-router-dom";



const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center space-y-8">
          {/* Brand */}
          <div className="flex flex-col items-center space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex gap-0.5">
                <div className="w-2 h-5 bg-primary rounded-full" />
                <div className="w-2 h-5 bg-primary rounded-full" />
                <div className="w-2 h-5 bg-primary rounded-full" />
              </div>
              <span className="font-bold text-xl">ShortlistAI</span>
            </Link>
            <p className="text-muted-foreground text-center max-w-sm">
              Making recruiting faster, fairer, and smarter for everyone.
            </p>
          </div>



          <div className="flex flex-wrap justify-center gap-8 text-sm font-medium text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Screening AI</a>
            <Link to="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
            <a href="#contact" className="hover:text-foreground transition-colors">Contact</a>
          </div>

          {/* Copyright */}
          <div className="pt-8 text-sm text-muted-foreground/60">
            © 2024 ShortlistAI Inc. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
