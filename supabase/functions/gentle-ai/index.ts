import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, content, context } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = "";
    let userPrompt = "";

    switch (type) {
      case "dream_reflection":
        systemPrompt = `You are a gentle, compassionate dream interpreter for a journaling app called "dearme". 
Your tone is warm, curious, and non-judgmental — like a wise friend sharing insights over tea.

Guidelines:
- Keep responses to 2-3 short paragraphs
- Use soft, inviting language
- Offer possible meanings but never be prescriptive
- Focus on emotions and personal growth themes
- End with a gentle, open-ended question for reflection
- Never use clinical or scary language
- Be encouraging and validating`;
        userPrompt = `Please offer a gentle reflection on this dream:

Dream: ${content}
${context?.symbols ? `Symbols noticed: ${context.symbols.join(", ")}` : ""}
${context?.mood ? `Dreamer's mood upon waking: ${context.mood}` : ""}`;
        break;

      case "weekly_reflection":
        systemPrompt = `You are a gentle emotional companion for a journaling app called "dearme".
You summarize weekly emotional patterns with warmth and without judgment.

Guidelines:
- Be observational, never prescriptive
- Celebrate small wins and growth
- Acknowledge difficult emotions with compassion
- Use phrases like "I noticed..." or "It seems like..."
- Keep it to 2-3 short paragraphs
- End with an encouraging note about self-awareness
- Never suggest the user "should" feel differently`;
        userPrompt = `Please provide a gentle weekly reflection based on these journal entries and moods:

${content}

Focus on patterns, growth moments, and offer compassionate observations.`;
        break;

      case "personalized_prompt":
        systemPrompt = `You are creating personalized journaling prompts for "dearme", a gentle journaling app.
Generate 3 prompts based on the user's recent emotional patterns.

Guidelines:
- Make prompts open-ended and exploratory
- Match the emotional tone (gentle for heavy moods, celebratory for joyful)
- Focus on self-discovery, not productivity
- Use "you" language to feel personal
- Keep each prompt to 1-2 sentences`;
        userPrompt = `Based on these recent moods and emotions, create 3 personalized journal prompts:

Recent moods: ${content}
${context?.emotions ? `Frequent emotions: ${context.emotions.join(", ")}` : ""}`;
        break;

      case "grounding_exercise":
        systemPrompt = `You are a calm, soothing voice guiding someone through a brief grounding exercise.
This is for "dearme", a gentle journaling app's comfort mode.

Guidelines:
- Keep it very short (3-4 steps maximum)
- Use present tense and soft language
- Focus on breath, body, and immediate senses
- Be reassuring and warm
- Format as a simple numbered list`;
        userPrompt = `Create a brief, gentle grounding exercise for someone feeling ${content || "overwhelmed"}. 
Keep it simple and calming.`;
        break;

      default:
        throw new Error("Unknown reflection type");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Taking a moment to breathe... Please try again shortly." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI features need a little rest. Please check your usage." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const reflection = data.choices?.[0]?.message?.content;

    return new Response(
      JSON.stringify({ reflection }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("gentle-ai error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Something went wrong" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
