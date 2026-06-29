export type ArticleCategory = 
  | "Prompt Engineering"
  | "AI Tools"
  | "Case Studies"
  | "Industry Trends"
  | "Tutorials"
  | "Research & Insights";

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string; // Content can be populated later
  category: ArticleCategory;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  image: string;
}

export const articles: Article[] = [
  {
    id: "1",
    slug: "mastering-zero-shot-prompting",
    title: "Mastering Zero-Shot Prompting in GPT-4",
    excerpt: "Learn how to craft highly effective zero-shot prompts to get accurate outputs without providing examples.",
    category: "Prompt Engineering",
    author: { name: "Dr. Sarah Chen", avatar: "https://ui-avatars.com/api/?name=Dr.+Sarah+Chen&background=10b981&color=fff" },
    date: "May 15, 2024",
    readTime: "6 min read",
    image: "/Assets/images/articles/zero_shot.png"
  },
  {
    id: "2",
    slug: "top-ai-coding-assistants-2024",
    title: "Top 5 AI Coding Assistants Revolutionizing Development",
    excerpt: "A comprehensive comparison of GitHub Copilot, Cursor, Codeium, and other leading AI tools for developers.",
    category: "AI Tools",
    author: { name: "Alex Mercer", avatar: "https://ui-avatars.com/api/?name=Alex+Mercer&background=3b82f6&color=fff" },
    date: "May 18, 2024",
    readTime: "8 min read",
    image: "/Assets/images/articles/ai_assistants.png"
  },
  {
    id: "3",
    slug: "how-netflix-uses-ai-personalization",
    title: "Case Study: How Netflix's AI Engine Keeps You Watching",
    excerpt: "An inside look into the machine learning algorithms behind Netflix's hyper-personalized recommendation system.",
    category: "Case Studies",
    author: { name: "Priya Sharma", avatar: "https://ui-avatars.com/api/?name=Priya+Sharma&background=f97316&color=fff" },
    date: "May 22, 2024",
    readTime: "10 min read",
    image: "/Assets/images/articles/netflix_ai.png"
  },
  {
    id: "4",
    slug: "the-rise-of-small-language-models",
    title: "Why Small Language Models (SLMs) are the Next Big Thing",
    excerpt: "Bigger isn't always better. Discover why enterprises are pivoting to efficient, specialized Small Language Models.",
    category: "Industry Trends",
    author: { name: "James Wilson", avatar: "https://ui-avatars.com/api/?name=James+Wilson&background=6366f1&color=fff" },
    date: "May 28, 2024",
    readTime: "7 min read",
    image: "/Assets/images/articles/slms.png"
  },
  {
    id: "5",
    slug: "build-your-first-rag-application",
    title: "Tutorial: Build Your First RAG Application with LangChain",
    excerpt: "Step-by-step guide to building a Retrieval-Augmented Generation app that chats with your PDF documents.",
    category: "Tutorials",
    author: { name: "Dr. Sarah Chen", avatar: "https://ui-avatars.com/api/?name=Dr.+Sarah+Chen&background=10b981&color=fff" },
    date: "June 2, 2024",
    readTime: "15 min read",
    image: "/Assets/images/articles/rag_app.png"
  },
  {
    id: "6",
    slug: "understanding-attention-mechanism",
    title: "Demystifying the Attention Mechanism in Transformers",
    excerpt: "A simplified breakdown of the groundbreaking 'Attention Is All You Need' paper that birthed modern LLMs.",
    category: "Research & Insights",
    author: { name: "Dr. Alan Turing", avatar: "https://ui-avatars.com/api/?name=Dr.+Alan+Turing&background=eab308&color=fff" },
    date: "June 5, 2024",
    readTime: "12 min read",
    image: "/Assets/images/articles/attention_mech.png"
  },
  {
    id: "7",
    slug: "advanced-chain-of-thought-prompting",
    title: "Advanced Chain-of-Thought Prompting Strategies",
    excerpt: "Enhance your model's reasoning capabilities by forcing it to break down complex problems step-by-step.",
    category: "Prompt Engineering",
    author: { name: "Alex Mercer", avatar: "https://ui-avatars.com/api/?name=Alex+Mercer&background=3b82f6&color=fff" },
    date: "June 10, 2024",
    readTime: "5 min read",
    image: "/Assets/images/articles/cot_prompt.png"
  },
  {
    id: "8",
    slug: "midjourney-vs-dalle-3",
    title: "Midjourney v6 vs DALL-E 3: Which AI Image Generator Wins?",
    excerpt: "We put the two leading AI image generators head-to-head in a test of realism, prompt adherence, and creativity.",
    category: "AI Tools",
    author: { name: "Priya Sharma", avatar: "https://ui-avatars.com/api/?name=Priya+Sharma&background=f97316&color=fff" },
    date: "June 14, 2024",
    readTime: "9 min read",
    image: "/Assets/images/articles/gen_ai_vs.png"
  },
  {
    id: "9",
    slug: "ai-in-healthcare-diagnostics",
    title: "Case Study: AI Surpasses Human Accuracy in Radiology",
    excerpt: "How a leading research hospital implemented computer vision to detect early-stage anomalies with unprecedented accuracy.",
    category: "Case Studies",
    author: { name: "James Wilson", avatar: "https://ui-avatars.com/api/?name=James+Wilson&background=6366f1&color=fff" },
    date: "June 18, 2024",
    readTime: "8 min read",
    image: "/Assets/images/articles/healthcare_ai.png"
  },
  {
    id: "10",
    slug: "open-source-vs-closed-ai",
    title: "The Battle for AI Supremacy: Open Source vs. Closed Ecosystems",
    excerpt: "Analyzing the market dynamics between Meta's Llama approach and OpenAI's proprietary models.",
    category: "Industry Trends",
    author: { name: "Dr. Sarah Chen", avatar: "https://ui-avatars.com/api/?name=Dr.+Sarah+Chen&background=10b981&color=fff" },
    date: "June 22, 2024",
    readTime: "11 min read",
    image: "/Assets/images/articles/open_closed_ai.png"
  },
  {
    id: "11",
    slug: "deploying-llms-locally-ollama",
    title: "Tutorial: Run Llama 3 Locally on Your Mac with Ollama",
    excerpt: "Learn how to securely run powerful open-source language models offline on your own hardware.",
    category: "Tutorials",
    author: { name: "Alex Mercer", avatar: "https://ui-avatars.com/api/?name=Alex+Mercer&background=3b82f6&color=fff" },
    date: "June 25, 2024",
    readTime: "6 min read",
    image: "/Assets/images/articles/llama_ollama.png"
  },
  {
    id: "12",
    slug: "multimodal-ai-breakthroughs",
    title: "The Multimodal Era: Understanding GPT-4o's Architecture",
    excerpt: "An analysis of how modern AI models seamlessly process text, audio, and vision simultaneously natively.",
    category: "Research & Insights",
    author: { name: "Priya Sharma", avatar: "https://ui-avatars.com/api/?name=Priya+Sharma&background=f97316&color=fff" },
    date: "June 27, 2024",
    readTime: "14 min read",
    image: "/Assets/images/articles/multimodal_ai.png"
  }
];
