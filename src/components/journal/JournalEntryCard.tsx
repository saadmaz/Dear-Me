import { format } from "date-fns";
import { Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface JournalEntry {
  id: string;
  title: string | null;
  content: string | null;
  mood: string | null;
  emotions: string[] | null;
  is_comfort_mode: boolean | null;
  created_at: string;
}

interface JournalEntryCardProps {
  entry: JournalEntry;
  onClick: () => void;
  onDelete: () => void;
}

const moodEmojis: Record<string, string> = {
  Joyful: "💖",
  Calm: "🌸",
  Heavy: "🌧️",
  Stormy: "⚡",
};

const JournalEntryCard = ({ entry, onClick, onDelete }: JournalEntryCardProps) => {
  return (
    <div 
      className="group bg-card rounded-2xl border border-border p-6 hover:border-primary/30 hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          {entry.is_comfort_mode && (
            <Heart className="w-4 h-4 text-primary fill-primary/20" />
          )}
          {entry.mood && (
            <span className="text-lg">{moodEmojis[entry.mood] || "💭"}</span>
          )}
          <span className="text-xs text-muted-foreground">
            {format(new Date(entry.created_at), "MMM d, yyyy • h:mm a")}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
        </Button>
      </div>

      <h3 className="font-serif text-lg font-semibold mb-2 line-clamp-1">
        {entry.title || "Untitled Entry"}
      </h3>

      <p className="text-muted-foreground text-sm line-clamp-3 mb-4">
        {entry.content || "No content"}
      </p>

      {entry.emotions && entry.emotions.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {entry.emotions.slice(0, 3).map((emotion) => (
            <span 
              key={emotion}
              className="px-2 py-1 bg-accent text-accent-foreground text-xs rounded-full"
            >
              {emotion}
            </span>
          ))}
          {entry.emotions.length > 3 && (
            <span className="px-2 py-1 text-muted-foreground text-xs">
              +{entry.emotions.length - 3} more
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default JournalEntryCard;
