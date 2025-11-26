// State Management
const state = {
    title: "The Future of AI",
    subtitle: "By John Doe",
    slides: [
        { id: 1, title: "Introduction", content: "Artificial Intelligence is changing the world\nIt impacts healthcare, finance, and more\nWe are just at the beginning" }
    ],
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
        font: "Inter",
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
        font: "Inter",
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
    }
];

// DOM Elements
const slidesContainer = document.getElementById('slides-container');
const addSlideBtn = document.getElementById('add-slide-btn');
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
    renderSlideInputs();
    renderTemplates();
    setupEventListeners();
});

function setupEventListeners() {
    addSlideBtn.addEventListener('click', addNewSlide);
    
    // Input listeners for main title/subtitle
    document.getElementById('presentation-title').addEventListener('input', (e) => state.title = e.target.value);
    document.getElementById('presentation-subtitle').addEventListener('input', (e) => state.subtitle = e.target.value);

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

// Slide Input Management
function addNewSlide() {
    const newId = state.slides.length > 0 ? Math.max(...state.slides.map(s => s.id)) + 1 : 1;
    state.slides.push({ id: newId, title: "New Slide", content: "" });
    renderSlideInputs();
}

function removeSlide(id) {
    state.slides = state.slides.filter(s => s.id !== id);
    renderSlideInputs();
}

function updateSlideData(id, field, value) {
    const slide = state.slides.find(s => s.id === id);
    if (slide) slide[field] = value;
}

function renderSlideInputs() {
    slidesContainer.innerHTML = '';
    state.slides.forEach((slide, index) => {
        const div = document.createElement('div');
        div.className = 'slide-input-group';
        div.innerHTML = `
            <div class="slide-header">
                <span>Slide ${index + 2} (Content)</span>
                <button class="btn-icon delete-slide" onclick="removeSlide(${slide.id})"><i class="fa-solid fa-trash"></i></button>
            </div>
            <input type="text" class="slide-title" value="${slide.title}" oninput="updateSlideData(${slide.id}, 'title', this.value)">
            <textarea class="slide-content" placeholder="Bullet points..." oninput="updateSlideData(${slide.id}, 'content', this.value)">${slide.content}</textarea>
        `;
        slidesContainer.appendChild(div);
    });
}

// Expose functions for inline handlers
window.removeSlide = removeSlide;
window.updateSlideData = updateSlideData;


// AI Design Engine
function generateDesign() {
    // 1. Pick a random theme
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

    // Content Slides
    state.slides.forEach(slide => {
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
    const totalSlides = state.slides.length + 1; // +1 for title slide
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

    // 2. Content Slides
    state.slides.forEach(s => {
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
