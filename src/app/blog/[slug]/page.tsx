import { notFound } from "next/navigation";
import { articles } from "@/data/articles";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Calendar, Clock, ArrowLeft, Share2, BookmarkPlus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ArticlePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const resolvedParams = await params;
  const article = articles.find((a) => a.slug === resolvedParams.slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col pt-20 bg-background overflow-hidden selection:bg-primary/20">
        
        {/* Article Header */}
        <section className="relative pt-16 pb-12 md:pt-24 md:pb-16 bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="mx-auto max-w-[1200px] w-full px-4 md:px-6 relative z-10">
            <Link 
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>

            <div className="flex flex-col gap-6">
              <span className="inline-flex w-fit px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold uppercase tracking-wider">
                {article.category}
              </span>
              
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-heading font-extrabold tracking-tight leading-tight text-foreground">
                {article.title}
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {article.excerpt}
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-6 border-t border-border/50 mt-2">
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                    <img src={article.author.avatar} alt={article.author.name} className="object-cover w-full h-full" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-foreground">{article.author.name}</span>
                    <span className="text-xs text-muted-foreground">AI Researcher & Author</span>
                  </div>
                </div>

                <div className="hidden md:block w-px h-8 bg-border/50" />

                <div className="flex items-center gap-6 text-sm text-muted-foreground">
                  <span className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {article.date}
                  </span>
                  <span className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    {article.readTime}
                  </span>
                </div>

                <div className="flex-1" />

                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-full hover:bg-secondary/20 text-muted-foreground hover:text-foreground transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-full hover:bg-secondary/20 text-muted-foreground hover:text-foreground transition-colors">
                    <BookmarkPlus className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        <section className="mx-auto max-w-[1200px] w-full px-4 md:px-6 mb-16">
          <div className="relative w-full aspect-[21/9] md:aspect-[2.5/1] rounded-3xl overflow-hidden shadow-2xl border border-white/10 group">
            {/* Ambient inner glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10 pointer-events-none" />
            <img 
              src={article.image} 
              alt={article.title}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
          </div>
        </section>

        {/* Article Body Placeholder */}
        <section className="mx-auto max-w-[1200px] w-full px-4 md:px-6 pb-24">
          <article className="prose prose-lg dark:prose-invert prose-headings:font-heading prose-headings:font-bold prose-a:text-primary max-w-3xl">
            <p className="lead text-xl text-muted-foreground font-medium mb-8">
              Welcome to this comprehensive guide on {article.title}. As AI continues to evolve at breakneck speeds, staying ahead of the curve requires continuous learning and practical application of new methodologies.
            </p>
            
            <h2>The Current Landscape</h2>
            <p>
              Artificial Intelligence has transitioned from theoretical research to practical, everyday tools. Whether you're building sophisticated machine learning models, deploying large language models, or simply using AI assistants to boost your productivity, the underlying principles remain crucial for mastery. 
            </p>
            <p>
              In recent months, we've seen a massive shift towards more efficient architectures, multimodality, and open-source models challenging proprietary giants. This democratization of AI technology means that understanding how to effectively interact with these systems is no longer optional—it's a critical career skill.
            </p>

            <h2>Key Takeaways</h2>
            <ul>
              <li><strong>Context is King:</strong> Models perform exponentially better when provided with rich, structured context.</li>
              <li><strong>Iterative Refinement:</strong> The first output is rarely the best. Treat interactions as a collaborative dialogue.</li>
              <li><strong>Ethical Alignment:</strong> Always consider the safety constraints and biases inherent in base models.</li>
            </ul>

            <blockquote className="border-l-4 border-primary pl-6 my-8 italic text-xl text-foreground/80">
              "The goal is not to replace human creativity, but to augment it with unprecedented computational reasoning."
            </blockquote>

            <h2>Practical Implementation</h2>
            <p>
              To truly leverage this technology, you must move beyond basic usage. Start building custom workflows that integrate AI into your daily tasks. Use APIs to connect models to your existing data streams. 
            </p>
            
            <div className="bg-secondary/10 border border-secondary/20 rounded-2xl p-6 my-8">
              <h4 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" /> Expert Tip
              </h4>
              <p className="text-sm text-muted-foreground m-0">
                When testing new methodologies, always maintain a clean validation dataset to ensure you are actually measuring improvements rather than just observing random variations in outputs.
              </p>
            </div>

            <p>
              Continue experimenting, breaking things, and learning. The AI frontier is vast and full of opportunities for those willing to dive deep into the technical weeds.
            </p>
          </article>

          {/* Tags */}
          <div className="flex items-center gap-3 mt-12 pt-8 border-t border-border/50">
            <span className="text-sm font-medium text-foreground">Tags:</span>
            <div className="flex gap-2 flex-wrap">
              {['Artificial Intelligence', article.category, 'Innovation'].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-secondary/10 text-secondary-foreground text-xs font-medium rounded-md border border-border">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
