"use client";

import React, { useRef, useState, useEffect } from "react";
import { useStore } from "@/context/store-context";
import { ProductCard } from "@/components/product-card";
import { 
  ShieldCheck, Download, Award, Clock, Search, 
  HelpCircle, ChevronDown, Star, MessageSquare 
} from "lucide-react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const FAQS = [
  {
    q: "How soon can I make my first $100 online?",
    a: "Many students who actively apply the setup checklists and use our pitch templates land their first paying project within 3 to 7 days of launching. The guides are designed to get you active immediately without delays."
  },
  {
    q: "Do I need prior technical experience or degrees?",
    a: "Absolutely not! The blueprints are written specifically for beginners. We focus on 'no-code' micro-skills like copy-editing, lead generation, profile auditing, and transcription that you can learn in under 2 hours."
  },
  {
    q: "Are the payments safe and encrypted?",
    a: "Yes. All purchases are handled through secure TLS-encrypted transaction networks powered by Stripe. Your billing credentials are fully secure and never stored on our servers."
  },
  {
    q: "What format are the strategy guides in?",
    a: "All items are instant-download digital files (PDF format), optimized to be read beautifully on phones, tablets, or laptops. You get lifetime access to all revisions and downloads!"
  }
];

const TESTIMONIALS = [
  {
    name: "Kelvin O.",
    location: "Nairobi, KE",
    quote: "I used the step-by-step setup checklist and secured my first paying client in 3 days. Super practical and straightforward!",
    rating: 5,
    tag: "Client Secured"
  },
  {
    name: "Amara N.",
    location: "Lagos, NG",
    quote: "The proposal pitch scripts are actual gold. I had been struggling to get replies from remote clients for weeks. Copy-pasted the script and got hired immediately.",
    rating: 5,
    tag: "Remote Contract"
  },
  {
    name: "Chloe L.",
    location: "Bristol, UK",
    quote: "Simple to understand, no unnecessary fluff. Just actionable blueprints. If you want to make a side income online, this is the perfect starting point.",
    rating: 5,
    tag: "Micro-task Income"
  }
];

/* ─── ANIMATION 1: Floating Orb ─────────────────────────────────────────── */
function FloatingOrb({ delay = 0, size = 300, x = "50%", y = "50%", color = "emerald" }: {
  delay?: number; size?: number; x?: string; y?: string; color?: string;
}) {
  const colorMap: Record<string, string> = {
    emerald: "bg-emerald-500/10",
    teal: "bg-teal-500/8",
    green: "bg-green-500/6",
  };
  return (
    <motion.div
      className={`absolute rounded-full blur-[80px] pointer-events-none ${colorMap[color] ?? colorMap.emerald}`}
      style={{ width: size, height: size, left: x, top: y, translateX: "-50%", translateY: "-50%" }}
      animate={{
        scale: [1, 1.18, 0.94, 1.1, 1],
        opacity: [0.6, 1, 0.7, 0.9, 0.6],
        x: [0, 18, -12, 8, 0],
        y: [0, -14, 10, -6, 0],
      }}
      transition={{ duration: 9 + delay, repeat: Infinity, ease: "easeInOut", delay }}
    />
  );
}

/* ─── ANIMATION 2: Counting number ──────────────────────────────────────── */
function CountUp({ target, prefix = "", suffix = "", duration = 2.2 }: {
  target: number; prefix?: string; suffix?: string; duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const triggered = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !triggered.current) {
        triggered.current = true;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / (duration * 1000), 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setCount(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

/* ─── ANIMATION 3: Rotating conic-gradient avatar border ────────────────── */
function AnimatedAvatar({ initials }: { initials: string }) {
  const rotation = useMotionValue(0);
  const springRotation = useSpring(rotation, { stiffness: 40, damping: 10 });

  useEffect(() => {
    let frame: number;
    let angle = 0;
    const tick = () => {
      angle = (angle + 0.6) % 360;
      rotation.set(angle);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [rotation]);

  return (
    <div className="relative h-24 w-24 flex-shrink-0">
      <motion.div
        className="absolute inset-0 rounded-full"
        style={{
          background: "conic-gradient(from 0deg, #10b981, #0d9488, #34d399, #10b981)",
          rotate: springRotation,
          padding: "2px",
          borderRadius: "9999px",
        }}
      >
        <div className="h-full w-full rounded-full bg-slate-950" />
      </motion.div>
      <div className="absolute inset-[3px] rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center font-black text-2xl text-slate-950 shadow-lg shadow-emerald-500/20">
        {initials}
      </div>
    </div>
  );
}

/* ─── ANIMATION 5: Section heading with glowing wipe underline ──────────── */
function GlowHeading({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={`relative inline-block ${className}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
      <motion.span
        className="absolute left-0 -bottom-1 h-[2px] rounded-full bg-gradient-to-r from-emerald-400 via-teal-300 to-transparent"
        initial={{ width: "0%" }}
        whileInView={{ width: "100%" }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
      />
    </motion.div>
  );
}

export default function Home() {
  const { products, convertPrice } = useStore();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Interactive feature states
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Filter products based on search input
  const filteredProducts = products.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.snippet.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useGSAP(() => {
    // 1. Hero Content Entrance (Fade & Slide)
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      ".hero-element",
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 }
    );

    // 2. Trust Indicators Entrance (Staggered Pop)
    tl.fromTo(
      ".trust-indicator-card",
      { opacity: 0, y: 20, scale: 0.92 },
      { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08 },
      "-=0.4"
    );

    // 3. Strategy Library Section Header (ScrollTriggered)
    gsap.fromTo(
      ".strategy-header-element",
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: ".strategy-section",
          start: "top 85%",
        }
      }
    );

    // 4. Product Grid Stagger Entrance
    gsap.fromTo(
      ".product-card-item",
      { opacity: 0, y: 45, rotationX: 8 },
      {
        opacity: 1,
        y: 0,
        rotationX: 0,
        duration: 0.8,
        stagger: 0.12,
        scrollTrigger: {
          trigger: ".product-grid-container",
          start: "top 90%",
        }
      }
    );

    // 5. Author section entrance
    gsap.fromTo(
      ".author-banner",
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".author-section",
          start: "top 88%",
        }
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="flex flex-col min-h-screen bg-transparent overflow-hidden relative">
      
      {/* 1. HERO SECTION — ANIMATION 1: Floating orbs */}
      <section className="relative pt-20 pb-24 overflow-hidden bg-transparent">
        {/* Floating animated orbs */}
        <FloatingOrb delay={0}   size={520} x="50%"  y="30%"  color="emerald" />
        <FloatingOrb delay={2.5} size={320} x="80%"  y="15%"  color="teal"    />
        <FloatingOrb delay={4.5} size={260} x="15%"  y="60%"  color="green"   />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="space-y-6 max-w-4xl mx-auto">
            {/* Top Tagline */}
            <div className="hero-element inline-block">
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">
                <Award className="h-4 w-4 text-theme-accent" /> Step-by-Step Online Income Blueprints
              </span>
            </div>

            {/* ANIMATION 2: CountUp hero stat */}
            <motion.div
              className="hero-element flex justify-center gap-4 sm:gap-8 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="px-6 py-3 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                <div className="text-3xl font-black text-emerald-400">
                  <CountUp target={100} prefix="$" />
                </div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">First Milestone</div>
              </div>
              <div className="px-6 py-3 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                <div className="text-3xl font-black text-emerald-400">
                  <CountUp target={7} suffix=" days" />
                </div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">Avg. Time to First $</div>
              </div>
              <div className="px-6 py-3 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl hidden sm:block">
                <div className="text-3xl font-black text-emerald-400">
                  <CountUp target={142} suffix="+" />
                </div>
                <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">Buyers Succeeded</div>
              </div>
            </motion.div>

            {/* Main Headline */}
            <h1 className="hero-element text-4xl sm:text-6xl font-black text-white leading-tight tracking-tight">
              Start Earning Online with{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500">
                Practical Guides
              </span>
            </h1>

            {/* Description */}
            <p className="hero-element text-slate-400 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Stop grinding without results. Secure the exact copy-paste scripts, profile checklists, and step-by-step checklists to make your first $100 online.
            </p>
          </div>

          {/* Core Trust Indicators Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mt-16">
            {[
              { icon: Download, title: "Instant Delivery", desc: "Download link sent immediately post-purchase." },
              { icon: ShieldCheck, title: "Secure Checkout", desc: "Encrypted credit card checkout powered by Stripe." },
              { icon: Clock, title: "Lifetime Updates", desc: "Free revised editions whenever platform rules adapt." },
              { icon: Award, title: "Beginner Friendly", desc: "No complex skills or high starting capital required." }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                className="trust-indicator-card p-4 bg-slate-900/30 rounded-2xl border border-slate-900 flex flex-col items-center text-center space-y-2"
                whileHover={{ scale: 1.04, borderColor: "rgba(16,185,129,0.3)", y: -3 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <div className="p-2 bg-emerald-500/10 rounded-xl text-theme-accent">
                  <item.icon className="h-5 w-5" />
                </div>
                <h3 className="text-sm font-bold text-white">{item.title}</h3>
                <p className="text-[10px] text-slate-500 leading-normal">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* 2. CATALOG GRID SECTION */}
      <section className="strategy-section py-20 bg-transparent border-t border-slate-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* ANIMATION 5: GlowHeading wipe underline */}
          <div className="text-center space-y-4 mb-12">
            <GlowHeading>
              <h2 className="strategy-header-element text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
                Explore Our Strategy Library
              </h2>
            </GlowHeading>
            <p className="strategy-header-element text-slate-400 text-sm sm:text-base max-w-md mx-auto">
              Select one of our action-oriented manuals to accelerate your remote income journey today.
            </p>

            {/* Feature 8: Search & Filter Toolbar */}
            <div className="max-w-md mx-auto relative pt-4">
              <div className="relative">
                <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-500" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search templates, proposal scripts, guides..."
                  className="w-full bg-slate-900/60 border border-slate-800 rounded-2xl pl-11 pr-4 py-3 text-xs text-white focus:outline-none focus:border-theme-accent focus:ring-2 focus:ring-emerald-500/10 transition-all placeholder-slate-500"
                />
              </div>
              {searchQuery && (
                <div className="absolute right-3 top-7 text-[10px] text-slate-500 font-bold">
                  {filteredProducts.length} matched
                </div>
              )}
            </div>
          </div>

          {/* Product Cards Grid */}
          <div className="product-grid-container grid grid-cols-1 md:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  key={product.id} 
                  className="product-card-item"
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredProducts.length === 0 && (
              <div className="col-span-full py-16 text-center space-y-3">
                <Search className="h-10 w-10 text-slate-700 mx-auto" />
                <h4 className="text-sm font-bold text-slate-400">No blueprints match your query</h4>
                <p className="text-xs text-slate-500">Try checking details on another search term.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ANIMATION 4: TESTIMONIALS — smooth crossfade slide */}
      <section className="py-20 bg-transparent border-t border-slate-900/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <motion.div
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/5 border border-emerald-500/10 rounded-full text-xs font-black text-theme-accent uppercase tracking-wider"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <MessageSquare className="h-3.5 w-3.5" /> Reader Success Stories
            </motion.div>
            <GlowHeading>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Rated 5.0 Stars by Global Beginners</h2>
            </GlowHeading>
          </div>

          {/* Glass Testimonial Frame */}
          <div className="glass-panel border-slate-900 rounded-3xl p-8 sm:p-12 relative overflow-hidden flex flex-col items-center text-center shadow-xl min-h-[280px] justify-center">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />

            {/* Stars */}
            <div className="flex gap-1 text-amber-400 mb-6">
              {[...Array(TESTIMONIALS[activeTestimonial].rating)].map((_, i) => (
                <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.07, type: "spring" }}>
                  <Star className="h-5 w-5 fill-current" />
                </motion.div>
              ))}
            </div>

            {/* ANIMATION 4: Cross-fade slide quote */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="flex flex-col items-center"
              >
                <p className="text-sm sm:text-lg text-slate-200 font-medium italic leading-relaxed max-w-2xl">
                  &quot;{TESTIMONIALS[activeTestimonial].quote}&quot;
                </p>
                <div className="mt-6">
                  <h4 className="text-sm font-black text-white">{TESTIMONIALS[activeTestimonial].name}</h4>
                  <p className="text-[10px] font-bold text-slate-500 mt-0.5">
                    {TESTIMONIALS[activeTestimonial].location} • {TESTIMONIALS[activeTestimonial].tag}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="flex gap-2 mt-8">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                    activeTestimonial === idx ? "bg-theme-accent w-6" : "w-2.5 bg-slate-800 hover:bg-slate-700"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 bg-transparent border-t border-slate-900/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-16">
            <motion.div
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/5 border border-emerald-500/10 rounded-full text-xs font-black text-theme-accent uppercase tracking-wider"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <HelpCircle className="h-3.5 w-3.5" /> Pre-Sales Queries
            </motion.div>
            <GlowHeading>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Frequently Asked Questions</h2>
            </GlowHeading>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="bg-slate-900/30 border border-slate-900 hover:border-slate-800/80 rounded-2xl overflow-hidden transition-colors duration-300"
                >
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer focus:outline-none"
                  >
                    <span className="text-xs sm:text-sm font-bold text-white pr-4">{faq.q}</span>
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180 text-theme-accent" : ""}`} />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-1 border-t border-slate-900/60 text-xs text-slate-400 leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ANIMATION 3: Author section with spinning conic gradient avatar */}
      <section className="author-section py-16 bg-transparent border-t border-slate-900/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="author-banner glass-panel border-slate-800 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl" />

            {/* ANIMATION 3: Rotating conic gradient border on avatar */}
            <AnimatedAvatar initials="OM" />

            <div className="space-y-4 text-center md:text-left">
              <span className="text-[10px] uppercase font-black text-theme-accent tracking-wider">Meet The Author</span>
              <h3 className="text-xl sm:text-2xl font-black text-white">OnlineWithMuuo Mentor Team</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                We specialize in helping beginners navigate the remote work market. Having successfully earned online through writing, data analytics, and digital services, we put together these step-by-step blueprints to help you avoid common pitfalls and earn your first $100 online with ease.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
