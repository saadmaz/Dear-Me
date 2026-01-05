import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, Lock, Feather, Moon, Palette } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const Index = () => {
  const features = [
    {
      icon: Heart,
      title: "Emotion Mapping",
      description: "Understand your feelings through interactive mood wheels and gentle reflection prompts.",
    },
    {
      icon: Moon,
      title: "Dream Decoder",
      description: "Capture your dreams and discover the symbols that speak to your subconscious.",
    },
    {
      icon: Feather,
      title: "Letters You'll Never Send",
      description: "Write the words you need to release, in complete safety and privacy.",
    },
    {
      icon: Palette,
      title: "Digital Scrapbook",
      description: "Create beautiful visual journals with stickers, frames, and freeform layouts.",
    },
    {
      icon: Lock,
      title: "Completely Private",
      description: "Your thoughts are sacred. We believe in absolute privacy and security.",
    },
    {
      icon: Sparkles,
      title: "Gentle AI Companion",
      description: "Soft reflections and personalized prompts that grow with you — never pushy.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/50 to-background" />
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/80 rounded-full text-sm text-accent-foreground mb-8">
              <Heart className="w-4 h-4 fill-primary text-primary" />
              <span>A safe space for your thoughts</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-foreground leading-tight mb-6">
              Dear me,<br />
              <span className="text-primary">This is where I come to feel safe.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-10 leading-relaxed">
              A digital journal that listens, grows, and holds space for your emotions
              without judgment, pressure, or performance.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/auth?signup=true">Begin Your Journey</Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              A sanctuary for your soul
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              dearme is designed to help you explore your emotions, dreams, and growth
              at your own pace, in your own way.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-8 rounded-2xl bg-background border border-border hover:border-primary/30 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-b from-background to-accent/30">
        <div className="container mx-auto px-4 text-center">
          <Heart className="w-12 h-12 text-primary fill-primary/20 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Your story matters
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            This is not about productivity. This is about you — your feelings,
            your dreams, your beautiful, messy, evolving self.
          </p>
          <Button variant="hero" size="xl" asChild>
            <Link to="/auth?signup=true">Start Journaling Free</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
