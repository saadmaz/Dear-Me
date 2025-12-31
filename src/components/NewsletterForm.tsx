import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const NewsletterForm = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      toast({
        title: "Welcome to our letters",
        description: "We'll send gentle reminders to nurture your inner world.",
      });
      setEmail("");
    }
  };

  return (
    <div className="bg-accent/50 rounded-2xl p-8 text-center max-w-md mx-auto">
      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
        <Mail className="w-6 h-6 text-primary" />
      </div>
      <h3 className="font-serif text-xl font-semibold mb-2">Letters for your inner world</h3>
      <p className="text-muted-foreground text-sm mb-6">
        Gentle prompts, reflections, and whispers of encouragement — delivered with care.
      </p>
      
      {isSubmitted ? (
        <div className="flex items-center justify-center gap-2 text-primary">
          <Heart className="w-4 h-4 fill-primary" />
          <span className="text-sm font-medium">Thank you for joining us</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-card"
            required
          />
          <Button type="submit" variant="hero">
            Subscribe
          </Button>
        </form>
      )}
    </div>
  );
};

export default NewsletterForm;
