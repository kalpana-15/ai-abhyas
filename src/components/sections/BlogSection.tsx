"use client";

import { motion } from "framer-motion";
import { ArrowRight, BookOpen } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import blogsData from "@/data/blogs.json";

export function BlogSection() {
  const featuredBlog = blogsData[0];
  const latestBlogs = blogsData.slice(1, 3);

  return (
    <section className="py-24 relative bg-muted/30 border-y border-border">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header Section */}
        <div className="text-center max-w-4xl mx-auto mb-16 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm mb-6 border border-primary/20 shadow-[0_0_15px_rgba(var(--primary),0.2)]"
          >
            <BookOpen className="w-4 h-4" />
            <span className="tracking-wide uppercase">RESOURCES & INSIGHTS</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-heading font-extrabold mb-6 tracking-tight text-foreground"
          >
            Stay Ahead with <span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">AI Trends</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg md:text-xl mt-6 max-w-2xl mx-auto"
          >
            Stay updated with the latest in AI engineering, prompt design, and industry trends.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Featured Article */}
          {featuredBlog && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="lg:col-span-7 group bg-card rounded-3xl border border-border overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col cursor-pointer"
            >
              <div className="relative h-64 md:h-80 w-full overflow-hidden">
                <Image
                  src={featuredBlog.image}
                  alt={featuredBlog.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Featured
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-1"><BookOpen className="w-4 h-4"/> {featuredBlog.category}</span>
                  <span>•</span>
                  <span>{featuredBlog.date}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-heading font-bold mb-4 group-hover:text-primary transition-colors">
                  {featuredBlog.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                  {featuredBlog.excerpt}
                </p>
                <div className="text-primary font-medium flex items-center group-hover:underline underline-offset-4">
                  Read Article <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          )}

          {/* Latest Articles */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            {latestBlogs.map((blog, index) => (
              <motion.div 
                key={blog.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
                className="group flex flex-col sm:flex-row gap-6 bg-card rounded-3xl border border-border p-4 hover:shadow-xl transition-all duration-300 cursor-pointer h-full"
              >
                <div className="relative w-full sm:w-1/3 h-48 sm:h-full rounded-2xl overflow-hidden flex-shrink-0">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col justify-center py-2 pr-2 flex-1">
                  <div className="text-xs text-primary font-bold uppercase tracking-wider mb-2">
                    {blog.category}
                  </div>
                  <h4 className="text-lg font-heading font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {blog.title}
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {blog.excerpt}
                  </p>
                  <span className="text-xs text-muted-foreground mt-auto">{blog.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex justify-center">
          <Button variant="outline" className="w-full md:w-auto px-8">
            View All Articles <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
