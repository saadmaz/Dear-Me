import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Heart, X, Loader2, Wind } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface ComfortModeOverlayProps {
  onClose: () => void;
  currentMood?: string;
}

const affirmations = [
  "It's okay to feel what you're feeling. You're safe here.",
  "You are not alone. Everyone struggles sometimes.",
  "This feeling is temporary. You've gotten through hard things before.",
  "Be gentle with yourself today. You deserve kindness.",
  "It's okay to take things slowly. There's no rush.",
  "Your feelings are valid. You matter.",
];

const ComfortModeOverlay = ({ onClose, currentMood }: ComfortModeOverlayProps) => {
  const [currentAffirmation, setCurrentAffirmation] = useState(affirmations[0]);
  const [groundingExercise, setGroundingExercise] = useState("");
  const [loadingExercise, setLoadingExercise] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [breathCount, setBreathCount] = useState(0);
  const [showBreathing, setShowBreathing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAffirmation(affirmations[Math.floor(Math.random() * affirmations.length)]);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (showBreathing) {
      const breathCycle = () => {
        setBreathPhase("inhale");
        setTimeout(() => setBreathPhase("hold"), 4000);
        setTimeout(() => setBreathPhase("exhale"), 7000);
        setTimeout(() => setBreathCount(c => c + 1), 11000);
      };

      breathCycle();
      const interval = setInterval(breathCycle, 11000);
      return () => clearInterval(interval);
    }
  }, [showBreathing]);

  const fetchGroundingExercise = async () => {
    setLoadingExercise(true);
    try {
      const { data, error } = await supabase.functions.invoke("gentle-ai", {
        body: {
          type: "grounding_exercise",
          content: currentMood || "anxious",
        },
      });

      if (error) throw error;
      setGroundingExercise(data.reflection);
    } catch (error) {
      setGroundingExercise(`1. Take a deep breath and feel your feet on the ground.
2. Notice 5 things you can see around you.
3. Touch something soft and focus on how it feels.
4. Listen for 3 sounds in your environment.
5. Take one more deep breath and thank yourself for this moment.`);
    } finally {
      setLoadingExercise(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-accent via-accent/90 to-accent/80 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8 max-w-2xl h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary fill-primary/30" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-semibold">Comfort Mode</h1>
              <p className="text-sm text-muted-foreground">Take all the time you need</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Affirmation */}
        <div className="bg-card/80 rounded-3xl p-8 mb-6 border border-primary/20 text-center soft-shadow">
          <p className="font-serif text-xl text-foreground leading-relaxed transition-opacity duration-500">
            "{currentAffirmation}"
          </p>
        </div>

        {/* Breathing Exercise */}
        {showBreathing ? (
          <div className="bg-card/80 rounded-3xl p-8 mb-6 border border-border text-center">
            <div className="relative w-32 h-32 mx-auto mb-6">
              <div 
                className={`absolute inset-0 rounded-full bg-primary/20 transition-all duration-[4000ms] ${
                  breathPhase === "inhale" ? "scale-100" : 
                  breathPhase === "hold" ? "scale-100" : "scale-75"
                }`}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Wind className="w-10 h-10 text-primary" />
              </div>
            </div>
            <p className="text-xl font-serif mb-2">
              {breathPhase === "inhale" && "Breathe in..."}
              {breathPhase === "hold" && "Hold..."}
              {breathPhase === "exhale" && "Breathe out..."}
            </p>
            <p className="text-sm text-muted-foreground">
              {breathCount > 0 && `${breathCount} breath${breathCount > 1 ? "s" : ""} completed`}
            </p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-4"
              onClick={() => setShowBreathing(false)}
            >
              Stop breathing exercise
            </Button>
          </div>
        ) : (
          <Button 
            variant="soft" 
            className="mb-6"
            onClick={() => setShowBreathing(true)}
          >
            <Wind className="w-4 h-4 mr-2" />
            Start Breathing Exercise
          </Button>
        )}

        {/* Grounding Exercise */}
        <div className="bg-card/80 rounded-3xl p-6 mb-6 border border-border flex-1">
          {groundingExercise ? (
            <div>
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Heart className="w-4 h-4 text-primary" />
                Grounding Exercise
              </h3>
              <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                {groundingExercise}
              </p>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center">
              <Button 
                variant="outline" 
                onClick={fetchGroundingExercise}
                disabled={loadingExercise}
              >
                {loadingExercise ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating something gentle...
                  </>
                ) : (
                  "Get a Grounding Exercise"
                )}
              </Button>
            </div>
          )}
        </div>

        {/* Exit */}
        <div className="text-center">
          <Button variant="hero" onClick={onClose}>
            I'm ready to continue
          </Button>
          <p className="text-sm text-muted-foreground mt-3">
            No pressure. Take your time.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ComfortModeOverlay;
