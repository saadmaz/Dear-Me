import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-lg font-serif font-semibold text-foreground">
            <Heart className="w-4 h-4 text-primary fill-primary/20" />
            <span>dearme</span>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <Link to="/about" className="hover:text-primary transition-colors">About</Link>
            <Link to="/founder" className="hover:text-primary transition-colors">Founder</Link>
            <Link to="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </nav>
          
          <p className="text-sm text-muted-foreground">
            © 2024 dearme. Made with love.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
