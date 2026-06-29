"use client";

import { motion } from "framer-motion";
import { Blog } from "@/types";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface BlogCardProps {
  blog: Blog;
  index: number;
}

export function BlogCard({ blog, index }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full flex flex-col overflow-hidden border-border bg-card text-card-foreground transition-all hover:shadow-lg dark:hover:shadow-primary/5 cursor-pointer group">
        <div className="relative h-48 overflow-hidden bg-muted">
          <img
            src={blog.image}
            alt={blog.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center mb-2">
            <Badge variant="outline" className="text-primary border-primary/20 bg-primary/5">
              {blog.category}
            </Badge>
            <span className="text-xs text-muted-foreground">{blog.date}</span>
          </div>
          <h3 className="text-xl font-heading font-bold group-hover:text-primary transition-colors">
            {blog.title}
          </h3>
        </CardHeader>
        
        <CardContent>
          <p className="text-muted-foreground line-clamp-3">
            {blog.excerpt}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}
