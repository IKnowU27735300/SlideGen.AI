// State Management
const state = {
    title: "The Future of AI",
    subtitle: "By John Doe",
    slideCount: 3,
    content: "",
    generatedSlides: [], // AI-generated slides
    currentTheme: null,
    currentSlideIndex: 0
};

// Design Themes (The "AI" Brain)
const themes = [
    {
        id: "swiss-international",
        name: "Swiss International",
        tags: ["Professional", "Grid", "Clean"],
        background: "#ffffff",
        color: "#000000",
        accent: "#ff0000",
        font: "Arial", // Helvetica fallback
        titleAlign: "left",
        shapes: "rect",
        animation: "fadeIn",
        layout: "split" // New: Split layout
    },
    {
        id: "executive-dark",
        name: "Executive Dark",
        tags: ["Premium", "Business"],
        background: "#121212",
        color: "#e0e0e0",
        accent: "#d4af37", // Gold
        font: "Playfair Display",
        titleAlign: "center",
        shapes: "line",
        animation: "zoomIn",
        layout: "centered"
    },
    {
        id: "tech-minimal",
        name: "Tech Minimal",
        tags: ["Modern", "Startup"],
        background: "#f3f4f6",
        color: "#111827",
        accent: "#2563eb",
        font: "Inter",
        titleAlign: "left",
        shapes: "none",
        animation: "flyIn",
        layout: "sidebar"
    },
    {
        id: "modern-dark",
        name: "Modern Dark",
        tags: ["Tech", "Sleek"],
        background: "#1e1e2e",
        color: "#ffffff",
        accent: "#89b4fa",
        font: "Montserrat",
        titleAlign: "left",
        shapes: "circle",
        animation: "fadeIn",
        layout: "standard"
    },
    {
        id: "corporate-blue",
        name: "Corporate Blue",
        tags: ["Business", "Professional"],
        background: "#ffffff",
        color: "#1e3a8a",
        accent: "#3b82f6",
        font: "Arial",
        titleAlign: "center",
        shapes: "rect",
        animation: "zoomIn",
        layout: "standard"
    },
    {
        id: "glassmorphism",
        name: "Glassmorphism",
        tags: ["Trendy", "Modern"],
        background: "linear-gradient(135deg, #2dd4bf 0%, #3b82f6 100%)",
        color: "#ffffff",
        accent: "#ffffff",
        font: "Outfit",
        titleAlign: "center",
        shapes: "circle",
        animation: "zoomIn",
        layout: "centered"
    },
    {
        id: "neo-brutalism",
        name: "Neo-Brutalism",
        tags: ["Bold", "Edgy"],
        background: "#f0f0f0",
        color: "#000000",
        accent: "#ff0055",
        font: "Poppins",
        titleAlign: "left",
        shapes: "rect",
        animation: "flyIn",
        layout: "split"
    },
    {
        id: "nature-calm",
        name: "Nature Calm",
        tags: ["Organic", "Peaceful"],
        background: "#ecfccb",
        color: "#14532d",
        accent: "#65a30d",
        font: "Playfair Display",
        titleAlign: "center",
        shapes: "blob",
        animation: "fadeIn",
        layout: "centered"
    },
    {
        id: "cyberpunk",
        name: "Cyberpunk",
        tags: ["Futuristic", "Neon"],
        background: "#09090b",
        color: "#22d3ee",
        accent: "#f472b6",
        font: "Outfit",
        titleAlign: "right",
        shapes: "line",
        animation: "zoomIn",
        layout: "standard"
    },
    {
        id: "gradient-mesh",
        name: "Gradient Mesh",
        tags: ["Vibrant", "Modern"],
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
        color: "#ffffff",
        accent: "#ffd700",
        font: "Raleway",
        titleAlign: "center",
        shapes: "circle",
        animation: "fadeIn",
        layout: "centered"
    },
    {
        id: "midnight-aurora",
        name: "Midnight Aurora",
        tags: ["Elegant", "Dark"],
        background: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
        color: "#e0f2f1",
        accent: "#00e5ff",
        font: "Playfair Display",
        titleAlign: "left",
        shapes: "line",
        animation: "zoomIn",
        layout: "split"
    },
    {
        id: "sunset-vibes",
        name: "Sunset Vibes",
        tags: ["Warm", "Creative"],
        background: "linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #ee5a6f 100%)",
        color: "#ffffff",
        accent: "#2d3436",
        font: "Lora",
        titleAlign: "center",
        shapes: "blob",
        animation: "fadeIn",
        layout: "centered"
    },
    {
        id: "ocean-breeze",
        name: "Ocean Breeze",
        tags: ["Calm", "Professional"],
        background: "linear-gradient(135deg, #667db6 0%, #0082c8 50%, #667db6 100%)",
        color: "#ffffff",
        accent: "#ffd89b",
        font: "Montserrat",
        titleAlign: "left",
        shapes: "rect",
        animation: "flyIn",
        layout: "sidebar"
    },
    {
        id: "neon-dreams",
        name: "Neon Dreams",
        tags: ["Bold", "Electric"],
        background: "#0a0e27",
        color: "#ffffff",
        accent: "#00ff88",
        font: "Raleway",
        titleAlign: "left",
        shapes: "line",
        animation: "zoomIn",
        layout: "split"
    },
    {
        id: "minimalist-pro",
        name: "Minimalist Pro",
        tags: ["Clean", "Simple"],
        background: "#fafafa",
        color: "#2c3e50",
        accent: "#e74c3c",
        font: "Arial",
        titleAlign: "left",
        shapes: "none",
        animation: "fadeIn",
        layout: "standard"
    },
    {
        id: "retro-wave",
        name: "Retro Wave",
        tags: ["80s", "Vibrant"],
        background: "linear-gradient(135deg, #2b5876 0%, #4e4376 100%)",
        color: "#ff6ec7",
        accent: "#00d4ff",
        font: "Poppins",
        titleAlign: "center",
        shapes: "circle",
        animation: "zoomIn",
        layout: "centered"
    },
    {
        id: "forest-green",
        name: "Forest Green",
        tags: ["Natural", "Earthy"],
        background: "#1b4332",
        color: "#d8f3dc",
        accent: "#95d5b2",
        font: "Playfair Display",
        titleAlign: "center",
        shapes: "blob",
        animation: "fadeIn",
        layout: "centered"
    },
    {
        id: "rose-gold-luxury",
        name: "Rose Gold Luxury",
        tags: ["Premium", "Elegant"],
        background: "#2d2d2d",
        color: "#f5f5f5",
        accent: "#e8b4b8",
        font: "Playfair Display",
        titleAlign: "center",
        shapes: "line",
        animation: "zoomIn",
        layout: "centered"
    },
    {
        id: "arctic-frost",
        name: "Arctic Frost",
        tags: ["Cool", "Modern"],
        background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
        color: "#2c3e50",
        accent: "#3498db",
        font: "Inter",
        titleAlign: "left",
        shapes: "rect",
        animation: "flyIn",
        layout: "sidebar"
    },
    {
        id: "warm-autumn",
        name: "Warm Autumn",
        tags: ["Cozy", "Seasonal"],
        background: "linear-gradient(135deg, #f77062 0%, #fe5196 100%)",
        color: "#ffffff",
        accent: "#ffd89b",
        font: "Montserrat",
        titleAlign: "center",
        shapes: "circle",
        animation: "fadeIn",
        layout: "centered"
    },
    {
        id: "holographic-dream",
        name: "Holographic Dream",
        tags: ["Futuristic", "Iridescent"],
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)",
        color: "#ffffff",
        accent: "#ffeb3b",
        font: "Lora",
        titleAlign: "center",
        shapes: "circle",
        animation: "zoomIn",
        layout: "centered"
    },
    {
        id: "midnight-gold",
        name: "Midnight Gold",
        tags: ["Luxury", "Premium"],
        background: "#1a1a2e",
        color: "#eee",
        accent: "#ffd700",
        font: "Playfair Display",
        titleAlign: "center",
        shapes: "line",
        animation: "fadeIn",
        layout: "centered"
    },
    {
        id: "electric-purple",
        name: "Electric Purple",
        tags: ["Bold", "Modern"],
        background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)",
        color: "#ffffff",
        accent: "#00ffff",
        font: "Raleway",
        titleAlign: "left",
        shapes: "rect",
        animation: "flyIn",
        layout: "split"
    },
    {
        id: "cherry-blossom",
        name: "Cherry Blossom",
        tags: ["Delicate", "Spring"],
        background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
        color: "#5d4037",
        accent: "#d81b60",
        font: "Playfair Display",
        titleAlign: "center",
        shapes: "blob",
        animation: "fadeIn",
        layout: "centered"
    },
    {
        id: "deep-space",
        name: "Deep Space",
        tags: ["Cosmic", "Dark"],
        background: "linear-gradient(135deg, #000000 0%, #0f2027 50%, #203a43 100%)",
        color: "#ffffff",
        accent: "#9c27b0",
        font: "Montserrat",
        titleAlign: "left",
        shapes: "circle",
        animation: "zoomIn",
        layout: "sidebar"
    },
    {
        id: "emerald-elegance",
        name: "Emerald Elegance",
        tags: ["Sophisticated", "Green"],
        background: "linear-gradient(135deg, #134e5e 0%, #71b280 100%)",
        color: "#ffffff",
        accent: "#ffd700",
        font: "Playfair Display",
        titleAlign: "center",
        shapes: "line",
        animation: "fadeIn",
        layout: "centered"
    },
    {
        id: "coral-reef",
        name: "Coral Reef",
        tags: ["Vibrant", "Tropical"],
        background: "linear-gradient(135deg, #ff9a56 0%, #ff6a88 50%, #ff99ac 100%)",
        color: "#ffffff",
        accent: "#2d3436",
        font: "Poppins",
        titleAlign: "left",
        shapes: "blob",
        animation: "flyIn",
        layout: "split"
    },
    {
        id: "monochrome-chic",
        name: "Monochrome Chic",
        tags: ["Minimal", "B&W"],
        background: "#ffffff",
        color: "#000000",
        accent: "#333333",
        font: "Arial",
        titleAlign: "left",
        shapes: "rect",
        animation: "fadeIn",
        layout: "sidebar"
    },
    {
        id: "lavender-mist",
        name: "Lavender Mist",
        tags: ["Soft", "Pastel"],
        background: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
        color: "#4a4a4a",
        accent: "#7b2cbf",
        font: "Lora",
        titleAlign: "center",
        shapes: "circle",
        animation: "fadeIn",
        layout: "centered"
    },
    {
        id: "fire-ice",
        name: "Fire & Ice",
        tags: ["Contrast", "Dynamic"],
        background: "linear-gradient(135deg, #ff0844 0%, #ffb199 50%, #00d4ff 100%)",
        color: "#ffffff",
        accent: "#ffd700",
        font: "Montserrat",
        titleAlign: "center",
        shapes: "line",
        animation: "zoomIn",
        layout: "centered"
    },
    {
        id: "royal-navy",
        name: "Royal Navy",
        tags: ["Classic", "Professional"],
        background: "#001f3f",
        color: "#ffffff",
        accent: "#c9a961",
        font: "Playfair Display",
        titleAlign: "left",
        shapes: "rect",
        animation: "flyIn",
        layout: "sidebar"
    },
    {
        id: "mint-fresh",
        name: "Mint Fresh",
        tags: ["Clean", "Cool"],
        background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        color: "#2d3436",
        accent: "#00b894",
        font: "Raleway",
        titleAlign: "left",
        shapes: "none",
        animation: "fadeIn",
        layout: "standard"
    },
    {
        id: "golden-hour",
        name: "Golden Hour",
        tags: ["Warm", "Sunset"],
        background: "linear-gradient(135deg, #fdc830 0%, #f37335 100%)",
        color: "#ffffff",
        accent: "#2d3436",
        font: "Poppins",
        titleAlign: "center",
        shapes: "circle",
        animation: "zoomIn",
        layout: "centered"
    },
    {
        id: "slate-modern",
        name: "Slate Modern",
        tags: ["Neutral", "Tech"],
        background: "#475569",
        color: "#f1f5f9",
        accent: "#06b6d4",
        font: "Lora",
        titleAlign: "left",
        shapes: "rect",
        animation: "flyIn",
        layout: "split"
    },
    {
        id: "berry-blast",
        name: "Berry Blast",
        tags: ["Playful", "Energetic"],
        background: "linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)",
        color: "#ffffff",
        accent: "#ff6b9d",
        font: "Raleway",
        titleAlign: "center",
        shapes: "blob",
        animation: "zoomIn",
        layout: "centered"
    },
    {
        id: "urban-concrete",
        name: "Urban Concrete",
        tags: ["Industrial", "Modern"],
        background: "#2c3e50",
        color: "#ecf0f1",
        accent: "#e67e22",
        font: "Montserrat",
        titleAlign: "left",
        shapes: "rect",
        animation: "flyIn",
        layout: "split"
    },
    {
        id: "tropical-paradise",
        name: "Tropical Paradise",
        tags: ["Vibrant", "Summer"],
        background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
        color: "#ffffff",
        accent: "#fff200",
        font: "Poppins",
        titleAlign: "center",
        shapes: "blob",
        animation: "zoomIn",
        layout: "centered"
    },
    {
        id: "vintage-paper",
        name: "Vintage Paper",
        tags: ["Classic", "Retro"],
        background: "#f4e8d0",
        color: "#3e2723",
        accent: "#8b4513",
        font: "Lora",
        titleAlign: "center",
        shapes: "none",
        animation: "fadeIn",
        layout: "centered"
    },
    {
        id: "neon-tokyo",
        name: "Neon Tokyo",
        tags: ["Urban", "Futuristic"],
        background: "#1a1a1a",
        color: "#ffffff",
        accent: "#ff006e",
        font: "Montserrat",
        titleAlign: "left",
        shapes: "line",
        animation: "zoomIn",
        layout: "sidebar"
    },
    {
        id: "peachy-keen",
        name: "Peachy Keen",
        tags: ["Soft", "Friendly"],
        background: "linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 50%, #fab1a0 100%)",
        color: "#2d3436",
        accent: "#d63031",
        font: "Poppins",
        titleAlign: "center",
        shapes: "circle",
        animation: "fadeIn",
        layout: "centered"
    },
    {
        id: "sapphire-nights",
        name: "Sapphire Nights",
        tags: ["Elegant", "Luxury"],
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)",
        color: "#ffffff",
        accent: "#ffd700",
        font: "Raleway",
        titleAlign: "center",
        shapes: "line",
        animation: "zoomIn",
        layout: "centered"
    },
    {
        id: "matcha-cream",
        name: "Matcha Cream",
        tags: ["Organic", "Calm"],
        background: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)",
        color: "#2d4a2b",
        accent: "#1b5e20",
        font: "Lora",
        titleAlign: "center",
        shapes: "blob",
        animation: "fadeIn",
        layout: "centered"
    },
    {
        id: "crimson-power",
        name: "Crimson Power",
        tags: ["Bold", "Strong"],
        background: "linear-gradient(135deg, #c31432 0%, #240b36 100%)",
        color: "#ffffff",
        accent: "#ffd700",
        font: "Montserrat",
        titleAlign: "left",
        shapes: "rect",
        animation: "flyIn",
        layout: "split"
    },
    {
        id: "sky-high",
        name: "Sky High",
        tags: ["Airy", "Fresh"],
        background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
        color: "#ffffff",
        accent: "#1e3a8a",
        font: "Poppins",
        titleAlign: "center",
        shapes: "circle",
        animation: "zoomIn",
        layout: "centered"
    },
    {
        id: "chocolate-truffle",
        name: "Chocolate Truffle",
        tags: ["Rich", "Warm"],
        background: "#3e2723",
        color: "#efebe9",
        accent: "#d4a574",
        font: "Lora",
        titleAlign: "center",
        shapes: "line",
        animation: "fadeIn",
        layout: "centered"
    },
    {
        id: "digital-wave",
        name: "Digital Wave",
        tags: ["Tech", "Dynamic"],
        background: "linear-gradient(135deg, #4776e6 0%, #8e54e9 100%)",
        color: "#ffffff",
        accent: "#00f5ff",
        font: "Raleway",
        titleAlign: "left",
        shapes: "line",
        animation: "flyIn",
        layout: "sidebar"
    },
    {
        id: "blush-rose",
        name: "Blush Rose",
        tags: ["Romantic", "Delicate"],
        background: "linear-gradient(135deg, #ffeef8 0%, #ffe0f0 50%, #ffd1e8 100%)",
        color: "#4a1942",
        accent: "#c2185b",
        font: "Poppins",
        titleAlign: "center",
        shapes: "blob",
        animation: "fadeIn",
        layout: "centered"
    },
    {
        id: "aurora-borealis",
        name: "Aurora Borealis",
        tags: ["Mystical", "Gradient"],
        background: "linear-gradient(135deg, #00c6ff 0%, #0072ff 50%, #7b2cbf 100%)",
        color: "#ffffff",
        accent: "#00ffff",
        font: "Raleway",
        titleAlign: "center",
        shapes: "circle",
        animation: "zoomIn",
        layout: "centered"
    },
    {
        id: "desert-sunset",
        name: "Desert Sunset",
        tags: ["Warm", "Natural"],
        background: "linear-gradient(135deg, #ff6a00 0%, #ee0979 50%, #ff6a00 100%)",
        color: "#ffffff",
        accent: "#fff5e1",
        font: "Lora",
        titleAlign: "center",
        shapes: "blob",
        animation: "fadeIn",
        layout: "centered"
    },
    {
        id: "midnight-ocean",
        name: "Midnight Ocean",
        tags: ["Deep", "Mysterious"],
        background: "linear-gradient(135deg, #0a192f 0%, #1e3a5f 50%, #2e5266 100%)",
        color: "#a8dadc",
        accent: "#00d4ff",
        font: "Montserrat",
        titleAlign: "left",
        shapes: "line",
        animation: "flyIn",
        layout: "sidebar"
    },
    {
        id: "neon-gradient",
        name: "Neon Gradient",
        tags: ["Electric", "Modern"],
        background: "linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)",
        color: "#ffffff",
        accent: "#ffff00",
        font: "Poppins",
        titleAlign: "center",
        shapes: "circle",
        animation: "zoomIn",
        layout: "centered"
    },
    {
        id: "charcoal-elegance",
        name: "Charcoal Elegance",
        tags: ["Sophisticated", "Dark"],
        background: "#36454f",
        color: "#e8e8e8",
        accent: "#b8860b",
        font: "Playfair Display",
        titleAlign: "center",
        shapes: "line",
        animation: "fadeIn",
        layout: "centered"
    },
    {
        id: "cosmic-purple",
        name: "Cosmic Purple",
        tags: ["Space", "Vibrant"],
        background: "linear-gradient(135deg, #5b247a 0%, #1bcedf 100%)",
        color: "#ffffff",
        accent: "#ff6ec7",
        font: "Outfit",
        titleAlign: "left",
        shapes: "circle",
        animation: "zoomIn",
        layout: "split"
    },
    {
        id: "terracotta-dream",
        name: "Terracotta Dream",
        tags: ["Earthy", "Warm"],
        background: "linear-gradient(135deg, #e07a5f 0%, #f2cc8f 100%)",
        color: "#3d405b",
        accent: "#81b29a",
        font: "Lora",
        titleAlign: "center",
        shapes: "blob",
        animation: "fadeIn",
        layout: "centered"
    },
    {
        id: "electric-teal",
        name: "Electric Teal",
        tags: ["Fresh", "Bold"],
        background: "linear-gradient(135deg, #00b4db 0%, #0083b0 100%)",
        color: "#ffffff",
        accent: "#ffeb3b",
        font: "Montserrat",
        titleAlign: "left",
        shapes: "rect",
        animation: "flyIn",
        layout: "sidebar"
    },
    {
        id: "velvet-noir",
        name: "Velvet Noir",
        tags: ["Luxury", "Dark"],
        background: "#1c1c1c",
        color: "#d4af37",
        accent: "#8b0000",
        font: "Playfair Display",
        titleAlign: "center",
        shapes: "line",
        animation: "zoomIn",
        layout: "centered"
    },
    {
        id: "sunrise-gradient",
        name: "Sunrise Gradient",
        tags: ["Bright", "Optimistic"],
        background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
        color: "#2d3436",
        accent: "#d63031",
        font: "Poppins",
        titleAlign: "center",
        shapes: "circle",
        animation: "fadeIn",
        layout: "centered"
    },
    {
        id: "forest-mist",
        name: "Forest Mist",
        tags: ["Nature", "Serene"],
        background: "linear-gradient(135deg, #134e5e 0%, #71b280 50%, #a8e6cf 100%)",
        color: "#ffffff",
        accent: "#ffd700",
        font: "Lora",
        titleAlign: "center",
        shapes: "blob",
        animation: "fadeIn",
        layout: "centered"
    },
    {
        id: "magenta-pop",
        name: "Magenta Pop",
        tags: ["Bold", "Creative"],
        background: "linear-gradient(135deg, #ff0099 0%, #493240 100%)",
        color: "#ffffff",
        accent: "#00ffff",
        font: "Raleway",
        titleAlign: "left",
        shapes: "rect",
        animation: "flyIn",
        layout: "split"
    },
    {
        id: "pearl-white",
        name: "Pearl White",
        tags: ["Clean", "Minimal"],
        background: "#f8f9fa",
        color: "#212529",
        accent: "#6c757d",
        font: "Inter",
        titleAlign: "left",
        shapes: "none",
        animation: "fadeIn",
        layout: "standard"
    },
    {
        id: "amber-glow",
        name: "Amber Glow",
        tags: ["Warm", "Inviting"],
        background: "linear-gradient(135deg, #ff9a56 0%, #ff6a88 50%, #feca57 100%)",
        color: "#2d3436",
        accent: "#d63031",
        font: "Montserrat",
        titleAlign: "center",
        shapes: "circle",
        animation: "zoomIn",
        layout: "centered"
    },
    {
        id: "indigo-night",
        name: "Indigo Night",
        tags: ["Deep", "Professional"],
        background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e22ce 100%)",
        color: "#ffffff",
        accent: "#fbbf24",
        font: "Playfair Display",
        titleAlign: "center",
        shapes: "line",
        animation: "zoomIn",
        layout: "centered"
    }
];

// AI Content Analysis Function
function analyzeAndSplitContent(content, slideCount) {
    if (!content || !content.trim()) {
        return [];
    }

    const lines = content.split('\n').map(line => line.trim()).filter(line => line);
    
    if (lines.length === 0) {
        return [];
    }

    // Step 1: Detect potential headers
    const sections = [];
    let currentSection = { title: "", content: [] };
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        
        // Header detection patterns
        const isHeader = 
            line.endsWith(':') || // "Introduction:"
            line.endsWith('—') || // "Introduction—"
            (line === line.toUpperCase() && line.length < 50 && line.length > 3) || // ALL CAPS
            /^#{1,3}\s/.test(line) || // Markdown headers
            /^\d+\.\s/.test(line) || // Numbered sections "1. Introduction"
            /^\*\*.*\*\*$/.test(line); // **Bold text**
        
        if (isHeader && currentSection.content.length > 0) {
            // Save previous section
            sections.push({ ...currentSection });
            currentSection = { title: cleanHeader(line), content: [] };
        } else if (isHeader && currentSection.content.length === 0) {
            // First header or consecutive headers
            currentSection.title = cleanHeader(line);
        } else {
            // Regular content
            currentSection.content.push(line);
        }
    }
    
    // Add last section
    if (currentSection.content.length > 0 || currentSection.title) {
        sections.push(currentSection);
    }

    // Step 2: If we have explicit sections, use them
    if (sections.length > 0 && sections.length <= slideCount * 1.5) {
        return balanceSections(sections, slideCount);
    }
    
    // Step 3: No clear sections - split content evenly
    return splitContentEvenly(lines, slideCount);
}

function cleanHeader(header) {
    return header
        .replace(/^#{1,3}\s/, '') // Remove markdown #
        .replace(/^\d+\.\s/, '') // Remove numbering
        .replace(/^[\*\-]\s/, '') // Remove bullets
        .replace(/\*\*/g, '') // Remove bold markers
        .replace(/[:—]$/, '') // Remove trailing : or —
        .trim();
}

function balanceSections(sections, targetCount) {
    // If we have exactly the right number, return as-is
    if (sections.length === targetCount) {
        return sections.map(s => ({
            title: s.title || generateTitleFromContent(s.content),
            content: s.content.join('\n')
        }));
    }
    
    // If we have fewer sections than slides, split larger sections
    if (sections.length < targetCount) {
        const result = [];
        const sectionsToSplit = targetCount - sections.length;
        
        // Sort by content length to split the largest ones
        const sorted = [...sections].sort((a, b) => b.content.length - a.content.length);
        
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            
            if (i < sectionsToSplit && section.content.length > 3) {
                // Split this section into 2
                const mid = Math.floor(section.content.length / 2);
                result.push({
                    title: section.title || generateTitleFromContent(section.content.slice(0, mid)),
                    content: section.content.slice(0, mid).join('\n')
                });
                result.push({
                    title: generateTitleFromContent(section.content.slice(mid)),
                    content: section.content.slice(mid).join('\n')
                });
            } else {
                result.push({
                    title: section.title || generateTitleFromContent(section.content),
                    content: section.content.join('\n')
                });
            }
        }
        
        return result.slice(0, targetCount);
    }
    
    // If we have more sections than slides, merge smaller ones
    const result = [];
    const mergeCount = sections.length - targetCount;
    
    for (let i = 0; i < sections.length; i++) {
        if (result.length >= targetCount) break;
        
        const section = sections[i];
        
        // Merge with next if we need to reduce count
        if (i < sections.length - 1 && result.length + (sections.length - i) > targetCount) {
            const nextSection = sections[i + 1];
            result.push({
                title: section.title || generateTitleFromContent(section.content),
                content: [...section.content, ...nextSection.content].join('\n')
            });
            i++; // Skip next section as we merged it
        } else {
            result.push({
                title: section.title || generateTitleFromContent(section.content),
                content: section.content.join('\n')
            });
        }
    }
    
    return result;
}

function splitContentEvenly(lines, slideCount) {
    const linesPerSlide = Math.ceil(lines.length / slideCount);
    const slides = [];
    
    for (let i = 0; i < slideCount; i++) {
        const start = i * linesPerSlide;
        const end = Math.min(start + linesPerSlide, lines.length);
        const slideLines = lines.slice(start, end);
        
        if (slideLines.length > 0) {
            slides.push({
                title: generateTitleFromContent(slideLines),
                content: slideLines.join('\n')
            });
        }
    }
    
    return slides;
}

function generateTitleFromContent(contentLines) {
    if (!contentLines || contentLines.length === 0) {
        return "Slide Content";
    }
    
    // Use first line if it's short enough
    const firstLine = Array.isArray(contentLines) ? contentLines[0] : contentLines.split('\n')[0];
    
    if (firstLine.length <= 50) {
        return firstLine;
    }
    
    // Extract first few words
    const words = firstLine.split(' ').slice(0, 6).join(' ');
    return words + (firstLine.length > words.length ? '...' : '');
}

// DOM Elements
const generateBtn = document.getElementById('generate-btn');
const regenerateBtn = document.getElementById('regenerate-btn');
const downloadBtn = document.getElementById('download-btn');
const previewViewport = document.getElementById('preview-viewport');
const slideNav = document.getElementById('slide-nav');
const prevSlideBtn = document.getElementById('prev-slide');
const nextSlideBtn = document.getElementById('next-slide');
const slideCounter = document.getElementById('slide-counter');
const fileUpload = document.getElementById('file-upload');
const dropZone = document.getElementById('drop-zone');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderTemplates();
    setupEventListeners();
});

function setupEventListeners() {
    // Input listeners for main title/subtitle/content
    document.getElementById('presentation-title').addEventListener('input', (e) => state.title = e.target.value);
    document.getElementById('presentation-subtitle').addEventListener('input', (e) => state.subtitle = e.target.value);
    document.getElementById('slide-count').addEventListener('input', (e) => state.slideCount = parseInt(e.target.value) || 3);
    document.getElementById('presentation-content').addEventListener('input', (e) => state.content = e.target.value);

    generateBtn.addEventListener('click', generateDesign);
    regenerateBtn.addEventListener('click', generateDesign);
    downloadBtn.addEventListener('click', downloadPPT);
    
    prevSlideBtn.addEventListener('click', () => navigateSlide(-1));
    nextSlideBtn.addEventListener('click', () => navigateSlide(1));

    // File Upload Listeners
    fileUpload.addEventListener('change', handleFileUpload);
    
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });
    
    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        if (e.dataTransfer.files.length > 0) {
            handleFileUpload({ target: { files: e.dataTransfer.files } });
        }
    });
}

// Template Gallery Logic
function renderTemplates() {
    const grid = document.getElementById('templates-grid');
    grid.innerHTML = '';
    
    themes.forEach(theme => {
        const card = document.createElement('div');
        card.className = 'template-card';
        card.onclick = () => applyTheme(theme);
        
        // Create a mini preview of the theme
        const previewStyle = `
            background: ${theme.background};
            color: ${theme.color};
            font-family: ${theme.font};
        `;
        
        card.innerHTML = `
            <div class="template-preview" style="${previewStyle}">
                <div style="text-align: ${theme.titleAlign}; width: 100%;">
                    <h4 style="color: ${theme.accent}; margin-bottom: 0.5rem;">Title</h4>
                    <div style="height: 4px; width: 40px; background: ${theme.accent}; display: inline-block;"></div>
                </div>
            </div>
            <div class="template-info">
                <h3>${theme.name}</h3>
                <div class="template-tags">
                    ${theme.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

function applyTheme(theme) {
    state.currentTheme = theme;
    renderPreview();
    
    // Enable controls
    regenerateBtn.disabled = false;
    downloadBtn.disabled = false;
    slideNav.style.display = 'flex';
    
    // Reset to first slide
    state.currentSlideIndex = 0;
    updateSlideVisibility();
    
    // Scroll to preview
    document.querySelector('.preview-panel').scrollIntoView({ behavior: 'smooth' });
}

// File Upload Logic
async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const zip = await JSZip.loadAsync(file);
        
        // 1. Find slides
        const slideFiles = Object.keys(zip.files).filter(name => name.startsWith('ppt/slides/slide') && name.endsWith('.xml'));
        
        // Sort slides by number (slide1, slide2, etc.)
        slideFiles.sort((a, b) => {
            const numA = parseInt(a.match(/slide(\d+)\.xml/)[1]);
            const numB = parseInt(b.match(/slide(\d+)\.xml/)[1]);
            return numA - numB;
        });

        const newSlides = [];
        let extractedTitle = null;

        for (const slideFile of slideFiles) {
            const content = await zip.file(slideFile).async('string');
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(content, "text/xml");
            
            const textParts = extractTextFromSlide(xmlDoc);
            
            if (textParts.length > 0) {
                // Heuristic: First slide is usually title slide
                if (!extractedTitle && newSlides.length === 0) {
                    extractedTitle = textParts[0]; // Assume first text is title
                    // If there's more text, assume it's subtitle
                    if (textParts.length > 1) {
                        state.subtitle = textParts.slice(1).join(' ');
                        document.getElementById('presentation-subtitle').value = state.subtitle;
                    }
                    state.title = extractedTitle;
                    document.getElementById('presentation-title').value = state.title;
                } else {
                    // Content slides
                    newSlides.push({
                        id: Date.now() + Math.random(),
                        title: textParts[0] || "Untitled Slide",
                        content: textParts.slice(1).join('\n')
                    });
                }
            }
        }

        if (newSlides.length > 0) {
            state.slides = newSlides;
            renderSlideInputs();
            alert(`Successfully imported ${newSlides.length} slides!`);
        } else {
            alert("No text content found in the slides.");
        }

    } catch (error) {
        console.error("Error parsing PPTX:", error);
        alert("Error parsing PPTX file. Please ensure it is a valid PowerPoint file.");
    }
}

function extractTextFromSlide(xmlDoc) {
    const texts = [];
    // Look for <a:t> tags (PowerPoint text)
    const textNodes = xmlDoc.getElementsByTagName('a:t');
    for (let i = 0; i < textNodes.length; i++) {
        texts.push(textNodes[i].textContent);
    }
    return texts;
}

// AI Design Engine
function generateDesign() {
    // 1. Analyze and split content using AI
    state.generatedSlides = analyzeAndSplitContent(state.content, state.slideCount);
    
    if (state.generatedSlides.length === 0) {
        alert("Please enter some content for your presentation!");
        return;
    }
    
    // 2. Pick a random theme
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    applyTheme(randomTheme);
}

function renderPreview() {
    previewViewport.innerHTML = '';
    const theme = state.currentTheme;

    // Title Slide
    const titleSlide = createSlideElement(theme, 'title');
    titleSlide.innerHTML = `
        <div class="slide-content-wrapper" style="text-align: ${theme.titleAlign}">
            <h1 style="color: ${theme.accent}">${state.title}</h1>
            <h2 style="color: ${theme.color}">${state.subtitle}</h2>
            ${getDecorativeElement(theme)}
        </div>
    `;
    previewViewport.appendChild(titleSlide);

    // Content Slides (AI-generated)
    state.generatedSlides.forEach(slide => {
        const slideEl = createSlideElement(theme, 'content');
        
        // Apply Layout Class
        if (theme.layout === 'split') slideEl.classList.add('layout-split');
        if (theme.layout === 'sidebar') slideEl.classList.add('layout-sidebar');
        if (theme.layout === 'centered') slideEl.classList.add('layout-centered');

        const bullets = slide.content.split('\n').filter(line => line.trim() !== '').map(line => `<li>${line}</li>`).join('');
        
        slideEl.innerHTML = `
            <div class="slide-header-area">
                <h1 style="color: ${theme.accent}; font-size: 2rem;">${slide.title}</h1>
            </div>
            <div class="slide-body-area">
                <ul style="color: ${theme.color}">
                    ${bullets}
                </ul>
            </div>
            ${getDecorativeElement(theme, true)}
        `;
        previewViewport.appendChild(slideEl);
    });

    updateSlideVisibility();
}

function createSlideElement(theme, type) {
    const el = document.createElement('div');
    el.className = 'slide-preview hidden';
    el.style.background = theme.background;
    el.style.fontFamily = theme.font;
    el.style.color = theme.color;
    
    // Handle gradient backgrounds
    if (theme.background.includes('gradient')) {
        el.style.background = theme.background;
    }

    return el;
}

function getDecorativeElement(theme, isSmall = false) {
    if (theme.shapes === 'none') return '';
    
    let style = '';
    if (theme.shapes === 'circle') {
        style = `
            position: absolute; 
            bottom: -50px; 
            right: -50px; 
            width: ${isSmall ? '150px' : '300px'}; 
            height: ${isSmall ? '150px' : '300px'}; 
            background: ${theme.accent}; 
            border-radius: 50%; 
            opacity: 0.2;
        `;
    } else if (theme.shapes === 'rect') {
        style = `
            position: absolute; 
            top: 0; 
            left: 0; 
            width: 20px; 
            height: 100%; 
            background: ${theme.accent};
        `;
    } else if (theme.shapes === 'line') {
        style = `
            position: absolute; 
            bottom: 20px; 
            left: 50%; 
            transform: translateX(-50%);
            width: 80%; 
            height: 2px; 
            background: ${theme.accent};
        `;
    }
    
    return `<div style="${style}"></div>`;
}

function navigateSlide(direction) {
    const totalSlides = state.generatedSlides.length + 1; // +1 for title slide
    let newIndex = state.currentSlideIndex + direction;
    
    if (newIndex < 0) newIndex = 0;
    if (newIndex >= totalSlides) newIndex = totalSlides - 1;
    
    state.currentSlideIndex = newIndex;
    updateSlideVisibility();
}

function updateSlideVisibility() {
    const slides = previewViewport.querySelectorAll('.slide-preview');
    slides.forEach((slide, index) => {
        if (index === state.currentSlideIndex) {
            slide.classList.remove('hidden');
        } else {
            slide.classList.add('hidden');
        }
    });
    
    slideCounter.textContent = `${state.currentSlideIndex + 1} / ${slides.length}`;
    
    prevSlideBtn.disabled = state.currentSlideIndex === 0;
    nextSlideBtn.disabled = state.currentSlideIndex === slides.length - 1;
}

// PPT Generation (PptxGenJS)
function downloadPPT() {
    const pptx = new PptxGenJS();
    const theme = state.currentTheme;

    // Helper to get hex color from theme
    const bgColor = theme.background.includes('gradient') ? '1e1e2e' : theme.background.replace('#', '');
    const textColor = theme.color.replace('#', '');
    const accentColor = theme.accent.replace('#', '');

    // 1. Title Slide
    let slide = pptx.addSlide();
    slide.background = { color: bgColor };
    
    slide.addText(state.title, { 
        x: 1, y: '40%', w: '80%', h: 1, 
        fontSize: 44, color: accentColor, align: theme.titleAlign, fontFace: theme.font
    });
    
    slide.addText(state.subtitle, { 
        x: 1, y: '55%', w: '80%', h: 0.5, 
        fontSize: 24, color: textColor, align: theme.titleAlign, fontFace: theme.font
    });

    // 2. Content Slides (AI-generated)
    state.generatedSlides.forEach(s => {
        slide = pptx.addSlide();
        slide.background = { color: bgColor };
        
        // Layout Logic
        if (theme.layout === 'split') {
            // Split: Title Left, Content Right
            slide.addText(s.title, { 
                x: 0.5, y: 0.5, w: '40%', h: '90%', 
                fontSize: 36, color: accentColor, bold: true, fontFace: theme.font, valign: 'middle'
            });
            
            const bullets = s.content.split('\n').filter(l => l.trim() !== '');
            if (bullets.length > 0) {
                slide.addText(bullets.map(b => ({ text: b, options: { breakLine: true } })), {
                    x: 5.5, y: 0.5, w: '45%', h: '90%',
                    fontSize: 18, color: textColor, bullet: true, fontFace: theme.font, valign: 'middle'
                });
            }
        } else if (theme.layout === 'sidebar') {
            // Sidebar: Title in Sidebar, Content Main
            slide.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: '30%', h: '100%', fill: accentColor });
            
            slide.addText(s.title, { 
                x: 0.2, y: 0.5, w: '25%', h: '90%', 
                fontSize: 28, color: 'ffffff', bold: true, fontFace: theme.font
            });
            
            const bullets = s.content.split('\n').filter(l => l.trim() !== '');
            if (bullets.length > 0) {
                slide.addText(bullets.map(b => ({ text: b, options: { breakLine: true } })), {
                    x: 3.5, y: 0.5, w: '60%', h: '90%',
                    fontSize: 18, color: textColor, bullet: true, fontFace: theme.font
                });
            }
        } else {
            // Standard / Centered
            slide.addText(s.title, { 
                x: 0.5, y: 0.5, w: '90%', h: 1, 
                fontSize: 32, color: accentColor, bold: true, fontFace: theme.font, align: theme.layout === 'centered' ? 'center' : 'left'
            });
            
            const bullets = s.content.split('\n').filter(l => l.trim() !== '');
            if (bullets.length > 0) {
                slide.addText(bullets.map(b => ({ text: b, options: { breakLine: true } })), {
                    x: 0.5, y: 1.8, w: '90%', h: '70%',
                    fontSize: 18, color: textColor, bullet: true, fontFace: theme.font, align: theme.layout === 'centered' ? 'center' : 'left'
                });
            }
        }
    });

    pptx.writeFile({ fileName: `${state.title.replace(/[^a-z0-9]/gi, '_')}.pptx` });
}
