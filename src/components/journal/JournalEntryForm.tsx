import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Heart, Sparkles, Save, X } from "lucide-react";
import MoodWheel from "./MoodWheel";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface JournalEntryFormProps {
  onClose: () => void;
  onSave: () => void;
  editingEntry?: {
    id: string;
    title: string;
    content: string;
    mood: string;
    emotions: string[];
    is_comfort_mode: boolean;
  } | null;
}

const comfortPrompts = [
  "What's one small thing that brought you comfort today?",
  "If your feelings could speak, what would they say?",
  "What do you need most right now? Permission? Rest? Understanding?",
  "Write a gentle letter to yourself as if you were your own best friend.",
  "What would you tell a friend who felt exactly as you do now?",
];

const regularPrompts = [
  "What made you smile today?",
  "What are you grateful for in this moment?",
  "What did you learn about yourself today?",
  "What's something you're proud of?",
  "What would make tomorrow even better?",
];

const JournalEntryForm = ({ onClose, onSave, editingEntry }: JournalEntryFormProps) => {
  const [title, setTitle] = useState(editingEntry?.title || "");
  const [content, setContent] = useState(editingEntry?.content || "");
  const [selectedMood, setSelectedMood] = useState(editingEntry?.mood || "");
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>(editingEntry?.emotions || []);
  const [isComfortMode, setIsComfortMode] = useState(editingEntry?.is_comfort_mode || false);
  const [saving, setSaving] = useState(false);
  const [currentPrompt, setCurrentPrompt] = useState("");
  const { toast } = useToast();

  // Detect comfort mode based on emotions
  useEffect(() => {
    const comfortTriggers = ["Sad", "Anxious", "Lonely", "Overwhelmed", "Tired"];
    const shouldBeComfort = selectedEmotions.some(e => comfortTriggers.includes(e));
    setIsComfortMode(shouldBeComfort);
  }, [selectedEmotions]);

  // Set random prompt
  useEffect(() => {
    const prompts = isComfortMode ? comfortPrompts : regularPrompts;
    setCurrentPrompt(prompts[Math.floor(Math.random() * prompts.length)]);
  }, [isComfortMode]);

  const handleEmotionToggle = (emotion: string) => {
    setSelectedEmotions(prev => 
      prev.includes(emotion) 
        ? prev.filter(e => e !== emotion)
        : [...prev, emotion]
    );
  };

  const handleMoodSelect = (mood: string) => {
    setSelectedMood(mood);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const entryData = {
        user_id: user.id,
        title: title || `Entry - ${new Date().toLocaleDateString()}`,
        content,
        mood: selectedMood,
        emotions: selectedEmotions,
        is_comfort_mode: isComfortMode,
      };

      if (editingEntry) {
        const { error } = await supabase
          .from("journal_entries")
          .update(entryData)
          .eq("id", editingEntry.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("journal_entries")
          .insert(entryData);
        if (error) throw error;

        // Also log the mood
        if (selectedMood || selectedEmotions.length > 0) {
          await supabase.from("mood_logs").insert({
            user_id: user.id,
            mood: selectedMood || "Neutral",
            emotions: selectedEmotions,
            intensity: 5,
          });
        }
      }

      toast({
        title: editingEntry ? "Entry updated" : "Entry saved",
        description: "Your thoughts have been safely stored.",
      });
      onSave();
      onClose();
    } catch (error: any) {
      toast({
        title: "Couldn't save entry",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`min-h-screen ${isComfortMode ? "bg-accent/30" : "bg-background"} transition-colors duration-500`}>
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isComfortMode ? "bg-primary/20" : "bg-accent"}`}>
              {isComfortMode ? <Heart className="w-5 h-5 text-primary" /> : <Sparkles className="w-5 h-5 text-primary" />}
            </div>
            <div>
              <h1 className="font-serif text-xl font-semibold">
                {editingEntry ? "Edit Entry" : "New Entry"}
              </h1>
              {isComfortMode && (
                <p className="text-sm text-primary">Comfort mode activated 🫂</p>
              )}
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Comfort Mode Affirmation */}
        {isComfortMode && (
          <div className="bg-card rounded-2xl p-6 mb-8 border border-primary/20 soft-shadow">
            <p className="text-center text-muted-foreground italic">
              "It's okay to feel what you're feeling. You're safe here."
            </p>
          </div>
        )}

        {/* Mood Selection */}
        <div className="bg-card rounded-2xl p-6 mb-6 border border-border">
          <MoodWheel 
            selectedEmotions={selectedEmotions}
            onEmotionToggle={handleEmotionToggle}
            onMoodSelect={handleMoodSelect}
          />
        </div>

        {/* Title */}
        <Input
          placeholder="Give this entry a title (optional)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4 bg-card text-lg font-serif"
        />

        {/* Prompt */}
        <div className="bg-accent/50 rounded-xl p-4 mb-4">
          <p className="text-sm text-muted-foreground italic">{currentPrompt}</p>
        </div>

        {/* Content */}
        <Textarea
          placeholder="Dear me..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-[300px] bg-card text-base leading-relaxed resize-none mb-6"
        />

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button 
            variant="hero" 
            onClick={handleSave}
            disabled={saving}
          >
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : "Save Entry"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JournalEntryForm;
