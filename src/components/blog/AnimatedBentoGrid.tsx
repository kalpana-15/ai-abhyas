"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Article } from "@/data/articles";

interface AnimatedBentoGridProps {
  articles: Article[];
}

export function AnimatedBentoGrid({ articles }: AnimatedBentoGridProps) {
  // We have 6 slots. We maintain an array of 6 current indices representing which article is in which slot.
  // Initially, slots 0-5 hold articles 0-5.
  const [slotIndices, setSlotIndices] = useState<number[]>([0, 1, 2, 3, 4, 5]);

  useEffect(() => {
    // We want each slot to update every 12 seconds, but staggered by 2 seconds each.
    // Slot 0 updates at 10s, 22s, 34s...
    // Slot 1 updates at 12s, 24s, 36s...
    // Slot 2 updates at 14s, 26s, 38s...
    const timers = slotIndices.map((_, slotIndex) => {
      const initialDelay = 10000 + (slotIndex * 2000); // 10s, 12s, 14s, 16s, 18s, 20s
      const interval = 12000; // Update every 12 seconds after initial

      const timerState: { timeoutId: any; intervalId: any } = { timeoutId: null, intervalId: null };

      const updateSlot = () => {
        setSlotIndices((prev) => {
          const newIndices = [...prev];
          // Advance the index for this slot by 6 (to pick the next batch) and wrap around
          newIndices[slotIndex] = (newIndices[slotIndex] + 6) % articles.length;
          return newIndices;
        });
      };

      // Set the first update
      timerState.timeoutId = setTimeout(() => {
        updateSlot();
        // Set subsequent updates
        timerState.intervalId = setInterval(updateSlot, interval);
      }, initialDelay);

      return timerState;
    });

    return () => {
      timers.forEach((t) => {
        if (t.timeoutId) clearTimeout(t.timeoutId);
        if (t.intervalId) clearInterval(t.intervalId);
      });
    };
  }, [articles.length]);

  // Styling configurations for the 6 specific blocks in the bento grid
  const blockConfigs = [
    { // Card 1: Top Left Wide
      className: "lg:col-span-2 lg:row-span-1",
      categoryBg: "bg-emerald-500/80 backdrop-blur-md", categoryText: "text-white",
      titleColor: "text-white group-hover:text-emerald-300",
      excerptColor: "text-gray-200",
      isWide: true
    },
    { // Card 2: Top Right Tall 1
      className: "lg:col-span-1 lg:row-span-2",
      categoryBg: "bg-blue-500/80 backdrop-blur-md", categoryText: "text-white",
      titleColor: "text-white group-hover:text-blue-300",
      authorNameColor: "text-white", dateColor: "text-gray-300",
      avatarBorder: "border-white/20",
      isWide: false
    },
    { // Card 3: Top Right Tall 2
      className: "lg:col-span-1 lg:row-span-2",
      categoryBg: "bg-orange-500/80 backdrop-blur-md", categoryText: "text-white",
      titleColor: "text-white group-hover:text-orange-300",
      authorNameColor: "text-white", dateColor: "text-gray-300",
      avatarBorder: "border-white/20",
      isWide: false
    },
    { // Card 4: Bottom Left Tall 1
      className: "lg:col-span-1 lg:row-span-2",
      categoryBg: "bg-indigo-500/80 backdrop-blur-md", categoryText: "text-white",
      titleColor: "text-white group-hover:text-indigo-300",
      authorNameColor: "text-white", dateColor: "text-gray-300",
      avatarBorder: "border-white/20",
      isWide: false
    },
    { // Card 5: Bottom Left Tall 2
      className: "lg:col-span-1 lg:row-span-2",
      categoryBg: "bg-rose-500/80 backdrop-blur-md", categoryText: "text-white",
      titleColor: "text-white group-hover:text-rose-300",
      authorNameColor: "text-white", dateColor: "text-gray-300",
      avatarBorder: "border-white/20",
      isWide: false
    },
    { // Card 6: Bottom Right Wide
      className: "lg:col-span-2 lg:row-span-1",
      categoryBg: "bg-purple-500/80 backdrop-blur-md", categoryText: "text-white",
      titleColor: "text-white group-hover:text-purple-300",
      excerptColor: "text-gray-200",
      isWide: true
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 grid-rows-[auto] lg:grid-rows-[repeat(3,220px)] gap-6 lg:auto-rows-[220px]">
      {slotIndices.map((articleIndex, slotIndex) => {
        const article = articles[articleIndex];
        const config = blockConfigs[slotIndex];

        return (
          <div key={`slot-${slotIndex}`} className={`relative rounded-[2.5rem] overflow-hidden group shadow-2xl border-2 border-primary/20 hover:border-primary/60 transition-colors duration-500 ${config.className} ${config.isWide ? 'h-[220px] lg:h-auto' : 'h-[460px] lg:h-auto'}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: 50, filter: "blur(8px)" }}
                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, x: -50, filter: "blur(8px)" }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                {/* Background Image */}
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                
                {/* Dark Gradients for text visibility */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/40 to-black/90 pointer-events-none" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-500 pointer-events-none" />

                <Link href={`/blog/${article.slug}`} className="block w-full h-full p-6 md:p-8 relative z-10">
                  <div className="flex flex-col justify-between h-full">
                    <span className={`text-[10px] font-bold uppercase tracking-wider w-fit px-3 py-1 rounded-full ${config.categoryBg} ${config.categoryText} shadow-md`}>
                      {article.category}
                    </span>
                    <div>
                      <h3 className={`text-lg md:text-xl font-bold transition-colors mb-2 leading-tight drop-shadow-md ${config.titleColor}`}>
                        {article.title}
                      </h3>
                      
                      {config.isWide ? (
                        <p className={`text-xs line-clamp-2 drop-shadow-sm ${config.excerptColor}`}>
                          {article.excerpt}
                        </p>
                      ) : (
                        <div className="flex items-center gap-3 mt-4">
                          <img 
                            src={article.author.avatar} 
                            alt={article.author.name} 
                            className={`w-7 h-7 rounded-full border-2 ${config.avatarBorder} shadow-sm object-cover bg-muted`} 
                            onError={(e) => {
                              // Fallback if image fails to load
                              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(article.author.name)}&background=random&color=fff`;
                            }}
                          />
                          <div className="flex flex-col">
                            <span className={`text-[11px] font-medium drop-shadow-sm ${config.authorNameColor}`}>{article.author.name}</span>
                            <span className={`text-[9px] drop-shadow-sm ${config.dateColor}`}>{article.date}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
