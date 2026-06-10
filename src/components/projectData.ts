export interface DevelopmentProject {
  id: string;
  title: string;
  category: "Development";
  type: "development";
  description: string;
  tags: string[];
  tools: string[];
  behanceUrl: string;
  liveUrl: string;
  image: string;
}

export interface UIUXProject {
  id: string;
  title: string;
  category: "UI/UX Design";
  type: "uiux";
  description: string;
  tags: string[];
  tools: string[];
  behanceUrl: string;
  liveUrl?: string;
  image: string;
}

export const developmentProjects: DevelopmentProject[] = [
  {
    id: "anchorage-phase-2",
    title: "Anchorage Phase 2 — Website Design & Development",
    category: "Development",
    type: "development",
    description: "An investment-focused premium real estate platform featuring modern property search, interactive layout maps, and conversion-optimized lead capture workflows.",
    tags: ["Real Estate", "Web App", "NextJS", "Premium UI"],
    tools: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Figma"],
    behanceUrl: "https://www.behance.net/gallery/244526811/Anchorage-Phase-2-Website-Design-Development",
    liveUrl: "https://anchoragephase2.pk/",
    image: "/projects%20development/Anchorage-Phase-2-Islamabad-05-31-2026_05_55_PM.webp"
  },
  {
    id: "develoscape",
    title: "Develoscape — Professional Company Website",
    category: "Development",
    type: "development",
    description: "A premium corporate website for Develoscape displaying architectural services, an interactive project portfolio, and responsive design systems.",
    tags: ["Corporate Web", "Architecture", "Responsive Design", "SEO"],
    tools: ["ReactJS", "Next.js", "Tailwind CSS", "Framer Motion", "Figma"],
    behanceUrl: "https://www.behance.net/gallery/244625467/Develoscape-Professional-Company-Website",
    liveUrl: "https://develoscape.com.pk/",
    image: "/projects%20development/Develoscape-05-31-2026_06_03_PM.webp"
  },
  {
    id: "falcon-town-greens",
    title: "Falcon Town Greens — Luxury Farmhouse Community Website",
    category: "Development",
    type: "development",
    description: "A visually immersive marketing portal for a high-end luxury farmhouse community featuring beautiful parallax transitions and virtual map explorations.",
    tags: ["Real Estate", "Luxury", "Parallax UI", "Interactive"],
    tools: ["Next.js", "React", "Tailwind CSS", "Framer Motion", "Lucide React"],
    behanceUrl: "https://www.behance.net/gallery/244527829/Falcon-Town-Greens-Luxury-Farmhouse-Community-Website",
    liveUrl: "https://falcontowngreens.com/",
    image: "/projects%20development/falcontowngreen.webp"
  },
  {
    id: "beacontechh",
    title: "BeaconTechh — Website Design & Development",
    category: "Development",
    type: "development",
    description: "A bespoke agency platform featuring custom interactive 3D elements, sleek glassmorphism cards, service catalog page systems, and high performance scores.",
    tags: ["Agency", "Portfolio", "Glassmorphism", "High Performance"],
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Figma"],
    behanceUrl: "https://www.behance.net/gallery/244527427/BeaconTechh-Website-Design-Development",
    liveUrl: "https://beacontech-react.vercel.app/",
    image: "/projects%20development/Beacon-Techh-Navigating-Brands-to-Digital-Success-05-31-2026_06_27_PM.webp"
  },
  {
    id: "dua-al-khaleej",
    title: "Dua-Al-Khaleej — Website Developed",
    category: "Development",
    type: "development",
    description: "A robust corporate website for an industrial trading company, featuring detailed product catalogs, multi-language localization, and instant quotation request forms.",
    tags: ["Industrial", "B2B Website", "Localization", "Multi-Language"],
    tools: ["React", "Tailwind CSS", "Node.js", "i18next", "Express"],
    behanceUrl: "https://www.behance.net/gallery/240201983/Dua-Al-Khaleej-Website-Developed",
    liveUrl: "https://dakksa.com/",
    image: "/projects%20development/Duaa-Al-Khaleej-Co-Ltd-Construction-Solutions-Provider-UAE-Saudi-Arabia-05-31-2026_06_29_PM.webp"
  },
  {
    id: "brandaviation-pk",
    title: "Brand Aviation - Event Management Company Website",
    category: "Development",
    type: "development",
    description: "A high-impact event management and aviation portal for showcasing global aviation meets, ticketing flows, event branding, and responsive content layouts.",
    tags: ["Event Management", "Aviation Portal", "Corporate Web", "Responsive Design"],
    tools: ["React", "Tailwind CSS", "Figma", "Responsive UI", "Web Development"],
    behanceUrl: "https://www.behance.net/gallery/238556123/Event-Management-Company-Sites-brandaviationpk",
    liveUrl: "https://brandaviation.pk/",
    image: "/projects%20development/Brand-Aviation-05-31-2026_06_31_PM.webp"
  },
  {
    id: "ruh-al-quran-institute",
    title: "Ruh Al Quran Institute — Online Learning Platform",
    category: "Development",
    type: "development",
    description: "An EdTech platform for remote Quranic learning with course booking features, student dashboards, localized accessibility tools, and clean layout structures.",
    tags: ["EdTech", "Online Academy", "Booking", "Accessibility"],
    tools: ["Next.js", "React", "Tailwind CSS", "Supabase", "Framer Motion"],
    behanceUrl: "https://www.behance.net/gallery/244767611/Ruh-Al-Quran-Institute-Online-Learning-Platform",
    liveUrl: "https://ruhalquraninstitute.com/",
    image: "/projects%20development/Ruh-Al-Quran-05-31-2026_06_32_PM.webp"
  },
  {
    id: "waada-residence",
    title: "Waada Residence — Site Designed and Developed",
    category: "Development",
    type: "development",
    description: "A luxury residential development showcase site boasting elegant layouts, high-res gallery carousels, immersive project floorplan views, and visual design details.",
    tags: ["Real Estate", "Luxury Living", "Showcase Site", "Interactive Gallery"],
    tools: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Figma"],
    behanceUrl: "https://www.behance.net/gallery/238876291/Waada-Residence-Site-Designed-And-Developed",
    liveUrl: "https://waadaresidence.wasmer.app/",
    image: "/projects%20development/waada-properties-05-31-2026_06_35_PM.webp"
  },
  {
    id: "rabcon",
    title: "Rabcon — Website Designed and Developed in React JS",
    category: "Development",
    type: "development",
    description: "A corporate construction and engineering firm corporate website built with high-fidelity React components, responsive grids, and structured quote generation.",
    tags: ["Construction", "Corporate Web", "React JS", "Responsive Grid"],
    tools: ["React.js", "JavaScript", "Tailwind CSS", "Framer Motion", "Figma"],
    behanceUrl: "https://www.behance.net/gallery/238876515/Rabcon-Website-Designed-And-Developed-In-React-Js",
    liveUrl: "https://rabcon.wasmer.app/",
    image: "/projects%20development/Rabcon-Engineering-Solutions-05-31-2026_06_37_PM.webp"
  },
  {
    id: "securitysurveillance-pk",
    title: "SecuritySurveillance.pk — Security Solutions Website",
    category: "Development",
    type: "development",
    description: "A complete commercial and residential surveillance business portal, featuring product selectors, automated quote calculators, and support center forms.",
    tags: ["Security Tech", "E-Commerce", "Support Hub", "B2B Solutions"],
    tools: ["Next.js", "TypeScript", "Tailwind CSS", "Lucide Icons", "Framer Motion"],
    behanceUrl: "https://www.behance.net/gallery/238876993/SecuritySurveillancepk-Security-Solutions-Website",
    liveUrl: "https://securitysurveillance.pk/",
    image: "/projects%20development/SSK-Surveillance-System-SMC-Pvt-Ltd--05-31-2026_06_38_PM.webp"
  }
];

export const uiuxProjects: UIUXProject[] = [
  {
    id: "cafe-farhan-app",
    title: "Cafe Farhan App — UI/UX Design",
    category: "UI/UX Design",
    type: "uiux",
    description: "A mobile-first food ordering UI/UX concept featuring table booking, menu discovery, and an admin dashboard flow.",
    tags: ["Food Delivery", "Mobile UI", "App Design", "UX Flow"],
    tools: ["Figma", "UI Design", "User Flows", "Prototyping"],
    behanceUrl: "https://www.behance.net/gallery/243458431/Cafe-Farhan-App-UIUx-Design",
    image: "/ui%20ux/cafe%20farhan.webp"
  },
  {
    id: "bazmi",
    title: "Bazmi — Premium Voice Social App | UI/UX Design",
    category: "UI/UX Design",
    type: "uiux",
    description: "A high-end interface concept for a voice-focused social audio network, emphasizing clean dark backgrounds, neon audio-wave cues, and intuitive voice channels.",
    tags: ["Voice App", "Mobile UI/UX", "Social Network", "Dark Theme"],
    tools: ["Figma", "Adobe Illustrator", "Prototyping", "Design System"],
    behanceUrl: "https://www.behance.net/gallery/247174411/Bazmi-Premium-Voice-Social-App-UIUX-Design",
    image: "/ui%20ux/bazmi.webp"
  },
  {
    id: "kinetic",
    title: "KINETIC — Modern Fitness Tracking Mobile App",
    category: "UI/UX Design",
    type: "uiux",
    description: "An elegant, performance-oriented mobile user experience centered around active workout tracking, visual sleep analysis charts, and smart calorie counters.",
    tags: ["Fitness Tech", "Mobile App UI", "Data Visualization", "Health & Wellness"],
    tools: ["Figma", "Vector Assets", "High-Fi Prototyping", "User Flows"],
    behanceUrl: "https://www.behance.net/gallery/246698465/KINETIC-Modern-Fitness-Tracking-Mobile-App",
    image: "/ui%20ux/Kinetic.webp"
  },
  {
    id: "cravehub",
    title: "CraveHub – Smart Food Delivery App UI/UX Case Study",
    category: "UI/UX Design",
    type: "uiux",
    description: "A thorough end-to-end design case study addressing major pain points in online food delivery, focusing on tracking maps, order flows, and dynamic menu UX.",
    tags: ["Food Ordering", "UX Case Study", "Mobile App Design", "User Research"],
    tools: ["Figma", "Miro", "User Persona Research", "Interactive Flows"],
    behanceUrl: "https://www.behance.net/gallery/244862307/CraveHub-Smart-Food-Delivery-App-UIUX-Case-Study",
    image: "/ui%20ux/Cravehub.webp"
  },
  {
    id: "wanderlust",
    title: "Wanderlust – Travel Planning Mobile App UI/UX Design",
    category: "UI/UX Design",
    type: "uiux",
    description: "A visually stunning mobile interface designed for jetsetters to explore destinations, curate itineraries, collaborate with friends, and book global flights.",
    tags: ["Travel Tech", "Mobile UI", "Itinerary Builder", "Social Booking"],
    tools: ["Figma", "Visual Hierarchy", "Prototyping", "Design Systems"],
    behanceUrl: "https://www.behance.net/gallery/244774733/Wanderlust-Travel-Planning-Mobile-App-UIUX-Design",
    image: "/ui%20ux/Wanderlust.webp"
  },
  {
    id: "logitech-pakistan",
    title: "Logitech Pakistan – E-Commerce UI/UX Redesign Concept",
    category: "UI/UX Design",
    type: "uiux",
    description: "A premium redesign of the Logitech Pakistan e-commerce shopping experience, introducing dynamic dark mode, grid product filtration, and highly interactive spec charts.",
    tags: ["E-Commerce", "Hardware Brand", "UX Redesign", "Desktop Interface"],
    tools: ["Figma", "Photoshop", "Interactive Prototyping", "Responsive Systems"],
    behanceUrl: "https://www.behance.net/gallery/230212245/Logitech-Pakistan-E-Commerce-UIUX-Redesign-Concept",
    image: "/ui%20ux/logitech%20cover.webp"
  },
  {
    id: "velora",
    title: "VELORA – Luxury Real Estate Mobile App UI/UX Design",
    category: "UI/UX Design",
    type: "uiux",
    description: "An ultra-premium mobile experience crafted for elite buyers searching for high-end properties, featuring 3D virtual walkthrough interfaces and immersive media grids.",
    tags: ["Luxury Real Estate", "High-End App", "UI/UX Concept", "Virtual Tour UI"],
    tools: ["Figma", "Luxury Branding", "Micro-interactions", "Mockups"],
    behanceUrl: "https://www.behance.net/gallery/244779493/VELORA-Luxury-Real-Estate-Mobile-App-UIUX-Design",
    image: "/ui%20ux/VELORA.webp"
  },
  {
    id: "ahsan-enterprises",
    title: "Ahsan Enterprises — Modern Shopify Store UI/UX Design",
    category: "UI/UX Design",
    type: "uiux",
    description: "A clean, modern Shopify e-commerce desktop and mobile storefront design optimized for high-volume transactions, smooth search, and simple cart checkouts.",
    tags: ["Shopify E-Commerce", "Desktop UI", "Product Showcases", "Conversion UI"],
    tools: ["Figma", "Shopify Guidelines", "Vector Assets", "Layout Systems"],
    behanceUrl: "https://www.behance.net/gallery/243720565/Ahsan-Enterprises-Modern-Shopify-Store-UIUX-Design",
    image: "/ui%20ux/Ahsan%20Enterprises.webp"
  },
  {
    id: "quran-academy",
    title: "Quran Academy — Mobile App UI/UX Design",
    category: "UI/UX Design",
    type: "uiux",
    description: "A beautiful and serene interface design for a Quranic education app, using elegant fonts, soft gradient tabs, audio players, and simple reading trackers.",
    tags: ["EdTech App", "Serene Design", "Mobile UI", "Audio Interface"],
    tools: ["Figma", "Illustrator", "Components", "Prototyping"],
    behanceUrl: "https://www.behance.net/gallery/243720915/Quran-Academy-Mobile-App-UIUX-Design",
    image: "/ui%20ux/Quran%20Academy.webp"
  },
];
