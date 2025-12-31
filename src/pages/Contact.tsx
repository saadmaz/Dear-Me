import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageCircle, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import NewsletterForm from "@/components/NewsletterForm";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    toast({
      title: "Message sent",
      description: "We read every message with care. We'll get back to you soon.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-accent/50 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            We're here to listen. Share your thoughts, questions, or just say hello.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="grid md:grid-cols-5 gap-12">
              {/* Form */}
              <div className="md:col-span-3">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Heart className="w-8 h-8 text-primary fill-primary/20" />
                    </div>
                    <h2 className="font-serif text-2xl font-semibold mb-3">Thank you</h2>
                    <p className="text-muted-foreground">
                      Your message has been received. We'll respond with care and thoughtfulness.
                    </p>
                    <Button 
                      variant="soft" 
                      className="mt-6"
                      onClick={() => setIsSubmitted(false)}
                    >
                      Send another message
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="How should we address you?"
                        required
                        className="bg-card"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        required
                        className="bg-card"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Your Message</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Share what's on your heart..."
                        rows={6}
                        required
                        className="bg-card resize-none"
                      />
                    </div>
                    <Button type="submit" variant="hero" size="lg" className="w-full">
                      Send Message
                    </Button>
                    <p className="text-center text-sm text-muted-foreground">
                      We read every message with care.
                    </p>
                  </form>
                )}
              </div>

              {/* Contact Info */}
              <div className="md:col-span-2 space-y-8">
                <div className="p-6 bg-card rounded-2xl border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Email Us</h3>
                  </div>
                  <a 
                    href="mailto:support@dearme.app"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    support@dearme.app
                  </a>
                </div>

                <div className="p-6 bg-card rounded-2xl border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <MessageCircle className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Response Time</h3>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    We typically respond within 24-48 hours. 
                    Your patience means the world to us.
                  </p>
                </div>

                <div className="p-6 bg-accent/50 rounded-2xl">
                  <p className="text-sm text-muted-foreground italic leading-relaxed">
                    "Every message we receive is treated with the same care and respect 
                    we hope you feel when using dearme."
                  </p>
                  <p className="text-sm font-medium mt-3">— The dearme Team</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20 bg-gradient-to-b from-background to-accent/30">
        <div className="container mx-auto px-4">
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
};

export default Contact;
