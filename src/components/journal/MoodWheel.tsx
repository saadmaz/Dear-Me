import { useState } from "react";
import { cn } from "@/lib/utils";

const emotions = [
  { name: "Happy", color: "bg-chart-1", emoji: "😊" },
  { name: "Peaceful", color: "bg-chart-2", emoji: "😌" },
  { name: "Loved", color: "bg-chart-3", emoji: "🥰" },
  { name: "Excited", color: "bg-chart-4", emoji: "🤩" },
  { name: "Grateful", color: "bg-primary/60", emoji: "🙏" },
  { name: "Hopeful", color: "bg-accent", emoji: "✨" },
  { name: "Anxious", color: "bg-muted", emoji: "😰" },
  { name: "Sad", color: "bg-chart-5", emoji: "😢" },
  { name: "Angry", color: "bg-destructive/60", emoji: "😤" },
  { name: "Lonely", color: "bg-secondary/60", emoji: "😔" },
  { name: "Overwhelmed", color: "bg-muted-foreground/30", emoji: "😵" },
  { name: "Tired", color: "bg-border", emoji: "😴" },
];

interface MoodWheelProps {
  selectedEmotions: string[];
  onEmotionToggle: (emotion: string) => void;
  onMoodSelect?: (mood: string) => void;
}

const MoodWheel = ({ selectedEmotions, onEmotionToggle, onMoodSelect }: MoodWheelProps) => {
  const [hoveredEmotion, setHoveredEmotion] = useState<string | null>(null);

  const primaryMoods = [
    { name: "Joyful", emoji: "💖", emotions: ["Happy", "Excited", "Grateful", "Loved"] },
    { name: "Calm", emoji: "🌸", emotions: ["Peaceful", "Hopeful", "Grateful"] },
    { name: "Heavy", emoji: "🌧️", emotions: ["Sad", "Lonely", "Tired"] },
    { name: "Stormy", emoji: "⚡", emotions: ["Anxious", "Angry", "Overwhelmed"] },
  ];

  return (
    <div className="space-y-6">
      {/* Primary Mood Selection */}
      <div className="text-center">
        <p className="text-sm text-muted-foreground mb-4">How does your heart feel right now?</p>
        <div className="flex flex-wrap justify-center gap-3">
          {primaryMoods.map((mood) => (
            <button
              key={mood.name}
              onClick={() => onMoodSelect?.(mood.name)}
              className={cn(
                "px-6 py-3 rounded-2xl border-2 transition-all duration-300",
                "hover:scale-105 hover:shadow-lg",
                selectedEmotions.some(e => mood.emotions.includes(e))
                  ? "border-primary bg-primary/10 shadow-md"
                  : "border-border bg-card hover:border-primary/50"
              )}
            >
              <span className="text-2xl mr-2">{mood.emoji}</span>
              <span className="font-medium">{mood.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Emotion Grid */}
      <div className="pt-4 border-t border-border">
        <p className="text-sm text-muted-foreground mb-4 text-center">
          Or choose specific emotions (select all that apply)
        </p>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
          {emotions.map((emotion) => (
            <button
              key={emotion.name}
              onClick={() => onEmotionToggle(emotion.name)}
              onMouseEnter={() => setHoveredEmotion(emotion.name)}
              onMouseLeave={() => setHoveredEmotion(null)}
              className={cn(
                "p-3 rounded-xl border-2 transition-all duration-300",
                "flex flex-col items-center gap-1",
                selectedEmotions.includes(emotion.name)
                  ? "border-primary bg-primary/10 scale-105 shadow-md"
                  : "border-border bg-card hover:border-primary/30 hover:scale-102",
                hoveredEmotion === emotion.name && "shadow-lg"
              )}
            >
              <span className="text-xl">{emotion.emoji}</span>
              <span className="text-xs font-medium">{emotion.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected emotions display */}
      {selectedEmotions.length > 0 && (
        <div className="text-center pt-4">
          <p className="text-sm text-muted-foreground">
            You're feeling: <span className="text-primary font-medium">{selectedEmotions.join(", ")}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default MoodWheel;
