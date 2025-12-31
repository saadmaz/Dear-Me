import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Loader2, RefreshCw, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format, subDays } from "date-fns";

interface WeeklyReflectionProps {
  onClose: () => void;
}

const WeeklyReflection = ({ onClose }: WeeklyReflectionProps) => {
  const [reflection, setReflection] = useState("");
  const [loading, setLoading] = useState(false);
  const [weekData, setWeekData] = useState<string>("");
  const { toast } = useToast();

  useEffect(() => {
    fetchWeekData();
  }, []);

  const fetchWeekData = async () => {
    try {
      const weekAgo = subDays(new Date(), 7).toISOString();
      
      const [entriesRes, moodLogsRes] = await Promise.all([
        supabase
          .from("journal_entries")
          .select("title, content, mood, emotions, created_at")
          .gte("created_at", weekAgo)
          .order("created_at", { ascending: false }),
        supabase
          .from("mood_logs")
          .select("mood, emotions, created_at")
          .gte("created_at", weekAgo)
          .order("created_at", { ascending: false }),
      ]);

      const entries = entriesRes.data || [];
      const moodLogs = moodLogsRes.data || [];

      // Format data for AI
      let summary = "Weekly Journal Activity:\n\n";
      
      if (entries.length > 0) {
        summary += "Journal Entries:\n";
        entries.forEach(entry => {
          summary += `- ${format(new Date(entry.created_at), "MMM d")}: "${entry.title || "Untitled"}" - Mood: ${entry.mood || "unspecified"}, Emotions: ${entry.emotions?.join(", ") || "none"}\n`;
          if (entry.content) {
            summary += `  Excerpt: "${entry.content.substring(0, 100)}..."\n`;
          }
        });
      }

      if (moodLogs.length > 0) {
        summary += "\nMood Logs:\n";
        const moodCounts: Record<string, number> = {};
        const emotionCounts: Record<string, number> = {};
        
        moodLogs.forEach(log => {
          if (log.mood) moodCounts[log.mood] = (moodCounts[log.mood] || 0) + 1;
          log.emotions?.forEach(e => {
            emotionCounts[e] = (emotionCounts[e] || 0) + 1;
          });
        });

        summary += `Most common moods: ${Object.entries(moodCounts).sort((a, b) => b[1] - a[1]).map(([m, c]) => `${m} (${c}x)`).join(", ")}\n`;
        summary += `Most felt emotions: ${Object.entries(emotionCounts).sort((a, b) => b[1] - a[1]).slice(0, 5).map(([e, c]) => `${e} (${c}x)`).join(", ")}\n`;
      }

      if (entries.length === 0 && moodLogs.length === 0) {
        summary = "No journal entries or mood logs this week.";
      }

      setWeekData(summary);
    } catch (error) {
      console.error("Error fetching week data:", error);
    }
  };

  const generateReflection = async () => {
    if (!weekData || weekData.includes("No journal entries")) {
      toast({
        title: "Not enough data",
        description: "Start journaling this week to get a reflection!",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("gentle-ai", {
        body: {
          type: "weekly_reflection",
          content: weekData,
        },
      });

      if (error) throw error;
      setReflection(data.reflection);
    } catch (error: any) {
      toast({
        title: "Couldn't generate reflection",
        description: error.message || "Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-accent/30 to-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-semibold">Weekly Reflection</h1>
              <p className="text-sm text-muted-foreground">A gentle look at your emotional week</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Info Card */}
        <div className="bg-card rounded-2xl p-6 mb-6 border border-border">
          <p className="text-sm text-muted-foreground leading-relaxed">
            This reflection is generated based on your journal entries and mood logs from the past 7 days. 
            It's designed to help you notice patterns and celebrate your growth — without judgment.
          </p>
        </div>

        {/* Reflection */}
        {reflection ? (
          <div className="bg-card rounded-2xl p-8 mb-6 border border-primary/20 soft-shadow">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-semibold">Your Weekly Reflection</span>
            </div>
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {reflection}
            </p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="mt-6"
              onClick={generateReflection}
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
              Generate another
            </Button>
          </div>
        ) : (
          <div className="bg-card rounded-2xl p-12 mb-6 border border-border text-center">
            <Sparkles className="w-12 h-12 text-primary/30 mx-auto mb-4" />
            <h3 className="font-serif text-lg font-semibold mb-2">
              Ready for your reflection?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              I'll gently summarize your emotional patterns from this week — 
              observations only, never judgment.
            </p>
            <Button 
              variant="hero" 
              onClick={generateReflection}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Reflecting on your week...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate Reflection
                </>
              )}
            </Button>
          </div>
        )}

        {/* Close */}
        <div className="text-center">
          <Button variant="ghost" onClick={onClose}>
            Back to Journal
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WeeklyReflection;
