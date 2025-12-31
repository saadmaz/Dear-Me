import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Moon, Sparkles, Save, X, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface DreamFormProps {
  onClose: () => void;
  onSave: () => void;
}

const commonSymbols = [
  "Water", "Flying", "Falling", "Teeth", "House", "Animals", 
  "People", "Chase", "Death", "Baby", "School", "Lost", "Naked"
];

const DreamForm = ({ onClose, onSave }: DreamFormProps) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [symbols, setSymbols] = useState<string[]>([]);
  const [customSymbol, setCustomSymbol] = useState("");
  const [sleepQuality, setSleepQuality] = useState([5]);
  const [mood, setMood] = useState("");
  const [aiReflection, setAiReflection] = useState("");
  const [loadingAI, setLoadingAI] = useState(false);
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const toggleSymbol = (symbol: string) => {
    setSymbols(prev => 
      prev.includes(symbol) 
        ? prev.filter(s => s !== symbol)
        : [...prev, symbol]
    );
  };

  const addCustomSymbol = () => {
    if (customSymbol && !symbols.includes(customSymbol)) {
      setSymbols(prev => [...prev, customSymbol]);
      setCustomSymbol("");
    }
  };

  const getAIReflection = async () => {
    if (!content) {
      toast({
        title: "Please describe your dream first",
        description: "Share what happened in your dream so I can offer a reflection.",
      });
      return;
    }

    setLoadingAI(true);
    try {
      const { data, error } = await supabase.functions.invoke("gentle-ai", {
        body: {
          type: "dream_reflection",
          content,
          context: { symbols, mood },
        },
      });

      if (error) throw error;
      setAiReflection(data.reflection);
    } catch (error: any) {
      toast({
        title: "Couldn't get reflection",
        description: error.message || "Please try again in a moment.",
        variant: "destructive",
      });
    } finally {
      setLoadingAI(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("dream_entries").insert({
        user_id: user.id,
        title: title || `Dream - ${new Date().toLocaleDateString()}`,
        content,
        symbols,
        mood,
        ai_reflection: aiReflection,
        sleep_quality: sleepQuality[0],
      });

      if (error) throw error;

      toast({
        title: "Dream saved",
        description: "Your dream has been captured safely.",
      });
      onSave();
      onClose();
    } catch (error: any) {
      toast({
        title: "Couldn't save dream",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/30 to-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Moon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-semibold">Dream Decoder</h1>
              <p className="text-sm text-muted-foreground">Capture the whispers of your subconscious</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Sleep Quality */}
        <div className="bg-card rounded-2xl p-6 mb-6 border border-border">
          <Label className="mb-4 block">How did you sleep? ({sleepQuality[0]}/10)</Label>
          <Slider
            value={sleepQuality}
            onValueChange={setSleepQuality}
            max={10}
            min={1}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Restless</span>
            <span>Deeply rested</span>
          </div>
        </div>

        {/* Title */}
        <Input
          placeholder="Give this dream a name..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4 bg-card text-lg font-serif"
        />

        {/* Dream Content */}
        <Textarea
          placeholder="Describe your dream... What did you see? How did it feel?"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[200px] bg-card text-base leading-relaxed resize-none mb-6"
        />

        {/* Symbols */}
        <div className="bg-card rounded-2xl p-6 mb-6 border border-border">
          <Label className="mb-4 block">Symbols in your dream</Label>
          <div className="flex flex-wrap gap-2 mb-4">
            {commonSymbols.map((symbol) => (
              <button
                key={symbol}
                onClick={() => toggleSymbol(symbol)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  symbols.includes(symbol)
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-accent-foreground hover:bg-primary/20"
                }`}
              >
                {symbol}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              placeholder="Add custom symbol..."
              value={customSymbol}
              onChange={(e) => setCustomSymbol(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && addCustomSymbol()}
              className="bg-background"
            />
            <Button variant="outline" onClick={addCustomSymbol}>Add</Button>
          </div>
          {symbols.length > 0 && (
            <p className="text-sm text-muted-foreground mt-3">
              Selected: {symbols.join(", ")}
            </p>
          )}
        </div>

        {/* Mood upon waking */}
        <div className="bg-card rounded-2xl p-6 mb-6 border border-border">
          <Label className="mb-4 block">How did you feel when you woke?</Label>
          <div className="flex flex-wrap gap-2">
            {["Peaceful", "Confused", "Anxious", "Curious", "Sad", "Happy", "Neutral"].map((m) => (
              <button
                key={m}
                onClick={() => setMood(m)}
                className={`px-4 py-2 rounded-xl text-sm transition-all ${
                  mood === m
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-accent-foreground hover:bg-primary/20"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* AI Reflection */}
        <div className="bg-accent/50 rounded-2xl p-6 mb-6 border border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-medium">Gentle Reflection</span>
            </div>
            <Button 
              variant="soft" 
              size="sm" 
              onClick={getAIReflection}
              disabled={loadingAI}
            >
              {loadingAI ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Reflecting...
                </>
              ) : (
                "Get Reflection"
              )}
            </Button>
          </div>
          {aiReflection ? (
            <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
              {aiReflection}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground italic">
              Click "Get Reflection" to receive a gentle interpretation of your dream.
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="hero" onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : "Save Dream"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DreamForm;
