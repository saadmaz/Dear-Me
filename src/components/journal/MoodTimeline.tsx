import { useMemo } from "react";
import { format, subDays, eachDayOfInterval } from "date-fns";

interface MoodLog {
  id: string;
  mood: string;
  emotions: string[] | null;
  created_at: string;
}

interface MoodTimelineProps {
  moodLogs: MoodLog[];
}

const moodColors: Record<string, string> = {
  Joyful: "bg-chart-1",
  Calm: "bg-chart-2",
  Heavy: "bg-chart-5",
  Stormy: "bg-destructive/60",
};

const moodEmojis: Record<string, string> = {
  Joyful: "💖",
  Calm: "🌸",
  Heavy: "🌧️",
  Stormy: "⚡",
};

const MoodTimeline = ({ moodLogs }: MoodTimelineProps) => {
  const last7Days = useMemo(() => {
    const today = new Date();
    const weekAgo = subDays(today, 6);
    return eachDayOfInterval({ start: weekAgo, end: today });
  }, []);

  const moodsByDay = useMemo(() => {
    const map = new Map<string, MoodLog[]>();
    moodLogs.forEach(log => {
      const dateKey = format(new Date(log.created_at), "yyyy-MM-dd");
      const existing = map.get(dateKey) || [];
      map.set(dateKey, [...existing, log]);
    });
    return map;
  }, [moodLogs]);

  return (
    <div className="bg-card rounded-2xl border border-border p-6">
      <h3 className="font-serif text-lg font-semibold mb-4">Your Week</h3>
      
      <div className="flex justify-between gap-2">
        {last7Days.map((day) => {
          const dateKey = format(day, "yyyy-MM-dd");
          const dayMoods = moodsByDay.get(dateKey) || [];
          const primaryMood = dayMoods[0]?.mood;
          
          return (
            <div 
              key={dateKey} 
              className="flex-1 flex flex-col items-center gap-2"
            >
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                  primaryMood 
                    ? `${moodColors[primaryMood] || "bg-accent"} shadow-sm` 
                    : "bg-muted/50 border border-dashed border-border"
                }`}
              >
                {primaryMood ? (
                  <span className="text-lg">{moodEmojis[primaryMood] || "💭"}</span>
                ) : (
                  <span className="text-muted-foreground text-xs">—</span>
                )}
              </div>
              <span className="text-xs text-muted-foreground">
                {format(day, "EEE")}
              </span>
            </div>
          );
        })}
      </div>

      {moodLogs.length === 0 && (
        <p className="text-center text-sm text-muted-foreground mt-4">
          Start journaling to see your emotional patterns here.
        </p>
      )}
    </div>
  );
};

export default MoodTimeline;
