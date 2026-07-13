export interface Competitor {
  name: string;
  marketShare: string;
  strength: string;
  weakness: string;
}

export interface ResearchSource {
  title: string;
  url: string;
  score: number;
}

export interface ValidationResult {
  idea: string;
  oppScore: number;
  marketSize: string;
  marketGrowth: string;
  competition: "Low" | "Medium" | "High";
  competitionDetails: string;
  revPotential: string;
  revDetails: string;
  aiInsight: string;
  competitors: Competitor[];
  swot: {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  };
  hasCompetitors: boolean;
  sources?: ResearchSource[];
}

export const CATEGORY_COMPETITORS: Record<string, Competitor[]> = {
  fitness: [
    { name: "Nike Training Club", marketShare: "38%", strength: "High brand recognition, fully free model", weakness: "No custom AI adaptivity" },
    { name: "Freeletics", marketShare: "22%", strength: "Massive community, bodyweight focus", weakness: "Lacks custom gym machine plans" },
    { name: "Fitbod", marketShare: "15%", strength: "Excellent weight/rep calculations", weakness: "Poor community/social features" },
    { name: "Caliber", marketShare: "8%", strength: "Science-based training, strong metrics", weakness: "High coach upsells required" },
    { name: "Future Fit", marketShare: "10%", strength: "1-on-1 direct human connection", weakness: "Very expensive ($150/mo)" },
    { name: "Whoop", marketShare: "7%", strength: "Superb wearable telemetry tracker", weakness: "Requires ongoing hardware subscription" }
  ],
  nutrition: [
    { name: "MyFitnessPal", marketShare: "42%", strength: "Massive barcode and food database", weakness: "Manual entry takes too long" },
    { name: "MacroFactor", marketShare: "18%", strength: "Adaptive TDEE & metabolic rate tracking", weakness: "Learning curve is too steep for beginners" },
    { name: "Cal AI", marketShare: "15%", strength: "Extremely fast photo-based logging", weakness: "Lacks micronutrient analysis details" },
    { name: "Noom", marketShare: "15%", strength: "Cognitive behavior weight psychology", weakness: "Heavy human coach overhead cost" },
    { name: "Welling", marketShare: "10%", strength: "Conversational AI feedback agent", weakness: "Fewer graphical tracking logs" }
  ],
  pet: [
    { name: "PetDesk", marketShare: "30%", strength: "Clinic schedule and notification integration", weakness: "Lacks automated symptom assessment" },
    { name: "Pawp", marketShare: "25%", strength: "24/7 unlimited virtual triage chats", weakness: "Cannot perform physical diagnostic tests" },
    { name: "Dutch Pet", marketShare: "18%", strength: "Telehealth consults + direct prescription shipping", weakness: "Regulatory VCPR barriers in some states" },
    { name: "FirstVet", marketShare: "15%", strength: "Video calls with licensed regional vets", weakness: "No automated triage checks" },
    { name: "VitusVet", marketShare: "12%", strength: "Consolidated medical file history sharing", weakness: "Clunky UI, slow load times" }
  ],
  construction: [
    { name: "Procore", marketShare: "45%", strength: "Enterprise standard, massive developer API", weakness: "Overly complex and expensive for small firms" },
    { name: "Autodesk ACC", marketShare: "28%", strength: "Direct sync with Revit and CAD suites", weakness: "Strict design-centric interface" },
    { name: "Buildertrend", marketShare: "15%", strength: "Tailored residential builder tools", weakness: "Slow performance on mobile connections" },
    { name: "Contractor Foreman", marketShare: "8%", strength: "Very low cost all-in-one suite", weakness: "Lacks advanced enterprise integrations" },
    { name: "Fieldwire", marketShare: "4%", strength: "Strong task management on-site", weakness: "Minimal financial/accounting tools" }
  ],
  saas: [
    { name: "Monday.com", marketShare: "30%", strength: "Visual board customized designs", weakness: "Slow for massive projects" },
    { name: "ClickUp", marketShare: "25%", strength: "Feature rich, custom layout templates", weakness: "Too many configuration options cause bloat" },
    { name: "Asana", marketShare: "20%", strength: "Simple clean task hierarchy structure", weakness: "Weak custom database support" },
    { name: "Jira (Atlassian)", marketShare: "15%", strength: "Agile developer backlog standard", weakness: "Difficult configuration for non-devs" },
    { name: "Notion", marketShare: "10%", strength: "Flexible wiki databases and custom documents", weakness: "No built-in task dependencies tools" }
  ],
  crypto: [
    { name: "Fireblocks", marketShare: "35%", strength: "Enterprise-grade institutional MPC security", weakness: "Too expensive for small developers" },
    { name: "Chainalysis", marketShare: "30%", strength: "Compliance and fraud tracing standard", weakness: "Requires specialized training" },
    { name: "MetaMask Institutional", marketShare: "15%", strength: "Ubiquitous browser connection standard", weakness: "Poor custom API integration documentation" },
    { name: "Alchemy", marketShare: "12%", strength: "Reliable node connection and webhooks", weakness: "Scale-up pricing is high" },
    { name: "Uniswap Protocols", marketShare: "8%", strength: "Open-source liquidity contracts", weakness: "No SLA or institutional support" }
  ],
  edu: [
    { name: "Canvas LMS", marketShare: "45%", strength: "Institutional school system standard", weakness: "Legacy design, slow feature updates" },
    { name: "Duolingo", marketShare: "25%", strength: "Gamified retention algorithms", weakness: "Lacks interactive conversation practice" },
    { name: "Coursera", marketShare: "15%", strength: "Accredited university certificate partnerships", weakness: "High subscription costs" },
    { name: "Khan Academy", marketShare: "10%", strength: "Completely free, excellent K-12 coverage", weakness: "No customized coaching tools" },
    { name: "Teachable", marketShare: "5%", strength: "Simple custom creator course builder", weakness: "Lacks active student communities" }
  ],
  ai: [
    { name: "OpenAI GPTs", marketShare: "55%", strength: "State-of-the-art base model features", weakness: "Zero data moat for app developers" },
    { name: "LangChain Framework", marketShare: "20%", strength: "Flexible developer orchestrations", weakness: "Rapid API changes break setups" },
    { name: "Vercel AI SDK", marketShare: "15%", strength: "Seamless edge runtime and stream rendering", weakness: "Tied to Vercel hosting system" },
    { name: "Hugging Face", marketShare: "10%", strength: "Massive open-source model catalog", weakness: "High GPU server maintenance costs" }
  ],
  ecommerce: [
    { name: "Shopify", marketShare: "55%", strength: "All-in-one store hosting, massive app ecosystem", weakness: "High transaction fees on third-party gateways" },
    { name: "WooCommerce", marketShare: "25%", strength: "Open source, zero base fee structure", weakness: "Requires manual server configurations" },
    { name: "BigCommerce", marketShare: "10%", strength: "Excellent multi-storefront B2B controls", weakness: "Higher base plans compared to entry alternatives" },
    { name: "Magento (Adobe)", marketShare: "6%", strength: "Enterprise scale customization", weakness: "Requires expensive developer teams" },
    { name: "Squarespace Commerce", marketShare: "4%", strength: "Beautiful drag-and-drop landing designs", weakness: "Limited custom app integrations" }
  ],
  adjacent: [
    { name: "Zapier", marketShare: "Adjacent", strength: "Universally connected workflows & automations", weakness: "High transaction cost, not a dedicated system" },
    { name: "Bubble.io", marketShare: "Adjacent", strength: "Fast custom interface drafting and databases", weakness: "No specialized layout or offline-first support" },
    { name: "Retool", marketShare: "Adjacent", strength: "Excellent SQL/API drag-and-drop table layouts", weakness: "Internal-only access, high per-seat billing" },
    { name: "Make.com", marketShare: "Adjacent", strength: "Advanced visual workflow graph mappings", weakness: "Requires technical understanding of webhooks" }
  ]
};

export const PRESETS: Record<string, ValidationResult> = {
  "AI Fitness Coach": {
    idea: "AI Fitness Coach",
    oppScore: 92,
    marketSize: "$10.6B",
    marketGrowth: "TAM Growth 25% CAGR to 2035",
    competition: "High",
    competitionDetails: "Fragmented brand ecosystems",
    revPotential: "$55M+",
    revDetails: "Year 3 Projections",
    aiInsight: "Your strongest opportunity lies in targeting post-rehab physical therapy patients rather than generic fitness enthusiasts. Competition here is low, and willingness to pay is 3x higher.",
    competitors: CATEGORY_COMPETITORS.fitness,
    swot: {
      strengths: ["Hyper-personalized adaptation algorithm", "Lower operational cost than human coaches", "Integrates with wearable telemetry"],
      weaknesses: ["Requires continuous user data compliance", "Initial model training latency", "Higher marketing acquisition costs"],
      opportunities: ["Partner with physical therapy clinics", "Introduce corporate wellness program features", "Expand into nutritional planning"],
      threats: ["Platform lock-in by Apple Fitness/Google Fit", "Strict healthcare data regulations (HIPAA)", "Rapidly evolving competitor algorithms"]
    },
    hasCompetitors: true
  },
  "AI Nutrition Coach": {
    idea: "AI Nutrition Coach",
    oppScore: 94,
    marketSize: "$4.1B",
    marketGrowth: "TAM Growth 18% CAGR",
    competition: "Medium",
    competitionDetails: "Growing conversational agents",
    revPotential: "$35M+",
    revDetails: "Premium subscriptions & B2B corporate plans",
    aiInsight: "Targeting busy working professionals needing personalized dynamic meal prepping. Traditional solutions are static, whereas dynamic adjustments based on bio-wearables can yield 4x higher user retention.",
    competitors: CATEGORY_COMPETITORS.nutrition,
    swot: {
      strengths: ["Instant barcode/photo meal analysis", "Continuous glucose monitor (CGM) integration", "Adaptive calorie-cycling rules"],
      weaknesses: ["Accurate database updates for global cuisines", "User dependency on self-reporting", "High cost of bio-sensor partnerships"],
      opportunities: ["B2B sales to health insurance providers", "Curated ingredient deliveries (Instacart API)", "Pre-natal and geriatric specialty modules"],
      threats: ["FDA classification risks for medical advice", "Privacy concerns around bio-metric data", "Monopoly from major diet weight-loss brands"]
    },
    hasCompetitors: true
  },
  "Pet Healthcare Platform": {
    idea: "Pet Healthcare Platform",
    oppScore: 89,
    marketSize: "$2.9B",
    marketGrowth: "TAM Growth 14% YoY",
    competition: "Low",
    competitionDetails: "Fragmented local vet clinics",
    revPotential: "$25M+",
    revDetails: "SaaS for vets + transaction fee from owners",
    aiInsight: "Focus on automated triage via AI vision for early pet illness detection (skin/eye scans). Telehealth integration with local physical clinics is the highest growth catalyst to bypass customer acquisition friction.",
    competitors: CATEGORY_COMPETITORS.pet,
    swot: {
      strengths: ["Computer vision triage scan (91% accuracy)", "Automated medical records translation for owners", "Integrated emergency vet dispatch"],
      weaknesses: ["Veterinary liability constraints", "Inability to perform physical lab tests", "Varying pet insurance coverage limits"],
      opportunities: ["White-label software to veterinary schools", "Partnership with pet adoption agencies", "IoT pet collar telemetry integrations"],
      threats: ["Strict state-by-state veterinary regulations", "Sudden hikes in professional liability insurance", "Reluctance of traditional vets to adopt digital triage"]
    },
    hasCompetitors: true
  },
  "Construction Management SaaS": {
    idea: "Construction Management SaaS",
    oppScore: 87,
    marketSize: "$11.2B",
    marketGrowth: "TAM Growth 10% CAGR",
    competition: "Low",
    competitionDetails: "Legacy desktop software",
    revPotential: "$120M+",
    revDetails: "Per-seat license fees + payment processing percentage",
    aiInsight: "Focus on micro-contractors (1-5 staff). Standard enterprise tools like Procore are too complex and expensive, creating a vacuum for mobile-first simplified drafting, scheduling, and invoice workflows.",
    competitors: CATEGORY_COMPETITORS.construction,
    swot: {
      strengths: ["Sub-5 second invoice generation from photos", "Offline-first sync for remote job sites", "Speech-to-text safety checklist loader"],
      weaknesses: ["Atypical tech literacy among builders", "High hardware durability dependencies", "Complex local building code variations"],
      opportunities: ["Embedded merchant payment split fees", "Material ordering direct-to-site APIs", "Integration with municipal permit portal APIs"],
      threats: ["Macroeconomic slowdown in new home builds", "Cyber-security attacks on construction billing", "Rapid consolidation of SaaS suites by Autodesk"]
    },
    hasCompetitors: true
  }
};

export function generateValidation(rawIdea: string): ValidationResult {
  const idea = rawIdea.trim();
  if (!idea) return PRESETS["AI Fitness Coach"];

  // Check presets first (exact or fuzzy match)
  const lowerIdea = idea.toLowerCase();
  for (const presetKey of Object.keys(PRESETS)) {
    if (lowerIdea.includes(presetKey.toLowerCase()) || presetKey.toLowerCase().includes(lowerIdea)) {
      return PRESETS[presetKey];
    }
  }

  // Define keyword matching categories
  const isFitness = /fit|gym|workout|exercise|coach|personal trainer|physio|rehab/i.test(lowerIdea);
  const isNutrition = /nutri|diet|food|meal|calorie|macro|weight loss|eating/i.test(lowerIdea);
  const isPet = /pet|dog|cat|vet|animal|puppy|kitten/i.test(lowerIdea);
  const isConstruction = /construct|build|remodel|contractor|carpenter|painting|plumb|architect/i.test(lowerIdea);
  const isSaaS = /saas|software|manage|organize|system|tool|b2b|crm|project|invoice|hr/i.test(lowerIdea);
  const isCrypto = /web3|crypto|block|chain|nft|token|coin|defi|ledger|wallet/i.test(lowerIdea);
  const isEdu = /learn|school|teach|edu|course|student|kid|class|tutor|lesson/i.test(lowerIdea);
  const isAI = /ai|artificial|intel|bot|model|learn|gpt|synth|agent|chat/i.test(lowerIdea);
  const isEcommerce = /store|shop|sell|commerce|retail|buy|market|dropship/i.test(lowerIdea);

  // Derive parameters
  let oppScore = 70 + Math.floor(Math.random() * 25);
  let marketSize = `$${(1.5 + Math.random() * 8).toFixed(1)}B`;
  let marketGrowth = `TAM Growth ${(5 + Math.floor(Math.random() * 12))}% YoY`;
  let competition: "Low" | "Medium" | "High" = "Medium";
  let competitionDetails = "Moderate fragmentation";
  let revPotential = `$${(15 + Math.floor(Math.random() * 80))}M+`;
  let revDetails = "ARR Projections by Year 3";
  let aiInsight = "";
  let competitors: Competitor[] = [];
  let hasCompetitors = false;
  let swot = {
    strengths: ["Strong target value proposition", "Scalable cloud architecture", "Low initial capital expenditure"],
    weaknesses: ["High dependency on user retention", "Unproven customer acquisition costs", "Limited brand authority at start"],
    opportunities: ["Rapid expansion into international markets", "Leveraging strategic channel partnerships", "Up-selling premium custom additions"],
    threats: ["Rapid feature replication by incumbent tech giant", "Changing data privacy standard compliance", "Macroeconomic spending cuts"]
  };

  // Populate based on category matches
  if (isFitness) {
    marketSize = "$10.6B";
    marketGrowth = "TAM Growth 25% CAGR to 2035";
    competition = "High";
    competitionDetails = "Fragmented brand ecosystems";
    competitors = CATEGORY_COMPETITORS.fitness;
    hasCompetitors = true;
    aiInsight = `In fitness-related spaces, avoid general trackers. Focus on a specific sub-population like post-rehab or elderly strength training. Targeting these underserved brackets bypasses dominant competitors like Nike and Fitbod.`;
  } else if (isNutrition) {
    marketSize = "$4.1B";
    marketGrowth = "TAM Growth 18% CAGR";
    competition = "Medium";
    competitionDetails = "Growing conversational agents";
    competitors = CATEGORY_COMPETITORS.nutrition;
    hasCompetitors = true;
    aiInsight = `For nutrition plans, the barrier is logging friction. Standard platforms like MyFitnessPal are criticized for manual search overhead. Integrating photo or vocal logging gives a massive edge.`;
  } else if (isPet) {
    marketSize = "$2.9B";
    marketGrowth = "TAM Growth 14% YoY";
    competition = "Low";
    competitionDetails = "Fragmented local vet networks";
    competitors = CATEGORY_COMPETITORS.pet;
    hasCompetitors = true;
    aiInsight = `The pet industry shows high margin potential. Telehealth providers like Pawp and Dutch lack local physical connections. Building a hybrid digital triage with physical clinical tie-ins is optimal.`;
  } else if (isConstruction) {
    marketSize = "$11.2B";
    marketGrowth = "TAM Growth 10% CAGR";
    competition = "Low";
    competitionDetails = "Legacy software replacement";
    competitors = CATEGORY_COMPETITORS.construction;
    hasCompetitors = true;
    aiInsight = `Vertical SaaS for construction is highly lucrative. Enterprise products like Procore are too heavy and expensive for smaller residential teams, leaving a massive opening for mobile-first simplified apps.`;
  } else if (isCrypto) {
    marketSize = "$2.5B";
    marketGrowth = "TAM Growth 12% YoY";
    competition = "High";
    competitionDetails = "Shifting regulatory frameworks";
    competitors = CATEGORY_COMPETITORS.crypto;
    hasCompetitors = true;
    aiInsight = `Due to web3 volatility, design services that solve technical pain-points (MPC security or custody audits) rather than speculative tokens. Regulatory compliance is key.`;
  } else if (isEdu) {
    marketSize = "$6.4B";
    marketGrowth = "TAM Growth 9% YoY";
    competition = "Medium";
    competitionDetails = "Institutional standard suites";
    competitors = CATEGORY_COMPETITORS.edu;
    hasCompetitors = true;
    aiInsight = `In education, institutional sales cycles are long. Target direct-to-consumer tutoring or specialized creator course structures rather than competing with school platforms like Canvas.`;
  } else if (isAI) {
    marketSize = "$8.2B";
    marketGrowth = "TAM Growth 30% CAGR";
    competition = "High";
    competitionDetails = "Rapid wrapper proliferation";
    competitors = CATEGORY_COMPETITORS.ai;
    hasCompetitors = true;
    aiInsight = `Protect your AI tool from prompt/wrapper commoditization. Your moat lies in proprietary datasets, custom fine-tuning workflows, and integrated enterprise security standards.`;
  } else if (isEcommerce) {
    marketSize = "$9.5B";
    marketGrowth = "TAM Growth 15% YoY";
    competition = "High";
    competitionDetails = "Shopify/WooCommerce dominance";
    competitors = CATEGORY_COMPETITORS.ecommerce;
    hasCompetitors = true;
    aiInsight = `Ecommerce software requires frictionless checkout integration. Target custom headless integrations or multi-storefront B2B controls rather than simple shop hosts.`;
  } else if (isSaaS) {
    marketSize = "$7.5B";
    marketGrowth = "TAM Growth 11% YoY";
    competition = "Medium";
    competitionDetails = "Saturated task platforms";
    competitors = CATEGORY_COMPETITORS.saas;
    hasCompetitors = true;
    aiInsight = `Workflow CRM tools have high churn unless embedded into client-billing loops. Consider offering payment processing extensions to improve lock-in margins.`;
  } else {
    // BLUE OCEAN CASE (No exact category competitors found)
    oppScore = 60 + Math.floor(Math.random() * 20); // Slightly more conservative for completely unclassified concepts
    marketSize = "$0.5B - $1.2B";
    marketGrowth = "Niche/Emerging Market";
    competition = "Low";
    competitionDetails = "Uncharted sector";
    competitors = CATEGORY_COMPETITORS.adjacent;
    hasCompetitors = false;
    aiInsight = `No direct competitors were found for "${idea}". This indicates a Blue Ocean space. However, users likely solve this problem today using generic automation or no-code platforms (Zapier, Bubble, Retool). Optimize your MVP to offer a specialized, out-of-the-box solution to replace these complex workarounds.`;
  }

  return {
    idea,
    oppScore,
    marketSize,
    marketGrowth,
    competition,
    competitionDetails,
    revPotential,
    revDetails,
    aiInsight,
    competitors,
    swot,
    hasCompetitors
  };
}
