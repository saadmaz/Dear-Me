import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Heart, Plus, LogOut, Search, Moon, Feather, Sparkles, Quote, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import JournalEntryCard from "@/components/journal/JournalEntryCard";
import JournalEntryForm from "@/components/journal/JournalEntryForm";
import MoodTimeline from "@/components/journal/MoodTimeline";
import DreamForm from "@/components/journal/DreamForm";
import LetterForm from "@/components/journal/LetterForm";
import ConfidenceTracker from "@/components/journal/ConfidenceTracker";
import ComfortModeOverlay from "@/components/journal/ComfortModeOverlay";
import WeeklyReflection from "@/components/journal/WeeklyReflection";
import QuotesVault from "@/components/journal/QuotesVault";
import type { User } from "@supabase/supabase-js";

type View = "home" | "entry" | "dream" | "letter" | "confidence" | "comfort" | "reflection" | "quotes";

const Journal = () => {
  const [user, setUser] = useState<User | null>(null);
  const [entries, setEntries] = useState<any[]>([]);
  const [moodLogs, setMoodLogs] = useState<any[]>([]);
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState<View>("home");
  const [editingEntry, setEditingEntry] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { navigate("/auth"); return; }
      setUser(session.user);
      fetchData();
    };
    checkAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) navigate("/auth");
      else setUser(session.user);
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [entriesRes, moodLogsRes, quotesRes] = await Promise.all([
        supabase.from("journal_entries").select("*").order("created_at", { ascending: false }),
        supabase.from("mood_logs").select("*").order("created_at", { ascending: false }).limit(30),
        supabase.from("quotes").select("*").order("created_at", { ascending: false }),
      ]);
      setEntries(entriesRes.data || []);
      setMoodLogs(moodLogsRes.data || []);
      setQuotes(quotesRes.data || []);
    } catch (error: any) {
      toast({ title: "Couldn't load data", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => { await supabase.auth.signOut(); navigate("/"); };

  const handleDeleteEntry = async (id: string) => {
    const { error } = await supabase.from("journal_entries").delete().eq("id", id);
    if (!error) { setEntries(entries.filter(e => e.id !== id)); toast({ title: "Entry deleted" }); }
  };

  const handleDeleteQuote = async (id: string) => {
    const { error } = await supabase.from("quotes").delete().eq("id", id);
    if (!error) { setQuotes(quotes.filter(q => q.id !== id)); toast({ title: "Quote deleted" }); }
  };

  const filteredEntries = entries.filter(entry => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return entry.title?.toLowerCase().includes(q) || entry.content?.toLowerCase().includes(q);
  });

  // Render different views
  if (currentView === "entry" || editingEntry) {
    return <JournalEntryForm onClose={() => { setCurrentView("home"); setEditingEntry(null); }} onSave={fetchData} editingEntry={editingEntry} />;
  }
  if (currentView === "dream") return <DreamForm onClose={() => setCurrentView("home")} onSave={fetchData} />;
  if (currentView === "letter") return <LetterForm onClose={() => setCurrentView("home")} onSave={fetchData} />;
  if (currentView === "confidence") return <ConfidenceTracker onClose={() => setCurrentView("home")} />;
  if (currentView === "comfort") return <ComfortModeOverlay onClose={() => setCurrentView("home")} />;
  if (currentView === "reflection") return <WeeklyReflection onClose={() => setCurrentView("home")} />;
  if (currentView === "quotes") return <QuotesVault onClose={() => setCurrentView("home")} onSave={fetchData} quotes={quotes} onDelete={handleDeleteQuote} />;

  const features = [
    { icon: Plus, label: "Journal", action: () => setCurrentView("entry"), color: "bg-primary/10 text-primary" },
    { icon: Moon, label: "Dreams", action: () => setCurrentView("dream"), color: "bg-chart-2/20 text-chart-2" },
    { icon: Feather, label: "Letters", action: () => setCurrentView("letter"), color: "bg-accent text-accent-foreground" },
    { icon: TrendingUp, label: "Confidence", action: () => setCurrentView("confidence"), color: "bg-chart-1/20 text-chart-1" },
    { icon: Quote, label: "Quotes", action: () => setCurrentView("quotes"), color: "bg-secondary/20 text-secondary" },
    { icon: Sparkles, label: "Weekly Reflection", action: () => setCurrentView("reflection"), color: "bg-primary/10 text-primary" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-card border-b border-border sticky top-0 z-40">
        <div className="container mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-primary fill-primary/20" />
            <span className="font-serif text-xl font-semibold">dear me</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setCurrentView("comfort")}>🫂 Comfort</Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}><LogOut className="w-4 h-4" /></Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="font-serif text-3xl font-bold mb-2">Welcome back 💕</h1>
          <p className="text-muted-foreground">This is your safe space.</p>
        </div>

        <MoodTimeline moodLogs={moodLogs} />

        {/* Feature Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 my-8">
          {features.map((f) => (
            <button key={f.label} onClick={f.action} className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-md transition-all">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${f.color}`}>
                <f.icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium">{f.label}</span>
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search entries..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 bg-card" />
        </div>

        {/* Entries */}
        {loading ? (
          <div className="text-center py-12"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" /></div>
        ) : filteredEntries.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-12 h-12 text-primary/30 mx-auto mb-4" />
            <h2 className="font-serif text-xl font-semibold mb-2">Start your journey</h2>
            <p className="text-muted-foreground mb-6">Every story begins with a single word.</p>
            <Button variant="hero" onClick={() => setCurrentView("entry")}><Plus className="w-4 h-4 mr-2" />Write Your First Entry</Button>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredEntries.map((entry) => (
              <JournalEntryCard key={entry.id} entry={entry} onClick={() => setEditingEntry(entry)} onDelete={() => handleDeleteEntry(entry.id)} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Journal;
