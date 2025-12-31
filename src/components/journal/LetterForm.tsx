import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Heart, Lock, Archive, Flame, X, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface LetterFormProps {
  onClose: () => void;
  onSave: () => void;
}

const LetterForm = ({ onClose, onSave }: LetterFormProps) => {
  const [recipientName, setRecipientName] = useState("");
  const [content, setContent] = useState("");
  const [mood, setMood] = useState("");
  const [saving, setSaving] = useState(false);
  const [burning, setBurning] = useState(false);
  const [burnComplete, setBurnComplete] = useState(false);
  const { toast } = useToast();

  const moods = ["Healing", "Angry", "Sad", "Grateful", "Forgiving", "Closure"];

  const handleSave = async (options?: { lock?: boolean; archive?: boolean; burn?: boolean }) => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("letters").insert({
        user_id: user.id,
        recipient_name: recipientName,
        content,
        mood,
        is_locked: options?.lock || false,
        is_archived: options?.archive || false,
        is_burned: options?.burn || false,
        burned_at: options?.burn ? new Date().toISOString() : null,
      });

      if (error) throw error;

      if (options?.burn) {
        toast({
          title: "Letter released",
          description: "Your words have been symbolically burned. May they bring you peace.",
        });
      } else {
        toast({
          title: "Letter saved",
          description: options?.lock ? "Your letter is safely locked away." : "Your letter has been saved.",
        });
      }
      onSave();
      onClose();
    } catch (error: any) {
      toast({
        title: "Couldn't save letter",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleBurn = () => {
    if (!content) {
      toast({
        title: "Write something first",
        description: "Pour your heart out, then let it go.",
      });
      return;
    }
    setBurning(true);
    setTimeout(() => {
      setBurnComplete(true);
      setTimeout(() => {
        handleSave({ burn: true });
      }, 1000);
    }, 3000);
  };

  if (burning) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className={cn(
          "text-center transition-all duration-1000",
          burnComplete ? "opacity-0 scale-50" : "opacity-100"
        )}>
          <div className={cn(
            "relative mb-8 transition-all",
            burnComplete ? "scale-0" : "animate-pulse"
          )}>
            <div className="w-64 h-80 bg-card rounded-lg border border-border mx-auto relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-orange-500/80 via-red-500/60 to-transparent animate-pulse" />
              <div className="p-6 relative z-10">
                <p className="text-sm text-muted-foreground font-serif italic line-clamp-6">
                  {content.substring(0, 200)}...
                </p>
              </div>
            </div>
            <Flame className="w-16 h-16 text-orange-500 mx-auto mt-4 animate-bounce" />
          </div>
          <p className="font-serif text-xl text-muted-foreground">
            {burnComplete ? "Released with love..." : "Letting go..."}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-semibold">Letters You'll Never Send</h1>
              <p className="text-sm text-muted-foreground">Write the words you need to release</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Recipient */}
        <div className="mb-6">
          <Input
            placeholder="Dear..."
            value={recipientName}
            onChange={(e) => setRecipientName(e.target.value)}
            className="bg-card text-lg font-serif"
          />
        </div>

        {/* Content */}
        <Textarea
          placeholder="Write what you need to say... No one will ever see this but you."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[300px] bg-card text-base leading-relaxed resize-none mb-6"
        />

        {/* Mood */}
        <div className="mb-8">
          <p className="text-sm text-muted-foreground mb-3">What is this letter about?</p>
          <div className="flex flex-wrap gap-2">
            {moods.map((m) => (
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

        {/* Actions */}
        <div className="bg-card rounded-2xl p-6 border border-border">
          <p className="text-sm text-muted-foreground mb-4 text-center">
            What would you like to do with this letter?
          </p>
          <div className="grid sm:grid-cols-3 gap-3">
            <Button 
              variant="outline" 
              className="flex-col h-auto py-4"
              onClick={() => handleSave({ lock: true })}
              disabled={saving}
            >
              <Lock className="w-5 h-5 mb-2" />
              <span>Lock Away</span>
              <span className="text-xs text-muted-foreground">Keep it private</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex-col h-auto py-4"
              onClick={() => handleSave({ archive: true })}
              disabled={saving}
            >
              <Archive className="w-5 h-5 mb-2" />
              <span>Archive</span>
              <span className="text-xs text-muted-foreground">Store for later</span>
            </Button>
            <Button 
              variant="outline" 
              className="flex-col h-auto py-4 border-orange-200 hover:bg-orange-50 hover:border-orange-300"
              onClick={handleBurn}
              disabled={saving}
            >
              <Flame className="w-5 h-5 mb-2 text-orange-500" />
              <span className="text-orange-600">Burn</span>
              <span className="text-xs text-muted-foreground">Let it go forever</span>
            </Button>
          </div>
        </div>

        {/* Simple Save */}
        <div className="flex gap-3 justify-end mt-6">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button variant="hero" onClick={() => handleSave()} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : "Just Save"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LetterForm;
