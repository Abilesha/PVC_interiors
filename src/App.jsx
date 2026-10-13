import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Menu, X, Phone, MapPin, Hammer, Ruler, ShieldCheck,
  ArrowRight, ChevronLeft, CheckCircle, ChevronDown, ChevronUp,
  Instagram, Facebook, Mail, PenTool, Clock, ZoomIn, ChevronRight,
} from 'lucide-react';

// --- CONFIGURATION ---
const WHATSAPP_NUMBER = "919787182223";
const BRAND_NAME = "Sri Shanmuga Interiors";

// --- DATA ---
const HERO_IMAGES = [
  "/tv-showcase-2.png",
  "/model-kitchen-2.png",
  "/pooja-upvc-2.png",
  "/loft-work-1.png",
  "/pvc-cupboard-1.png",
];

const SERVICES_DATA = [
  // PVC Works
  {
    id: 'model-kitchen', category: 'PVC', title: 'Model Kitchen',
    shortDesc: '100% waterproof & termite-proof modern modular kitchen setups.',
    image: "/model-kitchen-1.png", images: ["/model-kitchen-1.png", "/model-kitchen-2.png"],
    description: 'Transform your cooking space with our premium PVC model kitchens. 100% water-resistant, termite-proof, with modern dual-tone finishes and heavy-duty hardware built to last a lifetime.',
    features: ['100% Water Proof', 'Termite Resistant', 'High Gloss Finish', 'Custom Cabinets & Lofts', 'Easy to Clean', 'Soft-Close Hardware'],
  },
  {
    id: 'pvc-cupboard', category: 'PVC', title: 'PVC Cupboard',
    shortDesc: 'Stylish bedroom wardrobes, cupboards & loft storage.',
    image: "/pvc-cupboard-1.png", images: ["/pvc-cupboard-1.png", "/pvc-cupboard-2.png"],
    description: 'Maximize your bedroom storage with custom-designed PVC cupboards and wardrobes. Complete with sleek finishes, durable handles, multi-shelf compartments, and matching overhead loft coverings.',
    features: ['Sliding & Openable Doors', 'Overhead Loft Storage', 'Durable Hinges & Handles', 'Termite & Moisture Resistant', 'Custom Dual-Tone Colors', 'Long-lasting Durability'],
  },
  {
    id: 'showcases-tv-units', category: 'PVC', title: 'Showcases & TV Units',
    shortDesc: 'Modern floating entertainment units, fluted panels & showcase columns.',
    image: "/tv-showcase-2.png", images: ["/tv-showcase-2.png", "/pvc-tv-unit.png"],
    description: 'Elevate your hall or living room with our designer Showcases and TV Units. Featuring modern vertical fluted louvers, marble-pattern back panels, ambient warm LED backlighting, glass-door display showcase columns, and floating console drawers.',
    features: ['Fluted Paneling & Marble Backdrop', 'Glass Display Showcase with LED', 'Curved Floating Console Drawers', 'Concealed Cable & Wire Management', '100% Termite & Moisture Resistant', 'Custom Sizing & Backlit LED Strip'],
  },
  {
    id: 'loft-covering-work', category: 'PVC', title: 'Loft Covering Work',
    shortDesc: 'Sleek overhead storage loft coverings in high-gloss & dual tones.',
    image: "/loft-work-1.png", images: ["/loft-work-1.png", "/loft-work-2.png"],
    description: 'Conceal and organize overhead clutter seamlessly with our premium PVC & UPVC loft coverings. Custom fitted to your ceiling heights in vibrant high-gloss colors or elegant dual-tones to flawlessly complement your home interiors.',
    features: ['Seamless Ceiling-to-Loft Fit', 'High-Gloss & Dual-Tone Finishes', 'Concealed Dust-Proof Closures', 'Durable Soft-Close Hinges', 'Zero Termite & Waterproof PVC', 'Custom Color Matching'],
  },
  // UPVC Works
  {
    id: 'pooja-work-upvc', category: 'UPVC', title: 'Pooja Work (UPVC)',
    shortDesc: 'Sacred UPVC Mandirs with CNC jali, bells & backlit motifs.',
    image: "/pooja-upvc-1.png", images: ["/pooja-upvc-1.png", "/pooja-upvc-2.png"],
    description: 'Create a divine and serene atmosphere with our custom UPVC Pooja Mandir units. Crafted with traditional temple Gopuram tiers, precision CNC lattice jali work, sacred Swastika & Om motifs, illuminated backlit peacock feather patterns.',
    features: ['Gopuram / Shikhara Tier Design', 'CNC Jali & Backlit Peacock Motifs', 'Swastika & Om Engravings', 'Spacious Lower Storage Cabinets', 'Brass Temple Bells & Handles', '100% Waterproof & Fire Resistant UPVC'],
  },
  {
    id: 'upvc-sliding', category: 'UPVC', title: 'Sliding Windows (UPVC)',
    shortDesc: 'Smooth sliding UPVC windows with blue-tinted glass & decorative grills.',
    image: "/sliding-window-1.png", images: ["/sliding-window-1.png", "/sliding-window-2.png"],
    description: 'Our premium UPVC sliding windows feature smooth gliding sashes, blue-tinted privacy glass, and elegant decorative grills. Perfect for bedrooms and living rooms — they save space, reduce noise, and require zero maintenance.',
    features: ['Smooth Gliding Rails', 'Blue-Tinted Privacy Glass', 'Decorative Iron Grills', 'Mosquito Mesh Option', 'Sound & Heat Insulation', 'Zero Maintenance'],
  },
  {
    id: 'upvc-openable-door', category: 'UPVC', title: 'Open Windows (UPVC)',
    shortDesc: 'Wide multi-panel openable UPVC windows with tinted glass.',
    image: "/open-window-1.jpg", images: ["/open-window-1.jpg", "/open-window-2.jpg"],
    description: 'Our wide-span UPVC open windows offer maximum natural light and ventilation. Ideal for halls, pooja rooms, and large spaces — available in multi-panel configurations with blue-tinted or frosted glass options.',
    features: ['Multi-Panel Configuration', 'Blue / Frosted Glass', 'Wide Span Opening', 'Weather-Sealed Frame', '100% Waterproof', 'Dust & Noise Resistant'],
  },
  {
    id: 'upvc-casement', category: 'UPVC', title: 'Casement Windows (UPVC)',
    shortDesc: 'Side-hung openable UPVC windows for bathrooms & offices.',
    image: "/casement-window-1.png", images: ["/casement-window-1.png"],
    description: 'Our UPVC casement windows swing open on side hinges for maximum ventilation. Perfect for bathrooms, kitchens, and commercial spaces — compact, durable, and completely weatherproof.',
    features: ['Side-Hinged Opening', 'Compact & Space-Efficient', 'Frosted / Clear Glass', 'Multi-point Locking', 'Weatherproof Frame', 'Easy to Clean'],
  },
  {
    id: 'upvc-ventilator', category: 'UPVC', title: 'Ventilator Windows (UPVC)',
    shortDesc: 'Louvered UPVC ventilators for bathrooms, kitchens & exterior walls.',
    image: "/ventilator-window-1.png", images: ["/ventilator-window-1.png", "/ventilator-window-2.jpg"],
    description: 'Our UPVC ventilator windows feature adjustable horizontal louvers for steady airflow while maintaining privacy. Available in compact louvered frames (interior) and square exterior louvered panels.',
    features: ['Adjustable Horizontal Louvers', 'Interior & Exterior Models', 'Privacy Without Blocking Airflow', 'Dust & Rain Resistant', 'Compact & Easy Install', 'Weatherproof UPVC Frame'],
  },
  // Aluminium
  {
    id: 'aluminium-partition', category: 'Aluminium', title: 'Aluminium Partitions',
    shortDesc: 'Durable aluminium office & commercial partition systems.',
    image: "/aluminium-partition.jpg", images: ["/aluminium-partition.jpg"],
    description: 'Cost-effective partition solutions for offices, shops, and commercial spaces. Quick installation and highly durable with powder-coated finishes available in multiple colors.',
    features: ['Powder Coated Finish', 'Glass / Board Options', 'Quick Installation', 'Office Cabin Design', 'Fire Resistant', 'Low Maintenance'],
  },
];

const GALLERY_IMAGES = [
  { url: "/model-kitchen-1.png", title: "Model Kitchen (Grey & Yellow)", category: "Model Kitchen" },
  { url: "/model-kitchen-2.png", title: "Model Kitchen (Yellow & White)", category: "Model Kitchen" },
  { url: "/pvc-cupboard-1.png", title: "PVC Cupboard & Wardrobe", category: "PVC Cupboard" },
  { url: "/pvc-cupboard-2.png", title: "PVC Cupboard & Loft Storage", category: "PVC Cupboard" },
  { url: "/tv-showcase-2.png", title: "Showcases & TV Units (Modern Floating)", category: "Showcases & TV Units" },
  { url: "/pvc-tv-unit.png", title: "Showcases & TV Units (Fluted & Marble)", category: "Showcases & TV Units" },
  { url: "/pooja-upvc-1.png", title: "Pooja Work (UPVC Gopuram Mandir)", category: "Pooja Work (UPVC)" },
  { url: "/pooja-upvc-2.png", title: "Pooja Work (Backlit Peacock CNC)", category: "Pooja Work (UPVC)" },
  { url: "/loft-work-1.png", title: "Loft Covering Work (Teal Blue Kitchen)", category: "Loft Covering Work" },
  { url: "/loft-work-2.png", title: "Loft Covering Work (Dual-Tone Bedroom)", category: "Loft Covering Work" },
  { url: "/sliding-window-1.png", title: "Sliding Windows UPVC (Decorative Grill)", category: "Sliding Windows (UPVC)" },
  { url: "/sliding-window-2.png", title: "Sliding Windows UPVC (Wide-Span)", category: "Sliding Windows (UPVC)" },
  { url: "/open-window-1.jpg", title: "Open Windows UPVC (Multi-Panel)", category: "Open Windows (UPVC)" },
  { url: "/open-window-2.jpg", title: "Open Windows UPVC (Tinted Glass)", category: "Open Windows (UPVC)" },
  { url: "/casement-window-1.png", title: "Casement Windows UPVC", category: "Casement Windows (UPVC)" },
  { url: "/ventilator-window-1.png", title: "Ventilator Window UPVC (Interior)", category: "Ventilator Windows (UPVC)" },
  { url: "/ventilator-window-2.jpg", title: "Ventilator Window UPVC (Exterior)", category: "Ventilator Windows (UPVC)" },
];

const GALLERY_CATEGORIES = [
  'All', 'Model Kitchen', 'PVC Cupboard', 'Showcases & TV Units',
  'Pooja Work (UPVC)', 'Loft Covering Work', 'Sliding Windows (UPVC)',
  'Open Windows (UPVC)', 'Casement Windows (UPVC)', 'Ventilator Windows (UPVC)',
];

const HIGHLIGHTS = [
  { icon: ShieldCheck, title: '100% Waterproof', desc: 'No rotting, swelling or water damage — ever.' },
  { icon: Hammer,      title: 'Termite Proof',   desc: 'PVC is naturally pest-free. Zero chemicals needed.' },
  { icon: PenTool,     title: 'Cost Effective',  desc: 'Wood-look finish at half the price.' },
  { icon: Clock,       title: 'Quick Install',   desc: 'Full home interiors done in just 7–10 days.' },
];

const FAQ_DATA = [
  {
    q: 'How long does a full kitchen installation take?',
    a: 'A complete PVC model kitchen typically takes 7 to 10 working days depending on size and design complexity. We work efficiently to minimize disruption to your daily life.',
  },
  {
    q: 'Is PVC material durable? What about heat in the kitchen?',
    a: 'Yes, our high-grade PVC boards are heat-resistant up to 60°C — perfectly safe for kitchen environments. They will not warp, swell, or crack unlike wood, even in humid conditions.',
  },
  {
    q: 'Do you provide a warranty on your work?',
    a: 'Absolutely! We provide a 10-year warranty on all PVC and UPVC installations including kitchens, cupboards, windows, and doors. Any manufacturing defects will be rectified free of cost.',
  },
  {
    q: 'Do you serve areas outside Vadalur?',
    a: 'Yes! We serve Vadalur, Cuddalore, Chidambaram, Panruti, Neyveli, Sethiathope, Porto Novo, Virudhachalam, and surrounding areas in Cuddalore District. Transport charges may apply for distant locations.',
  },
  {
    q: 'How do I get a free price estimate?',
    a: 'Simply click "Get Free Quote" or use the Contact form. Share your room measurements and photos — we will provide a detailed estimate within 24 hours, completely free.',
  },
];

// --- HOOKS ---
const useCountUp = (target, isVisible, duration = 2000) => {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!isVisible) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target, duration]);
  return count;
};

const useScrolled = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return scrolled;
};

// --- REUSABLE COMPONENTS ---

const WAIcon = ({ className = "w-5 h-5" }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
    <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.557 4.118 1.529 5.845L0 24l6.335-1.652A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.895 0-3.668-.524-5.184-1.437l-.372-.22-3.861 1.007 1.033-3.752-.243-.386A9.961 9.961 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
  </svg>
);

const openWA = (message) => {
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
};

const FloatingWAButton = () => (
  <button
    onClick={() => openWA("Hi! I'm interested in your PVC/UPVC interior work. Please get in touch.")}
    className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-green-500 hover:bg-green-600 text-white rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-110 hover:shadow-green-500/40"
    title="Chat on WhatsApp"
    aria-label="WhatsApp Chat"
  >
    <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-40 pointer-events-none" />
    <WAIcon className="w-8 h-8 relative z-10" />
  </button>
);

const SectionReveal = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); } },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${className}`}
    >
      {children}
    </div>
  );
};

const StatCard = ({ value, suffix, label }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(value, visible);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className="text-center px-4">
      <div className="text-4xl md:text-5xl font-black text-yellow-400 tabular-nums">
        {count}{suffix}
      </div>
      <div className="text-slate-400 mt-2 text-sm font-medium tracking-wide">{label}</div>
    </div>
  );
};

// --- NAVBAR ---
const Navbar = ({ setPage, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const scrolled = useScrolled();

  const handleNav = (page) => { setPage(page); setIsOpen(false); window.scrollTo(0, 0); };

  const NavItem = ({ page, label }) => (
    <button
      onClick={() => handleNav(page)}
      className={`relative font-semibold text-sm transition-colors pb-1 ${
        currentPage === page ? 'text-yellow-400' : scrolled ? 'text-slate-700 hover:text-yellow-600' : 'text-white/90 hover:text-yellow-300'
      }`}
    >
      {label}
      {currentPage === page && (
        <span className="absolute -bottom-0.5 left-0 w-full h-0.5 bg-yellow-400 rounded-full" />
      )}
    </button>
  );

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/96 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <div onClick={() => handleNav('home')} className="flex items-center gap-3 cursor-pointer">
          <img src="/logo.png" alt={BRAND_NAME} className="h-12 w-12 object-contain drop-shadow-md" />
          <span className={`text-lg font-black hidden sm:inline transition-colors ${scrolled ? 'text-slate-900' : 'text-white drop-shadow'}`}>
            {BRAND_NAME}
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <NavItem page="home" label="Home" />
          <NavItem page="services" label="Services" />
          <NavItem page="gallery" label="Portfolio" />
          <NavItem page="contact" label="Contact" />
          <button
            onClick={() => openWA('Hi, I want a free quote for interior work.')}
            className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 px-5 py-2.5 rounded-full font-bold text-sm transition-all shadow-md hover:shadow-yellow-400/40 hover:scale-105 flex items-center gap-2"
          >
            <WAIcon className="w-4 h-4" /> Free Quote
          </button>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setIsOpen(!isOpen)} className={`md:hidden transition-colors ${scrolled ? 'text-slate-900' : 'text-white'}`}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-xl">
          <div className="flex flex-col p-6 gap-5">
            {[['home', 'Home'], ['services', 'Services'], ['gallery', 'Portfolio'], ['contact', 'Contact']].map(([p, l]) => (
              <button key={p} onClick={() => handleNav(p)} className={`text-left font-semibold text-base ${currentPage === p ? 'text-yellow-500' : 'text-slate-700'}`}>{l}</button>
            ))}
            <button
              onClick={() => { openWA('Hi, I want a free quote for interior work.'); setIsOpen(false); }}
              className="bg-yellow-400 text-slate-900 font-bold py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <WAIcon className="w-5 h-5" /> Get Free Quote
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

// --- LIGHTBOX ---
const Lightbox = ({ images, startIndex, onClose }) => {
  const [current, setCurrent] = useState(startIndex);
  const prev = useCallback(() => setCurrent(c => (c - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent(c => (c + 1) % images.length), [images.length]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handler);
    return () => { window.removeEventListener('keydown', handler); document.body.style.overflow = ''; };
  }, [onClose, prev, next]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
      <button onClick={onClose} className="absolute top-5 right-5 text-white/70 hover:text-yellow-400 transition-colors z-10 bg-white/10 p-2 rounded-full">
        <X size={24} />
      </button>

      <button
        onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-4 md:left-8 text-white/80 hover:text-yellow-400 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all z-10"
      >
        <ChevronLeft size={28} />
      </button>

      <div className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center gap-4" onClick={e => e.stopPropagation()}>
        <img
          src={images[current].url}
          alt={images[current].title}
          className="max-h-[72vh] max-w-full object-contain rounded-2xl shadow-2xl"
        />
        <div className="text-center">
          <p className="text-white font-bold text-lg">{images[current].title}</p>
          <p className="text-yellow-400 text-sm mt-0.5">{images[current].category}</p>
          <p className="text-slate-500 text-xs mt-1">{current + 1} / {images.length}</p>
        </div>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-4 md:right-8 text-white/80 hover:text-yellow-400 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all z-10"
      >
        <ChevronRight size={28} />
      </button>
    </div>
  );
};

// --- FAQ ACCORDION ---
const FAQAccordion = () => {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div className="space-y-3">
      {FAQ_DATA.map((item, idx) => (
        <div key={idx} className={`rounded-2xl overflow-hidden border transition-all ${openIdx === idx ? 'border-yellow-300 shadow-md' : 'border-slate-200'}`}>
          <button
            onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            className="w-full flex justify-between items-center p-5 text-left bg-white hover:bg-yellow-50 transition-colors"
          >
            <span className="font-bold text-slate-800 pr-4 text-sm md:text-base">{item.q}</span>
            <span className="shrink-0">
              {openIdx === idx
                ? <ChevronUp size={20} className="text-yellow-500" />
                : <ChevronDown size={20} className="text-slate-400" />}
            </span>
          </button>
          <div className={`overflow-hidden transition-all duration-300 ${openIdx === idx ? 'max-h-96' : 'max-h-0'}`}>
            <div className="px-5 pb-5 pt-1 bg-yellow-50 text-slate-600 text-sm leading-relaxed">
              {item.a}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

// --- HOME PAGE ---
const HomePage = ({ setPage, setSelectedService }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(p => (p + 1) % HERO_IMAGES.length), 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* ── 1. HERO ── */}
      <div className="relative h-screen w-full overflow-hidden">
        {HERO_IMAGES.map((img, idx) => (
          <div key={idx} className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentSlide ? 'opacity-100' : 'opacity-0'}`}>
            <img src={img} alt="" className="w-full h-full object-cover" />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/75 via-slate-900/50 to-slate-900/85" />

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <div className="animate-fade-in-up max-w-4xl">
            <span className="inline-block bg-yellow-400/15 text-yellow-300 border border-yellow-400/30 px-5 py-1.5 rounded-full text-sm font-bold mb-6 backdrop-blur-sm">
              ✦ PVC • UPVC • Aluminium Specialists
            </span>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-5 leading-tight tracking-tight drop-shadow-lg">
              Modern Interiors.<br />
              <span className="text-yellow-400">Zero Maintenance.</span>
            </h1>
            <p className="text-white/75 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Expert craftsmanship in Model Kitchens, UPVC Windows, Pooja Mandirs & more.
              <br className="hidden md:block" />
              Waterproof • Termite-proof • Built to last 10+ years.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => openWA('Hi, I want a free consultation for my home interiors.')}
                className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 px-9 py-4 rounded-full font-black text-lg shadow-2xl transition-all hover:shadow-yellow-400/30 hover:scale-105"
              >
                Get Free Consultation
              </button>
              <button
                onClick={() => setPage('gallery')}
                className="border-2 border-white/40 hover:border-yellow-400 text-white hover:text-yellow-400 px-9 py-4 rounded-full font-bold text-lg backdrop-blur-sm transition-all hover:bg-white/5"
              >
                View Our Work
              </button>
            </div>
          </div>

          {/* Slide indicator dots */}
          <div className="absolute bottom-10 flex gap-2.5 items-center">
            {HERO_IMAGES.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-8 h-2.5 bg-yellow-400' : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'}`}
              />
            ))}
          </div>
        </div>
      </div>



      {/* ── 3. WHY CHOOSE US ── */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <SectionReveal className="text-center mb-16">
            <span className="text-yellow-600 font-bold tracking-widest text-xs uppercase">Why Choose Us</span>
            <h2 className="text-4xl font-black text-slate-900 mt-3 mb-4">
              The Smart Choice for <span className="text-yellow-500">Modern Homes</span>
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto">PVC & UPVC interiors that look stunning, last decades, and cost less than traditional wood.</p>
          </SectionReveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, title: "100% Waterproof", desc: "Never worry about water damage in kitchens, bathrooms, or during monsoons.", accent: "bg-blue-50", iconColor: "text-blue-500" },
              { icon: Hammer, title: "Termite Proof", desc: "PVC is naturally pest-resistant. No chemicals or annual spraying needed.", accent: "bg-orange-50", iconColor: "text-orange-500" },
              { icon: PenTool, title: "Cost Effective", desc: "Premium wood-look finish at half the price. Smart investment for any budget.", accent: "bg-green-50", iconColor: "text-green-500" },
              { icon: Clock, title: "7–10 Day Install", desc: "Minimal disruption. Complete home interiors done faster than you'd expect.", accent: "bg-purple-50", iconColor: "text-purple-500" },
            ].map((item, idx) => (
              <SectionReveal key={idx} delay={idx * 100}
                className="group p-7 bg-slate-50 rounded-2xl border border-slate-100 hover:border-yellow-200 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-default"
              >
                <div className={`w-14 h-14 rounded-2xl ${item.accent} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-7 h-7 ${item.iconColor}`} />
                </div>
                <h3 className="text-lg font-black text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. SERVICES PREVIEW ── */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <SectionReveal className="text-center mb-16">
            <span className="text-yellow-600 font-bold tracking-widest text-xs uppercase">What We Do</span>
            <h2 className="text-4xl font-black text-slate-900 mt-3 mb-4">Our Services</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Specialized in PVC, UPVC & Aluminium works for homes and offices across Cuddalore District.</p>
          </SectionReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {SERVICES_DATA.slice(0, 6).map((service, idx) => (
              <SectionReveal key={service.id} delay={idx * 70}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group border border-slate-100 hover:-translate-y-2"
              >
                <div className="h-56 overflow-hidden relative">
                  <span className="absolute top-3 left-3 bg-slate-900/90 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full z-10 backdrop-blur-sm">{service.category}</span>
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-black text-slate-900 mb-1.5">{service.title}</h3>
                  <p className="text-slate-500 text-sm mb-5 line-clamp-2">{service.shortDesc}</p>
                  <button
                    onClick={() => { setSelectedService(service); setPage('service-detail'); }}
                    className="text-yellow-600 font-bold text-sm flex items-center gap-1.5 hover:gap-3 transition-all group/btn"
                  >
                    View Details <ArrowRight size={15} className="transition-transform group-hover/btn:translate-x-1" />
                  </button>
                </div>
              </SectionReveal>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={() => setPage('services')}
              className="bg-slate-900 hover:bg-slate-800 text-yellow-400 px-10 py-4 rounded-full font-black transition-all shadow-xl hover:shadow-slate-900/30 inline-flex items-center gap-2 hover:scale-105"
            >
              View All {SERVICES_DATA.length} Services <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>

      {/* ── 5. PORTFOLIO MARQUEE ── */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6 mb-12">
          <SectionReveal className="flex flex-col md:flex-row justify-between items-end gap-4">
            <div>
              <span className="text-yellow-600 font-bold tracking-widest text-xs uppercase">Our Work</span>
              <h2 className="text-4xl font-black text-slate-900 mt-3">Recent Projects</h2>
              <p className="text-slate-500 mt-2">A glimpse of finished sites across Cuddalore District.</p>
            </div>
            <button onClick={() => setPage('gallery')} className="text-yellow-600 font-bold flex items-center gap-2 hover:gap-3 transition-all shrink-0 group">
              Full Portfolio <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </SectionReveal>
        </div>
        <div className="relative w-full">
          <div className="flex animate-marquee gap-6 w-max px-6">
            {[...GALLERY_IMAGES, ...GALLERY_IMAGES].map((item, idx) => (
              <div key={idx} className="rounded-2xl overflow-hidden h-64 w-80 shrink-0 hover:scale-[1.03] transition-transform duration-300 border border-slate-100 shadow-md relative group cursor-pointer">
                <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-5 flex flex-col justify-end">
                  <span className="text-xs text-yellow-400 font-bold">{item.category}</span>
                  <span className="text-sm font-bold text-white">{item.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. CTA BANNER ── */}
      <section className="py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img src={HERO_IMAGES[1]} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600" />
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-yellow-400/5 blur-3xl pointer-events-none" />
        <SectionReveal className="relative z-10 text-center px-6">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-5 leading-tight">
            Ready to Transform <span className="text-yellow-400">Your Home?</span>
          </h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
            Get a free site visit & detailed estimate. No obligations — just honest advice from our expert team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => openWA('Hi, I would like to book a free site visit and get an estimate for interior work.')}
              className="bg-yellow-400 hover:bg-yellow-300 text-slate-900 px-10 py-4 rounded-full font-black text-lg shadow-2xl transition-all hover:scale-105 hover:shadow-yellow-400/30 flex items-center justify-center gap-2"
            >
              <WAIcon className="w-5 h-5" /> Book Free Site Visit
            </button>
            <button
              onClick={() => setPage('contact')}
              className="border-2 border-white/20 hover:border-yellow-400 text-white/80 hover:text-yellow-400 px-10 py-4 rounded-full font-bold text-lg transition-all"
            >
              Contact Us
            </button>
          </div>
        </SectionReveal>
      </section>
    </>
  );
};

// --- SERVICES PAGE ---
const ServicesPage = ({ setSelectedService, setPage }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', 'PVC', 'UPVC', 'Aluminium'];
  const filteredServices = selectedCategory === 'All' ? SERVICES_DATA : SERVICES_DATA.filter(s => s.category === selectedCategory);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Banner */}
      <div className="bg-slate-900 pt-28 pb-16 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600" />
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-yellow-400/5 blur-3xl pointer-events-none" />
        <h1 className="text-5xl font-black text-white mb-3 relative">Our Services</h1>
        <p className="text-slate-400 max-w-xl mx-auto text-lg relative">Expert PVC, UPVC & Aluminium works for homes and offices.</p>
      </div>

      <div className="container mx-auto px-6 py-14">
        {/* Filter Pills */}
        <div className="flex flex-wrap justify-center gap-3 mb-14">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-7 py-2.5 rounded-full font-bold text-sm transition-all ${
                selectedCategory === cat
                  ? 'bg-yellow-400 text-slate-900 shadow-lg shadow-yellow-400/30 scale-105'
                  : 'bg-white text-slate-700 hover:bg-yellow-50 border border-slate-200 shadow-sm'
              }`}
            >
              {cat === 'All' ? 'All Categories' : `${cat} Works`}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service, idx) => (
            <SectionReveal key={service.id} delay={idx * 60}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 group border border-slate-100 hover:-translate-y-2 flex flex-col"
            >
              <div className="h-60 overflow-hidden relative">
                <span className="absolute top-3 left-3 bg-slate-900/90 text-yellow-400 text-xs font-bold px-3 py-1 rounded-full z-10">{service.category}</span>
                <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-xl font-black text-slate-900 mb-2">{service.title}</h3>
                <p className="text-slate-500 text-sm mb-6 flex-1 leading-relaxed">{service.shortDesc}</p>
                <button
                  onClick={() => { setSelectedService(service); setPage('service-detail'); }}
                  className="w-full bg-yellow-50 text-yellow-800 border border-yellow-200 py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-yellow-400 hover:text-slate-900 hover:border-yellow-400 transition-all"
                >
                  View Details <ArrowRight size={16} />
                </button>
              </div>
            </SectionReveal>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- SERVICE DETAIL PAGE ---
const ServiceDetailPage = ({ service, setPage, setSelectedService }) => {
  if (!service) return null;
  const [activeImage, setActiveImage] = useState(service.image);
  useEffect(() => { setActiveImage(service.image); }, [service]);
  const imagesList = service.images?.length > 0 ? service.images : [service.image];
  const related = SERVICES_DATA.filter(s => s.id !== service.id && s.category === service.category).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Banner */}
      <div className="bg-slate-900 pt-28 pb-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600" />
        <div className="container mx-auto px-6">
          <button onClick={() => setPage('services')} className="flex items-center gap-2 text-slate-400 hover:text-yellow-400 transition-colors font-semibold mb-4 text-sm group">
            <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> All Services
          </button>
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <button onClick={() => setPage('home')} className="hover:text-yellow-400 transition-colors">Home</button>
            <span>/</span>
            <button onClick={() => setPage('services')} className="hover:text-yellow-400 transition-colors">Services</button>
            <span>/</span>
            <span className="text-yellow-400 font-semibold">{service.title}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-14">
        <div className="grid md:grid-cols-2 gap-14 items-start mb-20">
          {/* Images */}
          <div>
            <div className="rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] border border-slate-100 bg-slate-100">
              <img src={activeImage} alt={service.title} className="w-full h-full object-cover transition-all duration-500" />
            </div>
            {imagesList.length > 1 && (
              <div className="flex gap-3 mt-4">
                {imagesList.map((img, idx) => (
                  <button key={idx} onClick={() => setActiveImage(img)}
                    className={`w-24 h-24 rounded-xl overflow-hidden border-2 transition-all ${activeImage === img ? 'border-yellow-400 ring-2 ring-yellow-300 shadow-lg scale-105' : 'border-slate-200 opacity-60 hover:opacity-100'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <span className="text-yellow-600 font-black tracking-widest text-xs uppercase mb-3 block">{service.category} Series</span>
            <h1 className="text-4xl font-black text-slate-900 mb-5">{service.title}</h1>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">{service.description}</p>

            <h3 className="font-black text-lg text-slate-800 mb-4 flex items-center gap-2">
              <CheckCircle className="text-green-500" size={20} /> Key Features
            </h3>
            <div className="grid grid-cols-2 gap-3 mb-8">
              {service.features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2.5 bg-slate-50 p-3.5 rounded-xl border border-slate-100 hover:border-yellow-200 transition-colors">
                  <CheckCircle className="text-green-500 shrink-0" size={16} />
                  <span className="font-semibold text-slate-700 text-sm">{feat}</span>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-2xl border border-yellow-200">
              <p className="font-black text-slate-900 mb-1 text-lg">Interested in this?</p>
              <p className="text-slate-500 text-sm mb-4">WhatsApp us to get a detailed price estimate and free site visit.</p>
              <button
                onClick={() => openWA(`Hi, I am interested in ${service.title}. Please provide an estimate.`)}
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-slate-900 py-3.5 rounded-xl font-black shadow-lg transition-all hover:scale-[1.02] flex items-center justify-center gap-2 text-base"
              >
                <WAIcon className="w-5 h-5" /> Get Price Estimate
              </button>
            </div>
          </div>
        </div>

        {/* Related Services */}
        {related.length > 0 && (
          <div className="border-t border-slate-100 pt-14">
            <h2 className="text-2xl font-black text-slate-900 mb-8">Related Services</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {related.map(rel => (
                <div key={rel.id}
                  onClick={() => { setSelectedService(rel); window.scrollTo(0, 0); }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer group border border-slate-100 hover:-translate-y-1"
                >
                  <div className="h-48 overflow-hidden">
                    <img src={rel.image} alt={rel.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-black text-slate-800 mb-1">{rel.title}</h3>
                    <p className="text-slate-500 text-sm">{rel.shortDesc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- GALLERY PAGE ---
const GalleryPage = () => {
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);
  const filteredItems = filter === 'All' ? GALLERY_IMAGES : GALLERY_IMAGES.filter(item => item.category === filter);

  return (
    <div className="min-h-screen bg-slate-50">
      {lightbox && <Lightbox images={lightbox.images} startIndex={lightbox.index} onClose={() => setLightbox(null)} />}

      {/* Banner */}
      <div className="bg-slate-900 pt-28 pb-16 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600" />
        <h1 className="text-5xl font-black text-white mb-3 relative">Our Portfolio</h1>
        <p className="text-slate-400 max-w-xl mx-auto text-lg relative">Real projects. Real clients. Click any photo to view full-screen.</p>
      </div>

      <div className="container mx-auto px-6 py-14">
        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2.5 mb-12">
          {GALLERY_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-full font-bold text-xs md:text-sm transition-all whitespace-nowrap ${
                filter === cat
                  ? 'bg-yellow-400 text-slate-900 shadow-lg shadow-yellow-400/30 scale-105'
                  : 'bg-white text-slate-600 hover:bg-yellow-50 border border-slate-200 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item, idx) => (
            <SectionReveal
              key={`${filter}-${idx}`}
              delay={idx * 40}
              className="group relative rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 bg-white border border-slate-100 cursor-pointer hover:-translate-y-1"
              onClick={() => setLightbox({ images: filteredItems, index: idx })}
            >
              <div className="h-64 overflow-hidden relative">
                <img src={item.url} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/20 backdrop-blur-sm p-3.5 rounded-full border border-white/30 shadow-xl transform scale-75 group-hover:scale-100 transition-transform duration-300">
                    <ZoomIn size={24} className="text-white" />
                  </div>
                </div>
                <span className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-sm text-yellow-400 text-xs font-bold px-3 py-1.5 rounded-full">{item.category}</span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-slate-800 text-sm leading-snug">{item.title}</h3>
              </div>
            </SectionReveal>
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-24 text-slate-400">
            <p className="text-lg font-semibold">No projects in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- CONTACT PAGE ---
const ContactPage = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', requirement: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;
    const msg = `Hi! I'm ${formData.name}. My number: ${formData.phone}. Requirement: ${formData.requirement || 'General enquiry'}`;
    openWA(msg);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Banner */}
      <div className="bg-slate-900 pt-28 pb-16 text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600" />
        <h1 className="text-5xl font-black text-white mb-3 relative">Contact Us</h1>
        <p className="text-slate-400 max-w-xl mx-auto text-lg relative">Let's discuss your project. We're just a WhatsApp away.</p>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12 mb-20">

          {/* Contact Info */}
          <div className="space-y-6">
            <SectionReveal>
              <h2 className="text-3xl font-black text-slate-900 mb-6">Get In Touch</h2>
            </SectionReveal>
            <div className="space-y-4">
              {[
                { icon: MapPin, label: 'Workshop Address', value: 'Vadalur, Tamil Nadu – 607303\n(Cuddalore District)', color: 'text-red-500', bg: 'bg-red-50' },
                { icon: Phone, label: 'Call / WhatsApp', value: '+91 97871 82223', color: 'text-green-600', bg: 'bg-green-50' },
                { icon: Mail, label: 'Email', value: 'contact@srishanmuga.com', color: 'text-blue-500', bg: 'bg-blue-50' },
                { icon: Clock, label: 'Working Hours', value: 'Monday – Saturday: 9 AM – 7 PM\nSunday: By Appointment', color: 'text-yellow-600', bg: 'bg-yellow-50' },
              ].map((item, idx) => (
                <SectionReveal key={idx} delay={idx * 80}>
                  <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <div className={`p-3 ${item.bg} rounded-xl shrink-0`}>
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm mb-0.5">{item.label}</h4>
                      <p className="text-slate-500 text-sm whitespace-pre-line leading-relaxed">{item.value}</p>
                    </div>
                  </div>
                </SectionReveal>
              ))}
            </div>

            {/* Service Areas */}
            <SectionReveal delay={400}>
              <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
                <h3 className="font-black text-slate-900 mb-3 flex items-center gap-2">
                  <MapPin size={18} className="text-yellow-600" /> Areas We Serve
                </h3>
                <div className="flex flex-wrap gap-2">
                  {['Vadalur', 'Cuddalore', 'Chidambaram', 'Panruti', 'Neyveli', 'Sethiathope', 'Porto Novo', 'Virudhachalam'].map(area => (
                    <span key={area} className="bg-white border border-yellow-200 text-slate-700 text-sm px-3 py-1.5 rounded-full font-semibold shadow-sm">{area}</span>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Enquiry Form */}
          <SectionReveal delay={200} className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
            <h3 className="text-2xl font-black text-slate-900 mb-1">Send an Enquiry</h3>
            <p className="text-slate-400 text-sm mb-7">Fill in your details — we'll WhatsApp you back within minutes.</p>

            {submitted && (
              <div className="mb-5 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2">
                <CheckCircle size={16} /> Message sent! Opening WhatsApp…
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-bold text-slate-700 mb-1.5 block">Your Name *</label>
                <input
                  type="text" required
                  placeholder="e.g. Rajesh Kumar"
                  value={formData.name}
                  onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                  className="w-full px-4 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-slate-50 text-slate-800 font-medium transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700 mb-1.5 block">Phone Number *</label>
                <input
                  type="tel" required
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={e => setFormData(p => ({ ...p, phone: e.target.value }))}
                  className="w-full px-4 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-slate-50 text-slate-800 font-medium transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-bold text-slate-700 mb-1.5 block">Your Requirement</label>
                <textarea
                  placeholder="e.g. I need a PVC kitchen and cupboard for my 2BHK house in Cuddalore..."
                  value={formData.requirement}
                  onChange={e => setFormData(p => ({ ...p, requirement: e.target.value }))}
                  className="w-full px-4 py-3.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent bg-slate-50 text-slate-800 h-32 resize-none font-medium transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-400 hover:bg-yellow-300 text-slate-900 font-black py-4 rounded-xl shadow-lg transition-all hover:scale-[1.01] text-base flex items-center justify-center gap-2.5"
              >
                <WAIcon className="w-5 h-5" /> Send via WhatsApp
              </button>
              <p className="text-center text-xs text-slate-400">Clicking will open WhatsApp with your message pre-filled.</p>
            </form>
          </SectionReveal>
        </div>

        {/* FAQ */}
        <div className="max-w-3xl mx-auto">
          <SectionReveal className="text-center mb-10">
            <span className="text-yellow-600 font-bold tracking-widest text-xs uppercase">FAQ</span>
            <h2 className="text-3xl font-black text-slate-900 mt-3">Frequently Asked Questions</h2>
          </SectionReveal>
          <SectionReveal delay={100}>
            <FAQAccordion />
          </SectionReveal>
        </div>
      </div>
    </div>
  );
};

// --- FOOTER ---
const Footer = ({ navigate }) => (
  <footer className="bg-slate-900 text-slate-400 pt-16 pb-8 relative">
    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-600 via-yellow-400 to-yellow-600" />
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-10 mb-14">
        {/* Brand */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-5">
            <img src="/logo.png" alt="Logo" className="h-14 w-14 object-contain bg-white rounded-full p-1 border-2 border-yellow-400/50 shadow-lg" />
            <span className="text-xl font-black bg-gradient-to-r from-yellow-200 to-yellow-500 text-transparent bg-clip-text">{BRAND_NAME}</span>
          </div>
          <p className="text-sm leading-relaxed max-w-xs text-slate-500 mb-6">
            Transforming homes across Cuddalore District with premium PVC, UPVC & Aluminium interiors.
            Waterproof • Termite-proof • 10-Year Warranty.
          </p>
          <div className="flex gap-3">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-pink-600 flex items-center justify-center transition-colors" aria-label="Instagram"><Instagram size={16} /></a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-800 hover:bg-blue-600 flex items-center justify-center transition-colors" aria-label="Facebook"><Facebook size={16} /></a>
            <button onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank')} className="w-10 h-10 rounded-full bg-slate-800 hover:bg-green-600 flex items-center justify-center transition-colors" aria-label="WhatsApp">
              <WAIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-white font-black mb-5 text-xs uppercase tracking-widest">Quick Links</h4>
          <ul className="space-y-3 text-sm">
            {[['home', 'Home'], ['services', 'Services'], ['gallery', 'Portfolio'], ['contact', 'Contact Us']].map(([page, label]) => (
              <li key={page}>
                <button onClick={() => { navigate(page); window.scrollTo(0, 0); }} className="hover:text-yellow-400 transition-colors flex items-center gap-2 group">
                  <span className="w-1 h-1 rounded-full bg-yellow-600 group-hover:bg-yellow-400 transition-colors" /> {label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Service Areas */}
        <div>
          <h4 className="text-white font-black mb-5 text-xs uppercase tracking-widest">Service Areas</h4>
          <ul className="space-y-2.5 text-sm">
            {['Vadalur', 'Cuddalore', 'Chidambaram', 'Panruti', 'Neyveli', 'Virudhachalam'].map(area => (
              <li key={area} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 shrink-0" /> {area}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
        <p>© {new Date().getFullYear()} {BRAND_NAME}. All rights reserved.</p>
        <p className="flex items-center gap-1.5"><MapPin size={12} className="text-yellow-600" /> Serving Cuddalore District, Tamil Nadu</p>
      </div>
    </div>
  </footer>
);

// --- APP ---
const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    window.history.replaceState({ page: 'home' }, '', '');
    const handlePopState = (event) => {
      if (event.state?.page) {
        setCurrentPage(event.state.page);
        if (event.state.service) setSelectedService(event.state.service);
      } else setCurrentPage('home');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (page, service = null) => {
    setCurrentPage(page);
    if (service) setSelectedService(service);
    window.history.pushState({ page, service }, '', '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="font-sans text-slate-800 min-h-screen">
      <Navbar setPage={navigate} currentPage={currentPage} />
      <FloatingWAButton />

      <main className="page-fade">
        {currentPage === 'home' && <HomePage setPage={navigate} setSelectedService={setSelectedService} />}
        {currentPage === 'services' && <ServicesPage setSelectedService={setSelectedService} setPage={navigate} />}
        {currentPage === 'service-detail' && <ServiceDetailPage service={selectedService} setPage={navigate} setSelectedService={setSelectedService} />}
        {currentPage === 'gallery' && <GalleryPage />}
        {currentPage === 'contact' && <ContactPage />}
      </main>

      <Footer navigate={navigate} />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&display=swap');

        *, *::before, *::after { font-family: 'Outfit', sans-serif; box-sizing: border-box; }

        html { scroll-behavior: smooth; }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #eab308; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #ca8a04; }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translate3d(0, 40px, 0); }
          to   { opacity: 1; transform: translate3d(0, 0, 0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.9s ease-out forwards; }

        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .animate-fade-in { animation: fadeIn 0.3s ease; }
        .page-fade { animation: fadeIn 0.4s ease; }

        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee { animation: marquee 35s linear infinite; }
        .animate-marquee:hover { animation-play-state: paused; }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default App;