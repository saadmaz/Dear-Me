import { Heart, Shield, Sparkles, Leaf } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

const About = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-accent/50 to-background">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6">
            The Soul of <span className="text-primary">dearme</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A digital journal that listens, grows, and holds space for who you truly are.
          </p>
        </div>
      </section>

      {/* What is dearme */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-6 text-center">What is dearme?</h2>
            <div className="prose prose-lg text-muted-foreground leading-relaxed text-center">
              <p>
                dearme is more than a journaling app — it's a sanctuary for your inner world. 
                A place where your thoughts can breathe, your emotions can be felt without judgment, 
                and your growth happens gently, at your own pace.
              </p>
              <p className="mt-4">
                We created dearme because we believe that self-reflection shouldn't feel like 
                another task on your to-do list. It should feel like coming home to yourself — 
                warm, safe, and beautifully yours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why different */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-serif font-bold mb-12 text-center">
            Why dearme is different
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Not streak-based</h3>
              <p className="text-muted-foreground">
                No guilt trips. No pressure to write every day. Come when you need to, 
                leave when you're ready.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Not productivity-focused</h3>
              <p className="text-muted-foreground">
                This isn't about optimizing your life. It's about understanding your heart 
                and honoring your journey.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-serif text-xl font-semibold mb-3">Built for emotions</h3>
              <p className="text-muted-foreground">
                Every feature is designed to help you feel, process, and grow — 
                not perform or achieve.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Promise */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-12 text-center">Our Promise</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex items-start gap-4 p-6 bg-card rounded-2xl border border-border">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Shield className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Privacy First</h3>
                  <p className="text-muted-foreground text-sm">
                    Your journal is yours alone. We use end-to-end encryption and never 
                    share your data with anyone.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-card rounded-2xl border border-border">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Heart className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Complete Safety</h3>
                  <p className="text-muted-foreground text-sm">
                    Panic lock features, offline-only entries, and thoughtful design 
                    that prioritizes your emotional security.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-card rounded-2xl border border-border">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Soft Growth</h3>
                  <p className="text-muted-foreground text-sm">
                    No harsh metrics or comparisons. Your growth is measured in 
                    moments of clarity, not productivity scores.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-6 bg-card rounded-2xl border border-border">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">No Pressure</h3>
                  <p className="text-muted-foreground text-sm">
                    Write when you want. Reflect when you're ready. This space adapts 
                    to you, not the other way around.
                  </p>
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

export default About;
