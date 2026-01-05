import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, MessageCircle, Heart, Loader2 } from "lucide-react"; // Added Loader2 for loading state
import { useToast } from "@/hooks/use-toast";
import NewsletterForm from "@/components/NewsletterForm";

const Contact = () => {
  // State to hold form values
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // State to track if the email was successfully sent
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // State to handle loading status (prevents double clicking)
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { toast } = useToast();

  // Handle the form submission logic
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Stop page refresh
    setIsSubmitting(true); // Start loading state

    try {
      // ---------------------------------------------------------
      // Example: "https://formspree.io/f/mqkznrbw"
      // ---------------------------------------------------------
      const response = await fetch("https://formspree.io/f/mykzvbwe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Success: Show the success message UI
        setIsSubmitted(true);
        toast({
          title: "Message sent successfully!",
          description: "We read every message with care. We'll get back to you soon.",
        });
        // Clear the form data
        setFormData({ name: "", email: "", message: "" });
      } else {
        // Error handling if Formspree rejects the request
        const data = await response.json();
        if (Object.hasOwn(data, 'errors')) {
            toast({
                title: "Error sending message",
                description: data.errors.map((error: any) => error.message).join(", "),
                variant: "destructive",
            });
        } else {
            throw new Error("Something went wrong");
        }
      }
    } catch (error) {
      // Network error handling
      toast({
        title: "Something went wrong",
        description: "Please try again later or email us directly.",
        variant: "destructive",
      });
    } finally {
      // Always turn off loading spinner, regardless of success or failure
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
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

      {/* Contact Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="grid md:grid-cols-5 gap-12">
              
              {/* Form Column */}
              <div className="md:col-span-3">
                {isSubmitted ? (
                  /* Success View: Shown only after successful email send */
                  <div className="text-center py-12 animate-in fade-in zoom-in duration-500">
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
                  /* Form View: The standard input fields */
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name <span className="text-red-500">*</span></Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="How should we address you?"
                        required // HTML5 validation makes this mandatory
                        disabled={isSubmitting} // Disable while sending
                        className="bg-card"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address <span className="text-red-500">*</span></Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        required // HTML5 validation makes this mandatory
                        disabled={isSubmitting}
                        className="bg-card"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Your Message <span className="text-red-500">*</span></Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Share what's on your heart..."
                        rows={6}
                        required // HTML5 validation makes this mandatory
                        disabled={isSubmitting}
                        className="bg-card resize-none"
                      />
                    </div>
                    
                    <Button 
                        type="submit" 
                        variant="hero" 
                        size="lg" 
                        className="w-full"
                        disabled={isSubmitting} // Prevent double clicks
                    >
                      {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                        </>
                      ) : (
                        "Send Message"
                      )}
                    </Button>
                    <p className="text-center text-sm text-muted-foreground">
                      We read every message with care.
                    </p>
                  </form>
                )}
              </div>

              {/* Contact Info Side Column */}
              <div className="md:col-span-2 space-y-8">
                <div className="p-6 bg-card rounded-2xl border border-border">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Email Us</h3>
                  </div>
                  <a 
                    href="mailto:rmccreations.info@gmail.com"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    rmccreations.info@gmail.com
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

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-b from-background to-accent/30">
        <div className="container mx-auto px-4">
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
};

export default Contact;