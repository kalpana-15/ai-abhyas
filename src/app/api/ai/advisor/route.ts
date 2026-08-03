import { NextResponse } from "next/server";
import coursesData from "@/data/courses.json";

// Concise RAG Knowledge Base for simple, focused answers
const RAG_SYSTEM_PROMPT = `
You are Aria, an AI Academic Advisor for AI Abhyas. Your goal is to give simple, direct, and factual answers about our Generative AI Masterclass courses, pricing, certifications, and live training.

=== GROUNDING KNOWLEDGE (courses.json) ===
${JSON.stringify(coursesData, null, 2)}

=== INSTITUTIONAL FACTS ===
1. Certifications: Verifiable SHA-256 cryptographic diplomas with unique verification IDs, industry-recognized.
2. Training Modes: Self-paced video streams (4K), interactive Jupyter labs, automated coding evaluations, and weekly live instructor classes (Dr. Sarah Chen).
3. Payment: Credit/debit cards, UPI, zero-interest EMI options, and official GST invoices.
4. Prerequisites: Designed for all levels. Beginners start with Foundations (Mod 1-5), experienced devs jump to LangChain & RAG (Mod 6-10) or Autonomous Tool-Calling Agents (Mod 11-15).

STRICT RESPONSE RULES:
- Keep your answer simple, brief, and fixed strictly on answering the question.
- Do NOT write long paragraphs or verbose essays.
- Use at most 2-3 concise bullet points.
- Maintain a friendly, minimalist professional tone.
`;

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { message, history = [] } = body;

    if (!message || typeof message !== "string") {
      return NextResponse.json({ success: false, error: "Query content is required" }, { status: 400 });
    }

    const trimmedQuery = message.trim();
    const openAiKey = process.env.OPENAI_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;
    const groqKey = process.env.GROQ_API_KEY;

    // 1. Live External GenAI (Groq / OpenAI / Gemini)
    if (groqKey) {
      try {
        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${groqKey}`,
          },
          body: JSON.stringify({
            model: "llama-3.3-70b-versatile",
            messages: [
              { role: "system", content: RAG_SYSTEM_PROMPT },
              ...history.slice(-3).map((h: any) => ({ role: h.sender === "user" ? "user" : "assistant", content: h.text })),
              { role: "user", content: trimmedQuery }
            ],
            temperature: 0.5,
            max_tokens: 300,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const aiText = data.choices?.[0]?.message?.content;
          if (aiText) {
            return NextResponse.json({
              success: true,
              response: aiText,
              engine: "AI Advisor (Live)",
              timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
            });
          }
        }
      } catch (err) {
        console.error("Groq execution error, falling back to simple RAG reasoning:", err);
      }
    } else if (openAiKey) {
      try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${openAiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-4o-mini",
            messages: [
              { role: "system", content: RAG_SYSTEM_PROMPT },
              ...history.slice(-3).map((h: any) => ({ role: h.sender === "user" ? "user" : "assistant", content: h.text })),
              { role: "user", content: trimmedQuery }
            ],
            temperature: 0.5,
            max_tokens: 300,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const aiText = data.choices?.[0]?.message?.content;
          if (aiText) {
            return NextResponse.json({
              success: true,
              response: aiText,
              engine: "AI Advisor (Live)",
            });
          }
        }
      } catch (err) {
        console.error("OpenAI execution error, falling back to simple RAG reasoning:", err);
      }
    } else if (geminiKey) {
      try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [
              { role: "user", parts: [{ text: `${RAG_SYSTEM_PROMPT}\n\nUser Question: ${trimmedQuery}` }] }
            ]
          }),
        });

        if (res.ok) {
          const data = await res.json();
          const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (aiText) {
            return NextResponse.json({
              success: true,
              response: aiText,
              engine: "AI Advisor (Live)",
            });
          }
        }
      } catch (err) {
        console.error("Gemini execution error, falling back to simple RAG reasoning:", err);
      }
    }

    // 2. Simple, Minimalist Local NLP Fallback (When offline or API fails)
    const lower = trimmedQuery.toLowerCase();
    let reply = "";
    let actionLink = { label: "View Courses", url: "/courses" };

    if (lower.includes("curriculum") || lower.includes("syllabus") || lower.includes("learn") || lower.includes("masterclass") || lower.includes("explore")) {
      reply = `### 🎓 **Course Curriculum**\n\n* **Modules 1–5:** Python, structured JSON outputs & prompt guardrails.\n* **Modules 6–10:** LangChain, vector indexing & RAG architectures.\n* **Modules 11–15:** Autonomous agent workflows & live tool-calling integrations.`;
      actionLink = { label: "Explore Syllabus", url: "/courses" };
    } 
    else if (lower.includes("python") || lower.includes("beginner") || lower.includes("experience") || lower.includes("start") || lower.includes("prerequisite") || lower.includes("roadmap")) {
      reply = `### 🚀 **Prerequisites & Roadmap**\n\n* **Beginners:** Start directly with Foundation review streams in Modules 1–2.\n* **Experienced Devs:** Jump straight into vector databases (Mod 6) and autonomous agents (Mod 11).\n* **Self-Paced:** Study at your own comfortable speed with lifetime catalog updates.`;
      actionLink = { label: "Get Started", url: "/enroll" };
    } 
    else if (lower.includes("certificate") || lower.includes("diploma") || lower.includes("recognition") || lower.includes("verify") || lower.includes("job") || lower.includes("credential") || lower.includes("verifiable")) {
      reply = `### 🏆 **Verified Credentials**\n\n* **Cryptographic Proof:** Graduates earn SHA-256 signed digital diplomas with unique verification IDs.\n* **Industry Recognized:** Proves real production engineering competencies in RAG & autonomous agents.\n* **Shareable:** 1-click import to LinkedIn and high-res downloadable certificates.`;
      actionLink = { label: "View Certificates", url: "/dashboard/certificates" };
    } 
    else if (lower.includes("price") || lower.includes("fee") || lower.includes("payment") || lower.includes("emi") || lower.includes("gst") || lower.includes("cost") || lower.includes("discount") || lower.includes("options")) {
      reply = `### 💳 **Pricing & Billing**\n\n* **Flexible Payment:** Accepts Credit/Debit cards, UPI, and zero-interest EMI financing.\n* **Corporate GST Invoices:** Official tax receipts generated for work reimbursement.\n* **Lifetime Access:** One-time tuition covers all future curriculum upgrades.`;
      actionLink = { label: "Enroll Now", url: "/enroll" };
    } 
    else if (lower.includes("live") || lower.includes("instructor") || lower.includes("class") || lower.includes("doubt") || lower.includes("sarah") || lower.includes("office hour") || lower.includes("webinar") || lower.includes("webclass")) {
      reply = `### 🎙️ **Live Instructor Coaching**\n\n* **Weekly Webclasses:** Interactive engineering labs hosted by faculty leads (Dr. Sarah Chen).\n* **Live Q&A:** Direct doubt resolution for your custom architecture builds and code labs.\n* **HD Archives:** Recorded sessions sync to your dashboard automatically within 1 hour.`;
      actionLink = { label: "Live Schedule", url: "/dashboard/live" };
    } 
    else {
      reply = `### 🤖 **AI Academic Advisor**\n\nWe offer production-grade training in Generative AI engineering, autonomous agents, and RAG architectures.\n\n* **15 Capstone Projects:** Build real conversational chatbots and autonomous tools.\n* **Expert Guidance:** Weekly instructor support and AI evaluated coding proctors.\n* **Verified Diploma:** Earn shareable credentials upon completion.`;
      actionLink = { label: "Explore Courses", url: "/courses" };
    }

    return NextResponse.json({
      success: true,
      response: reply,
      action: actionLink,
      engine: "AI Advisor (Active)",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });
  } catch (error) {
    console.error("Error in /api/ai/advisor handler:", error);
    return NextResponse.json(
      { success: false, error: "An unexpected error occurred processing your inquiry." },
      { status: 500 }
    );
  }
}
