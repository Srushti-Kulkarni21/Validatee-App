"use client";

import React, { useState, useEffect } from "react";
import ShaderBackground from "./ShaderBackground";
import { generateValidation, PRESETS, ValidationResult } from "./mockData";

type ViewState = "landing" | "loading" | "dashboard";
type TabState = "dashboard" | "ideas" | "competitors" | "research" | "roadmaps" | "reports" | "settings";

export default function Home() {
  const [view, setView] = useState<ViewState>("landing");
  const [activeTab, setActiveTab] = useState<TabState>("dashboard");
  const [ideaInput, setIdeaInput] = useState("");
  const [country, setCountry] = useState("United States");
  const [targetAudience, setTargetAudience] = useState("");
  const [businessModel, setBusinessModel] = useState("");
  const [result, setResult] = useState<ValidationResult | null>(null);
  
  // Loading simulation state
  const [loadingStep, setLoadingStep] = useState(0);
  const loadingMessages = [
    "Initializing AI validator engine...",
    "Crawling market trends and developer platforms...",
    "Analyzing competitive landscape...",
    "Synthesizing revenue models and risk profile..."
  ];

  // Mobile menu toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Trigger loading sequence
  const startAnalysis = async (ideaText: string) => {
    if (!ideaText.trim()) return;
    setIdeaInput(ideaText);
    setView("loading");
    setLoadingStep(0);

    const interval = setInterval(() => {
      setLoadingStep((prev) => prev < loadingMessages.length - 1 ? prev + 1 : prev);
    }, 2000);

    try {
      const res = await fetch('/api/research', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idea: ideaText,
          country,
          targetAudience,
          businessModel
        })
      });
      if (!res.ok) throw new Error('API Error');
      const data = await res.json();
      setResult(data);
      setView("dashboard");
      setActiveTab("dashboard");
    } catch (e) {
      console.error(e);
      alert('Failed to analyze idea. Please try again or check the console.');
      setView("landing");
    } finally {
      clearInterval(interval);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden select-none bg-[#0A0B0F] font-sans">
      
      {/* 1. Interactive WebGL Shader Background */}
      <div 
        className="fixed inset-0 pointer-events-none transition-opacity duration-1000 z-0"
        style={{ opacity: view === "dashboard" ? 0.35 : 0.65 }}
      >
        <ShaderBackground />
      </div>

      {/* Ambient background glows specifically for Dashboard elevation */}
      {view === "dashboard" && (
        <div className="fixed inset-0 z-[-1] pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-container/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-secondary-container/5 rounded-full blur-[120px]" />
        </div>
      )}

      {/* 2. LANDING STATE */}
      {view === "landing" && (
        <>
          {/* Header */}
          <header className="relative z-40 flex items-center justify-between px-gutter h-16 border-b border-white/5 bg-surface/80 backdrop-blur-xl w-full">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">analytics</span>
              <span className="font-display-lg-mobile text-display-lg-mobile font-bold text-primary tracking-tight">ValidateAI</span>
            </div>
            <div>
              <button 
                onClick={() => startAnalysis("AI Fitness Coach")}
                className="font-label-sm text-label-sm text-on-surface-variant hover:text-primary transition-colors px-4 py-2 cursor-pointer"
              >
                Demo App
              </button>
            </div>
          </header>

          {/* Main Hero Form */}
          <main className="relative z-10 flex-grow flex items-center justify-center px-gutter py-xl md:py-24">
            <div className="max-w-container-max w-full mx-auto flex flex-col items-center text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 mb-6">
                <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                <span className="font-label-sm text-label-sm text-primary">AI Core Active</span>
              </div>
              
              <h1 className="font-display-lg text-display-lg md:text-[64px] md:leading-[1.1] mb-6 text-gradient pb-2">
                Validate Startup Ideas <br className="hidden md:block"/> Before You Build
              </h1>
              
              <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-lg">
                Analyze market opportunities, competitors, monetization strategies, and risks using AI. Stop guessing and start building with calculated confidence.
              </p>

              {/* Form Input Container */}
              <div className="w-full max-w-3xl glass-panel rounded-xl p-md md:p-8 mb-8 relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/10 to-transparent rounded-xl blur-md -z-10" />
                <form 
                  onSubmit={(e) => { e.preventDefault(); startAnalysis(ideaInput); }}
                  className="flex flex-col gap-4 relative z-10"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-outline-variant">lightbulb</span>
                      <input 
                        className="glass-input w-full rounded-lg py-4 pl-12 pr-4 font-body-md text-body-md text-on-surface placeholder:text-outline-variant h-14" 
                        placeholder="Describe your startup idea (e.g., AI Fitness Coach, Pet Health Triage...)" 
                        type="text"
                        value={ideaInput}
                        onChange={(e) => setIdeaInput(e.target.value)}
                        required
                      />
                    </div>
                    <button 
                      type="submit"
                      className="btn-primary rounded-lg px-8 py-4 font-label-sm text-label-sm uppercase tracking-wider h-14 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-sm">search</span>
                      Analyze Idea
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input 
                      className="glass-input w-full rounded-lg py-3 px-4 font-body-sm text-body-sm text-on-surface placeholder:text-outline-variant"
                      placeholder="Country (e.g. India, USA)" 
                      value={country}
                      onChange={e => setCountry(e.target.value)}
                    />
                    <input 
                      className="glass-input w-full rounded-lg py-3 px-4 font-body-sm text-body-sm text-on-surface placeholder:text-outline-variant"
                      placeholder="Target Audience (e.g. Gen Z, B2B)" 
                      value={targetAudience}
                      onChange={e => setTargetAudience(e.target.value)}
                    />
                    <input 
                      className="glass-input w-full rounded-lg py-3 px-4 font-body-sm text-body-sm text-on-surface placeholder:text-outline-variant"
                      placeholder="Business Model (e.g. SaaS, Marketplace)" 
                      value={businessModel}
                      onChange={e => setBusinessModel(e.target.value)}
                    />
                  </div>
                </form>
              </div>

              {/* Example Suggestions */}
              <div className="flex flex-col items-center gap-4">
                <span className="font-label-sm text-label-sm text-outline-variant uppercase tracking-widest">Example Analyses</span>
                <div className="flex flex-wrap justify-center gap-3">
                  <button 
                    onClick={() => startAnalysis("AI Nutrition Coach")}
                    className="chip rounded-full px-4 py-2 font-label-sm text-label-sm flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">psychology</span>
                    AI Nutrition Coach
                  </button>
                  <button 
                    onClick={() => startAnalysis("Pet Healthcare Platform")}
                    className="chip rounded-full px-4 py-2 font-label-sm text-label-sm flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">pets</span>
                    Pet Healthcare Platform
                  </button>
                  <button 
                    onClick={() => startAnalysis("Construction Management SaaS")}
                    className="chip rounded-full px-4 py-2 font-label-sm text-label-sm flex items-center gap-2 cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-[14px]">architecture</span>
                    Construction Management SaaS
                  </button>
                </div>
              </div>
            </div>
          </main>

          <footer className="relative z-10 mt-auto py-6 border-t border-white/5 bg-surface/20 text-center font-label-sm text-label-sm text-on-surface-variant/50">
            ValidateAI © 2026. Powered by Advanced Agentic Intelligence.
          </footer>
        </>
      )}

      {/* 3. LOADING STATE */}
      {view === "loading" && (
        <main className="relative z-10 flex-grow flex flex-col items-center justify-center p-md text-center">
          <div className="max-w-md w-full glass-panel rounded-2xl p-8 flex flex-col items-center gap-6 shadow-[0_0_50px_rgba(109,93,252,0.1)]">
            {/* Spinning Neon Aura Ring */}
            <div className="relative w-24 h-24 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-primary/10 border-t-primary animate-spin" />
              <div className="absolute inset-2 rounded-full border-4 border-secondary/10 border-b-secondary animate-[spin_2s_linear_infinite_reverse]" />
              <span className="material-symbols-outlined text-primary text-3xl animate-pulse">smart_toy</span>
            </div>

            <div>
              <h2 className="font-headline-md text-headline-md text-on-surface mb-2">Analyzing Idea</h2>
              <p className="font-label-sm text-label-sm text-primary tracking-wide uppercase">"{ideaInput}"</p>
            </div>

            {/* Stepped Status Text with Fading Animations */}
            <div className="w-full bg-surface-container-lowest py-3 px-4 rounded-lg border border-white/5 min-h-[50px] flex items-center justify-center">
              <p className="font-body-md text-body-md text-on-surface-variant animate-pulse">
                {loadingMessages[loadingStep]}
              </p>
            </div>

            {/* Simulated Progress Line */}
            <div className="w-full bg-surface-container h-1.5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-1000 ease-out"
                style={{ width: `${((loadingStep + 1) / loadingMessages.length) * 100}%` }}
              />
            </div>
          </div>
        </main>
      )}

      {/* 4. DASHBOARD STATE */}
      {view === "dashboard" && result && (
        <div className="flex flex-1 min-h-screen relative">
          
          {/* Sidebar Navigation */}
 <nav className={`
  fixed md:flex flex-col h-screen py-md px-sm ...
  w-60 fixed left-0 top-0 ...
  ${mobileMenuOpen ? "flex left-0" : "-left-60 md:left-0"}
`}>
            <div className="mb-xl flex flex-col gap-xs">
              <h1 className="font-display-lg text-display-lg text-primary text-[28px] font-bold tracking-tighter">ValidateAI</h1>
              <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-widest text-[10px]">AI Core Active</span>
            </div>

            <div className="flex-1 flex flex-col gap-base">
              <button 
                onClick={() => { setActiveTab("dashboard"); setMobileMenuOpen(false); }}
                className={`flex items-center gap-xs w-full text-left px-sm py-xs rounded-DEFAULT transition-colors font-label-sm text-label-sm cursor-pointer
                  ${activeTab === "dashboard" ? "text-primary border-l-2 border-primary bg-primary/5 font-semibold" : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface"}
                `}
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: activeTab === "dashboard" ? "'FILL' 1" : "" }}>dashboard</span>
                Dashboard
              </button>

              <button 
                onClick={() => { setActiveTab("ideas"); setMobileMenuOpen(false); }}
                className={`flex items-center gap-xs w-full text-left px-sm py-xs rounded-DEFAULT transition-colors font-label-sm text-label-sm cursor-pointer
                  ${activeTab === "ideas" ? "text-primary border-l-2 border-primary bg-primary/5 font-semibold" : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface"}
                `}
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: activeTab === "ideas" ? "'FILL' 1" : "" }}>lightbulb</span>
                SWOT Analysis
              </button>

              <button 
                onClick={() => { setActiveTab("competitors"); setMobileMenuOpen(false); }}
                className={`flex items-center gap-xs w-full text-left px-sm py-xs rounded-DEFAULT transition-colors font-label-sm text-label-sm cursor-pointer
                  ${activeTab === "competitors" ? "text-primary border-l-2 border-primary bg-primary/5 font-semibold" : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface"}
                `}
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: activeTab === "competitors" ? "'FILL' 1" : "" }}>swords</span>
                Competitors
              </button>

              <button 
                onClick={() => { setActiveTab("research"); setMobileMenuOpen(false); }}
                className={`flex items-center gap-xs w-full text-left px-sm py-xs rounded-DEFAULT transition-colors font-label-sm text-label-sm cursor-pointer
                  ${activeTab === "research" ? "text-primary border-l-2 border-primary bg-primary/5 font-semibold" : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface"}
                `}
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: activeTab === "research" ? "'FILL' 1" : "" }}>search</span>
                Market Research
              </button>

              <button 
                onClick={() => { setActiveTab("roadmaps"); setMobileMenuOpen(false); }}
                className={`flex items-center gap-xs w-full text-left px-sm py-xs rounded-DEFAULT transition-colors font-label-sm text-label-sm cursor-pointer
                  ${activeTab === "roadmaps" ? "text-primary border-l-2 border-primary bg-primary/5 font-semibold" : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface"}
                `}
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: activeTab === "roadmaps" ? "'FILL' 1" : "" }}>map</span>
                Roadmap
              </button>

              <button 
                onClick={() => { setActiveTab("reports"); setMobileMenuOpen(false); }}
                className={`flex items-center gap-xs w-full text-left px-sm py-xs rounded-DEFAULT transition-colors font-label-sm text-label-sm cursor-pointer
                  ${activeTab === "reports" ? "text-primary border-l-2 border-primary bg-primary/5 font-semibold" : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface"}
                `}
              >
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: activeTab === "reports" ? "'FILL' 1" : "" }}>assessment</span>
                Export Report
              </button>

              <button 
                onClick={() => { setActiveTab("settings"); setMobileMenuOpen(false); }}
                className={`flex items-center gap-xs w-full text-left px-sm py-xs rounded-DEFAULT transition-colors font-label-sm text-label-sm mt-auto cursor-pointer
                  ${activeTab === "settings" ? "text-primary border-l-2 border-primary bg-primary/5 font-semibold" : "text-on-surface-variant hover:bg-white/5 hover:text-on-surface"}
                `}
              >
                <span className="material-symbols-outlined text-[20px]">settings</span>
                Settings
              </button>
            </div>

            <div className="mt-sm">
              <button 
                onClick={() => { setView("landing"); setIdeaInput(""); }}
                className="w-full bg-primary-container text-on-primary-container font-label-sm text-label-sm py-xs rounded-DEFAULT border-t border-white/20 hover:brightness-110 transition-all flex items-center justify-center gap-base cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                New Analysis
              </button>
            </div>
          </nav>

          {/* Background overlay when mobile sidebar is active */}
          {mobileMenuOpen && (
            <div 
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 md:hidden" 
            />
          )}

          {/* Top App Bar */}
<header className="fixed top-0 right-0 left-0 md:left-60 h-16 bg-surface/80 dark:bg-surface/80 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-gutter w-full z-40">            <div className="flex items-center gap-sm md:hidden">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-on-surface cursor-pointer p-1"
              >
                <span className="material-symbols-outlined">menu</span>
              </button>
              <h1 className="font-display-lg-mobile text-display-lg-mobile font-bold text-primary text-[24px]">ValidateAI</h1>
            </div>

            {/* Breadcrumb / Title area */}
            <div className="hidden md:flex items-center gap-3">
              <span className="font-label-sm text-label-sm text-on-surface-variant/70 uppercase">PROJECTS</span>
              <span className="text-white/20">/</span>
              <span className="font-label-sm text-label-sm text-primary uppercase font-bold">{result.idea}</span>
            </div>

            <div className="flex items-center gap-sm">
              <button className="text-on-surface-variant hover:text-primary transition-colors scale-95 active:scale-90 relative cursor-pointer">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-full" />
              </button>
              <button 
                onClick={() => alert("Welcome to ValidateAI Dashboard! Access tabs on the left to review metrics.")}
                className="text-on-surface-variant hover:text-primary transition-colors scale-95 active:scale-90 cursor-pointer"
              >
                <span className="material-symbols-outlined">help_outline</span>
              </button>
              <div className="w-8 h-8 rounded-full bg-surface-container-high overflow-hidden border border-white/10 ml-xs cursor-pointer">
                <img 
                  alt="User Profile Avatar" 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIlyK9_SFR_RWCZy11ShrEGWCeL-1EY91wAm129vSKSfM6gi8p-XwIGtq5kJSmTBiY_EuUZeu7CQUIO4toAZfEZMR5YpLJ59mMcZPFlMDoijEmjoI_zGvWnLV0kSu81AqdtC2Ml4hHAOsGv1nXPYQhdsugpEjs6jET4BTiS5JUIBRmR_yMwx2SOYk40xk8lVOGQF2rJEbKzHueGS-Fb-oXpgrLGlK5dkY0hUiH7xQxSm0gFdFf-RBUkFnxfxIFPl3wPHmYbmmpqFc"
                />
              </div>
            </div>
          </header>

          {/* Main Dashboard Panel */}
<main className="flex-1 min-w-0 md:ml-60 pt-20 md:pt-[88px] px-4 sm:px-gutter pb-xl w-full max-w-container-max mx-auto z-10 relative">            
            {/* Dashboard Subheader */}
            <div className="mb-lg flex flex-col sm:flex-row sm:items-end justify-between gap-sm">
              <div>
               <h2 className="font-headline-md text-headline-md text-on-surface mb-xs flex flex-wrap items-center gap-2 break-words">
  Analysis Results:
  <span className="text-white font-bold break-words">
    "{result.idea}"
  </span>
</h2>
                <p className="font-body-md text-body-md text-on-surface-variant">Validated against 1.2M market database data points.</p>
              </div>
              <div className="flex gap-xs">
                <button 
                  onClick={() => alert("Exporting PDF report format...")}
                  className="px-sm py-xs rounded-DEFAULT border border-white/10 text-on-surface font-label-sm text-label-sm hover:bg-white/5 transition-colors flex items-center gap-base cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">download</span> Export
                </button>
                <button 
                  onClick={() => alert(`Direct link copied: https://validate.ai/reports/${encodeURIComponent(result.idea)}`)}
                  className="px-sm py-xs rounded-DEFAULT bg-primary-container text-on-primary-container font-label-sm text-label-sm border-t border-white/20 hover:brightness-110 transition-colors cursor-pointer"
                >
                  Share Insight
                </button>
              </div>
            </div>

            {/* TAB RENDERING SWITCH */}
            
            {/* A. DASHBOARD VIEW */}
            {activeTab === "dashboard" && (
              <div className="space-y-lg animate-fade-in">
                {/* 1. Top Bento Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-sm">
                  {/* Opportunity Score Card (Span 2) */}
                  <div className="glass-card p-sm flex flex-col justify-between col-span-1 lg:col-span-2 relative overflow-hidden group">
                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-secondary/10 rounded-full blur-[30px] group-hover:bg-secondary/20 transition-all" />
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">Opportunity Score</span>
                    
                    <div className="flex items-end gap-sm mt-sm">
                      <div className="text-[64px] font-display-lg text-on-surface font-bold leading-none tracking-tighter text-glow">
                        {result.oppScore}
                      </div>
                      <div className={`font-label-sm text-label-sm mb-xs flex items-center gap-0.5
                        ${result.oppScore >= 90 ? "text-secondary" : result.oppScore >= 80 ? "text-primary" : "text-tertiary"}
                      `}>
                        <span className="material-symbols-outlined text-[16px]">trending_up</span> 
                        {result.oppScore >= 90 ? "Top 5%" : result.oppScore >= 80 ? "Strong Idea" : "Viable Niche"}
                      </div>
                    </div>

                    <div className="w-full bg-surface-container-high h-2 mt-sm rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-secondary shadow-[0_0_12px_#41eec2] transition-all duration-1000"
                        style={{ width: `${result.oppScore}%` }}
                      />
                    </div>
                  </div>

                  {/* Market Size Card */}
                  <div className="glass-card p-sm flex flex-col justify-between">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider flex items-center gap-base">
                      <span className="material-symbols-outlined text-[16px]">language</span> Market Size
                    </span>
                    <div className="text-[32px] font-display-lg-mobile text-on-surface font-bold mt-sm">{result.marketSize}</div>
                    <span className="font-body-md text-body-md text-on-surface-variant/70 text-sm">{result.marketGrowth}</span>
                  </div>

                  {/* Competition Card */}
                  <div className="glass-card p-sm flex flex-col justify-between">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider flex items-center gap-base">
                      <span className="material-symbols-outlined text-[16px]">swords</span> Competition
                    </span>
                    <div className={`text-[32px] font-display-lg-mobile font-bold mt-sm
                      ${result.competition === "High" ? "text-error" : result.competition === "Medium" ? "text-primary" : "text-secondary"}
                    `}>
                      {result.competition}
                    </div>
                    <span className="font-body-md text-body-md text-on-surface-variant/70 text-sm">{result.competitionDetails}</span>
                  </div>

                  {/* Revenue Projections Card */}
                  <div className="glass-card p-sm flex flex-col justify-between">
                    <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider flex items-center gap-base">
                      <span className="material-symbols-outlined text-[16px]">payments</span> Rev. Potential
                    </span>
                    <div className="text-[32px] font-display-lg-mobile text-secondary font-bold mt-sm">{result.revPotential}</div>
                    <span className="font-body-md text-body-md text-on-surface-variant/70 text-sm">{result.revDetails}</span>
                  </div>
                </div>

                {/* 2. AI Recommendation Insight Box */}
                <div className="glass-card p-md border-l-4 border-l-primary relative overflow-hidden">
                  <div className="absolute right-0 top-0 w-64 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />
                  <div className="flex items-start gap-sm relative z-10">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined animate-bounce">smart_toy</span>
                    </div>
                    <div>
                      <h3 className="font-label-sm text-label-sm text-primary uppercase tracking-wider mb-xs">AI Insight & Suggestions</h3>
                      <p className="font-body-lg text-body-lg text-on-surface leading-relaxed">{result.aiInsight}</p>
                    </div>
                  </div>
                </div>

                {/* 3. Competitive landscape & SWOT Highlights Quick View */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-md">
                  <div className="glass-card p-md flex flex-col justify-between">
                    <div>
                      <h3 className="font-headline-md text-headline-md text-on-surface mb-sm flex items-center gap-2">
                        <span className="material-symbols-outlined text-secondary">groups</span> Competitor Highlights
                      </h3>
                      {result.hasCompetitors ? (
                        <div className="space-y-sm">
                          {result.competitors.slice(0, 3).map((comp, idx) => (
                            <div key={idx} className="flex justify-between items-center py-2 border-b border-white/5 last:border-none">
                              <div>
                                <div className="font-body-md text-body-md font-semibold text-white">{comp.name}</div>
                                <div className="text-xs text-on-surface-variant/80">{comp.weakness}</div>
                              </div>
                              <span className="px-3 py-1 rounded bg-[#1A1B23] border border-white/5 font-label-sm text-label-sm text-secondary shrink-0">
                                {comp.marketShare} share
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-6 flex flex-col items-center justify-center">
                          <span className="material-symbols-outlined text-[36px] text-secondary mb-2 animate-pulse">explore</span>
                          <div className="font-body-md text-body-md font-semibold text-white mb-1">Blue Ocean Market</div>
                          <p className="text-xs text-on-surface-variant/70 max-w-[240px] leading-relaxed">
                            No direct competitors exist for this niche concept. 
                          </p>
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={() => setActiveTab("competitors")}
                      className="btn-primary rounded-lg py-2.5 w-full font-label-sm text-label-sm uppercase tracking-widest text-center cursor-pointer mt-4"
                    >
                      {result.hasCompetitors ? "View All Competitors" : "View Adjacent Platforms"}
                    </button>
                  </div>

                  <div className="glass-card p-md flex flex-col justify-between">
                    <div>
                      <h3 className="font-headline-md text-headline-md text-on-surface mb-sm flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary">analytics</span> Market Strategy SWOT
                      </h3>
                      <p className="font-body-md text-body-md text-on-surface-variant mb-4">
                        SWOT matrix indicates a high likelihood of capturing early adopters. Key strengths lay in specialized algorithmic parameters.
                      </p>
                    </div>
                    <button 
                      onClick={() => setActiveTab("ideas")} 
                      className="btn-primary rounded-lg py-3 w-full font-label-sm text-label-sm uppercase tracking-widest text-center cursor-pointer"
                    >
                      View Detailed SWOT Matrix
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* B. SWOT MATRIX VIEW */}
            {activeTab === "ideas" && (
              <div className="space-y-md animate-fade-in">
                <div className="glass-card p-md mb-md">
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-xs">Detailed SWOT Analysis</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">Strategic internal strengths/weaknesses and external opportunities/threats model.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                  {/* Strengths */}
                  <div className="glass-card p-md border-t-2 border-secondary/40">
                    <h4 className="font-label-sm text-label-sm text-secondary uppercase tracking-widest flex items-center gap-1.5 mb-sm font-bold">
                      <span className="material-symbols-outlined text-[16px]">add_circle</span> Strengths (Internal)
                    </h4>
                    <ul className="space-y-xs">
                      {result.swot.strengths.map((item, idx) => (
                        <li key={idx} className="flex gap-2 text-body-md text-body-md text-on-surface">
                          <span className="text-secondary">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Weaknesses */}
                  <div className="glass-card p-md border-t-2 border-error/40">
                    <h4 className="font-label-sm text-label-sm text-error uppercase tracking-widest flex items-center gap-1.5 mb-sm font-bold">
                      <span className="material-symbols-outlined text-[16px]">remove_circle</span> Weaknesses (Internal)
                    </h4>
                    <ul className="space-y-xs">
                      {result.swot.weaknesses.map((item, idx) => (
                        <li key={idx} className="flex gap-2 text-body-md text-body-md text-on-surface">
                          <span className="text-error">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Opportunities */}
                  <div className="glass-card p-md border-t-2 border-primary/40">
                    <h4 className="font-label-sm text-label-sm text-primary uppercase tracking-widest flex items-center gap-1.5 mb-sm font-bold">
                      <span className="material-symbols-outlined text-[16px]">star</span> Opportunities (External)
                    </h4>
                    <ul className="space-y-xs">
                      {result.swot.opportunities.map((item, idx) => (
                        <li key={idx} className="flex gap-2 text-body-md text-body-md text-on-surface">
                          <span className="text-primary">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Threats */}
                  <div className="glass-card p-md border-t-2 border-tertiary/40">
                    <h4 className="font-label-sm text-label-sm text-tertiary uppercase tracking-widest flex items-center gap-1.5 mb-sm font-bold">
                      <span className="material-symbols-outlined text-[16px]">warning</span> Threats (External)
                    </h4>
                    <ul className="space-y-xs">
                      {result.swot.threats.map((item, idx) => (
                        <li key={idx} className="flex gap-2 text-body-md text-body-md text-on-surface">
                          <span className="text-tertiary">•</span> {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* C. COMPETITORS MATRIX VIEW */}
            {activeTab === "competitors" && (
              <div className="glass-card p-md overflow-x-auto animate-fade-in">
                {result.hasCompetitors ? (
                  <>
                    <div className="mb-md flex flex-col sm:flex-row sm:items-center justify-between gap-sm">
                      <div>
                        <h3 className="font-headline-md text-headline-md text-on-surface mb-xs">Competitive Landscape</h3>
                        <p className="font-body-md text-body-md text-on-surface-variant">Top players currently positioned in the TAM space.</p>
                      </div>
                      <span className="px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/20 text-secondary font-label-sm text-label-sm">
                        {result.competitors.length} Key Competitors Tracked
                      </span>
                    </div>
                    <table className="w-full text-left border-collapse min-w-[600px]">
                      <thead>
                        <tr className="border-b border-white/10 text-on-surface-variant font-label-sm text-label-sm">
                          <th className="py-3 px-4 uppercase tracking-wider">Competitor Name</th>
                          <th className="py-3 px-4 uppercase tracking-wider">Estimated Share</th>
                          <th className="py-3 px-4 uppercase tracking-wider text-secondary">Core Strength</th>
                          <th className="py-3 px-4 uppercase tracking-wider text-error">Key Vulnerability</th>
                        </tr>
                      </thead>
                      <tbody>
                        {result.competitors.map((comp, idx) => (
                          <tr key={idx} className="border-b border-white/5 last:border-none text-body-md text-body-md hover:bg-white/2 transition-colors">
                            <td className="py-4 px-4 font-semibold text-white">{comp.name}</td>
                            <td className="py-4 px-4">{comp.marketShare}</td>
                            <td className="py-4 px-4 text-secondary/90">{comp.strength}</td>
                            <td className="py-4 px-4 text-on-surface-variant/90">{comp.weakness}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                ) : (
                  <div className="space-y-lg">
                    <div className="p-md rounded bg-secondary/5 border border-secondary/15 flex items-start gap-4">
                      <span className="material-symbols-outlined text-secondary text-3xl">info</span>
                      <div>
                        <h4 className="font-headline-md text-headline-md text-white mb-xs">No Direct Competitors Exist (Blue Ocean)</h4>
                        <p className="text-sm text-on-surface-variant leading-relaxed">
                          Our market analysis database did not identify any direct competitors providing this exact utility. This suggests a potential **Blue Ocean market opportunity**, where you hold first-mover advantages.
                        </p>
                      </div>
                    </div>

                    <div className="pt-sm">
                      <h4 className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider mb-xs">Similar & Adjacent Platforms</h4>
                      <p className="text-sm text-on-surface-variant mb-md">
                        While no direct competitors exist, users typically solve this problem or build custom workarounds using these general automation or no-code platforms:
                      </p>
                      
                      <table className="w-full text-left border-collapse min-w-[600px]">
                        <thead>
                          <tr className="border-b border-white/10 text-on-surface-variant font-label-sm text-label-sm">
                            <th className="py-3 px-4 uppercase tracking-wider">Adjacent Platform</th>
                            <th className="py-3 px-4 uppercase tracking-wider text-secondary">Platform Strength</th>
                            <th className="py-3 px-4 uppercase tracking-wider text-error">Gap / Vulnerability</th>
                          </tr>
                        </thead>
                        <tbody>
                          {result.competitors.map((comp, idx) => (
                            <tr key={idx} className="border-b border-white/5 last:border-none text-body-md text-body-md hover:bg-white/2 transition-colors">
                              <td className="py-4 px-4 font-semibold text-white">{comp.name}</td>
                              <td className="py-4 px-4 text-secondary/90">{comp.strength}</td>
                              <td className="py-4 px-4 text-on-surface-variant/90">{comp.weakness}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* D. MARKET RESEARCH TAB */}
            {activeTab === "research" && (
              <div className="space-y-md animate-fade-in">
                <div className="glass-card p-md">
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-xs">Market Validation Data</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">Crawling databases to establish customer acquisition strategies.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-sm">
                  <div className="glass-card p-sm flex flex-col gap-2">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">AVERAGE CUSTOMER LTV</span>
                    <span className="text-[28px] font-bold text-white">$450</span>
                    <span className="text-xs text-secondary">High expansion rate possibility</span>
                  </div>
                  <div className="glass-card p-sm flex flex-col gap-2">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">ESTIMATED PAYBACK PERIOD</span>
                    <span className="text-[28px] font-bold text-white">4.8 Months</span>
                    <span className="text-xs text-primary">Fast capital recirculation</span>
                  </div>
                  <div className="glass-card p-sm flex flex-col gap-2">
                    <span className="font-label-sm text-label-sm text-on-surface-variant">ORGANIC CAC POTENTIAL</span>
                    <span className="text-[28px] font-bold text-white">$65</span>
                    <span className="text-xs text-tertiary">Leveraging dynamic loops</span>
                  </div>
                </div>

                <div className="glass-card p-md space-y-sm">
                  <h4 className="font-label-sm text-label-sm text-primary uppercase font-bold tracking-wider">Live AI Crawl Source References</h4>
                  {result.sources && result.sources.length > 0 ? (
                    result.sources.map((src, i) => (
                      <div key={i} className="p-3 bg-surface-container rounded border border-white/5 space-y-1">
                        <a href={src.url} target="_blank" rel="noreferrer" className="text-sm font-semibold text-secondary hover:underline flex items-center gap-1 w-fit">
                          {src.title} <span className="material-symbols-outlined text-[14px]">open_in_new</span>
                        </a>
                        <p className="text-xs text-on-surface-variant flex gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
                          <span>URL: {src.url}</span>
                          <span className="text-primary font-semibold text-[10px] px-1.5 py-0.5 rounded bg-primary/10 shrink-0">Score: {src.score?.toFixed(2)}</span>
                        </p>
                      </div>
                    ))
                  ) : (
                    <div className="text-sm text-on-surface-variant">No live sources retrieved. Fallback analysis active.</div>
                  )}
                </div>
              </div>
            )}

            {/* E. PRODUCT ROADMAP TAB */}
            {activeTab === "roadmaps" && (
              <div className="space-y-md animate-fade-in">
                <div className="glass-card p-md">
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-xs">Target Launch Roadmap</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">Stepped timeline to validate mockups, MVP, and capture initial early adopters.</p>
                </div>

                <div className="relative border-l border-white/10 ml-6 pl-6 space-y-lg py-4">
                  {/* Phase 1 */}
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-secondary border-4 border-[#0A0B0F]" />
                    <span className="font-label-sm text-label-sm text-secondary font-bold uppercase">Phase 1: Week 1-4</span>
                    <h4 className="text-lg font-semibold text-white mt-1">Core MVP Drafting</h4>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                      Build standard landing page, configure AI backend algorithms, and test mock outputs with close private beta cohort (15 users).
                    </p>
                  </div>

                  {/* Phase 2 */}
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-primary border-4 border-[#0A0B0F]" />
                    <span className="font-label-sm text-label-sm text-primary font-bold uppercase">Phase 2: Week 5-8</span>
                    <h4 className="text-lg font-semibold text-white mt-1">Telemetry Integrations</h4>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                      Deploy wearable sensors and API data webhooks. Run compliance audit for personal information data security (GDPR/HIPAA).
                    </p>
                  </div>

                  {/* Phase 3 */}
                  <div className="relative">
                    <div className="absolute -left-[31px] top-1.5 w-4.5 h-4.5 rounded-full bg-tertiary border-4 border-[#0A0B0F]" />
                    <span className="font-label-sm text-label-sm text-tertiary font-bold uppercase">Phase 3: Week 9-12</span>
                    <h4 className="text-lg font-semibold text-white mt-1">B2B Beta Acquisition</h4>
                    <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                      Distribute white-labeled analytics dashboard to early institutional channels, offering discounted transaction options.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* F. EXPORT REPORT TAB */}
            {activeTab === "reports" && (
              <div className="glass-card p-md space-y-md animate-fade-in">
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-xs">Export Validation Data</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">Compile all metrics and SWOT details into presentation-ready reports.</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-sm">
                  <div className="p-4 bg-surface-container rounded-lg border border-white/5 flex flex-col justify-between h-40">
                    <div>
                      <h4 className="font-semibold text-white">PDF Pitch Presentation Deck</h4>
                      <p className="text-xs text-on-surface-variant mt-1">SWOT diagrams, competitor metrics, and executive AI summary styled for immediate pitch use.</p>
                    </div>
                    <button 
                      onClick={() => alert("Downloading PDF Pitch deck...")}
                      className="btn-primary rounded py-2 px-4 text-xs font-label-sm text-label-sm uppercase self-start cursor-pointer"
                    >
                      Download PDF
                    </button>
                  </div>

                  <div className="p-4 bg-surface-container rounded-lg border border-white/5 flex flex-col justify-between h-40">
                    <div>
                      <h4 className="font-semibold text-white">Raw JSON Market Data</h4>
                      <p className="text-xs text-on-surface-variant mt-1">Full database metrics, TAM projections, and tabular SWOT nodes for custom modeling tools.</p>
                    </div>
                    <button 
                      onClick={() => alert("Downloading JSON payload...")}
                      className="btn-primary rounded py-2 px-4 text-xs font-label-sm text-label-sm uppercase self-start cursor-pointer"
                    >
                      Download JSON
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* G. SETTINGS TAB */}
            {activeTab === "settings" && (
              <div className="glass-card p-md space-y-md animate-fade-in">
                <div>
                  <h3 className="font-headline-md text-headline-md text-on-surface mb-xs">AI Validator Settings</h3>
                  <p className="font-body-md text-body-md text-on-surface-variant">Tune the parameters used by the validation inference engines.</p>
                </div>

                <div className="space-y-sm max-w-lg">
                  {/* Slider 1 */}
                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">Model Creativity (Temperature)</label>
                    <input type="range" min="0" max="100" defaultValue="70" className="w-full h-1.5 bg-surface-container rounded-lg appearance-none cursor-pointer accent-primary" />
                    <div className="flex justify-between text-xs text-on-surface-variant/70 mt-1">
                      <span>Precise</span>
                      <span>Balanced (0.7)</span>
                      <span>Creative</span>
                    </div>
                  </div>

                  {/* Dropdown 1 */}
                  <div>
                    <label className="block text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-2">Primary Crawl Target Region</label>
                    <select className="w-full bg-[#0A0B0F] border border-white/10 rounded px-3 py-2 text-sm text-on-surface focus:border-primary outline-none">
                      <option>North America (US/CA)</option>
                      <option>European Union (EU)</option>
                      <option>Asia-Pacific (APAC)</option>
                      <option>Global Aggregated</option>
                    </select>
                  </div>

                  {/* Toggle 1 */}
                  <div className="flex justify-between items-center py-2">
                    <div>
                      <span className="block text-sm font-semibold text-white">Dynamic Competitor Refresh</span>
                      <span className="block text-xs text-on-surface-variant">Perform live web searches for search-term updates.</span>
                    </div>
                    <input type="checkbox" defaultChecked className="w-10 h-5 bg-surface-container rounded-full appearance-none checked:bg-secondary cursor-pointer relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:w-4 after:h-4 checked:after:translate-x-5 after:transition-all" />
                  </div>
                </div>
              </div>
            )}

          </main>
        </div>
      )}

    </div>
  );
}
