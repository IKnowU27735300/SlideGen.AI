/**
 * SlideGen.AI - 100% On-Device AI Presentation Studio Pro
 * Multi-Layout Engine • Diagrams (Mermaid) • AI Visuals • WYSIWYG Studio • Presenter Console
 */

// Initialize Mermaid.js
if (window.mermaid) {
    window.mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',
        securityLevel: 'loose',
        themeVariables: {
            primaryColor: '#6366f1',
            primaryTextColor: '#f8fafc',
            primaryBorderColor: '#818cf8',
            lineColor: '#a5b4fc',
            secondaryColor: '#1e293b',
            tertiaryColor: '#0f172a'
        }
    });
}

// State Management
const state = {
    title: "The Future of AI in Healthcare",
    subtitle: "Strategic Analysis & Clinical Roadmap",
    slideCount: 5,
    content: "",
    persona: "business",
    activeTab: "tab-topic",
    autoSmartLayouts: true,
    generateNotes: true,
    generateVisuals: true,
    visualStyle: "smart-auto",
    generatedSlides: [],
    currentTheme: null,
    currentSlideIndex: 0,
    activeEngine: localStorage.getItem('slidegen_engine') || 'heuristic',
    ollamaUrl: localStorage.getItem('slidegen_ollama_url') || 'http://localhost:11434',
    ollamaModel: localStorage.getItem('slidegen_ollama_model') || 'llama3.2',
    webgpuModel: localStorage.getItem('slidegen_webgpu_model') || 'SmolLM2-1.7B-Instruct-q4f16_1-MLC',
    selectedIconTarget: null,
    activeEditingVisualSlideIdx: null
};

// 62 Premium Themes
const themes = [
    { id: "swiss-international", name: "Swiss International", tags: ["Professional", "Grid", "Clean"], background: "#ffffff", color: "#000000", accent: "#ff0000", font: "Arial", titleAlign: "left", shapes: "rect", animation: "fadeIn", layout: "split" },
    { id: "executive-dark", name: "Executive Dark", tags: ["Premium", "Business"], background: "#121212", color: "#e0e0e0", accent: "#d4af37", font: "Playfair Display", titleAlign: "center", shapes: "line", animation: "zoomIn", layout: "centered" },
    { id: "tech-minimal", name: "Tech Minimal", tags: ["Modern", "Startup"], background: "#f3f4f6", color: "#111827", accent: "#2563eb", font: "Inter", titleAlign: "left", shapes: "none", animation: "flyIn", layout: "sidebar" },
    { id: "modern-dark", name: "Modern Dark", tags: ["Tech", "Sleek"], background: "#1e1e2e", color: "#ffffff", accent: "#89b4fa", font: "Montserrat", titleAlign: "left", shapes: "circle", animation: "fadeIn", layout: "standard" },
    { id: "corporate-blue", name: "Corporate Blue", tags: ["Business", "Professional"], background: "#ffffff", color: "#1e3a8a", accent: "#3b82f6", font: "Arial", titleAlign: "center", shapes: "rect", animation: "zoomIn", layout: "standard" },
    { id: "glassmorphism", name: "Glassmorphism", tags: ["Trendy", "Modern"], background: "linear-gradient(135deg, #2dd4bf 0%, #3b82f6 100%)", color: "#ffffff", accent: "#ffffff", font: "Outfit", titleAlign: "center", shapes: "circle", animation: "zoomIn", layout: "centered" },
    { id: "neo-brutalism", name: "Neo-Brutalism", tags: ["Bold", "Edgy"], background: "#f0f0f0", color: "#000000", accent: "#ff0055", font: "Poppins", titleAlign: "left", shapes: "rect", animation: "flyIn", layout: "split" },
    { id: "nature-calm", name: "Nature Calm", tags: ["Organic", "Peaceful"], background: "#ecfccb", color: "#14532d", accent: "#65a30d", font: "Playfair Display", titleAlign: "center", shapes: "blob", animation: "fadeIn", layout: "centered" },
    { id: "cyberpunk", name: "Cyberpunk", tags: ["Futuristic", "Neon"], background: "#09090b", color: "#22d3ee", accent: "#f472b6", font: "Outfit", titleAlign: "right", shapes: "line", animation: "zoomIn", layout: "standard" },
    { id: "gradient-mesh", name: "Gradient Mesh", tags: ["Vibrant", "Modern"], background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)", color: "#ffffff", accent: "#ffd700", font: "Raleway", titleAlign: "center", shapes: "circle", animation: "fadeIn", layout: "centered" },
    { id: "midnight-aurora", name: "Midnight Aurora", tags: ["Elegant", "Dark"], background: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)", color: "#e0f2f1", accent: "#00e5ff", font: "Playfair Display", titleAlign: "left", shapes: "line", animation: "zoomIn", layout: "split" },
    { id: "sunset-vibes", name: "Sunset Vibes", tags: ["Warm", "Creative"], background: "linear-gradient(135deg, #ff6b6b 0%, #feca57 50%, #ee5a6f 100%)", color: "#ffffff", accent: "#2d3436", font: "Lora", titleAlign: "center", shapes: "blob", animation: "fadeIn", layout: "centered" },
    { id: "ocean-breeze", name: "Ocean Breeze", tags: ["Calm", "Professional"], background: "linear-gradient(135deg, #667db6 0%, #0082c8 50%, #667db6 100%)", color: "#ffffff", accent: "#ffd89b", font: "Montserrat", titleAlign: "left", shapes: "rect", animation: "flyIn", layout: "sidebar" },
    { id: "neon-dreams", name: "Neon Dreams", tags: ["Bold", "Electric"], background: "#0a0e27", color: "#ffffff", accent: "#00ff88", font: "Raleway", titleAlign: "left", shapes: "line", animation: "zoomIn", layout: "split" },
    { id: "minimalist-pro", name: "Minimalist Pro", tags: ["Clean", "Simple"], background: "#fafafa", color: "#2c3e50", accent: "#e74c3c", font: "Arial", titleAlign: "left", shapes: "none", animation: "fadeIn", layout: "standard" },
    { id: "retro-wave", name: "Retro Wave", tags: ["80s", "Vibrant"], background: "linear-gradient(135deg, #2b5876 0%, #4e4376 100%)", color: "#ff6ec7", accent: "#00d4ff", font: "Poppins", titleAlign: "center", shapes: "circle", animation: "zoomIn", layout: "centered" },
    { id: "forest-green", name: "Forest Green", tags: ["Natural", "Earthy"], background: "#1b4332", color: "#d8f3dc", accent: "#95d5b2", font: "Playfair Display", titleAlign: "center", shapes: "blob", animation: "fadeIn", layout: "centered" },
    { id: "rose-gold-luxury", name: "Rose Gold Luxury", tags: ["Premium", "Elegant"], background: "#2d2d2d", color: "#f5f5f5", accent: "#e8b4b8", font: "Playfair Display", titleAlign: "center", shapes: "line", animation: "zoomIn", layout: "centered" },
    { id: "arctic-frost", name: "Arctic Frost", tags: ["Cool", "Modern"], background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)", color: "#2c3e50", accent: "#3498db", font: "Inter", titleAlign: "left", shapes: "rect", animation: "flyIn", layout: "sidebar" },
    { id: "warm-autumn", name: "Warm Autumn", tags: ["Cozy", "Seasonal"], background: "linear-gradient(135deg, #f77062 0%, #fe5196 100%)", color: "#ffffff", accent: "#ffd89b", font: "Montserrat", titleAlign: "center", shapes: "circle", animation: "fadeIn", layout: "centered" },
    { id: "holographic-dream", name: "Holographic Dream", tags: ["Futuristic", "Iridescent"], background: "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #4facfe 75%, #00f2fe 100%)", color: "#ffffff", accent: "#ffeb3b", font: "Lora", titleAlign: "center", shapes: "circle", animation: "zoomIn", layout: "centered" },
    { id: "midnight-gold", name: "Midnight Gold", tags: ["Luxury", "Premium"], background: "#1a1a2e", color: "#eee", accent: "#ffd700", font: "Playfair Display", titleAlign: "center", shapes: "line", animation: "fadeIn", layout: "centered" },
    { id: "electric-purple", name: "Electric Purple", tags: ["Bold", "Modern"], background: "linear-gradient(135deg, #6a11cb 0%, #2575fc 100%)", color: "#ffffff", accent: "#00ffff", font: "Raleway", titleAlign: "left", shapes: "rect", animation: "flyIn", layout: "split" },
    { id: "cherry-blossom", name: "Cherry Blossom", tags: ["Delicate", "Spring"], background: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)", color: "#5d4037", accent: "#d81b60", font: "Playfair Display", titleAlign: "center", shapes: "blob", animation: "fadeIn", layout: "centered" },
    { id: "deep-space", name: "Deep Space", tags: ["Cosmic", "Dark"], background: "linear-gradient(135deg, #000000 0%, #0f2027 50%, #203a43 100%)", color: "#ffffff", accent: "#9c27b0", font: "Montserrat", titleAlign: "left", shapes: "circle", animation: "zoomIn", layout: "sidebar" },
    { id: "emerald-elegance", name: "Emerald Elegance", tags: ["Sophisticated", "Green"], background: "linear-gradient(135deg, #134e5e 0%, #71b280 100%)", color: "#ffffff", accent: "#ffd700", font: "Playfair Display", titleAlign: "center", shapes: "line", animation: "fadeIn", layout: "centered" },
    { id: "coral-reef", name: "Coral Reef", tags: ["Vibrant", "Tropical"], background: "linear-gradient(135deg, #ff9a56 0%, #ff6a88 50%, #ff99ac 100%)", color: "#ffffff", accent: "#2d3436", font: "Poppins", titleAlign: "left", shapes: "blob", animation: "flyIn", layout: "split" },
    { id: "monochrome-chic", name: "Monochrome Chic", tags: ["Minimal", "B&W"], background: "#ffffff", color: "#000000", accent: "#333333", font: "Arial", titleAlign: "left", shapes: "rect", animation: "fadeIn", layout: "sidebar" },
    { id: "lavender-mist", name: "Lavender Mist", tags: ["Soft", "Pastel"], background: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)", color: "#4a4a4a", accent: "#7b2cbf", font: "Lora", titleAlign: "center", shapes: "circle", animation: "fadeIn", layout: "centered" },
    { id: "fire-ice", name: "Fire & Ice", tags: ["Contrast", "Dynamic"], background: "linear-gradient(135deg, #ff0844 0%, #ffb199 50%, #00d4ff 100%)", color: "#ffffff", accent: "#ffd700", font: "Montserrat", titleAlign: "center", shapes: "line", animation: "zoomIn", layout: "centered" },
    { id: "royal-navy", name: "Royal Navy", tags: ["Classic", "Professional"], background: "#001f3f", color: "#ffffff", accent: "#c9a961", font: "Playfair Display", titleAlign: "left", shapes: "rect", animation: "flyIn", layout: "sidebar" },
    { id: "mint-fresh", name: "Mint Fresh", tags: ["Clean", "Cool"], background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)", color: "#2d3436", accent: "#00b894", font: "Raleway", titleAlign: "left", shapes: "none", animation: "fadeIn", layout: "standard" },
    { id: "golden-hour", name: "Golden Hour", tags: ["Warm", "Sunset"], background: "linear-gradient(135deg, #fdc830 0%, #f37335 100%)", color: "#ffffff", accent: "#2d3436", font: "Poppins", titleAlign: "center", shapes: "circle", animation: "zoomIn", layout: "centered" },
    { id: "slate-modern", name: "Slate Modern", tags: ["Neutral", "Tech"], background: "#475569", color: "#f1f5f9", accent: "#06b6d4", font: "Lora", titleAlign: "left", shapes: "rect", animation: "flyIn", layout: "split" },
    { id: "berry-blast", name: "Berry Blast", tags: ["Playful", "Energetic"], background: "linear-gradient(135deg, #8e2de2 0%, #4a00e0 100%)", color: "#ffffff", accent: "#ff6b9d", font: "Raleway", titleAlign: "center", shapes: "blob", animation: "zoomIn", layout: "centered" },
    { id: "urban-concrete", name: "Urban Concrete", tags: ["Industrial", "Modern"], background: "#2c3e50", color: "#ecf0f1", accent: "#e67e22", font: "Montserrat", titleAlign: "left", shapes: "rect", animation: "flyIn", layout: "split" },
    { id: "tropical-paradise", name: "Tropical Paradise", tags: ["Vibrant", "Summer"], background: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)", color: "#ffffff", accent: "#fff200", font: "Poppins", titleAlign: "center", shapes: "blob", animation: "zoomIn", layout: "centered" },
    { id: "vintage-paper", name: "Vintage Paper", tags: ["Classic", "Retro"], background: "#f4e8d0", color: "#3e2723", accent: "#8b4513", font: "Lora", titleAlign: "center", shapes: "none", animation: "fadeIn", layout: "centered" },
    { id: "neon-tokyo", name: "Neon Tokyo", tags: ["Urban", "Futuristic"], background: "#1a1a1a", color: "#ffffff", accent: "#ff006e", font: "Montserrat", titleAlign: "left", shapes: "line", animation: "zoomIn", layout: "sidebar" },
    { id: "peachy-keen", name: "Peachy Keen", tags: ["Soft", "Friendly"], background: "linear-gradient(135deg, #ffeaa7 0%, #fdcb6e 50%, #fab1a0 100%)", color: "#2d3436", accent: "#d63031", font: "Poppins", titleAlign: "center", shapes: "circle", animation: "fadeIn", layout: "centered" },
    { id: "sapphire-nights", name: "Sapphire Nights", tags: ["Elegant", "Luxury"], background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)", color: "#ffffff", accent: "#ffd700", font: "Raleway", titleAlign: "center", shapes: "line", animation: "zoomIn", layout: "centered" },
    { id: "matcha-cream", name: "Matcha Cream", tags: ["Organic", "Calm"], background: "linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)", color: "#2d4a2b", accent: "#1b5e20", font: "Lora", titleAlign: "center", shapes: "blob", animation: "fadeIn", layout: "centered" },
    { id: "crimson-power", name: "Crimson Power", tags: ["Bold", "Strong"], background: "linear-gradient(135deg, #c31432 0%, #240b36 100%)", color: "#ffffff", accent: "#ffd700", font: "Montserrat", titleAlign: "left", shapes: "rect", animation: "flyIn", layout: "split" },
    { id: "sky-high", name: "Sky High", tags: ["Airy", "Fresh"], background: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)", color: "#ffffff", accent: "#1e3a8a", font: "Poppins", titleAlign: "center", shapes: "circle", animation: "zoomIn", layout: "centered" },
    { id: "chocolate-truffle", name: "Chocolate Truffle", tags: ["Rich", "Warm"], background: "#3e2723", color: "#efebe9", accent: "#d4a574", font: "Lora", titleAlign: "center", shapes: "line", animation: "fadeIn", layout: "centered" },
    { id: "digital-wave", name: "Digital Wave", tags: ["Tech", "Dynamic"], background: "linear-gradient(135deg, #4776e6 0%, #8e54e9 100%)", color: "#ffffff", accent: "#00f5ff", font: "Raleway", titleAlign: "left", shapes: "line", animation: "flyIn", layout: "sidebar" },
    { id: "blush-rose", name: "Blush Rose", tags: ["Romantic", "Delicate"], background: "linear-gradient(135deg, #ffeef8 0%, #ffe0f0 50%, #ffd1e8 100%)", color: "#4a1942", accent: "#c2185b", font: "Poppins", titleAlign: "center", shapes: "blob", animation: "fadeIn", layout: "centered" },
    { id: "aurora-borealis", name: "Aurora Borealis", tags: ["Mystical", "Gradient"], background: "linear-gradient(135deg, #00c6ff 0%, #0072ff 50%, #7b2cbf 100%)", color: "#ffffff", accent: "#00ffff", font: "Raleway", titleAlign: "center", shapes: "circle", animation: "zoomIn", layout: "centered" },
    { id: "desert-sunset", name: "Desert Sunset", tags: ["Warm", "Natural"], background: "linear-gradient(135deg, #ff6a00 0%, #ee0979 50%, #ff6a00 100%)", color: "#ffffff", accent: "#fff5e1", font: "Lora", titleAlign: "center", shapes: "blob", animation: "fadeIn", layout: "centered" },
    { id: "midnight-ocean", name: "Midnight Ocean", tags: ["Deep", "Mysterious"], background: "linear-gradient(135deg, #0a192f 0%, #1e3a5f 50%, #2e5266 100%)", color: "#a8dadc", accent: "#00d4ff", font: "Montserrat", titleAlign: "left", shapes: "line", animation: "flyIn", layout: "sidebar" },
    { id: "neon-gradient", name: "Neon Gradient", tags: ["Electric", "Modern"], background: "linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%)", color: "#ffffff", accent: "#ffff00", font: "Poppins", titleAlign: "center", shapes: "circle", animation: "zoomIn", layout: "centered" },
    { id: "charcoal-elegance", name: "Charcoal Elegance", tags: ["Sophisticated", "Dark"], background: "#36454f", color: "#e8e8e8", accent: "#b8860b", font: "Playfair Display", titleAlign: "center", shapes: "line", animation: "fadeIn", layout: "centered" },
    { id: "cosmic-purple", name: "Cosmic Purple", tags: ["Space", "Vibrant"], background: "linear-gradient(135deg, #5b247a 0%, #1bcedf 100%)", color: "#ffffff", accent: "#ff6ec7", font: "Outfit", titleAlign: "left", shapes: "circle", animation: "zoomIn", layout: "split" },
    { id: "terracotta-dream", name: "Terracotta Dream", tags: ["Earthy", "Warm"], background: "linear-gradient(135deg, #e07a5f 0%, #f2cc8f 100%)", color: "#3d405b", accent: "#81b29a", font: "Lora", titleAlign: "center", shapes: "blob", animation: "fadeIn", layout: "centered" },
    { id: "electric-teal", name: "Electric Teal", tags: ["Fresh", "Bold"], background: "linear-gradient(135deg, #00b4db 0%, #0083b0 100%)", color: "#ffffff", accent: "#ffeb3b", font: "Montserrat", titleAlign: "left", shapes: "rect", animation: "flyIn", layout: "sidebar" },
    { id: "velvet-noir", name: "Velvet Noir", tags: ["Luxury", "Dark"], background: "#1c1c1c", color: "#d4af37", accent: "#8b0000", font: "Playfair Display", titleAlign: "center", shapes: "line", animation: "zoomIn", layout: "centered" },
    { id: "sunrise-gradient", name: "Sunrise Gradient", tags: ["Bright", "Optimistic"], background: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)", color: "#2d3436", accent: "#d63031", font: "Poppins", titleAlign: "center", shapes: "circle", animation: "fadeIn", layout: "centered" },
    { id: "forest-mist", name: "Forest Mist", tags: ["Nature", "Serene"], background: "linear-gradient(135deg, #134e5e 0%, #71b280 50%, #a8e6cf 100%)", color: "#ffffff", accent: "#ffd700", font: "Lora", titleAlign: "center", shapes: "blob", animation: "fadeIn", layout: "centered" },
    { id: "magenta-pop", name: "Magenta Pop", tags: ["Bold", "Creative"], background: "linear-gradient(135deg, #ff0099 0%, #493240 100%)", color: "#ffffff", accent: "#00ffff", font: "Raleway", titleAlign: "left", shapes: "rect", animation: "flyIn", layout: "split" },
    { id: "pearl-white", name: "Pearl White", tags: ["Clean", "Minimal"], background: "#f8f9fa", color: "#212529", accent: "#6c757d", font: "Inter", titleAlign: "left", shapes: "none", animation: "fadeIn", layout: "standard" },
    { id: "amber-glow", name: "Amber Glow", tags: ["Warm", "Inviting"], background: "linear-gradient(135deg, #ff9a56 0%, #ff6a88 50%, #feca57 100%)", color: "#2d3436", accent: "#d63031", font: "Montserrat", titleAlign: "center", shapes: "circle", animation: "zoomIn", layout: "centered" },
    { id: "indigo-night", name: "Indigo Night", tags: ["Deep", "Professional"], background: "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e22ce 100%)", color: "#ffffff", accent: "#fbbf24", font: "Playfair Display", titleAlign: "center", shapes: "line", animation: "zoomIn", layout: "centered" }
];

// Curated Icon Library for Picker
const iconLibrary = [
    "fa-bolt", "fa-shield", "fa-chart-line", "fa-chart-pie", "fa-rocket", "fa-microchip", "fa-brain",
    "fa-database", "fa-cloud", "fa-server", "fa-lock", "fa-user-group", "fa-heart-pulse", "fa-dna",
    "fa-globe", "fa-network-wired", "fa-bullseye", "fa-award", "fa-scale-balanced", "fa-lightbulb",
    "fa-coins", "fa-wallet", "fa-magnifying-glass-chart", "fa-gears", "fa-code", "fa-laptop-code",
    "fa-sparkles", "fa-compass", "fa-arrows-split-up-and-left", "fa-check-double", "fa-fire", "fa-leaf",
    "fa-sun", "fa-satellite-dish", "fa-sliders", "fa-cubes"
];

// ==========================================
// 🛡️ LOCAL ON-DEVICE AI ENGINE
// ==========================================

let webLlmInstance = null;

class LocalAIManager {
    static async generatePresentation(options, onProgress) {
        const engine = state.activeEngine;

        if (engine === 'ollama') {
            try {
                return await this.generateWithOllama(options, onProgress);
            } catch (err) {
                console.warn("Ollama fallback to heuristic:", err);
                onProgress?.({ message: "Using Local High-Speed Studio Engine...", percent: 60 });
                return this.generateWithHeuristic(options);
            }
        } else if (engine === 'webgpu') {
            try {
                return await this.generateWithWebGPU(options, onProgress);
            } catch (err) {
                console.warn("WebGPU fallback to heuristic:", err);
                onProgress?.({ message: "Using Local High-Speed Studio Engine...", percent: 60 });
                return this.generateWithHeuristic(options);
            }
        } else if (engine === 'chrome-ai') {
            try {
                return await this.generateWithChromeAI(options, onProgress);
            } catch (err) {
                return this.generateWithHeuristic(options);
            }
        } else {
            onProgress?.({ message: "Synthesizing multi-layout presentation & visuals...", percent: 50 });
            await new Promise(r => setTimeout(r, 200));
            return this.generateWithHeuristic(options);
        }
    }

    static async generateWithOllama(options, onProgress) {
        onProgress?.({ message: `[Local Ollama] Generating with ${state.ollamaModel}...`, percent: 30 });
        const systemPrompt = this.buildSystemPrompt(options);
        const userPrompt = this.buildUserPrompt(options);
        const url = `${state.ollamaUrl.replace(/\/$/, '')}/api/generate`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: state.ollamaModel,
                prompt: `${systemPrompt}\n\n${userPrompt}`,
                format: 'json',
                stream: false,
                options: { temperature: 0.7 }
            })
        });

        if (!response.ok) throw new Error(`Ollama HTTP ${response.status}`);
        const data = await response.json();
        return this.parseLLMResponse(data.response, options);
    }

    static async generateWithWebGPU(options, onProgress) {
        if (!webLlmInstance) {
            onProgress?.({ message: `[WebGPU] Loading ${state.webgpuModel}...`, percent: 20 });
            const webllm = await import('https://esm.run/@mlc-ai/web-llm');
            webLlmInstance = await webllm.CreateMLCEngine(state.webgpuModel, {
                initProgressCallback: (report) => {
                    const p = Math.min(Math.round((report.progress || 0) * 80) + 15, 85);
                    onProgress?.({ message: `[WebGPU] ${report.text || 'Loading local model...'}`, percent: p });
                }
            });
        }

        onProgress?.({ message: `[WebGPU] Synthesizing presentation on GPU...`, percent: 85 });
        const completion = await webLlmInstance.chat.completions.create({
            messages: [
                { role: "system", content: this.buildSystemPrompt(options) },
                { role: "user", content: this.buildUserPrompt(options) }
            ],
            temperature: 0.7
        });

        return this.parseLLMResponse(completion.choices[0]?.message?.content || "", options);
    }

    static async generateWithChromeAI(options, onProgress) {
        if (!window.ai?.languageModel) throw new Error("Chrome AI not available.");
        const session = await window.ai.languageModel.create({
            systemPrompt: this.buildSystemPrompt(options)
        });
        const result = await session.prompt(this.buildUserPrompt(options));
        return this.parseLLMResponse(result, options);
    }

    // Heuristic Multi-Layout & Diagram/Visual Generator
    static generateWithHeuristic(options) {
        const { title, subtitle, content, slideCount, persona, generateNotes } = options;
        const baseSlides = analyzeAndSplitContent(content || title, slideCount);

        const layoutProgression = state.generateVisuals
            ? [
                'split',        // Slide 1: Challenge & Context
                'diagram',      // Slide 2: Architecture & Flow Diagram
                'bento',        // Slide 3: Core Solution Pillars
                'image-split',  // Slide 4: Visual Concept Feature
                'kpi',          // Slide 5: Performance & Metrics
                'chart',        // Slide 6: Growth / Trend Chart
                'timeline',     // Slide 7: Roadmap & Milestones
                'team',         // Slide 8: Team & Contributors
                'comparison',   // Slide 9: Differentiation
                'quote'         // Slide 10: Mission & Vision
            ]
            : [
                'split', 'bento', 'kpi', 'chart', 'timeline', 'team', 'comparison', 'quote'
            ];

        return baseSlides.map((slide, idx) => {
            const assignedLayout = state.autoSmartLayouts 
                ? (layoutProgression[idx % layoutProgression.length] || 'standard') 
                : 'standard';

            const bullets = slide.content.split('\n').filter(l => l.trim().length > 0);

            // Generate relevant Mermaid diagram for diagram layout
            const diagramCode = generateContextualMermaidDiagram(slide.title, title);

            return {
                title: slide.title || `Strategic Section ${idx + 1}`,
                subtitle: subtitle || "Executive Analysis",
                layout: assignedLayout,
                bullets: bullets.length > 0 ? bullets : ["Actionable insight and strategic finding", "Implementation architecture and execution path", "Milestone outcome and verified impact"],
                callout: `Key Takeaway: Prioritize execution velocity to capture market leadership.`,
                diagramCode: diagramCode,
                customImageUrl: "",
                bentoCards: [
                    { icon: "fa-bolt", title: "Pillar 1: Core Engine", desc: bullets[0] || "High-performance decentralized execution" },
                    { icon: "fa-shield", title: "Pillar 2: Privacy & Security", desc: bullets[1] || "Zero telemetry and on-premise governance" },
                    { icon: "fa-chart-line", title: "Pillar 3: Measurable ROI", desc: bullets[2] || "Drastic cost reduction and acceleration" }
                ],
                kpis: [
                    { number: "99.4%", label: "Accuracy Rate", context: "Multi-center benchmark" },
                    { number: "12x", label: "Speed Multiplier", context: "vs traditional baseline" },
                    { number: "-40%", label: "Operating Cost", context: "Direct annual efficiency" }
                ],
                chartData: {
                    type: "bar",
                    labels: ["2023", "2024", "2025", "2026 (Est.)"],
                    values: [25, 48, 85, 140],
                    metricLabel: "Adoption & Impact"
                },
                timelineSteps: [
                    { step: "Phase 1", title: "Diagnostic Audit", desc: "Baseline assessment & sandbox testing" },
                    { step: "Phase 2", title: "Pilot Deployment", desc: "Targeted operational roll-out" },
                    { step: "Phase 3", title: "Full Scale Scaling", desc: "Enterprise-wide adoption & ROI" }
                ],
                teamMembers: [
                    { name: "Dr. Sarah Chen", role: "Chief AI Architect", bio: "Former Stanford AI Lab, 15+ patents in neural systems" },
                    { name: "Marcus Vance", role: "VP of Product Strategy", bio: "Scaled enterprise SaaS platforms to $100M+ ARR" },
                    { name: "Elena Rostova", role: "Head of Clinical Research", bio: "Led 20+ multi-center international healthcare trials" }
                ],
                comparison: {
                    col1Title: "Traditional Approach",
                    col1Items: ["Manual fragmented processes", "Cloud privacy vulnerability", "High latency bottlenecks"],
                    col2Title: "SlideGen.AI Studio",
                    col2Items: ["100% On-Device AI Execution", "Zero-Leakage Security", "Instant Multi-Layout Synthesis"]
                },
                speakerNotes: generateNotes 
                    ? `Slide ${idx + 1} Presenter Notes: Highlight the core message in "${slide.title}". Walk the audience through the visual components and emphasize key takeaways.` 
                    : ""
            };
        });
    }

    static buildSystemPrompt(options) {
        return `You are SlideGen.AI Studio, an expert presentation architect.
Generate a structured JSON slide deck matching the requested slide count and persona.

RULES:
1. Return strictly valid JSON.
2. Tone: ${options.persona.toUpperCase()}
3. Target Slide Count: ${options.slideCount}
4. Use diverse layout types: "diagram", "image-split", "bento", "kpi", "chart", "timeline", "team", "comparison", "quote", "split", "standard".

JSON SCHEMA:
{
  "slides": [
    {
      "title": "Title Here",
      "layout": "diagram|image-split|bento|kpi|chart|timeline|team|comparison|quote|split|standard",
      "bullets": ["Bullet 1", "Bullet 2", "Bullet 3"],
      "callout": "Key Takeaway: ...",
      "diagramCode": "graph LR\\nA[Input] --> B[Processing]\\nB --> C[Output]",
      "kpis": [{"number": "12x", "label": "Growth", "context": "YoY metric"}],
      "bentoCards": [{"icon": "fa-bolt", "title": "Pillar", "desc": "Details"}],
      "timelineSteps": [{"step": "Phase 1", "title": "Pilot", "desc": "Launch"}],
      "chartData": {"type": "bar", "labels": ["Q1", "Q2", "Q3", "Q4"], "values": [20, 45, 70, 110], "metricLabel": "Revenue"},
      "teamMembers": [{"name": "Name", "role": "Title", "bio": "Short bio"}],
      "speakerNotes": "Presenter notes..."
    }
  ]
}`;
    }

    static buildUserPrompt(options) {
        return `Topic: ${options.title}
Subtitle: ${options.subtitle}
Target Slides: ${options.slideCount}
Generate Visuals & Diagrams: ${state.generateVisuals ? "YES" : "NO"}
Source Content / Notes:
${options.content || options.title}`;
    }

    static parseLLMResponse(text, options) {
        try {
            let cleaned = text.trim();
            if (cleaned.startsWith('```json')) cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
            else if (cleaned.startsWith('```')) cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');

            const first = cleaned.indexOf('{');
            const last = cleaned.lastIndexOf('}');
            if (first !== -1 && last !== -1) cleaned = cleaned.substring(first, last + 1);

            const parsed = JSON.parse(cleaned);
            if (Array.isArray(parsed.slides) && parsed.slides.length > 0) {
                return parsed.slides.map((s, i) => ({
                    title: s.title || `Slide ${i + 1}`,
                    layout: s.layout || 'standard',
                    bullets: Array.isArray(s.bullets) ? s.bullets : [s.bullets || "Key Insight"],
                    callout: s.callout || "Key Takeaway: Prioritize execution velocity.",
                    diagramCode: s.diagramCode || generateContextualMermaidDiagram(s.title || `Slide ${i+1}`, options.title),
                    customImageUrl: s.customImageUrl || "",
                    kpis: s.kpis || [{ number: "99%", label: "Efficiency", context: "Validated metric" }],
                    bentoCards: s.bentoCards || [{ icon: "fa-bolt", title: "Component", desc: "Core implementation" }],
                    timelineSteps: s.timelineSteps || [{ step: "Phase 1", title: "Initiative", desc: "Execution milestone" }],
                    chartData: s.chartData || { type: "bar", labels: ["Q1", "Q2", "Q3", "Q4"], values: [30, 60, 90, 140], metricLabel: "Metric" },
                    teamMembers: s.teamMembers || [{ name: "Alex Morgan", role: "Lead Architect", bio: "Enterprise Systems Expert" }],
                    comparison: s.comparison || { col1Title: "Before", col1Items: ["Manual effort"], col2Title: "After", col2Items: ["Automated"] },
                    speakerNotes: s.speakerNotes || ""
                }));
            }
        } catch (e) {
            console.warn("JSON parse fallback to heuristic:", e);
        }
        return this.generateWithHeuristic(options);
    }
}

// Generate contextual Mermaid diagram syntax
function generateContextualMermaidDiagram(slideTitle, mainTopic) {
    const cleanTitle = (slideTitle || "").toLowerCase();
    
    if (cleanTitle.includes('architecture') || cleanTitle.includes('system') || cleanTitle.includes('technical')) {
        return `graph TD
    Client["💻 Client Interface"] --> Gateway["⚡ Local API Gateway"]
    Gateway --> Engine["🧠 On-Device Neural Engine"]
    Engine --> Storage[("🔒 Secure Sandbox Cache")]
    Engine --> Renderer["🎨 Studio Visual Canvas"]`;
    } else if (cleanTitle.includes('process') || cleanTitle.includes('workflow') || cleanTitle.includes('roadmap') || cleanTitle.includes('phase')) {
        return `graph LR
    Step1["🔍 1. Ingestion & Analysis"] --> Step2["⚙️ 2. Neural Synthesis"]
    Step2 --> Step3["📐 3. Layout Optimization"]
    Step3 --> Step4["🚀 4. Export & Presentation"]`;
    } else if (cleanTitle.includes('security') || cleanTitle.includes('privacy') || cleanTitle.includes('data')) {
        return `graph TD
    Data["📁 Raw Business Data"] --> Firewall{"🛡️ Zero-Leakage Boundary"}
    Firewall -->|100% Local GPU| LocalAI["💻 Local Hardware AI"]
    LocalAI --> Output["📊 Exported Deck"]`;
    } else {
        return `graph LR
    Input["💡 Concept / Input"] --> AI["🤖 Local AI Studio"]
    AI --> Layouts["🍱 Bento & Diagrams"]
    Layouts --> Present["🎤 Live Presenter Mode"]`;
    }
}

// Generate rich procedural SVG visual art
function generateProceduralVectorArt(accentColor, seed = 1) {
    const color = accentColor || "#6366f1";
    return `
    <svg class="procedural-art-svg" viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="grad-${seed}" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="${color}" stop-opacity="0.8" />
                <stop offset="100%" stop-color="#3b82f6" stop-opacity="0.2" />
            </linearGradient>
            <filter id="glow-${seed}" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="6" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
        </defs>
        <rect width="400" height="240" fill="#0f172a" rx="12" />
        <circle cx="100" cy="120" r="60" fill="url(#grad-${seed})" opacity="0.5" filter="url(#glow-${seed})" />
        <circle cx="280" cy="100" r="80" fill="url(#grad-${seed})" opacity="0.3" filter="url(#glow-${seed})" />
        <line x1="60" y1="180" x2="340" y2="60" stroke="${color}" stroke-width="2" opacity="0.6" stroke-dasharray="4 4" />
        <rect x="150" y="70" width="100" height="100" rx="16" fill="none" stroke="${color}" stroke-width="2" transform="rotate(15 200 120)" />
        <circle cx="200" cy="120" r="14" fill="${color}" />
        <circle cx="100" cy="120" r="8" fill="#ffffff" opacity="0.9" />
        <circle cx="280" cy="100" r="8" fill="#ffffff" opacity="0.9" />
    </svg>`;
}

// Content Splitter
function analyzeAndSplitContent(content, slideCount) {
    if (!content || !content.trim()) {
        return Array.from({ length: slideCount }, (_, i) => ({
            title: `Strategic Pillar ${i + 1}`,
            content: "Executive landscape analysis\nImplementation architecture\nPerformance metrics"
        }));
    }

    const lines = content.split('\n').map(l => l.trim()).filter(l => l);
    const sections = [];
    let current = { title: "", content: [] };
    
    for (const line of lines) {
        const isHeader = line.endsWith(':') || line.endsWith('—') || (line === line.toUpperCase() && line.length < 50 && line.length > 3) || /^#{1,3}\s/.test(line) || /^\d+\.\s/.test(line);
        if (isHeader && current.content.length > 0) {
            sections.push({ ...current });
            current = { title: line.replace(/^#{1,3}\s|^\d+\.\s|[:—]$/g, '').trim(), content: [] };
        } else if (isHeader && current.content.length === 0) {
            current.title = line.replace(/^#{1,3}\s|^\d+\.\s|[:—]$/g, '').trim();
        } else {
            current.content.push(line);
        }
    }
    if (current.content.length > 0 || current.title) sections.push(current);

    if (sections.length > 0 && sections.length <= slideCount * 1.5) {
        return sections.slice(0, slideCount).map(s => ({ title: s.title || "Key Insights", content: s.content.join('\n') }));
    }

    const perSlide = Math.ceil(lines.length / slideCount);
    const slides = [];
    for (let i = 0; i < slideCount; i++) {
        const slice = lines.slice(i * perSlide, (i + 1) * perSlide);
        if (slice.length > 0) {
            slides.push({
                title: slice[0].length < 45 ? slice[0] : `Strategic Area ${i + 1}`,
                content: slice.join('\n')
            });
        }
    }
    return slides;
}

// ==========================================
// 🎨 UI & DOM MANAGEMENT
// ==========================================

// DOM Elements
const generateBtn = document.getElementById('generate-btn');
const regenerateBtn = document.getElementById('regenerate-btn');
const downloadBtn = document.getElementById('download-btn');
const exportMoreBtn = document.getElementById('export-more-btn');
const exportMenu = document.getElementById('export-menu');
const exportPptxItem = document.getElementById('export-pptx-item');
const exportPdfItem = document.getElementById('export-pdf-item');
const exportHtmlItem = document.getElementById('export-html-item');
const presentBtn = document.getElementById('present-btn');
const previewViewport = document.getElementById('preview-viewport');
const slideNav = document.getElementById('slide-nav');
const prevSlideBtn = document.getElementById('prev-slide');
const nextSlideBtn = document.getElementById('next-slide');
const slideCounter = document.getElementById('slide-counter');
const fileUpload = document.getElementById('file-upload');
const dropZone = document.getElementById('drop-zone');
const aiSettingsBtn = document.getElementById('ai-settings-btn');
const aiSettingsModal = document.getElementById('ai-settings-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const saveEngineSettingsBtn = document.getElementById('save-engine-settings-btn');
const testOllamaBtn = document.getElementById('test-ollama-btn');
const insertSampleBtn = document.getElementById('insert-sample-btn');
const toggleNotesBtn = document.getElementById('toggle-notes-btn');
const speakerNotesDrawer = document.getElementById('speaker-notes-drawer');
const speakerNotesContent = document.getElementById('speaker-notes-content');
const studioToolbar = document.getElementById('studio-toolbar');
const slideLayoutSelect = document.getElementById('slide-layout-select');
const customAccentColor = document.getElementById('custom-accent-color');
const accentSwatchPreview = document.getElementById('accent-swatch-preview');
const moveSlideLeftBtn = document.getElementById('move-slide-left-btn');
const moveSlideRightBtn = document.getElementById('move-slide-right-btn');
const duplicateSlideBtn = document.getElementById('duplicate-slide-btn');
const addNewSlideBtn = document.getElementById('add-new-slide-btn');
const deleteSlideBtn = document.getElementById('delete-slide-btn');
const editVisualBtn = document.getElementById('edit-visual-btn');
const thumbnailsStrip = document.getElementById('thumbnails-strip');
const aiStatusContainer = document.getElementById('ai-status-container');
const aiStatusMessage = document.getElementById('ai-status-message');
const aiStatusPercent = document.getElementById('ai-status-percent');
const aiProgressBar = document.getElementById('ai-progress-bar');
const currentEngineLabel = document.getElementById('current-engine-label');
const activeEngineBadge = document.getElementById('active-engine-badge');

// Visual Options Controls
const generateVisualsChk = document.getElementById('generate-visuals-chk');
const visualStyleContainer = document.getElementById('visual-style-container');
const visualStyleSelect = document.getElementById('visual-style-select');

// Visual Editor Modal
const visualEditModal = document.getElementById('visual-edit-modal');
const closeVisualModalBtn = document.getElementById('close-visual-modal-btn');
const modalVisualTypeSelect = document.getElementById('modal-visual-type-select');
const modalDiagramSection = document.getElementById('modal-diagram-section');
const modalCustomImageSection = document.getElementById('modal-custom-image-section');
const modalMermaidCode = document.getElementById('modal-mermaid-code');
const modalImageUrl = document.getElementById('modal-image-url');
const modalImageFile = document.getElementById('modal-image-file');
const saveVisualBtn = document.getElementById('save-visual-btn');

// Icon Picker Modal
const iconPickerModal = document.getElementById('icon-picker-modal');
const closeIconModalBtn = document.getElementById('close-icon-modal-btn');
const iconPickerGrid = document.getElementById('icon-picker-grid');

// Presenter Modal Elements
const presenterOverlay = document.getElementById('presenter-overlay');
const exitPresenterBtn = document.getElementById('exit-presenter-btn');
const presenterMainSlide = document.getElementById('presenter-main-slide');
const nextSlideViewport = document.getElementById('next-slide-viewport');
const presenterNotesText = document.getElementById('presenter-notes-text');
const presenterDeckTitle = document.getElementById('presenter-deck-title');
const presenterSlideNum = document.getElementById('presenter-slide-num');
const presenterTimerDisplay = document.getElementById('presenter-timer-display');
const presenterTimerToggle = document.getElementById('presenter-timer-toggle');
const presenterTimerReset = document.getElementById('presenter-timer-reset');
const presenterPrev = document.getElementById('presenter-prev');
const presenterNext = document.getElementById('presenter-next');

let presenterTimerSeconds = 0;
let presenterTimerInterval = null;
let isTimerRunning = false;

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    renderTemplates();
    setupEventListeners();
    initIconPicker();
    updateEngineUI();
});

function setupEventListeners() {
    // Tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const target = btn.dataset.tab;
            document.getElementById(target).classList.add('active');
            state.activeTab = target;
        });
    });

    // Topic Inspiration Pills
    document.querySelectorAll('.pill-btn').forEach(pill => {
        pill.addEventListener('click', () => {
            state.title = pill.dataset.topic;
            state.subtitle = pill.dataset.subtitle;
            state.persona = pill.dataset.persona;
            document.getElementById('presentation-title').value = state.title;
            document.getElementById('presentation-subtitle').value = state.subtitle;
            document.getElementById('deck-persona').value = state.persona;
        });
    });

    // Form inputs
    document.getElementById('presentation-title').addEventListener('input', (e) => state.title = e.target.value);
    document.getElementById('presentation-subtitle').addEventListener('input', (e) => state.subtitle = e.target.value);
    document.getElementById('slide-count').addEventListener('input', (e) => state.slideCount = Math.max(1, Math.min(20, parseInt(e.target.value) || 5)));
    document.getElementById('deck-persona').addEventListener('change', (e) => state.persona = e.target.value);
    document.getElementById('generate-notes-chk').addEventListener('change', (e) => state.generateNotes = e.target.checked);
    document.getElementById('auto-layout-chk').addEventListener('change', (e) => state.autoSmartLayouts = e.target.checked);
    document.getElementById('presentation-content').addEventListener('input', (e) => state.content = e.target.value);

    // Visuals Toggle & Style Select
    generateVisualsChk.addEventListener('change', (e) => {
        state.generateVisuals = e.target.checked;
        visualStyleContainer.style.display = e.target.checked ? 'block' : 'none';
    });
    visualStyleSelect.addEventListener('change', (e) => state.visualStyle = e.target.value);

    // Main Actions
    generateBtn.addEventListener('click', generatePresentation);
    regenerateBtn.addEventListener('click', remixTheme);
    downloadBtn.addEventListener('click', downloadPPT);
    presentBtn.addEventListener('click', launchPresenterMode);

    // Export Dropdown
    exportMoreBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        exportMenu.style.display = exportMenu.style.display === 'none' ? 'block' : 'none';
    });
    document.addEventListener('click', () => exportMenu.style.display = 'none');
    exportPptxItem.addEventListener('click', downloadPPT);
    exportPdfItem.addEventListener('click', exportToPDF);
    exportHtmlItem.addEventListener('click', exportToHTML);

    // Slide Navigation
    prevSlideBtn.addEventListener('click', () => navigateSlide(-1));
    nextSlideBtn.addEventListener('click', () => navigateSlide(1));

    // Studio Toolbar Controls
    slideLayoutSelect.addEventListener('change', handleLayoutChange);
    customAccentColor.addEventListener('input', handleAccentColorChange);
    moveSlideLeftBtn.addEventListener('click', () => moveActiveSlide(-1));
    moveSlideRightBtn.addEventListener('click', () => moveActiveSlide(1));
    duplicateSlideBtn.addEventListener('click', duplicateActiveSlide);
    addNewSlideBtn.addEventListener('click', addNewBlankSlide);
    deleteSlideBtn.addEventListener('click', deleteActiveSlide);
    editVisualBtn.addEventListener('click', openVisualEditor);

    // Visual Editor Modal Controls
    closeVisualModalBtn.addEventListener('click', () => visualEditModal.style.display = 'none');
    modalVisualTypeSelect.addEventListener('change', (e) => {
        const val = e.target.value;
        modalDiagramSection.style.display = val === 'diagram' ? 'block' : 'none';
        modalCustomImageSection.style.display = val === 'custom-image' ? 'block' : 'none';
    });
    saveVisualBtn.addEventListener('click', applyVisualEdit);
    modalImageFile.addEventListener('change', handleModalImageUpload);

    // Notes Drawer
    toggleNotesBtn.addEventListener('click', () => {
        const isHidden = speakerNotesDrawer.style.display === 'none';
        speakerNotesDrawer.style.display = isHidden ? 'block' : 'none';
    });

    speakerNotesContent.addEventListener('blur', () => {
        if (state.currentSlideIndex > 0) {
            state.generatedSlides[state.currentSlideIndex - 1].speakerNotes = speakerNotesContent.innerText;
        }
    });

    insertSampleBtn.addEventListener('click', insertSampleContent);

    // AI Settings Modal
    aiSettingsBtn.addEventListener('click', () => aiSettingsModal.style.display = 'flex');
    closeModalBtn.addEventListener('click', () => aiSettingsModal.style.display = 'none');
    testOllamaBtn.addEventListener('click', testOllamaConnection);
    saveEngineSettingsBtn.addEventListener('click', saveEngineSettings);

    // Icon Picker Modal
    closeIconModalBtn.addEventListener('click', () => iconPickerModal.style.display = 'none');

    // PPTX Upload
    fileUpload.addEventListener('change', handleFileUpload);
    dropZone.addEventListener('dragover', (e) => { e.preventDefault(); dropZone.classList.add('drag-over'); });
    dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'));
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        if (e.dataTransfer.files.length > 0) handleFileUpload({ target: { files: e.dataTransfer.files } });
    });

    // Presenter Mode Controls
    exitPresenterBtn.addEventListener('click', exitPresenterMode);
    presenterPrev.addEventListener('click', () => navigatePresenterSlide(-1));
    presenterNext.addEventListener('click', () => navigatePresenterSlide(1));
    presenterTimerToggle.addEventListener('click', togglePresenterTimer);
    presenterTimerReset.addEventListener('click', resetPresenterTimer);

    // Global Keybindings
    document.addEventListener('keydown', (e) => {
        if (presenterOverlay.style.display !== 'none') {
            if (e.key === 'Escape') exitPresenterMode();
            else if (e.key === 'ArrowRight' || e.key === ' ') navigatePresenterSlide(1);
            else if (e.key === 'ArrowLeft') navigatePresenterSlide(-1);
            return;
        }

        if (state.generatedSlides.length === 0 || document.activeElement.getAttribute('contenteditable') === 'true') return;
        if (e.key === 'ArrowRight' || e.key === 'PageDown') navigateSlide(1);
        else if (e.key === 'ArrowLeft' || e.key === 'PageUp') navigateSlide(-1);
    });
}

function updateEngineUI() {
    const labels = {
        ollama: `Ollama (${state.ollamaModel})`,
        webgpu: `WebGPU (${state.webgpuModel.split('-')[0]})`,
        'chrome-ai': 'Chrome AI',
        heuristic: 'Local Fast Engine'
    };
    currentEngineLabel.textContent = labels[state.activeEngine] || 'Local Engine';
    activeEngineBadge.innerHTML = `<i class="fa-solid fa-microchip"></i> ${labels[state.activeEngine] || 'Local Engine'}`;
}

function saveEngineSettings() {
    const selected = document.querySelector('input[name="local-ai-engine"]:checked');
    if (selected) {
        state.activeEngine = selected.value;
        state.ollamaUrl = document.getElementById('ollama-url').value.trim();
        state.ollamaModel = document.getElementById('ollama-model-select').value;
        state.webgpuModel = document.getElementById('webgpu-model-select').value;

        localStorage.setItem('slidegen_engine', state.activeEngine);
        localStorage.setItem('slidegen_ollama_url', state.ollamaUrl);
        localStorage.setItem('slidegen_ollama_model', state.ollamaModel);
        localStorage.setItem('slidegen_webgpu_model', state.webgpuModel);

        updateEngineUI();
        aiSettingsModal.style.display = 'none';
    }
}

async function testOllamaConnection() {
    const url = document.getElementById('ollama-url').value.trim();
    const statusSpan = document.getElementById('ollama-connection-status');
    const modelSelect = document.getElementById('ollama-model-select');

    statusSpan.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Connecting to ${url}...`;
    statusSpan.style.color = '#818cf8';

    try {
        const res = await fetch(`${url.replace(/\/$/, '')}/api/tags`);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        
        if (Array.isArray(data.models) && data.models.length > 0) {
            modelSelect.innerHTML = '';
            data.models.forEach(m => {
                const opt = document.createElement('option');
                opt.value = m.name;
                opt.textContent = `${m.name} (${(m.size / (1024*1024*1024)).toFixed(1)} GB)`;
                modelSelect.appendChild(opt);
            });
            statusSpan.innerHTML = `<i class="fa-solid fa-circle-check"></i> Connected! Found ${data.models.length} local models.`;
            statusSpan.style.color = '#34d399';
        } else {
            statusSpan.innerHTML = `<i class="fa-solid fa-circle-check"></i> Connected to Ollama (Pull models via 'ollama pull llama3.2')`;
            statusSpan.style.color = '#34d399';
        }
    } catch (e) {
        statusSpan.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Connection failed (${e.message}). Ensure Ollama is running.`;
        statusSpan.style.color = '#f87171';
    }
}

function initIconPicker() {
    iconPickerGrid.innerHTML = '';
    iconLibrary.forEach(iconClass => {
        const btn = document.createElement('button');
        btn.className = 'icon-picker-btn';
        btn.innerHTML = `<i class="fa-solid ${iconClass}"></i>`;
        btn.onclick = () => {
            if (state.selectedIconTarget) {
                state.selectedIconTarget.iconClass = iconClass;
                renderPreview();
            }
            iconPickerModal.style.display = 'none';
        };
        iconPickerGrid.appendChild(btn);
    });
}

function insertSampleContent() {
    state.title = "The Future of AI in Healthcare";
    state.subtitle = "Strategic Analysis & Diagnostic Innovation";
    state.slideCount = 5;
    state.content = `Executive Summary & Vision:
Artificial intelligence accelerates diagnostics and clinical workflows
Expert-level accuracy achieved in radiology and pathology imaging
Real-time diagnostic support reduces patient critical wait times

Core Solution Architecture:
Generative AI transforms complex physician notes into structured records
Predictive algorithms flag high-risk cardiac events 48 hours in advance
Privacy-preserving federated models enable multi-hospital research

Clinical Performance Metrics:
99.4% Diagnostic accuracy benchmark across multi-center trials
12x Accelerated triage turnaround in emergency departments
-40% Reduction in administrative documentation overhead

Roadmap & Milestones:
Phase 1: Pilot on-device triage models in key radiology departments
Phase 2: Expand automated clinical summarization across inpatient wards
Phase 3: Nationwide multi-hospital secure federated network

Executive Takeaway:
On-device AI guarantees 100% patient HIPAA privacy while driving clinical excellence.`;

    document.getElementById('presentation-title').value = state.title;
    document.getElementById('presentation-subtitle').value = state.subtitle;
    document.getElementById('slide-count').value = state.slideCount;
    document.getElementById('presentation-content').value = state.content;
}

// ==========================================
// 🚀 PRESENTATION GENERATION
// ==========================================

async function generatePresentation() {
    state.title = document.getElementById('presentation-title').value.trim() || "Untitled Presentation";
    state.subtitle = document.getElementById('presentation-subtitle').value.trim() || "";
    state.slideCount = parseInt(document.getElementById('slide-count').value) || 5;
    state.content = document.getElementById('presentation-content').value.trim();

    aiStatusContainer.style.display = 'block';
    generateBtn.disabled = true;
    generateBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Synthesizing On Your Hardware...`;

    try {
        const slides = await LocalAIManager.generatePresentation({
            title: state.title,
            subtitle: state.subtitle,
            slideCount: state.slideCount,
            content: state.content || state.title,
            persona: state.persona,
            generateNotes: state.generateNotes
        }, (p) => {
            aiStatusMessage.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> ${p.message}`;
            aiStatusPercent.textContent = `${p.percent}%`;
            aiProgressBar.style.width = `${p.percent}%`;
        });

        state.generatedSlides = slides;

        if (!state.currentTheme) {
            state.currentTheme = themes[0];
        }

        renderPreview();
        renderThumbnails();
        
        // Enable Controls
        regenerateBtn.disabled = false;
        downloadBtn.disabled = false;
        exportMoreBtn.disabled = false;
        presentBtn.disabled = false;
        slideNav.style.display = 'flex';
        studioToolbar.style.display = 'flex';
        thumbnailsStrip.style.display = 'flex';
        
        state.currentSlideIndex = 0;
        updateSlideVisibility();

        document.querySelector('.preview-panel').scrollIntoView({ behavior: 'smooth' });

    } catch (error) {
        console.error("Presentation generation error:", error);
        alert("Error during local synthesis: " + error.message);
    } finally {
        aiStatusContainer.style.display = 'none';
        generateBtn.disabled = false;
        generateBtn.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles"></i> Generate Presentation Locally`;
    }
}

function remixTheme() {
    if (state.generatedSlides.length === 0) return;
    const otherThemes = themes.filter(t => t.id !== state.currentTheme?.id);
    const random = otherThemes[Math.floor(Math.random() * otherThemes.length)];
    applyTheme(random);
}

function handleAccentColorChange(e) {
    const newColor = e.target.value;
    if (state.currentTheme) {
        state.currentTheme.accent = newColor;
        accentSwatchPreview.style.backgroundColor = newColor;
        renderPreview();
        renderThumbnails();
    }
}

// ==========================================
// 🖥️ STUDIO PREVIEW & INLINE EDITING
// ==========================================

function renderTemplates() {
    const grid = document.getElementById('templates-grid');
    grid.innerHTML = '';
    
    themes.forEach(theme => {
        const card = document.createElement('div');
        card.className = 'template-card';
        card.onclick = () => applyTheme(theme);
        
        card.innerHTML = `
            <div class="template-preview" style="background: ${theme.background}; color: ${theme.color}; font-family: ${theme.font};">
                <div style="text-align: ${theme.titleAlign}; width: 100%;">
                    <h4 style="color: ${theme.accent}; margin-bottom: 0.4rem; font-size: 1rem;">${theme.name}</h4>
                    <div style="height: 3px; width: 36px; background: ${theme.accent}; display: inline-block; border-radius: 2px;"></div>
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
    state.currentTheme = { ...theme };
    customAccentColor.value = theme.accent.startsWith('#') ? theme.accent : '#6366f1';
    accentSwatchPreview.style.backgroundColor = theme.accent;

    document.querySelectorAll('.template-card').forEach((c, i) => {
        c.classList.toggle('active-theme', themes[i].id === theme.id);
    });

    if (state.generatedSlides.length > 0) {
        renderPreview();
        renderThumbnails();
        updateSlideVisibility();
    }
}

function renderPreview() {
    previewViewport.innerHTML = '';
    const theme = state.currentTheme || themes[0];

    // 1. Title Slide
    const titleSlide = createSlideElement(theme);
    titleSlide.innerHTML = `
        <div class="slide-content-wrapper" style="text-align: ${theme.titleAlign}">
            <h1 contenteditable="true" data-field="deck-title" style="color: ${theme.accent}">${state.title}</h1>
            <h2 contenteditable="true" data-field="deck-subtitle" style="color: ${theme.color}">${state.subtitle}</h2>
            ${getDecorativeElement(theme)}
        </div>
    `;
    previewViewport.appendChild(titleSlide);

    // 2. Content Slides with Multi-Layout HTML
    state.generatedSlides.forEach((slide, idx) => {
        const slideEl = createSlideElement(theme);
        slideEl.dataset.slideIndex = idx;
        const layout = slide.layout || 'standard';
        slideEl.classList.add(`layout-${layout}`);

        let bodyHtml = '';

        if (layout === 'diagram') {
            // Architecture & Flow Diagram (Mermaid)
            const diagramId = `mermaid-diagram-${idx}`;
            bodyHtml = `
                <div class="slide-body-area">
                    <div class="slide-diagram-wrapper" id="diagram-wrap-${idx}">
                        <div class="diagram-mermaid-output" id="${diagramId}">
                            <!-- Rendered SVG will be placed here -->
                        </div>
                    </div>
                    <div class="diagram-bullets-area">
                        <ul style="color: ${theme.color};">
                            ${(slide.bullets || []).map((b, bIdx) => `<li contenteditable="true" data-slide="${idx}" data-bullet="${bIdx}">${b}</li>`).join('')}
                        </ul>
                        <div class="slide-callout" contenteditable="true" data-slide="${idx}" data-field="callout" style="border-color: ${theme.accent}; color: ${theme.color};">
                            ${slide.callout}
                        </div>
                    </div>
                </div>
            `;

        } else if (layout === 'image-split') {
            // Image / Visual Feature Split
            const visualHtml = slide.customImageUrl 
                ? `<img src="${slide.customImageUrl}" alt="Slide Visual">` 
                : generateProceduralVectorArt(theme.accent, idx + 1);

            bodyHtml = `
                <div class="slide-body-area">
                    <div class="slide-image-box">
                        ${visualHtml}
                        <div class="image-badge-tag"><i class="fa-solid fa-sparkles"></i> AI Visual</div>
                    </div>
                    <div class="slide-bullets-area">
                        <ul style="color: ${theme.color};">
                            ${(slide.bullets || []).map((b, bIdx) => `<li contenteditable="true" data-slide="${idx}" data-bullet="${bIdx}">${b}</li>`).join('')}
                        </ul>
                        <div class="slide-callout" contenteditable="true" data-slide="${idx}" data-field="callout" style="border-color: ${theme.accent}; color: ${theme.color};">
                            ${slide.callout}
                        </div>
                    </div>
                </div>
            `;

        } else if (layout === 'bento') {
            // Bento Grid
            const cardsHtml = (slide.bentoCards || []).map((card, cIdx) => `
                <div class="bento-card ${cIdx === 0 ? 'featured' : ''}">
                    <div class="bento-header" style="color: ${theme.accent};">
                        <i class="fa-solid ${card.icon || 'fa-bolt'} editable-icon" data-slide="${idx}" data-bento="${cIdx}" title="Click to swap icon"></i>
                        <span contenteditable="true" data-slide="${idx}" data-bento="${cIdx}" data-bfield="title">${card.title}</span>
                    </div>
                    <div class="bento-body" contenteditable="true" data-slide="${idx}" data-bento="${cIdx}" data-bfield="desc" style="color: ${theme.color};">
                        ${card.desc}
                    </div>
                </div>
            `).join('');

            bodyHtml = `<div class="slide-body-area">${cardsHtml}</div>`;

        } else if (layout === 'kpi') {
            // KPI / Stats
            const kpiHtml = (slide.kpis || []).map((kpi, kIdx) => `
                <div class="kpi-card">
                    <div class="kpi-number" contenteditable="true" data-slide="${idx}" data-kpi="${kIdx}" data-kfield="number" style="color: ${theme.accent};">${kpi.number}</div>
                    <div class="kpi-label" contenteditable="true" data-slide="${idx}" data-kpi="${kIdx}" data-kfield="label" style="color: ${theme.color};">${kpi.label}</div>
                    <div class="kpi-context" contenteditable="true" data-slide="${idx}" data-kpi="${kIdx}" data-kfield="context" style="color: ${theme.color};">${kpi.context}</div>
                </div>
            `).join('');

            bodyHtml = `<div class="slide-body-area">${kpiHtml}</div>`;

        } else if (layout === 'chart') {
            // Native Interactive Chart Layout
            const canvasId = `chart-canvas-${idx}`;
            bodyHtml = `
                <div class="slide-body-area">
                    <div class="chart-canvas-container">
                        <canvas id="${canvasId}"></canvas>
                    </div>
                    <div class="chart-stats-list">
                        <ul style="color: ${theme.color};">
                            ${(slide.bullets || []).map((b, bIdx) => `<li contenteditable="true" data-slide="${idx}" data-bullet="${bIdx}">${b}</li>`).join('')}
                        </ul>
                        <div class="slide-callout" contenteditable="true" data-slide="${idx}" data-field="callout" style="border-color: ${theme.accent}; color: ${theme.color};">
                            ${slide.callout}
                        </div>
                    </div>
                </div>
            `;

        } else if (layout === 'timeline') {
            // Timeline / Process
            const timelineHtml = (slide.timelineSteps || []).map((t, tIdx) => `
                <div class="timeline-step">
                    <div class="timeline-step-badge" style="background: ${theme.accent};">${tIdx + 1}</div>
                    <div class="timeline-step-title" contenteditable="true" data-slide="${idx}" data-timeline="${tIdx}" data-tfield="title" style="color: ${theme.accent};">${t.title}</div>
                    <div class="timeline-step-desc" contenteditable="true" data-slide="${idx}" data-timeline="${tIdx}" data-tfield="desc" style="color: ${theme.color};">${t.desc}</div>
                </div>
            `).join('');

            bodyHtml = `<div class="slide-body-area">${timelineHtml}</div>`;

        } else if (layout === 'team') {
            // Team & Leadership
            const teamHtml = (slide.teamMembers || []).map((tm, tmIdx) => `
                <div class="team-card">
                    <div class="team-avatar" style="background: ${theme.accent};">
                        ${tm.name.split(' ').map(n=>n[0]).join('').substring(0,2)}
                    </div>
                    <div class="team-name" contenteditable="true" data-slide="${idx}" data-team="${tmIdx}" data-mfield="name" style="color: ${theme.accent};">${tm.name}</div>
                    <div class="team-role" contenteditable="true" data-slide="${idx}" data-team="${tmIdx}" data-mfield="role" style="color: ${theme.color};">${tm.role}</div>
                    <div class="team-bio" contenteditable="true" data-slide="${idx}" data-team="${tmIdx}" data-mfield="bio" style="color: ${theme.color};">${tm.bio}</div>
                </div>
            `).join('');

            bodyHtml = `<div class="slide-body-area">${teamHtml}</div>`;

        } else if (layout === 'comparison') {
            // Comparison Matrix
            const comp = slide.comparison || { col1Title: "Traditional", col1Items: ["Manual effort"], col2Title: "Modern", col2Items: ["Automated"] };
            bodyHtml = `
                <div class="slide-body-area">
                    <div class="comparison-col">
                        <div class="comparison-title" contenteditable="true" data-slide="${idx}" data-comp="title1" style="color: ${theme.color};"><i class="fa-solid fa-clock"></i> ${comp.col1Title}</div>
                        <ul style="color: ${theme.color};">
                            ${(comp.col1Items || []).map((item, iIdx) => `<li contenteditable="true" data-slide="${idx}" data-compitem="col1-${iIdx}">${item}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="comparison-col highlighted">
                        <div class="comparison-title" contenteditable="true" data-slide="${idx}" data-comp="title2" style="color: ${theme.accent};"><i class="fa-solid fa-sparkles"></i> ${comp.col2Title}</div>
                        <ul style="color: ${theme.color};">
                            ${(comp.col2Items || []).map((item, iIdx) => `<li contenteditable="true" data-slide="${idx}" data-compitem="col2-${iIdx}">${item}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;

        } else if (layout === 'quote') {
            // Quote / Mission
            bodyHtml = `
                <div class="slide-body-area">
                    <div class="quote-text" contenteditable="true" data-slide="${idx}" data-field="quote" style="color: ${theme.accent};">"${slide.bullets[0] || slide.callout}"</div>
                    <div class="quote-author" contenteditable="true" data-slide="${idx}" data-field="author" style="color: ${theme.color};">— ${state.subtitle || 'Executive Summary'}</div>
                </div>
            `;

        } else {
            // Standard / Split / Sidebar / Centered
            const bulletsHtml = (slide.bullets || []).map((b, bIdx) => `<li contenteditable="true" data-slide="${idx}" data-bullet="${bIdx}">${b}</li>`).join('');
            const calloutHtml = slide.callout ? `<div class="slide-callout" contenteditable="true" data-slide="${idx}" data-field="callout" style="border-color: ${theme.accent}; color: ${theme.color};">${slide.callout}</div>` : '';

            bodyHtml = `
                <div class="slide-body-area">
                    <ul style="color: ${theme.color};">${bulletsHtml}</ul>
                    ${calloutHtml}
                </div>
            `;
        }

        slideEl.innerHTML = `
            <div class="slide-header-area">
                <h1 contenteditable="true" data-slide="${idx}" data-field="title" style="color: ${theme.accent}; font-size: 1.9rem;">${slide.title}</h1>
            </div>
            ${bodyHtml}
            ${getDecorativeElement(theme, true)}
        `;

        previewViewport.appendChild(slideEl);

        // Render Mermaid Diagram asynchronously
        if (layout === 'diagram') {
            renderMermaidDiagram(`mermaid-diagram-${idx}`, slide.diagramCode || generateContextualMermaidDiagram(slide.title, state.title));
        }

        // Render Chart canvas if chart layout
        if (layout === 'chart') {
            renderChartCanvas(`chart-canvas-${idx}`, slide.chartData || { labels: ["Q1", "Q2", "Q3", "Q4"], values: [20, 45, 75, 120], metricLabel: "Metric" }, theme.accent);
        }
    });

    attachInlineEditListeners();
}

async function renderMermaidDiagram(elementId, diagramCode) {
    if (!window.mermaid) return;
    try {
        const cleanCode = diagramCode.trim();
        const { svg } = await window.mermaid.render(`svg-${elementId}-${Date.now()}`, cleanCode);
        const container = document.getElementById(elementId);
        if (container) {
            container.innerHTML = svg;
        }
    } catch (e) {
        console.warn("Mermaid render error:", e);
        const container = document.getElementById(elementId);
        if (container) {
            container.innerHTML = `<div style="color:#ef4444; font-size:0.75rem; text-align:center;">⚠️ Diagram Syntax Error. Click 'Edit Visual' to tweak code.</div>`;
        }
    }
}

function renderChartCanvas(canvasId, chartData, accentColor) {
    setTimeout(() => {
        const canvas = document.getElementById(canvasId);
        if (!canvas) return;
        new Chart(canvas, {
            type: chartData.type || 'bar',
            data: {
                labels: chartData.labels || ["Q1", "Q2", "Q3", "Q4"],
                datasets: [{
                    label: chartData.metricLabel || "Metric Trend",
                    data: chartData.values || [20, 45, 75, 120],
                    backgroundColor: accentColor,
                    borderColor: accentColor,
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    x: { grid: { display: false } },
                    y: { grid: { color: 'rgba(0,0,0,0.06)' } }
                }
            }
        });
    }, 50);
}

function createSlideElement(theme) {
    const el = document.createElement('div');
    el.className = 'slide-preview hidden';
    el.style.background = theme.background;
    el.style.fontFamily = theme.font;
    el.style.color = theme.color;
    return el;
}

function getDecorativeElement(theme, isSmall = false) {
    if (theme.shapes === 'none') return '';
    let style = '';
    if (theme.shapes === 'circle') {
        style = `position: absolute; bottom: -40px; right: -40px; width: ${isSmall ? '130px' : '240px'}; height: ${isSmall ? '130px' : '240px'}; background: ${theme.accent}; border-radius: 50%; opacity: 0.18; pointer-events: none;`;
    } else if (theme.shapes === 'rect') {
        style = `position: absolute; top: 0; left: 0; width: 14px; height: 100%; background: ${theme.accent};`;
    } else if (theme.shapes === 'line') {
        style = `position: absolute; bottom: 20px; left: 50%; transform: translateX(-50%); width: 85%; height: 3px; background: ${theme.accent}; opacity: 0.6;`;
    } else if (theme.shapes === 'blob') {
        style = `position: absolute; top: -30px; right: -30px; width: ${isSmall ? '120px' : '200px'}; height: ${isSmall ? '120px' : '200px'}; background: ${theme.accent}; border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%; opacity: 0.15; pointer-events: none;`;
    }
    return `<div style="${style}"></div>`;
}

// Inline WYSIWYG Sync & Icon Click Handler
function attachInlineEditListeners() {
    previewViewport.querySelectorAll('[contenteditable="true"]').forEach(elem => {
        elem.addEventListener('blur', () => {
            const slideIdx = elem.dataset.slide !== undefined ? parseInt(elem.dataset.slide) : null;
            const text = elem.innerText.trim();

            if (elem.dataset.field === 'deck-title') {
                state.title = text;
                document.getElementById('presentation-title').value = text;
            } else if (elem.dataset.field === 'deck-subtitle') {
                state.subtitle = text;
                document.getElementById('presentation-subtitle').value = text;
            } else if (slideIdx !== null && state.generatedSlides[slideIdx]) {
                const s = state.generatedSlides[slideIdx];
                if (elem.dataset.field === 'title') s.title = text;
                else if (elem.dataset.field === 'callout') s.callout = text;
                else if (elem.dataset.bullet !== undefined) s.bullets[parseInt(elem.dataset.bullet)] = text;
                else if (elem.dataset.bento !== undefined) s.bentoCards[parseInt(elem.dataset.bento)][elem.dataset.bfield] = text;
                else if (elem.dataset.kpi !== undefined) s.kpis[parseInt(elem.dataset.kpi)][elem.dataset.kfield] = text;
                else if (elem.dataset.timeline !== undefined) s.timelineSteps[parseInt(elem.dataset.timeline)][elem.dataset.tfield] = text;
                else if (elem.dataset.team !== undefined) s.teamMembers[parseInt(elem.dataset.team)][elem.dataset.mfield] = text;
            }
            renderThumbnails();
        });
    });

    // Icon Picker Triggers
    previewViewport.querySelectorAll('.editable-icon').forEach(iconElem => {
        iconElem.addEventListener('click', (e) => {
            e.stopPropagation();
            const slideIdx = parseInt(iconElem.dataset.slide);
            const bentoIdx = parseInt(iconElem.dataset.bento);
            state.selectedIconTarget = state.generatedSlides[slideIdx].bentoCards[bentoIdx];
            iconPickerModal.style.display = 'flex';
        });
    });
}

// ==========================================
// 🎞️ SLIDE STUDIO TOOLBAR & THUMBNAILS
// ==========================================

function renderThumbnails() {
    thumbnailsStrip.innerHTML = '';
    
    // Title Slide Thumbnail
    const titleThumb = createThumbCard(0, state.title, 'Title Slide');
    thumbnailsStrip.appendChild(titleThumb);

    // Content Slides
    state.generatedSlides.forEach((slide, idx) => {
        const card = createThumbCard(idx + 1, slide.title, slide.layout || 'standard');
        thumbnailsStrip.appendChild(card);
    });

    updateThumbnailActiveState();
}

function createThumbCard(index, title, layoutTag) {
    const card = document.createElement('div');
    card.className = 'thumb-card';
    card.dataset.index = index;
    card.onclick = () => {
        state.currentSlideIndex = index;
        updateSlideVisibility();
    };

    card.innerHTML = `
        <span class="thumb-num">${index + 1}</span>
        <span class="thumb-title">${title || 'Slide ' + (index + 1)}</span>
        <span class="thumb-layout-tag">${layoutTag}</span>
    `;
    return card;
}

function updateThumbnailActiveState() {
    thumbnailsStrip.querySelectorAll('.thumb-card').forEach((card, idx) => {
        card.classList.toggle('active', idx === state.currentSlideIndex);
    });
}

function handleLayoutChange(e) {
    if (state.currentSlideIndex === 0) return;
    const activeSlide = state.generatedSlides[state.currentSlideIndex - 1];
    if (activeSlide) {
        activeSlide.layout = e.target.value;
        if (activeSlide.layout === 'diagram' && !activeSlide.diagramCode) {
            activeSlide.diagramCode = generateContextualMermaidDiagram(activeSlide.title, state.title);
        }
        renderPreview();
        renderThumbnails();
        updateSlideVisibility();
    }
}

function openVisualEditor() {
    if (state.currentSlideIndex === 0) {
        alert("Select a content slide to edit its visuals or diagram.");
        return;
    }
    state.activeEditingVisualSlideIdx = state.currentSlideIndex - 1;
    const slide = state.generatedSlides[state.activeEditingVisualSlideIdx];
    
    modalMermaidCode.value = slide.diagramCode || generateContextualMermaidDiagram(slide.title, state.title);
    modalImageUrl.value = slide.customImageUrl || "";

    if (slide.layout === 'diagram') {
        modalVisualTypeSelect.value = 'diagram';
        modalDiagramSection.style.display = 'block';
        modalCustomImageSection.style.display = 'none';
    } else if (slide.customImageUrl) {
        modalVisualTypeSelect.value = 'custom-image';
        modalDiagramSection.style.display = 'none';
        modalCustomImageSection.style.display = 'block';
    } else {
        modalVisualTypeSelect.value = 'procedural';
        modalDiagramSection.style.display = 'none';
        modalCustomImageSection.style.display = 'none';
    }

    visualEditModal.style.display = 'flex';
}

function applyVisualEdit() {
    if (state.activeEditingVisualSlideIdx === null) return;
    const slide = state.generatedSlides[state.activeEditingVisualSlideIdx];
    const visualType = modalVisualTypeSelect.value;

    if (visualType === 'diagram') {
        slide.layout = 'diagram';
        slide.diagramCode = modalMermaidCode.value.trim();
    } else if (visualType === 'custom-image') {
        slide.layout = 'image-split';
        slide.customImageUrl = modalImageUrl.value.trim();
    } else {
        slide.layout = 'image-split';
        slide.customImageUrl = "";
    }

    renderPreview();
    renderThumbnails();
    updateSlideVisibility();
    visualEditModal.style.display = 'none';
}

function handleModalImageUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
        modalImageUrl.value = ev.target.result;
    };
    reader.readAsDataURL(file);
}

function moveActiveSlide(offset) {
    if (state.currentSlideIndex === 0) return;
    const currentIndex = state.currentSlideIndex - 1;
    const newIndex = currentIndex + offset;

    if (newIndex >= 0 && newIndex < state.generatedSlides.length) {
        const temp = state.generatedSlides[currentIndex];
        state.generatedSlides[currentIndex] = state.generatedSlides[newIndex];
        state.generatedSlides[newIndex] = temp;
        state.currentSlideIndex = newIndex + 1;

        renderPreview();
        renderThumbnails();
        updateSlideVisibility();
    }
}

function duplicateActiveSlide() {
    if (state.currentSlideIndex === 0) return;
    const slideToCopy = state.generatedSlides[state.currentSlideIndex - 1];
    const copy = JSON.parse(JSON.stringify(slideToCopy));
    copy.title = `${copy.title} (Copy)`;
    state.generatedSlides.splice(state.currentSlideIndex, 0, copy);
    renderPreview();
    renderThumbnails();
    navigateSlide(1);
}

function addNewBlankSlide() {
    const newSlide = {
        title: "New Strategic Slide",
        layout: "standard",
        bullets: ["Point 1: Key observation", "Point 2: Core strategic impact", "Point 3: Planned execution path"],
        callout: "Key Takeaway: Actionable execution.",
        speakerNotes: "Speaker notes for this new slide."
    };
    state.generatedSlides.splice(state.currentSlideIndex, 0, newSlide);
    renderPreview();
    renderThumbnails();
    navigateSlide(1);
}

function deleteActiveSlide() {
    if (state.currentSlideIndex === 0) {
        alert("Cannot delete the title slide.");
        return;
    }
    if (state.generatedSlides.length <= 1) {
        alert("Deck must have at least one content slide.");
        return;
    }
    state.generatedSlides.splice(state.currentSlideIndex - 1, 1);
    if (state.currentSlideIndex > state.generatedSlides.length) {
        state.currentSlideIndex = state.generatedSlides.length;
    }
    renderPreview();
    renderThumbnails();
    updateSlideVisibility();
}

function navigateSlide(direction) {
    const totalSlides = state.generatedSlides.length + 1;
    let newIndex = state.currentSlideIndex + direction;
    if (newIndex < 0) newIndex = 0;
    if (newIndex >= totalSlides) newIndex = totalSlides - 1;
    state.currentSlideIndex = newIndex;
    updateSlideVisibility();
}

function updateSlideVisibility() {
    const slides = previewViewport.querySelectorAll('.slide-preview');
    slides.forEach((slide, index) => {
        slide.classList.toggle('hidden', index !== state.currentSlideIndex);
    });

    slideCounter.textContent = `${state.currentSlideIndex + 1} / ${slides.length}`;
    prevSlideBtn.disabled = state.currentSlideIndex === 0;
    nextSlideBtn.disabled = state.currentSlideIndex === slides.length - 1;

    updateThumbnailActiveState();

    if (state.currentSlideIndex === 0) {
        slideLayoutSelect.value = 'standard';
        slideLayoutSelect.disabled = true;
        moveSlideLeftBtn.disabled = true;
        moveSlideRightBtn.disabled = true;
        editVisualBtn.disabled = true;
    } else {
        slideLayoutSelect.disabled = false;
        editVisualBtn.disabled = false;
        const currentSlide = state.generatedSlides[state.currentSlideIndex - 1];
        slideLayoutSelect.value = currentSlide?.layout || 'standard';
        moveSlideLeftBtn.disabled = state.currentSlideIndex === 1;
        moveSlideRightBtn.disabled = state.currentSlideIndex === state.generatedSlides.length;
    }

    // Sync Speaker Notes
    if (state.currentSlideIndex === 0) {
        speakerNotesContent.innerText = `Title Slide: Introduce "${state.title}" and context.`;
    } else {
        const slideData = state.generatedSlides[state.currentSlideIndex - 1];
        speakerNotesContent.innerText = slideData?.speakerNotes || "No presenter notes for this slide.";
    }
}

// ==========================================
// 🎤 PRESENTER CONSOLE MODE
// ==========================================

function launchPresenterMode() {
    presenterOverlay.style.display = 'flex';
    presenterDeckTitle.textContent = state.title;
    startPresenterTimer();
    renderPresenterSlideView();
}

function exitPresenterMode() {
    presenterOverlay.style.display = 'none';
    stopPresenterTimer();
}

function renderPresenterSlideView() {
    const slides = previewViewport.querySelectorAll('.slide-preview');
    presenterSlideNum.textContent = `Slide ${state.currentSlideIndex + 1} of ${slides.length}`;

    presenterMainSlide.innerHTML = '';
    if (slides[state.currentSlideIndex]) {
        const clone = slides[state.currentSlideIndex].cloneNode(true);
        clone.classList.remove('hidden');
        presenterMainSlide.appendChild(clone);
    }

    nextSlideViewport.innerHTML = '';
    if (state.currentSlideIndex + 1 < slides.length) {
        const nextClone = slides[state.currentSlideIndex + 1].cloneNode(true);
        nextClone.classList.remove('hidden');
        nextClone.style.transform = 'scale(0.35)';
        nextClone.style.transformOrigin = 'center';
        nextSlideViewport.appendChild(nextClone);
    } else {
        nextSlideViewport.innerHTML = '<span style="color:#64748b; font-size:0.85rem;">End of Presentation</span>';
    }

    if (state.currentSlideIndex === 0) {
        presenterNotesText.textContent = `Title Slide: Welcome the audience to "${state.title}".`;
    } else {
        const slideData = state.generatedSlides[state.currentSlideIndex - 1];
        presenterNotesText.textContent = slideData?.speakerNotes || "No notes for this slide.";
    }

    presenterPrev.disabled = state.currentSlideIndex === 0;
    presenterNext.disabled = state.currentSlideIndex === slides.length - 1;
}

function navigatePresenterSlide(dir) {
    navigateSlide(dir);
    renderPresenterSlideView();
}

function startPresenterTimer() {
    if (!isTimerRunning) {
        isTimerRunning = true;
        presenterTimerInterval = setInterval(() => {
            presenterTimerSeconds++;
            const mins = String(Math.floor(presenterTimerSeconds / 60)).padStart(2, '0');
            const secs = String(presenterTimerSeconds % 60).padStart(2, '0');
            presenterTimerDisplay.textContent = `${mins}:${secs}`;
        }, 1000);
    }
}

function stopPresenterTimer() {
    isTimerRunning = false;
    clearInterval(presenterTimerInterval);
}

function togglePresenterTimer() {
    if (isTimerRunning) {
        stopPresenterTimer();
        presenterTimerToggle.innerHTML = '<i class="fa-solid fa-play"></i>';
    } else {
        startPresenterTimer();
        presenterTimerToggle.innerHTML = '<i class="fa-solid fa-pause"></i>';
    }
}

function resetPresenterTimer() {
    presenterTimerSeconds = 0;
    presenterTimerDisplay.textContent = '00:00';
}

// ==========================================
// 📥 MULTI-FORMAT EXPORT & DECOMPILER
// ==========================================

function exportToPDF() {
    window.print();
}

function exportToHTML() {
    const theme = state.currentTheme || themes[0];
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>${state.title} | SlideGen.AI Deck</title>
    <style>
        body { margin: 0; background: #0a0e1a; font-family: ${theme.font}, sans-serif; color: white; display: flex; flex-direction: column; align-items: center; padding: 2rem; }
        .slide { width: 900px; aspect-ratio: 16/9; background: ${theme.background}; color: ${theme.color}; border-radius: 12px; margin-bottom: 2rem; padding: 3rem; box-shadow: 0 20px 50px rgba(0,0,0,0.5); display: flex; flex-direction: column; justify-content: center; position: relative; }
        h1 { font-size: 2.2rem; color: ${theme.accent}; margin-bottom: 0.6rem; }
        ul { font-size: 1.15rem; line-height: 1.7; }
    </style>
</head>
<body>
    <div class="slide">
        <h1 style="color: ${theme.accent}">${state.title}</h1>
        <h2 style="color: ${theme.color}">${state.subtitle}</h2>
    </div>
    ${state.generatedSlides.map((s, i) => `
    <div class="slide">
        <h1 style="color: ${theme.accent}">${s.title}</h1>
        <ul style="color: ${theme.color}">${(s.bullets || []).map(b => `<li>${b}</li>`).join('')}</ul>
    </div>`).join('')}
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${(state.title || "presentation").replace(/[^a-z0-9]/gi, '_')}.html`;
    a.click();
    URL.revokeObjectURL(url);
}

// Native PptxGenJS Export Engine
function downloadPPT() {
    const pptx = new PptxGenJS();
    const theme = state.currentTheme || themes[0];

    const cleanHex = (colorStr, defaultHex) => {
        if (!colorStr) return defaultHex;
        if (colorStr.startsWith('#')) return colorStr.substring(1);
        if (colorStr.includes('gradient')) return '0f172a';
        return defaultHex;
    };

    const bgColor = cleanHex(theme.background, 'ffffff');
    const textColor = cleanHex(theme.color, '000000');
    const accentColor = cleanHex(theme.accent, '6366f1');

    // 1. Title Slide
    let slide = pptx.addSlide();
    slide.background = { color: bgColor };
    
    slide.addText(state.title, { 
        x: 0.8, y: '32%', w: '85%', h: 1.2, 
        fontSize: 42, color: accentColor, align: theme.titleAlign, fontFace: theme.font, bold: true
    });
    
    if (state.subtitle) {
        slide.addText(state.subtitle, { 
            x: 0.8, y: '48%', w: '85%', h: 0.8, 
            fontSize: 22, color: textColor, align: theme.titleAlign, fontFace: theme.font
        });
    }

    slide.addNotes(`Presentation: ${state.title}\nSubtitle: ${state.subtitle}\nGenerated 100% locally with SlideGen.AI Studio.`);

    // 2. Content Slides (Rich Layout Native PPTX Rendering)
    state.generatedSlides.forEach(s => {
        slide = pptx.addSlide();
        slide.background = { color: bgColor };

        if (s.speakerNotes) {
            slide.addNotes(s.speakerNotes);
        }

        const layout = s.layout || 'standard';

        slide.addText(s.title, { 
            x: 0.8, y: 0.5, w: '85%', h: 0.8, 
            fontSize: 30, color: accentColor, bold: true, fontFace: theme.font
        });

        if (layout === 'diagram') {
            // Diagram Layout in PPTX: Draw architecture card blocks
            slide.addShape(pptx.ShapeType.roundRect, {
                x: 0.8, y: 1.5, w: 4.6, h: 3.4,
                fill: { color: '0f172a' },
                line: { color: accentColor, width: 1.5 }
            });

            slide.addText("📊 System Flow & Architecture", {
                x: 1.0, y: 1.7, w: 4.2, h: 0.4,
                fontSize: 14, color: accentColor, bold: true, fontFace: theme.font
            });

            // Draw flow badges
            slide.addShape(pptx.ShapeType.rect, { x: 1.2, y: 2.3, w: 3.8, h: 0.6, fill: { color: '1e293b' }, line: { color: accentColor } });
            slide.addText("1. Ingestion & Analysis", { x: 1.2, y: 2.3, w: 3.8, h: 0.6, fontSize: 12, color: 'ffffff', align: 'center', valign: 'middle' });

            slide.addShape(pptx.ShapeType.rect, { x: 1.2, y: 3.1, w: 3.8, h: 0.6, fill: { color: '1e293b' }, line: { color: accentColor } });
            slide.addText("2. Neural Local Processing", { x: 1.2, y: 3.1, w: 3.8, h: 0.6, fontSize: 12, color: 'ffffff', align: 'center', valign: 'middle' });

            slide.addShape(pptx.ShapeType.rect, { x: 1.2, y: 3.9, w: 3.8, h: 0.6, fill: { color: '1e293b' }, line: { color: accentColor } });
            slide.addText("3. Visual Output Delivery", { x: 1.2, y: 3.9, w: 3.8, h: 0.6, fontSize: 12, color: 'ffffff', align: 'center', valign: 'middle' });

            const bullets = (s.bullets || []).map(b => ({ text: b, options: { breakLine: true } }));
            slide.addText(bullets, {
                x: 5.7, y: 1.5, w: 3.9, h: 3.4,
                fontSize: 16, color: textColor, bullet: true, fontFace: theme.font
            });

        } else if (layout === 'image-split') {
            // Visual Feature Card in PPTX
            slide.addShape(pptx.ShapeType.roundRect, {
                x: 0.8, y: 1.5, w: 4.4, h: 3.4,
                fill: { color: '0f172a' },
                line: { color: accentColor, width: 2 }
            });

            slide.addText("🖼️ Visual Concept Feature", {
                x: 1.0, y: 2.8, w: 4.0, h: 0.8,
                fontSize: 18, color: accentColor, bold: true, align: 'center', fontFace: theme.font
            });

            const bullets = (s.bullets || []).map(b => ({ text: b, options: { breakLine: true } }));
            slide.addText(bullets, {
                x: 5.5, y: 1.5, w: 4.1, h: 3.4,
                fontSize: 16, color: textColor, bullet: true, fontFace: theme.font
            });

        } else if (layout === 'bento') {
            const cards = s.bentoCards || [];
            cards.forEach((c, idx) => {
                const posX = idx % 2 === 0 ? 0.8 : 5.2;
                const posY = idx < 2 ? 1.5 : 3.4;
                const cardWidth = 4.2;

                slide.addShape(pptx.ShapeType.roundRect, {
                    x: posX, y: posY, w: cardWidth, h: 1.6,
                    fill: { color: 'f8fafc', transparency: 85 },
                    line: { color: accentColor, width: 1.5 }
                });

                slide.addText(c.title, {
                    x: posX + 0.2, y: posY + 0.15, w: cardWidth - 0.4, h: 0.4,
                    fontSize: 16, color: accentColor, bold: true, fontFace: theme.font
                });

                slide.addText(c.desc, {
                    x: posX + 0.2, y: posY + 0.55, w: cardWidth - 0.4, h: 0.9,
                    fontSize: 13, color: textColor, fontFace: theme.font
                });
            });

        } else if (layout === 'kpi') {
            const kpis = s.kpis || [];
            kpis.forEach((k, idx) => {
                const posX = 0.8 + (idx * 2.9);
                slide.addShape(pptx.ShapeType.roundRect, {
                    x: posX, y: 1.8, w: 2.6, h: 2.6,
                    fill: { color: 'f8fafc', transparency: 88 },
                    line: { color: accentColor, width: 1 }
                });

                slide.addText(k.number, {
                    x: posX, y: 2.0, w: 2.6, h: 1.0,
                    fontSize: 36, color: accentColor, bold: true, fontFace: theme.font, align: 'center'
                });

                slide.addText(k.label, {
                    x: posX + 0.1, y: 3.0, w: 2.4, h: 0.5,
                    fontSize: 14, color: textColor, bold: true, fontFace: theme.font, align: 'center'
                });

                slide.addText(k.context, {
                    x: posX + 0.1, y: 3.5, w: 2.4, h: 0.6,
                    fontSize: 11, color: textColor, italic: true, fontFace: theme.font, align: 'center'
                });
            });

        } else if (layout === 'chart') {
            // Native PPTX Chart Generation
            const chartData = s.chartData || { labels: ["Q1", "Q2", "Q3", "Q4"], values: [20, 45, 75, 120] };
            const pptxData = [
                {
                    name: chartData.metricLabel || "Metric",
                    labels: chartData.labels,
                    values: chartData.values
                }
            ];

            slide.addChart(pptx.ChartType.bar, pptxData, {
                x: 0.8, y: 1.5, w: 4.5, h: 3.4,
                chartColors: [accentColor]
            });

            const bullets = (s.bullets || []).map(b => ({ text: b, options: { breakLine: true } }));
            slide.addText(bullets, {
                x: 5.6, y: 1.5, w: 4.0, h: 3.4,
                fontSize: 16, color: textColor, bullet: true, fontFace: theme.font
            });

        } else if (layout === 'timeline') {
            const steps = s.timelineSteps || [];
            steps.forEach((st, idx) => {
                const posX = 0.8 + (idx * 2.9);
                
                slide.addShape(pptx.ShapeType.oval, {
                    x: posX + 1.0, y: 1.5, w: 0.6, h: 0.6,
                    fill: { color: accentColor }
                });
                slide.addText(String(idx + 1), {
                    x: posX + 1.0, y: 1.5, w: 0.6, h: 0.6,
                    fontSize: 14, color: 'ffffff', bold: true, align: 'center', valign: 'middle'
                });

                slide.addShape(pptx.ShapeType.roundRect, {
                    x: posX, y: 2.3, w: 2.6, h: 2.4,
                    fill: { color: 'f8fafc', transparency: 88 },
                    line: { color: accentColor, width: 1 }
                });

                slide.addText(st.title, {
                    x: posX + 0.15, y: 2.5, w: 2.3, h: 0.5,
                    fontSize: 14, color: accentColor, bold: true, fontFace: theme.font, align: 'center'
                });

                slide.addText(st.desc, {
                    x: posX + 0.15, y: 3.0, w: 2.3, h: 1.4,
                    fontSize: 12, color: textColor, fontFace: theme.font, align: 'center'
                });
            });

        } else if (layout === 'team') {
            const members = s.teamMembers || [];
            members.forEach((m, idx) => {
                const posX = 0.8 + (idx * 2.9);
                slide.addShape(pptx.ShapeType.roundRect, {
                    x: posX, y: 1.6, w: 2.6, h: 3.2,
                    fill: { color: 'f8fafc', transparency: 88 },
                    line: { color: accentColor, width: 1 }
                });

                slide.addShape(pptx.ShapeType.oval, {
                    x: posX + 0.8, y: 1.8, w: 1.0, h: 1.0,
                    fill: { color: accentColor }
                });
                slide.addText(m.name.split(' ').map(n=>n[0]).join('').substring(0,2), {
                    x: posX + 0.8, y: 1.8, w: 1.0, h: 1.0,
                    fontSize: 18, color: 'ffffff', bold: true, align: 'center', valign: 'middle'
                });

                slide.addText(m.name, {
                    x: posX + 0.1, y: 2.9, w: 2.4, h: 0.4,
                    fontSize: 15, color: accentColor, bold: true, fontFace: theme.font, align: 'center'
                });
                slide.addText(m.role, {
                    x: posX + 0.1, y: 3.3, w: 2.4, h: 0.3,
                    fontSize: 12, color: textColor, bold: true, fontFace: theme.font, align: 'center'
                });
                slide.addText(m.bio, {
                    x: posX + 0.1, y: 3.6, w: 2.4, h: 1.0,
                    fontSize: 10, color: textColor, fontFace: theme.font, align: 'center'
                });
            });

        } else if (layout === 'split') {
            slide.addText(s.title, { 
                x: 0.8, y: 1.6, w: '38%', h: '70%', 
                fontSize: 32, color: accentColor, bold: true, fontFace: theme.font, valign: 'middle'
            });
            const bullets = (s.bullets || []).map(b => ({ text: b, options: { breakLine: true } }));
            slide.addText(bullets, {
                x: 5.2, y: 1.6, w: '45%', h: '70%',
                fontSize: 17, color: textColor, bullet: true, fontFace: theme.font, valign: 'middle'
            });

        } else {
            const bullets = (s.bullets || []).map(b => ({ text: b, options: { breakLine: true } }));
            slide.addText(bullets, {
                x: 0.8, y: 1.6, w: '85%', h: '65%',
                fontSize: 18, color: textColor, bullet: true, fontFace: theme.font
            });
        }

        if (s.callout) {
            slide.addText(s.callout, {
                x: 0.8, y: 5.0, w: '85%', h: 0.4,
                fontSize: 12, color: accentColor, italic: true, fontFace: theme.font
            });
        }
    });

    const safeTitle = (state.title || "presentation").replace(/[^a-z0-9]/gi, '_').toLowerCase();
    pptx.writeFile({ fileName: `${safeTitle}.pptx` });
}

// PPTX Decompiler
async function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    try {
        const zip = await JSZip.loadAsync(file);
        const slideFiles = Object.keys(zip.files).filter(name => name.startsWith('ppt/slides/slide') && name.endsWith('.xml'));
        
        slideFiles.sort((a, b) => {
            const numA = parseInt(a.match(/slide(\d+)\.xml/)[1]);
            const numB = parseInt(b.match(/slide(\d+)\.xml/)[1]);
            return numA - numB;
        });

        const extractedTextBlocks = [];
        let extractedTitle = null;

        for (const slideFile of slideFiles) {
            const content = await zip.file(slideFile).async('string');
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(content, "text/xml");
            const textParts = extractTextFromSlide(xmlDoc);
            
            if (textParts.length > 0) {
                if (!extractedTitle) {
                    extractedTitle = textParts[0];
                    if (textParts.length > 1) {
                        state.subtitle = textParts.slice(1).join(' ');
                        document.getElementById('presentation-subtitle').value = state.subtitle;
                    }
                    state.title = extractedTitle;
                    document.getElementById('presentation-title').value = state.title;
                } else {
                    extractedTextBlocks.push(`${textParts[0]}:\n` + textParts.slice(1).join('\n'));
                }
            }
        }

        if (extractedTextBlocks.length > 0) {
            state.content = extractedTextBlocks.join('\n\n');
            document.getElementById('presentation-content').value = state.content;
            document.getElementById('slide-count').value = Math.min(15, extractedTextBlocks.length);
            state.slideCount = Math.min(15, extractedTextBlocks.length);

            document.getElementById('upload-file-info').style.display = 'flex';
            document.getElementById('upload-file-name').textContent = `${file.name} (${slideFiles.length} slides extracted)`;

            alert(`✅ Successfully imported ${slideFiles.length} slides from PPTX!\n\nClick "Generate Presentation Locally" to synthesize and restyle into modern layouts.`);
        } else {
            alert("No text content could be extracted from this PowerPoint file.");
        }

    } catch (error) {
        console.error("Error parsing PPTX:", error);
        alert("Error parsing PPTX file. Please ensure it is a valid PowerPoint file.");
    }
}

function extractTextFromSlide(xmlDoc) {
    const texts = [];
    const textNodes = xmlDoc.getElementsByTagName('a:t');
    for (let i = 0; i < textNodes.length; i++) {
        const t = textNodes[i].textContent.trim();
        if (t) texts.push(t);
    }
    return texts;
}
