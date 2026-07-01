"use client";

import { useState, useMemo, useEffect } from "react";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { CourseCard, CourseData } from "@/components/ui/CourseCard";
import coursesRawData from "@/data/courses.json";

// Types and Data
const coursesData = coursesRawData as CourseData[];

type SortOption = "Recommended" | "Newest" | "Highest Rated" | "Duration" | "Fee (Low to High)" | "Fee (High to Low)";

const FILTER_CATEGORIES = {
  level: ["Beginner", "Intermediate", "Advanced"],
  mode: ["Online", "Offline", "Hybrid"],
  duration: ["Less than 4 Weeks", "4-8 Weeks", "8-12 Weeks", "12+ Weeks"],
  fee: ["Free", "₹1K - ₹5K", "₹5K - ₹10K", "₹10K+"],
  status: ["Open", "Limited Seats", "Coming Soon"],
  certificate: ["Included", "Not Included"]
};

// Extract unique skills
const allSkills = Array.from(new Set(coursesData.flatMap(c => c.skills))).sort();

// Helper to parse Fee
const parseFee = (feeStr: string) => {
  if (feeStr.toLowerCase() === "free") return 0;
  return parseInt(feeStr.replace(/[^0-9]/g, "")) || 0;
};

// Helper to parse Duration
const parseDuration = (durStr: string) => {
  return parseInt(durStr.replace(/[^0-9]/g, "")) || 0;
};

const FilterSection = ({ title, children, isOpen, onToggle }: { title: string, children: React.ReactNode, isOpen: boolean, onToggle: () => void }) => {
  return (
    <div className="mb-4 last:mb-0">
      <button 
        onClick={onToggle} 
        className={`flex w-full items-center justify-between px-4 py-3 text-sm font-semibold capitalize transition-all rounded-xl ${isOpen ? 'bg-primary text-primary-foreground shadow-md' : 'bg-muted/50 text-foreground hover:bg-muted'}`}
      >
        {title}
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180 text-primary-foreground' : 'text-muted-foreground'}`} />
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-4 pb-2 px-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export function CourseCatalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({
    level: [],
    mode: [],
    duration: [],
    fee: [],
    status: [],
    certificate: [],
    skills: []
  });
  const [sortBy, setSortBy] = useState<SortOption>("Recommended");
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [openFilterCategory, setOpenFilterCategory] = useState<string | null>("level");

  // Read URL params on mount to apply initial filters (e.g., from Navbar dropdown)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const modeParam = params.get('mode');
      if (modeParam) {
        const capitalizedMode = modeParam.charAt(0).toUpperCase() + modeParam.slice(1).toLowerCase();
        if (['Online', 'Offline', 'Hybrid'].includes(capitalizedMode)) {
          setActiveFilters(prev => ({ ...prev, mode: [capitalizedMode] }));
          setOpenFilterCategory("mode");
        }
      }
    }
  }, []);

  // Toggle filter
  const toggleFilter = (category: string, value: string) => {
    setActiveFilters(prev => {
      const current = prev[category] || [];
      return {
        ...prev,
        [category]: current.includes(value)
          ? current.filter(item => item !== value)
          : [...current, value]
      };
    });
  };

  // Remove specific active chip
  const removeChip = (category: string, value: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item !== value)
    }));
  };

  // Clear all filters
  const clearFilters = () => {
    setActiveFilters({
      level: [], mode: [], duration: [], fee: [], status: [], certificate: [], skills: []
    });
    setSearchQuery("");
  };

  // Compute total active filters count
  const activeFiltersCount = Object.values(activeFilters).flat().length;

  // Filter & Sort Logic
  const filteredCourses = useMemo(() => {
    let filtered = coursesData.filter(course => {
      // 1. Search Query
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = course.title.toLowerCase().includes(query);
        const matchesDesc = course.description.toLowerCase().includes(query);
        const matchesSkills = course.skills.some(s => s.toLowerCase().includes(query));
        if (!matchesTitle && !matchesDesc && !matchesSkills) return false;
      }

      // 2. Level
      if (activeFilters.level.length > 0 && !activeFilters.level.includes(course.level)) return false;

      // 3. Mode
      if (activeFilters.mode.length > 0 && !activeFilters.mode.includes(course.mode)) return false;

      // 4. Status
      if (activeFilters.status.length > 0 && !activeFilters.status.includes(course.status)) return false;

      // 5. Certificate
      if (activeFilters.certificate.length > 0) {
        const isCert = course.certificateIncluded ? "Included" : "Not Included";
        if (!activeFilters.certificate.includes(isCert)) return false;
      }

      // 6. Skills
      if (activeFilters.skills.length > 0) {
        const hasSkill = activeFilters.skills.some(skill => course.skills.includes(skill));
        if (!hasSkill) return false;
      }

      // 7. Duration
      if (activeFilters.duration.length > 0) {
        const weeks = parseDuration(course.duration);
        const match = activeFilters.duration.some(range => {
          if (range === "Less than 4 Weeks" && weeks < 4) return true;
          if (range === "4-8 Weeks" && weeks >= 4 && weeks <= 8) return true;
          if (range === "8-12 Weeks" && weeks > 8 && weeks <= 12) return true;
          if (range === "12+ Weeks" && weeks > 12) return true;
          return false;
        });
        if (!match) return false;
      }

      // 8. Fee
      if (activeFilters.fee.length > 0) {
        const fee = parseFee(course.fee);
        const match = activeFilters.fee.some(range => {
          if (range === "Free" && fee === 0) return true;
          if (range === "₹1K - ₹5K" && fee > 0 && fee <= 5000) return true;
          if (range === "₹5K - ₹10K" && fee > 5000 && fee <= 10000) return true;
          if (range === "₹10K+" && fee > 10000) return true;
          return false;
        });
        if (!match) return false;
      }

      return true;
    });

    // Apply Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "Highest Rated": return b.rating - a.rating;
        case "Duration": return parseDuration(b.duration) - parseDuration(a.duration);
        case "Fee (Low to High)": return parseFee(a.fee) - parseFee(b.fee);
        case "Fee (High to Low)": return parseFee(b.fee) - parseFee(a.fee);
        // Newest / Recommended (Since we don't have dates, we'll keep default order or mock it)
        default: return 0;
      }
    });

    return filtered;
  }, [searchQuery, activeFilters, sortBy]);

  return (
    <section className="pt-6 pb-12 md:pt-10 md:pb-20 bg-background relative" id="course-catalog">
      <div className="mx-auto max-w-[1200px] w-full px-4 md:px-6">
        
        {/* Top Search Bar (Spans full width) */}
        <div className="w-full flex items-center gap-4 pb-8 mb-8 border-b border-border/80">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search courses, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-12 pl-12 pr-4 rounded-xl border border-border bg-card focus:outline-none focus:ring-2 focus:ring-primary/50 transition-shadow"
            />
          </div>
          {/* Filter Toggle Button (Now visible on all screens) */}
          <button
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="h-12 px-4 rounded-xl border border-border bg-card flex items-center gap-2 hover:bg-muted shrink-0"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span className="font-medium hidden sm:inline">Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            <span className="font-medium sm:hidden">{activeFiltersCount > 0 ? activeFiltersCount : ''}</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 items-start relative">

          {/* Global Backdrop */}
          {isMobileFiltersOpen && (
            <div 
              className="fixed inset-0 top-16 md:top-[72px] xl:top-20 bg-black/60 z-30 backdrop-blur-sm transition-opacity"
              onClick={() => setIsMobileFiltersOpen(false)}
            />
          )}

          {/* Sidebar (Filters) - Now a drawer on all screens */}
          <aside className={`
            fixed top-16 md:top-[72px] xl:top-20 bottom-0 left-0 z-40 w-[85vw] max-w-[320px] bg-background shadow-2xl p-6 overflow-y-auto transition-transform duration-300 ease-in-out flex flex-col space-y-8
            ${isMobileFiltersOpen ? 'translate-x-0' : '-translate-x-full'}
            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]
          `}>
            


            <div className="flex items-center justify-between pb-4 border-b border-border">
              <h3 className="font-heading font-bold text-lg flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-primary" />
                Filters
              </h3>
              <div className="flex items-center gap-4">
                {activeFiltersCount > 0 && (
                  <button onClick={clearFilters} className="text-sm text-muted-foreground hover:text-primary">
                    Clear All
                  </button>
                )}
                <button onClick={() => setIsMobileFiltersOpen(false)} className="p-1.5 text-muted-foreground hover:text-foreground bg-muted/50 rounded-full transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Filter Sections */}
            <div className="space-y-1 pr-2">
              
              {/* Render Standard Categories */}
              {Object.entries(FILTER_CATEGORIES).map(([key, options]) => (
                <FilterSection 
                  key={key} 
                  title={key} 
                  isOpen={openFilterCategory === key}
                  onToggle={() => setOpenFilterCategory(openFilterCategory === key ? null : key)}
                >
                  <div className="space-y-2.5">
                    {options.map(option => (
                      <label 
                        key={option} 
                        className="flex items-center gap-3 group cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFilter(key, option);
                        }}
                      >
                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                          activeFilters[key as keyof typeof activeFilters].includes(option) 
                            ? 'bg-primary border-primary text-white' 
                            : 'border-border bg-card group-hover:border-primary/50'
                        }`}>
                          {activeFilters[key as keyof typeof activeFilters].includes(option) && <X className="w-3.5 h-3.5" />}
                        </div>
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{option}</span>
                      </label>
                    ))}
                  </div>
                </FilterSection>
              ))}

              {/* Render Skills Category */}
              <FilterSection 
                title="Skills" 
                isOpen={openFilterCategory === 'skills'}
                onToggle={() => setOpenFilterCategory(openFilterCategory === 'skills' ? null : 'skills')}
              >
                <div className="flex flex-wrap gap-2">
                  {allSkills.map(skill => (
                    <button
                      key={skill}
                      onClick={() => toggleFilter('skills', skill)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                        activeFilters.skills.includes(skill)
                          ? "bg-primary text-white border-primary"
                          : "bg-card text-muted-foreground border-border hover:border-primary/50"
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
              </FilterSection>

            </div>
          </aside>

          {/* Main Content (Results & Grid) */}
          <div className="flex-1 w-full min-w-0 flex flex-col gap-6">
            
            {/* Header & Active Chips */}
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h3 className="font-heading font-bold text-xl md:text-2xl">
                  Showing {filteredCourses.length} Courses
                </h3>

                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Sort By:</span>
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as SortOption)}
                      className="appearance-none bg-card border border-border rounded-lg h-10 pl-4 pr-10 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/50"
                    >
                      <option value="Recommended">Recommended</option>
                      <option value="Highest Rated">Highest Rated</option>
                      <option value="Duration">Duration</option>
                      <option value="Fee (Low to High)">Fee (Low to High)</option>
                      <option value="Fee (High to Low)">Fee (High to Low)</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Active Chips */}
              {activeFiltersCount > 0 && (
                <div className="flex flex-wrap gap-2 items-center min-h-[32px]">
                  <span className="text-sm text-muted-foreground mr-1">Active:</span>
                  <AnimatePresence>
                    {Object.entries(activeFilters).map(([category, values]) => 
                      values.map(val => (
                        <motion.button
                          key={`${category}-${val}`}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          onClick={() => removeChip(category, val)}
                          className="flex items-center gap-1.5 px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-xs font-medium hover:bg-primary/20 transition-colors"
                        >
                          {val}
                          <X className="w-3 h-3" />
                        </motion.button>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>

            {/* Grid Area */}
            {filteredCourses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map(course => (
                  <CourseCard key={course.id} course={course} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-24 px-4 text-center border border-dashed border-border rounded-3xl bg-muted/20">
                <Search className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
                <h3 className="text-xl font-heading font-bold mb-2">No courses found</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  We couldn't find any courses matching your current filters. Try adjusting your search or clearing some filters.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-6 py-2.5 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            )}
            
          </div>

        </div>
      </div>
    </section>
  );
}
