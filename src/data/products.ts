export interface ProductSamplePage {
  title: string;
  subtitle: string;
  content: string;
}

export interface Product {
  id: string;
  title: string;
  snippet: string;
  description: string;
  price: number;
  rating: number;
  reviewsCount: number;
  coverImage: string;
  pages: number;
  fileSize: string;
  format: string;
  publishedYear: string;
  features: string[];
  samplePages: ProductSamplePage[];
}

export const products: Product[] = [
  {
    id: "first-100-online",
    title: "How I Made My First $100 Online: A Step-by-Step Blueprint",
    snippet: "Stop grinding without results. Follow the exact, battle-tested framework to make your first $100 online by creating and selling simple, high-demand PDFs with zero starting capital.",
    description: "How I Made My First $100 Online is a step-by-step blueprint on how to make your first $100 working online from home by creating and selling simple PDFs. This comprehensive, beginner-friendly roadmap strips away the fluff, showing you how to turn basic knowledge into CVs, planners, guides, and mini-ebooks, choose simple tools like Canva, price your files, and collect payments smoothly.",
    price: 19,
    rating: 4.9,
    reviewsCount: 142,
    coverImage: "Emerald Cyber",
    pages: 85,
    fileSize: "8.4 MB",
    format: "Interactive PDF",
    publishedYear: "2026",
    features: [
      "Introduction: Why selling PDFs is a simple, effective online income method for beginners with zero capital or design skills.",
      "Mindset shifts: Focusing on small goals like your first $10 and understanding that people buy solutions, not just files.",
      "Profitable PDF formats: Step-by-step guides, CV/planner templates, checklists, mini eBooks, and study notes (especially for Kenya).",
      "Demand research: How to identify hot niches using platforms like TikTok, Google search, and WhatsApp groups.",
      "Idea selection: Choosing your first PDF concept by keeping it simple, focused, and solving one problem at a time.",
      "Simple creation tools: How to design and export beautiful PDFs using free software like Canva and Google Docs.",
      "Pricing strategy: Emphasizing starting cheap ($2 to $5) to build momentum and volume sales rather than high-margin risks.",
      "Beginner-friendly marketing: Step-by-step sales approaches using WhatsApp, Facebook groups, Instagram DMs, and Telegram.",
      "High-converting outreach: How to approach potential customers with short, value-first messages and preview snippets.",
      "Frictionless delivery: How to receive payments smoothly using popular methods like M-Pesa in Kenya.",
      "Author's case study: A real-life timeline detailing how the author created, marketed, and sold their first PDF to reach $100.",
      "Scaling to next tier: Tips on creating more PDFs, improving quality, bundling packages, and growing a recurring audience.",
      "Mistakes to avoid: Overthinking layout design, making files too long, insufficient promotion, and quitting too soon.",
      "3-Day launch sequence: A final simple action plan to launch your first PDF and make sales immediately.",
      "Action-oriented conclusion: Practical encouragement to take action and launch today since the process is simple and accessible."
    ],
    samplePages: [
      {
        title: "Chapter 1: The First Dollar Mindset Shift",
        subtitle: "Monetizing Micro-Skills on Day One",
        content: "Earning your first dollar online is not about mastering advanced coding or running complex advertising campaigns. It is about identifying the micro-skills you already possess—such as formatting documents, transcribing audio, or organizing spreadsheets—and matching them to busy professionals who value their time. Legitimate global remote work platforms and local micro-gig boards are filled with business owners willing to pay $15 to $25 for small tasks that take you less than an hour. The key is in the execution, presentation, and responsiveness of your outreach."
      },
      {
        title: "Section 3: The 72-Hour Client Acquisition Funnel",
        subtitle: "How to Secure Your First Paying Project",
        content: "To secure your first project, you must stand out from automated spam proposals. Avoid writing generic 'Dear Hiring Manager' templates. Instead, open with a direct solution to their problem: 'Hi [Name], I reviewed your document requirements and noticed a quick way to clean up the table formatting so it prints cleanly. I can complete this for you within 3 hours...' This immediate value-first positioning guarantees a 60% higher response rate. Set your starting rates slightly lower to build initial positive feedback, then scale your prices once you reach the $100 milestone."
      }
    ]
  }
];
