import { Link } from "react-router-dom";
import { Heart } from "lucide-react";

const Footer = () => {
  return (
    /* Footer Container:
      - bg-card: Sets the background color to the theme's card color.
      - border-t border-border: Adds a subtle border at the top.
      - py-12: Adds vertical padding (top and bottom) for spacing.
    */
    <footer className="bg-card border-t border-border py-12">
      
      {/* Inner Container:
        - container mx-auto: Centers the content on large screens.
        - px-4: Adds horizontal padding on mobile screens.
      */}
      <div className="container mx-auto px-4">
        
        {/* Flex Layout:
          - flex flex-col: Stacks items vertically.
          - items-center: Centers items horizontally.
          - gap-4: Adds space between the Logo and the Text.
        */}
        <div className="flex flex-col items-center justify-center gap-4">
          
          {/* --- Logo Section --- */}
          <div className="flex items-center gap-2 text-lg font-serif font-semibold text-foreground">
            <Heart className="w-4 h-4 text-primary fill-primary/20" />
            <span>dearme</span>
          </div>
          
          {/* --- Combined Copyright & Credit Section --- */}
          <p className="text-sm text-muted-foreground text-center">
            © 2024 dearme. Designed & Developed by{" "}
            
            {/* The External Link to your Portfolio:
              - target="_blank": Opens the link in a new tab.
              - rel="noopener noreferrer": Security best practice for external links.
              - hover:text-primary: Highlight color on hover.
            */}
            <a 
              href="https://saadmaz.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-medium hover:text-primary transition-colors hover:underline"
            >
              Saad Mazhar
            </a>
          </p>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;