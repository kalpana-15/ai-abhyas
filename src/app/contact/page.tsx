"use client";

import { useState } from "react";

import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { 
  Phone, 
  MessageCircle, 
  Mail, 
  MapPin, 
  Send, 
  Clock, 
  Headset,
  MessageSquare,
  Star
} from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
  const [activeTab, setActiveTab] = useState<'contact' | 'office'>('contact');

  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col pt-20 bg-background overflow-hidden selection:bg-primary/20">
        
        {/* Hero Section */}
        <section className="relative pt-16 pb-16 md:pt-20 lg:pb-24 overflow-hidden flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10">
          {/* Ambient Glows */}
          <div className="absolute top-0 left-1/4 w-[40rem] h-[40rem] bg-primary/20 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 -translate-x-1/2" />
          <div className="absolute bottom-0 right-1/4 w-[35rem] h-[35rem] bg-secondary/20 rounded-full blur-[100px] pointer-events-none translate-y-1/3 translate-x-1/2" />
          <div className="absolute top-1/2 left-1/2 w-[30rem] h-[30rem] bg-emerald-500/15 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 -translate-x-1/2" />

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative">
              
              {/* Left Side: Text */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center text-center lg:items-start lg:text-left relative z-10 order-2 lg:order-1 gap-6 lg:-mt-24 lg:pl-[31px]"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary font-medium text-sm border border-primary/20 shadow-sm">
                  <Headset className="w-4 h-4" />
                  <span>Support</span>
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-heading font-bold tracking-tight text-foreground drop-shadow-sm leading-tight max-w-4xl">
                  Contact <span className="text-purple-500">Us</span>
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-xl">
                  We are here to answer any questions you may have about our AI courses, programs, and partnerships. Let's build the future together.
                </p>
                
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                  <button 
                    onClick={() => { document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' }) }} 
                    className="inline-flex items-center justify-center gap-2 px-8 h-14 text-base font-medium text-primary-foreground bg-primary rounded-full hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 hover:-translate-y-1"
                  >
                    <MessageSquare className="w-5 h-5" />
                    Message Us
                  </button>
                  <button 
                    onClick={() => { document.getElementById('office-location')?.scrollIntoView({ behavior: 'smooth' }) }} 
                    className="inline-flex items-center justify-center gap-2 px-8 h-14 text-base font-medium text-foreground bg-card border-2 border-border/50 rounded-full hover:border-primary/50 hover:bg-muted/50 transition-all shadow-sm hover:-translate-y-1"
                  >
                    <MapPin className="w-5 h-5" />
                    Visit Office
                  </button>
                </div>
              </motion.div>

              {/* Right Side: SVG Illustration */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex items-center justify-center lg:justify-end lg:-ml-12 order-1 lg:order-2"
              >
                <img
                  src="/Assets/animations/contact us.svg"
                  alt="Contact Illustration"
                  className="w-full max-w-sm md:max-w-md lg:max-w-lg h-auto object-contain drop-shadow-2xl lg:scale-110 lg:origin-right"
                />
              </motion.div>
            </div>
          </div>

          {/* Fade transition to next section */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
        </section>

        {/* Contact Form Section (Banner) */}
        <section id="contact-form" className="pt-20 lg:pt-28 pb-24 bg-background">
          <div className="container mx-auto px-4 md:px-6">
            
            <div className="bg-gradient-to-br from-primary/10 via-card to-secondary/10 border-2 border-primary/20 shadow-2xl rounded-[3rem] p-8 md:p-12 lg:p-16 relative overflow-hidden">
              {/* Subtle glass effect glow */}
              <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
                
                {/* Form Image Left */}
                <motion.div 
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="hidden lg:flex justify-center lg:col-span-5"
                >
                  <div className="relative w-full max-w-md aspect-square">
                    <img
                      src="/Assets/animations/contact form.svg"
                      alt="Contact Form"
                      className="w-full h-full object-contain drop-shadow-xl"
                    />
                  </div>
                </motion.div>

                {/* Contact Form Right */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="lg:col-span-7"
                >
                  <div className="bg-background/80 backdrop-blur-xl border border-border/50 shadow-lg rounded-3xl p-6 md:p-8">
                    <div className="mb-6">
                      <h2 className="text-2xl font-heading font-bold text-foreground mb-1">Send an Inquiry</h2>
                      <p className="text-[13px] text-muted-foreground">Fill out the form below and we'll get back to you shortly.</p>
                    </div>

                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-0.5">
                          <label className="text-[11px] font-medium text-foreground">Full Name <span className="text-destructive">*</span></label>
                          <input 
                            type="text" 
                            placeholder="John Doe"
                            className="w-full px-3 py-1.5 text-[13px] rounded-lg border border-border bg-background focus:bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none shadow-sm"
                            required
                          />
                        </div>
                        <div className="space-y-0.5">
                          <label className="text-[11px] font-medium text-foreground">Email Address <span className="text-destructive">*</span></label>
                          <input 
                            type="email" 
                            placeholder="john@example.com"
                            className="w-full px-3 py-1.5 text-[13px] rounded-lg border border-border bg-background focus:bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none shadow-sm"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-0.5">
                          <label className="text-[11px] font-medium text-foreground">Phone Number</label>
                          <input 
                            type="tel" 
                            placeholder="+1 (555) 000-0000"
                            className="w-full px-3 py-1.5 text-[13px] rounded-lg border border-border bg-background focus:bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none shadow-sm"
                          />
                        </div>
                        <div className="space-y-0.5">
                          <label className="text-[11px] font-medium text-foreground">Inquiry Type <span className="text-destructive">*</span></label>
                          <select 
                            className="w-full px-3 py-1.5 text-[13px] rounded-lg border border-border bg-background focus:bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none appearance-none shadow-sm"
                            required
                            defaultValue=""
                          >
                            <option value="" disabled>Select an option</option>
                            <option value="course">Course Inquiry</option>
                            <option value="admission">Admission Support</option>
                            <option value="technical">Technical Support</option>
                            <option value="certification">Certification</option>
                            <option value="partnership">Partnership</option>
                            <option value="general">General Question</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-0.5">
                        <label className="text-[11px] font-medium text-foreground">Subject <span className="text-destructive">*</span></label>
                        <input 
                          type="text" 
                          placeholder="How can we help you?"
                          className="w-full px-3 py-1.5 text-[13px] rounded-lg border border-border bg-background focus:bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none shadow-sm"
                          required
                        />
                      </div>

                      <div className="space-y-0.5">
                        <label className="text-[11px] font-medium text-foreground">Message <span className="text-destructive">*</span></label>
                        <textarea 
                          rows={2}
                          placeholder="Please provide details about your inquiry..."
                          className="w-full px-3 py-1.5 text-[13px] rounded-lg border border-border bg-background focus:bg-background focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none resize-none shadow-sm"
                          required
                        ></textarea>
                      </div>

                      <button 
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-semibold text-[13px] rounded-lg hover:bg-primary/90 transition-all shadow-md hover:shadow-primary/25 hover:-translate-y-0.5 mt-2"
                      >
                        <Send className="w-4 h-4" />
                        Send Message
                      </button>
                    </form>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Office Location & Map Section */}
        <section id="office-location" className="py-24 bg-background border-t border-border/50">
          <div className="container mx-auto px-4 md:px-6">
            <div className="bg-gradient-to-br from-secondary/5 via-background to-primary/5 border-2 border-border/30 shadow-xl rounded-[3rem] p-8 md:p-12 lg:p-16 relative overflow-hidden">
              <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch relative z-10">
                
                {/* Left Side: Navigation / Info */}
                <div className="lg:col-span-5 bg-gradient-to-br from-primary/10 via-primary/5 to-secondary/10 p-6 md:p-8 rounded-[2.5rem] border-2 border-primary/20 flex flex-col justify-center h-full shadow-lg">
                  <motion.h2 
                    key={`heading-${activeTab}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-lg md:text-xl lg:text-2xl font-heading font-bold text-foreground mb-3"
                  >
                    {activeTab === 'contact' ? "Contact AI Abhyas Team" : "Visit Our Office"}
                  </motion.h2>
                  <motion.p 
                    key={`desc-${activeTab}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs md:text-sm text-muted-foreground mb-5"
                  >
                    {activeTab === 'contact' 
                      ? "Have questions about our AI courses, training programs, or enrollment? Our expert team is here to guide your learning journey." 
                      : "We'd love to welcome you in person. Drop by our headquarters to discuss your future."}
                  </motion.p>
                  
                  <div className="flex flex-col gap-3 mt-auto">
                    <button 
                      onClick={() => setActiveTab('contact')} 
                      className={`w-full flex items-center justify-between px-5 py-3 rounded-2xl font-bold transition-all border-2 text-sm ${activeTab === 'contact' ? 'bg-card border-primary text-foreground shadow-lg scale-[1.02]' : 'bg-background/50 border-transparent text-muted-foreground hover:bg-background/80 hover:scale-[1.01]'}`}
                    >
                      <div className="flex items-center gap-3">
                        <MessageSquare className="w-4 h-4 text-primary" />
                        <span>Quick Contact</span>
                      </div>
                      {activeTab === 'contact' && <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(132,204,22,0.8)]" />}
                    </button>
                    
                    <button 
                      onClick={() => setActiveTab('office')} 
                      className={`w-full flex items-center justify-between px-5 py-3 rounded-2xl font-bold transition-all border-2 text-sm ${activeTab === 'office' ? 'bg-card border-primary text-foreground shadow-lg scale-[1.02]' : 'bg-background/50 border-transparent text-muted-foreground hover:bg-background/80 hover:scale-[1.01]'}`}
                    >
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-primary" />
                        <span>Visit Headquarters</span>
                      </div>
                      {activeTab === 'office' && <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(132,204,22,0.8)]" />}
                    </button>
                  </div>
                </div>

                {/* Right Side: Dynamic Content */}
                <div className="lg:col-span-7 flex flex-col h-full justify-center">
                  {activeTab === 'contact' && (
                    <motion.div 
                      key="contact-tab"
                      initial={{ opacity: 0, x: 20 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: -20 }}
                      className="flex flex-col gap-3"
                    >
                      {/* Office */}
                      <div className="flex items-center justify-between p-3 md:p-4 rounded-2xl border-2 border-border/50 bg-card hover:border-primary/50 transition-colors group">
                        <div className="flex items-center gap-3 md:gap-4">
                          <div className="w-10 h-10 rounded-full bg-lime-500/10 flex items-center justify-center text-lime-500 shrink-0 group-hover:bg-lime-500 group-hover:text-black transition-colors">
                            <MapPin className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-foreground">Office</h4>
                            <p className="text-xs text-muted-foreground mt-0.5">Samanpura, Patna, Bihar</p>
                          </div>
                        </div>
                        <div className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                          OPEN
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="flex items-center justify-between p-3 md:p-4 rounded-2xl border-2 border-border/50 bg-card hover:border-primary/50 transition-colors group">
                        <div className="flex items-center gap-3 md:gap-4">
                          <div className="w-10 h-10 rounded-full bg-lime-500/10 flex items-center justify-center text-lime-500 shrink-0 group-hover:bg-lime-500 group-hover:text-black transition-colors">
                            <Phone className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-foreground">Phone</h4>
                            <p className="text-xs text-muted-foreground mt-0.5">+91 98765 43210</p>
                          </div>
                        </div>
                        <div className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                          CALL
                        </div>
                      </div>

                      {/* WhatsApp */}
                      <div className="flex items-center justify-between p-3 md:p-4 rounded-2xl border-2 border-border/50 bg-card hover:border-primary/50 transition-colors group">
                        <div className="flex items-center gap-3 md:gap-4">
                          <div className="w-10 h-10 rounded-full bg-lime-500/10 flex items-center justify-center text-lime-500 shrink-0 group-hover:bg-lime-500 group-hover:text-black transition-colors">
                            <MessageCircle className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-foreground">WhatsApp</h4>
                            <p className="text-xs text-muted-foreground mt-0.5">+91 98765 43210</p>
                          </div>
                        </div>
                        <div className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                          CHAT
                        </div>
                      </div>

                      {/* Email */}
                      <div className="flex items-center justify-between p-3 md:p-4 rounded-2xl border-2 border-border/50 bg-card hover:border-primary/50 transition-colors group">
                        <div className="flex items-center gap-3 md:gap-4">
                          <div className="w-10 h-10 rounded-full bg-lime-500/10 flex items-center justify-center text-lime-500 shrink-0 group-hover:bg-lime-500 group-hover:text-black transition-colors">
                            <Mail className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-foreground">Email</h4>
                            <p className="text-xs text-muted-foreground mt-0.5">enquiry_aiabhyas@gmail.com</p>
                          </div>
                        </div>
                        <div className="text-[10px] font-bold tracking-widest text-muted-foreground uppercase">
                          MAIL
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'office' && (
                    <motion.div 
                      key="office-tab"
                      initial={{ opacity: 0, x: 20 }} 
                      animate={{ opacity: 1, x: 0 }} 
                      exit={{ opacity: 0, x: -20 }}
                      className="h-full flex flex-col"
                    >
                      <div className="p-6 md:p-8 rounded-[2.5rem] bg-card border-2 border-border/50 flex flex-col h-full justify-center relative overflow-hidden group hover:border-primary/50 transition-colors">
                        {/* Background decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-lime-500/5 rounded-full blur-[80px] pointer-events-none -translate-y-1/2 translate-x-1/2" />
                        
                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-6">
                            <div className="w-10 h-10 rounded-2xl bg-lime-500/10 flex items-center justify-center text-lime-500 shrink-0">
                              <MapPin className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl md:text-2xl font-heading font-bold text-foreground">Headquarters</h3>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Detailed Address</p>
                              <p className="text-base font-medium text-foreground leading-relaxed">
                                AI Abhyas, Samanpura, Near IGIMS<br />
                                Patna, Bihar 800014, India
                              </p>
                            </div>

                            <div className="w-full h-px bg-border/50" />

                            <div>
                              <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Hours of Operation</p>
                              <div className="space-y-1 text-sm">
                                <div className="flex justify-between items-center">
                                  <p className="font-medium text-foreground">Monday - Friday</p>
                                  <p className="text-muted-foreground">9:00 AM - 7:00 PM</p>
                                </div>
                                <div className="flex justify-between items-center">
                                  <p className="font-medium text-foreground">Saturday</p>
                                  <p className="text-muted-foreground">10:00 AM - 4:00 PM</p>
                                </div>
                                <div className="flex justify-between items-center">
                                  <p className="font-medium text-foreground">Sunday</p>
                                  <p className="text-destructive font-medium">Closed</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>

            {/* Google Map Embedded below the 2-column section */}
            <div className="w-full h-[300px] mt-12 lg:mt-16 rounded-3xl overflow-hidden border border-border shadow-lg relative group">
              <div className="absolute inset-0 bg-lime-500/5 pointer-events-none group-hover:bg-transparent transition-colors z-10" />
              <iframe 
                src="https://maps.google.com/maps?width=100%25&height=600&hl=en&q=Samanpura,%20Patna,%20Bihar&t=&z=15&ie=UTF8&iwloc=B&output=embed" 
                width="100%"
                height="100%"
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[20%] contrast-[1.1] group-hover:grayscale-0 transition-all duration-700"
              ></iframe>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
