import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Sparkles, TrendingUp, X, Save } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { format, subDays, eachDayOfInterval } from "date-fns";

interface ConfidenceLog {
  id: string;
  score: number;
  notes: string | null;
  reasons: string[] | null;
  created_at: string;
}

interface ConfidenceTrackerProps {
  onClose: () => void;
}

const reasons = [
  "Accomplished something", "Felt seen", "Helped someone", "Self-care",
  "Comparison", "Criticism", "Failure", "Exhaustion", "Social anxiety"
];

const ConfidenceTracker = ({ onClose }: ConfidenceTrackerProps) => {
  const [score, setScore] = useState([5]);
  const [notes, setNotes] = useState("");
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [logs, setLogs] = useState<ConfidenceLog[]>([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const { data, error } = await supabase
        .from("confidence_logs")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(30);

      if (error) throw error;
      setLogs(data || []);
    } catch (error) {
      console.error("Error fetching confidence logs:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleReason = (reason: string) => {
    setSelectedReasons(prev =>
      prev.includes(reason)
        ? prev.filter(r => r !== reason)
        : [...prev, reason]
    );
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Not authenticated");

      const { error } = await supabase.from("confidence_logs").insert({
        user_id: user.id,
        score: score[0],
        notes,
        reasons: selectedReasons,
      });

      if (error) throw error;

      toast({
        title: "Confidence logged",
        description: "Keep tracking — every day counts.",
      });
      
      setNotes("");
      setSelectedReasons([]);
      setScore([5]);
      fetchLogs();
    } catch (error: any) {
      toast({
        title: "Couldn't save",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  // Get last 7 days for chart
  const last7Days = eachDayOfInterval({
    start: subDays(new Date(), 6),
    end: new Date(),
  });

  const getScoreForDay = (date: Date) => {
    const dateKey = format(date, "yyyy-MM-dd");
    const dayLog = logs.find(log => 
      format(new Date(log.created_at), "yyyy-MM-dd") === dateKey
    );
    return dayLog?.score;
  };

  const getScoreEmoji = (score: number) => {
    if (score >= 8) return "✨";
    if (score >= 6) return "🌸";
    if (score >= 4) return "🌿";
    return "🌧️";
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "bg-chart-1";
    if (score >= 6) return "bg-chart-2";
    if (score >= 4) return "bg-chart-5/50";
    return "bg-muted";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-serif text-xl font-semibold">Confidence Tracker</h1>
              <p className="text-sm text-muted-foreground">Gentle check-ins with yourself</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Weekly Chart */}
        <div className="bg-card rounded-2xl p-6 mb-6 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-primary" />
            <span className="font-medium text-sm">Your Week</span>
          </div>
          <div className="flex justify-between gap-2">
            {last7Days.map((day) => {
              const dayScore = getScoreForDay(day);
              return (
                <div key={day.toISOString()} className="flex-1 flex flex-col items-center gap-2">
                  <div className="relative w-full h-24 flex items-end justify-center">
                    {dayScore ? (
                      <div 
                        className={`w-8 rounded-t-lg ${getScoreColor(dayScore)} transition-all`}
                        style={{ height: `${dayScore * 10}%` }}
                      />
                    ) : (
                      <div className="w-8 h-2 bg-muted/30 rounded" />
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{format(day, "EEE")}</span>
                  {dayScore && <span className="text-sm">{getScoreEmoji(dayScore)}</span>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Log Entry */}
        <div className="bg-card rounded-2xl p-6 mb-6 border border-border">
          <h3 className="font-semibold mb-4">How confident do you feel today?</h3>
          
          <div className="text-center mb-6">
            <span className="text-5xl">{getScoreEmoji(score[0])}</span>
            <p className="text-2xl font-serif font-semibold mt-2">{score[0]}/10</p>
          </div>

          <Slider
            value={score}
            onValueChange={setScore}
            max={10}
            min={1}
            step={1}
            className="mb-6"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Not great</span>
            <span>Feeling myself</span>
          </div>
        </div>

        {/* Reasons */}
        <div className="bg-card rounded-2xl p-6 mb-6 border border-border">
          <h3 className="font-semibold mb-4">What influenced this? (optional)</h3>
          <div className="flex flex-wrap gap-2">
            {reasons.map((reason) => (
              <button
                key={reason}
                onClick={() => toggleReason(reason)}
                className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                  selectedReasons.includes(reason)
                    ? "bg-primary text-primary-foreground"
                    : "bg-accent text-accent-foreground hover:bg-primary/20"
                }`}
              >
                {reason}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <Textarea
          placeholder="Any thoughts about your confidence today? (optional)"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="min-h-[100px] bg-card mb-6 resize-none"
        />

        {/* Actions */}
        <div className="flex gap-3 justify-end">
          <Button variant="ghost" onClick={onClose}>Close</Button>
          <Button variant="hero" onClick={handleSave} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? "Saving..." : "Log Today"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfidenceTracker;
