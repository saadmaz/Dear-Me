import { Heart, Mail } from "lucide-react";
import NewsletterForm from "@/components/NewsletterForm";

const Founder = () => {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-gradient-to-b from-accent/50 to-background">
        <div className="container mx-auto px-4 text-center">
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
            Founder
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold">
            The Heart Behind dearme
          </h1>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Text */}
              <div className="order-2 md:order-1">
                <h2 className="text-3xl font-serif font-bold mb-6">
                  Hello, I am <span className="text-primary">Rachel</span>.
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    For as long as I can remember, I've been the girl with too many feelings 
                    and nowhere safe to put them. I journaled in secret, scribbling thoughts 
                    I couldn't say out loud, trying to make sense of a world that often felt 
                    overwhelming.
                  </p>
                  <p>
                    I always wished for a space that understood me — something more than 
                    blank pages, something that felt like a friend who would never judge, 
                    never rush me, never make me feel "too much."
                  </p>
                  <p>
                    That wish became dearme.
                  </p>
                  <p>
                    I created this sanctuary because I believe every girl deserves a place 
                    where her emotions are valid, her dreams are honored, and her growth 
                    happens gently — without pressure, without performance, without fear.
                  </p>
                </div>
              </div>
              
              {/* Photo Placeholder */}
              <div className="order-1 md:order-2 flex justify-center">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-accent border-4 border-primary/20 flex items-center justify-center">
                  <Heart className="w-20 h-20 text-primary/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-8 text-center">
              My Philosophy
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                I believe that mental wellness isn't about fixing yourself — it's about 
                befriending yourself. It's about learning to sit with your emotions instead 
                of running from them, and finding beauty in the messy, nonlinear journey 
                of becoming who you're meant to be.
              </p>
              <p>
                Journaling, for me, has always been an act of self-love. Not the Instagram 
                kind with pretty aesthetics and perfect handwriting, but the real kind — 
                the 3 AM scribbles, the tear-stained pages, the moments of unexpected 
                clarity that come from simply putting words to feelings.
              </p>
              <p>
                With dearme, I wanted to create something that honors that sacred practice 
                while making it more accessible, more beautiful, and more supportive. 
                Every feature is designed with intention, every color chosen with care, 
                every word written with love.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-8 text-center">
              My Vision for dearme
            </h2>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                I dream of a world where every girl has access to a space that makes her 
                feel seen, heard, and whole. A world where emotional intelligence is 
                celebrated, where vulnerability is strength, and where self-discovery 
                is a lifelong adventure rather than a destination.
              </p>
              <p>
                dearme is just the beginning. As we grow, I want to build a community 
                of gentle souls who support each other's journeys, share their wisdom, 
                and remind each other that our feelings are not flaws — they're gifts.
              </p>
              <p className="text-foreground font-medium">
                Thank you for being here. Thank you for trusting me with your inner world. 
                I promise to hold that trust with the utmost care.
              </p>
            </div>
            
            <div className="mt-12 text-center">
              <p className="font-serif text-xl text-primary italic">With all my love,</p>
              <p className="font-serif text-2xl font-semibold mt-2">Rachel</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <h3 className="font-serif text-2xl font-semibold mb-4">Say Hello</h3>
            <p className="text-muted-foreground mb-6">
              I'd love to hear from you. Share your story, your thoughts, or just send a wave.
            </p>
            <a 
              href="mailto:hello@dearme.app"
              className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
            >
              <Mail className="w-5 h-5" />
              <span>hello@dearme.app</span>
            </a>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
};

export default Founder;
