import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Quote, X, Save, Plus, Trash2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface QuotesVaultProps {
  onClose: () => void;
  onSave: () => void;
  quotes: Array<{
    id: string;
    content: string;
    source: string | null;
    mood: string | null;
    person: string | null;
    moment: string | null;
    created_at: string;
  }>;
  onDelete: (id: string) => void;
}

const QuotesVault = ({ onClose, onSave, quotes, onDelete }: QuotesVaultProps) => {
  const [showForm, setShowForm] = useState(false);
  const [content, setContent] = useState("");
  const [source, setSource] = useState("");
  const [mood, setMood] = useState("");
  const [person, setPerson] = useState("");
  const [moment, setMoment] = useState("");
  const [saving, setSaving] = useState(false);
  const { toast } = useToast();

  const moods = ["Inspired", "Comforted", "Understood", "Motivated", "Peaceful", "Hopeful"];

  const handleSave = async () => {
    if (!content) {
      toast({
        title: "Add a quote first",
        description: "Share the words that moved you.",
      });
      return;
    }

    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("quotes").insert({
        user_id: user.id,
        content,
        source,
        mood,
        person,
        moment,
      });

      if (error) throw error;

      toast({
        title: "Quote saved",
        description: "Added to your vault of words.",
      });
      
      setContent("");
      setSource("");
      setMood("");
      setPerson("");
      setMoment("");
      setShowForm(false);
      onSave();
    } catch (error: any) {
      toast({
        title: "Couldn't save quote",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Quote className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-semibold">Lyrics & Quote Vault</h1>
              <p className="text-sm text-muted-foreground">Words that speak to your soul</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Add Button */}
        {!showForm && (
          <Button 
            variant="hero" 
            className="w-full mb-6"
            onClick={() => setShowForm(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Quote or Lyrics
          </Button>
        )}

        {/* Form */}
        {showForm && (
          <div className="bg-card rounded-2xl p-6 mb-6 border border-border">
            <Textarea
              placeholder="The words that moved you..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[120px] mb-4 resize-none bg-background"
            />
            
            <div className="grid sm:grid-cols-2 gap-4 mb-4">
              <div>
                <Label className="mb-2 block">Source (song, book, etc.)</Label>
                <Input
                  placeholder="Where is it from?"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                  className="bg-background"
                />
              </div>
              <div>
                <Label className="mb-2 block">Reminds you of someone?</Label>
                <Input
                  placeholder="A person, a memory..."
                  value={person}
                  onChange={(e) => setPerson(e.target.value)}
                  className="bg-background"
                />
              </div>
            </div>

            <div className="mb-4">
              <Label className="mb-2 block">The moment it found you</Label>
              <Input
                placeholder="When or where did you hear/read this?"
                value={moment}
                onChange={(e) => setMoment(e.target.value)}
                className="bg-background"
              />
            </div>

            <div className="mb-6">
              <Label className="mb-2 block">How did it make you feel?</Label>
              <div className="flex flex-wrap gap-2">
                {moods.map((m) => (
                  <button
                    key={m}
                    onClick={() => setMood(m)}
                    className={`px-3 py-1.5 rounded-full text-sm transition-all ${
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

            <div className="flex gap-3 justify-end">
              <Button variant="ghost" onClick={() => setShowForm(false)}>Cancel</Button>
              <Button variant="hero" onClick={handleSave} disabled={saving}>
                <Save className="w-4 h-4 mr-2" />
                {saving ? "Saving..." : "Save Quote"}
              </Button>
            </div>
          </div>
        )}

        {/* Quotes List */}
        {quotes.length === 0 ? (
          <div className="text-center py-12">
            <Quote className="w-12 h-12 text-primary/30 mx-auto mb-4" />
            <h3 className="font-serif text-lg font-semibold mb-2">Your vault is empty</h3>
            <p className="text-muted-foreground">
              Start collecting the words that move you.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {quotes.map((quote) => (
              <div 
                key={quote.id}
                className="bg-card rounded-2xl p-6 border border-border group hover:border-primary/30 transition-all"
              >
                <div className="flex justify-between items-start mb-3">
                  <Quote className="w-5 h-5 text-primary/50" />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                    onClick={() => onDelete(quote.id)}
                  >
                    <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                  </Button>
                </div>
                <p className="font-serif text-lg italic mb-3 leading-relaxed">
                  "{quote.content}"
                </p>
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground">
                  {quote.source && <span>— {quote.source}</span>}
                  {quote.person && <span>• Reminds me of: {quote.person}</span>}
                  {quote.mood && (
                    <span className="px-2 py-0.5 bg-accent rounded-full text-xs">
                      {quote.mood}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuotesVault;
