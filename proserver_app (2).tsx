import React, { useState, useEffect } from 'react';
import { 
  Server, 
  Check, 
  User, 
  LogOut, 
  LayoutDashboard, 
  Receipt, 
  ShoppingCart, 
  Menu, 
  X,
  Monitor,
  Cpu,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Zap,
  Headset,
  ChevronDown,
  ChevronUp,
  Activity,
  HardDrive,
  Globe
} from 'lucide-react';
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInAnonymously, 
  signInWithCustomToken, 
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  signOut
} from 'firebase/auth';

// --- Constants ---
const COMPANY_NAME = "Karsa Cloud";
const LOGO_URL = "https://cdn.imageurlgenerator.com/uploads/15cd3015-6160-447f-b474-7010e0cf2cb0.png";
const WHATSAPP_NUMBER = "6285717276390";

// --- Firebase Initialization ---
let auth;
try {
  const firebaseConfig = typeof __firebase_config !== 'undefined' 
    ? JSON.parse(__firebase_config) 
    : { apiKey: "dummy", authDomain: "dummy", projectId: "dummy" };
  const app = initializeApp(firebaseConfig);
  auth = getAuth(app);
} catch (error) {
  console.error("Firebase initialization failed:", error);
}

// --- Data ---
const PACKAGES = [
  // RYZEN SERIES
  { id: "R1", category: "RYZEN", name: "Ryzen 1", cpu: "AMD Ryzen 5 5600", ram: "16 GB", storage: "256 GB NVMe", price: "Rp 440.000", icon: <Cpu className="w-8 h-8 text-orange-500" /> },
  { id: "R2", category: "RYZEN", name: "Ryzen 2", cpu: "AMD Ryzen 5 5600", ram: "32 GB", storage: "256 GB NVMe", price: "Rp 495.000", icon: <Cpu className="w-8 h-8 text-orange-500" /> },
  { id: "R3", category: "RYZEN", name: "Ryzen 3", cpu: "AMD Ryzen 5 5600", ram: "64 GB", storage: "512 GB NVMe", price: "Rp 550.000", icon: <Cpu className="w-8 h-8 text-orange-500" /> },
  { id: "R4", category: "RYZEN", name: "Ryzen 4", cpu: "AMD Ryzen 5 5600X", ram: "32 GB", storage: "256 GB NVMe", price: "Rp 660.000", icon: <Cpu className="w-8 h-8 text-orange-500" /> },
  { id: "R5", category: "RYZEN", name: "Ryzen 5", cpu: "AMD Ryzen 5 5600X", ram: "64 GB", storage: "512 GB NVMe", price: "Rp 737.000", icon: <Cpu className="w-8 h-8 text-orange-500" /> },
  { id: "R6", category: "RYZEN", name: "Ryzen 6", cpu: "AMD Ryzen 7 5700X", ram: "32 GB", storage: "512 GB NVMe", price: "Rp 770.000", icon: <Cpu className="w-8 h-8 text-orange-500" /> },
  { id: "R7", category: "RYZEN", name: "Ryzen 7", cpu: "AMD Ryzen 7 5700X", ram: "64 GB", storage: "512 GB NVMe", price: "Rp 858.000", icon: <Cpu className="w-8 h-8 text-orange-500" /> },
  { id: "R8", category: "RYZEN", name: "Ryzen 8", cpu: "AMD Ryzen 7 5700X", ram: "128 GB", storage: "512 GB NVMe", price: "Rp 924.000", icon: <Cpu className="w-8 h-8 text-orange-500" /> },

  // EPYC SERIES
  { id: "E1", category: "EPYC", name: "EPYC 1", cpu: "AMD EPYC 74F3", ram: "64 GB", storage: "512 GB NVMe", price: "Rp 1.045.000", icon: <Server className="w-8 h-8 text-orange-500" /> },
  { id: "E2", category: "EPYC", name: "EPYC 2", cpu: "AMD EPYC 74F3", ram: "128 GB", storage: "512 GB NVMe", price: "Rp 1.320.000", icon: <Server className="w-8 h-8 text-orange-500" /> },
  { id: "E3", category: "EPYC", name: "EPYC 3", cpu: "AMD EPYC 75F3", ram: "64 GB", storage: "512 GB NVMe", price: "Rp 1.100.000", icon: <Server className="w-8 h-8 text-orange-500" /> },
  { id: "E4", category: "EPYC", name: "EPYC 4", cpu: "AMD EPYC 75F3", ram: "128 GB", storage: "512 GB NVMe", price: "Rp 1.430.000", icon: <Server className="w-8 h-8 text-orange-500" /> },

  // XEON SERIES
  { id: "X1", category: "XEON", name: "XEON 1", cpu: "Intel Xeon E5 2690V4", ram: "32 GB", storage: "256 GB NVMe", price: "Rp 594.000", icon: <Monitor className="w-8 h-8 text-orange-500" /> },
  { id: "X2", category: "XEON", name: "XEON 2", cpu: "Intel Xeon E5 2690V4", ram: "64 GB", storage: "256 GB NVMe", price: "Rp 660.000", icon: <Monitor className="w-8 h-8 text-orange-500" /> },
  { id: "X3", category: "XEON", name: "XEON 3", cpu: "Intel Xeon E5 2690V4", ram: "64 GB", storage: "512 GB NVMe", price: "Rp 748.000", icon: <Monitor className="w-8 h-8 text-orange-500" /> },
  { id: "X4", category: "XEON", name: "XEON 4", cpu: "Intel Xeon E5 2690V4", ram: "128 GB", storage: "512 GB NVMe", price: "Rp 847.000", icon: <Monitor className="w-8 h-8 text-orange-500" /> },
];

const CPU_CORES: Record<string, string> = {
  "AMD Ryzen 5 5600": "6 core / 12 thread",
  "AMD Ryzen 5 5600X": "6 core / 12 thread",
  "AMD Ryzen 7 5700X": "8 core / 16 thread",
  "AMD EPYC 74F3": "24 core / 48 thread",
  "AMD EPYC 75F3": "32 core / 64 thread",
  "Intel Xeon E5 2690V4": "14 core / 28 thread",
};

const FEATURES = [
  { icon: <Zap className="w-8 h-8" />, title: "Performa Super", desc: "Didukung prosesor enterprise AMD Ryzen, EPYC & Intel Xeon dengan 100% NVMe." },
  { icon: <ShieldCheck className="w-8 h-8" />, title: "Proteksi Anti-DDoS", desc: "Mitigasi canggih untuk melindungi infrastruktur dari serangan siber kapan pun." },
  { icon: <Globe className="w-8 h-8" />, title: "Tier 3 Datacenter", desc: "Fasilitas server berlokasi di Jakarta menjamin latensi sangat rendah & stabil untuk user Indonesia." },
  { icon: <Headset className="w-8 h-8" />, title: "24/7 Expert Support", desc: "Tim teknis kami selalu siap memantau dan membantu Anda 24 jam sehari." },
];

const FAQS = [
  { q: "Apa bedanya bare metal dengan VPS?", a: "Bare metal adalah server fisik yang seluruh CPU, RAM, dan storage-nya hanya dipakai oleh Anda, tanpa virtualisasi. VPS berbagi hardware fisik dengan pengguna lain, sehingga performanya bisa terpengaruh oleh mereka." },
  { q: "Berapa lama waktu aktivasi server?", a: "Aktivasi Bare Metal standar memakan waktu 1-24 jam kerja setelah pembayaran diverifikasi. Untuk konfigurasi custom, mungkin memerlukan waktu ekstra." },
  { q: "Apakah saya mendapat akses full root?", a: "Ya, kami memberikan akses kontrol penuh (Full Root Access untuk Linux / Administrator untuk Windows) kepada semua pelanggan." },
  { q: "Dimanakah lokasi Data Center Karsa Cloud?", a: "Server kami secara eksklusif di-hosting di Data Center bersertifikasi Tier-3 di Gedung Cyber 1, Jakarta, memastikan latensi yang optimal untuk bisnis di Indonesia." },
  { q: "Apakah sistem operasi bisa kustom?", a: "Tentu. Anda dapat memilih OS default yang tersedia, atau meminta instalasi OS custom ISO dengan menghubungi tim support kami." },
  { q: "Bagaimana cara memesan?", a: "Pilih paket, lalu klik Pesan. WhatsApp terbuka dengan pesan yang sudah terisi paket pilihan Anda. Tim kami mengonfirmasi pesanan dan pembayaran, lalu server diaktifkan." },
  { q: "Apakah data saya aman?", a: "Setiap paket adalah server fisik khusus yang tidak dibagi dengan klien lain, dilindungi anti-DDoS, dan berada di data center Tier-3 Jakarta. Anda memegang akses root atas sistem dan data Anda." }
];

// Ambient globals yang disuplai platform (Firebase config & token awal)
declare const __firebase_config: string | undefined;
declare const __initial_auth_token: string | undefined;

const STEPS = [
  { t: "Pilih paket", d: "Pakai pemilih paket di beranda atau lihat katalog lengkap." },
  { t: "Konfirmasi lewat WhatsApp", d: "Pesan sudah terisi paket pilihan Anda. Tim kami mengonfirmasi pesanan dan pembayaran." },
  { t: "Server aktif", d: "Setelah pembayaran diverifikasi, server aktif dalam 1-24 jam kerja." },
];

const SECURITY = [
  { t: "Server fisik khusus", d: "Setiap paket adalah bare metal. Perangkat keras tidak dibagi dengan klien lain." },
  { t: "Kendali penuh ada di tangan Anda", d: "Akses Root (Linux) atau Administrator (Windows) atas sistem dan data Anda." },
  { t: "Proteksi anti-DDoS", d: "Mitigasi serangan membantu menjaga layanan Anda tetap online." },
  { t: "Data center Tier-3 di Jakarta", d: "Server berada di Gedung Cyber 1, Jakarta, dengan latensi rendah untuk pengguna Indonesia." },
  { t: "Masuk tanpa kata sandi baru", d: "Client Area memakai akun Google Anda. Kami tidak melihat kata sandi Google Anda." },
];

const USE_CASES = [
  { id: 'game', label: 'Game server skala besar', hint: 'Minecraft network, FiveM, dan sejenisnya', cat: 'RYZEN' },
  { id: 'web', label: 'Website & aplikasi', hint: 'Aplikasi bisnis dan toko online', cat: 'XEON' },
  { id: 'heavy', label: 'Virtualisasi & database', hint: 'Banyak VM atau beban berat 24/7', cat: 'EPYC' },
];

// Ilustrasi vektor bawaan (tanpa hotlink, selalu tampil, bebas lisensi)
const ill = (w: number, h: number, body: string) => 'data:image/svg+xml;utf8,' + encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><defs><linearGradient id="bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1c2540"/><stop offset="1" stop-color="#0a0f1c"/></linearGradient><radialGradient id="gl"><stop offset="0" stop-color="#f97316" stop-opacity=".35"/><stop offset="1" stop-color="#f97316" stop-opacity="0"/></radialGradient></defs><rect width="${w}" height="${h}" fill="url(#bg)"/>${body}</svg>`);

type PersonOpts = { skin?: string; hair?: string; shirt?: string; pants?: string; tablet?: boolean; point?: boolean; flip?: boolean };
const person = (x: number, y: number, s: number, o: PersonOpts = {}) => {
  const { skin = '#e0ac84', hair = '#1a1410', shirt = '#f97316', pants = '#26304d', tablet = false, point = false, flip = false } = o;
  const arm = tablet ? 'M27 -140 L44 -112' : point ? 'M27 -140 L62 -168' : 'M27 -140 L38 -92';
  const hand = tablet ? [46, -110] : point ? [64, -170] : [38, -90];
  return `<g transform="translate(${x} ${y}) scale(${flip ? -s : s} ${s})"><ellipse cx="0" cy="2" rx="46" ry="8" fill="#000" fill-opacity=".35"/><rect x="-17" y="-72" width="15" height="72" rx="4" fill="${pants}"/><rect x="2" y="-72" width="15" height="72" rx="4" fill="${pants}"/><rect x="-21" y="-7" width="20" height="9" rx="4" fill="#0a0f1c"/><rect x="1" y="-7" width="20" height="9" rx="4" fill="#0a0f1c"/><rect x="-30" y="-152" width="60" height="86" rx="18" fill="${shirt}"/><rect x="-5" y="-168" width="10" height="18" fill="${skin}"/><circle cx="0" cy="-182" r="19" fill="${skin}"/><path d="M-20 -184 a20 20 0 0 1 40 0 q-20 -9 -40 0z" fill="${hair}"/><g stroke="${shirt}" stroke-width="13" stroke-linecap="round" fill="none"><path d="M-27 -140 L-38 -92"/><path d="${arm}"/></g><circle cx="-38" cy="-90" r="7" fill="${skin}"/><circle cx="${hand[0]}" cy="${hand[1]}" r="7" fill="${skin}"/><rect x="-8" y="-128" width="16" height="22" rx="3" fill="#fff" fill-opacity=".9"/>${tablet ? '<rect x="30" y="-138" width="40" height="30" rx="4" fill="#0a0f1c" stroke="#34d399" stroke-width="2"/><path d="M37 -116 l8 -8 l8 5 l10 -10" stroke="#34d399" stroke-width="2" fill="none"/>' : ''}</g>`;
};

const rack = (x: number, y: number, w: number, h: number) => {
  const n = 9, step = (h - 28) / n;
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#111830" stroke="#2a3558" stroke-width="2"/>`;
  for (let i = 0; i < n; i++) {
    const yy = y + 14 + i * step, mid = yy + (step - 6) / 2;
    s += `<rect x="${x + 10}" y="${yy}" width="${w - 20}" height="${step - 6}" rx="3" fill="#1c2540"/><circle cx="${x + 21}" cy="${mid}" r="3" fill="${(i * 7 + x) % 3 === 0 ? '#f97316' : '#34d399'}"/><rect x="${x + 34}" y="${mid - 1.5}" width="${w - 58}" height="3" rx="1.5" fill="#2e3a63"/>`;
  }
  return s;
};

const ILLUS = {
  // Teknisi IT di lorong rak server
  datacenter: ill(800, 450,
    `<circle cx="640" cy="250" r="210" fill="url(#gl)"/><rect y="40" width="800" height="4" fill="#f97316" fill-opacity=".5"/>` +
    [30, 140, 250, 360, 470].map(x => rack(x, 70, 95, 310)).join('') +
    `<rect y="380" width="800" height="70" fill="#0a0f1c"/><rect y="380" width="800" height="3" fill="#f97316" fill-opacity=".6"/>` +
    person(660, 432, 1.35, { tablet: true, skin: '#c68642', hair: '#14100c' })),
  // Tim IT memantau layar status
  team: ill(800, 520,
    `<circle cx="400" cy="200" r="270" fill="url(#gl)"/><rect x="175" y="60" width="450" height="280" rx="14" fill="#0d1322" stroke="#2a3558" stroke-width="3"/>` +
    [60, 90, 70, 120, 100, 140, 110, 150, 130, 140].map((h, i) => `<rect x="${200 + i * 40}" y="${300 - h}" width="26" height="${h}" rx="4" fill="${i % 3 === 0 ? '#f97316' : '#3b4a7a'}"/>`).join('') +
    `<path d="M200 270 L240 245 L280 255 L320 215 L360 225 L400 190 L440 200 L480 165 L520 175 L560 140" stroke="#34d399" stroke-width="4" fill="none" stroke-linecap="round"/>` +
    [200, 330, 460].map(x => `<rect x="${x}" y="80" width="120" height="34" rx="8" fill="#151c30"/><circle cx="${x + 16}" cy="97" r="5" fill="#34d399"/><rect x="${x + 30}" y="93" width="70" height="8" rx="4" fill="#2e3a63"/>`).join('') +
    `<rect x="385" y="340" width="30" height="30" fill="#2a3558"/><rect x="340" y="368" width="120" height="10" rx="5" fill="#2a3558"/><rect y="478" width="800" height="42" fill="#0a0f1c"/>` +
    person(95, 505, 1, { point: true }) + person(705, 505, 1, { flip: true, tablet: true, shirt: '#3b82f6', skin: '#8d5524', hair: '#0f0b08' })),
  // Petugas support dengan headset
  support: ill(500, 560,
    `<circle cx="250" cy="300" r="230" fill="url(#gl)"/><rect x="24" y="50" width="200" height="64" rx="16" fill="#151c30" stroke="#f97316" stroke-width="2"/><rect x="44" y="72" width="130" height="8" rx="4" fill="#4b5a8c"/><rect x="44" y="90" width="90" height="8" rx="4" fill="#2e3a63"/>` +
    `<rect x="290" y="130" width="190" height="60" rx="16" fill="#151c30" stroke="#34d399" stroke-width="2"/><circle cx="318" cy="160" r="12" fill="#34d399"/><path d="M312 160 l5 5 l9 -10" stroke="#0a0f1c" stroke-width="3" fill="none"/><rect x="340" y="150" width="110" height="8" rx="4" fill="#4b5a8c"/><rect x="340" y="168" width="70" height="8" rx="4" fill="#2e3a63"/>` +
    `<path d="M70 560 Q80 430 250 410 Q420 430 430 560Z" fill="#3b82f6"/><rect x="232" y="380" width="36" height="40" fill="#e0ac84"/><circle cx="250" cy="320" r="72" fill="#e0ac84"/><path d="M178 315 a72 72 0 0 1 144 0 q-40 -30 -144 0z" fill="#1a1410"/>` +
    `<path d="M172 320 a78 78 0 0 1 156 0" stroke="#f97316" stroke-width="10" fill="none" stroke-linecap="round"/><rect x="160" y="305" width="22" height="46" rx="10" fill="#f97316"/><rect x="318" y="305" width="22" height="46" rx="10" fill="#f97316"/><path d="M330 345 Q335 385 285 380" stroke="#f97316" stroke-width="5" fill="none"/><circle cx="283" cy="380" r="7" fill="#f97316"/>` +
    `<circle cx="226" cy="322" r="5" fill="#1a1410"/><circle cx="274" cy="322" r="5" fill="#1a1410"/><path d="M228 350 Q250 368 272 350" stroke="#1a1410" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M215 415 L250 455 L285 415" fill="#fff" fill-opacity=".9"/>` +
    `<circle cx="420" cy="470" r="38" fill="#f97316"/><text x="420" y="478" font-size="22" font-weight="700" text-anchor="middle" fill="#1a0e02" font-family="Arial,sans-serif">24/7</text>`),
};

function GlobalStyle() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
      body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; background: #0d1322; }
      h1, h2, h3, h4 { font-family: 'Bricolage Grotesque', 'Plus Jakarta Sans', system-ui, sans-serif; }
      html { scroll-behavior: smooth; }
      :focus-visible { outline: 2px solid #ffa45c; outline-offset: 3px; }
      @keyframes shimmer { 100% { transform: translateX(100%); } }
      @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; } }
    `}</style>
  );
}

// Pemilih paket: jawab dua pertanyaan, dapat satu rekomendasi dari katalog asli.
function PlanFinder({ onOrder, onSeeAll }: { onOrder: (n: string, p: string, s: string) => void; onSeeAll: () => void }) {
  const [useCase, setUseCase] = useState('game');
  const [want, setWant] = useState(32);
  const cat = USE_CASES.find(u => u.id === useCase)!.cat;
  const pool = PACKAGES.filter(p => p.category === cat);
  const ram = (p: { ram: string }) => parseInt(p.ram);
  const cost = (p: { price: string }) => parseInt(p.price.replace(/\D/g, ''));
  const pick = pool.filter(p => ram(p) >= want).sort((a, b) => cost(a) - cost(b))[0]
    ?? [...pool].sort((a, b) => ram(b) - ram(a) || cost(a) - cost(b))[0];
  const chip = (on: boolean) => `px-4 py-2.5 rounded-xl text-sm font-semibold border transition-colors ${on ? 'bg-orange-500 border-orange-500 text-[#1a0e02]' : 'bg-white/5 border-white/10 text-slate-200 hover:border-white/30'}`;
  return (
    <div className="bg-[#151c30] border border-white/10 rounded-3xl p-6 md:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
      <h2 className="text-2xl font-extrabold text-white mb-1">Bingung pilih paket?</h2>
      <p className="text-slate-400 text-sm mb-6">Jawab dua pertanyaan, kami tunjukkan yang paling pas.</p>
      <p className="text-sm font-semibold text-white mb-2">Server untuk apa?</p>
      <div className="grid gap-2 mb-6">
        {USE_CASES.map(u => (
          <button key={u.id} aria-pressed={useCase === u.id} onClick={() => setUseCase(u.id)} className={`text-left px-4 py-3 rounded-xl border transition-colors ${useCase === u.id ? 'border-orange-500 bg-orange-500/10' : 'border-white/10 bg-white/5 hover:border-white/30'}`}>
            <span className="block text-white font-semibold text-sm">{u.label}</span>
            <span className="block text-slate-400 text-xs">{u.hint}</span>
          </button>
        ))}
      </div>
      <p className="text-sm font-semibold text-white mb-2">Butuh RAM minimal</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {[16, 32, 64, 128].map(r => <button key={r} aria-pressed={want === r} onClick={() => setWant(r)} className={chip(want === r)}>{r} GB</button>)}
      </div>
      <div className="rounded-2xl border border-white/10 bg-[#0d1322] p-5">
        <p className="text-xs text-slate-400 mb-1">Rekomendasi kami</p>
        <div className="flex items-baseline justify-between gap-3 mb-1">
          <h3 className="text-2xl font-extrabold text-white">{pick.name}</h3>
          <p className="text-white font-bold">{pick.price}<span className="text-slate-400 font-medium text-sm">/bln</span></p>
        </div>
        <p className="text-sm text-slate-300 mb-4">{pick.cpu} ({CPU_CORES[pick.cpu]}) &middot; {pick.ram} RAM &middot; {pick.storage}</p>
        <button onClick={() => onOrder(pick.name, pick.price, `${pick.cpu}, ${pick.ram} RAM, ${pick.storage}`)} className="w-full py-3.5 rounded-xl bg-orange-500 hover:bg-orange-400 text-[#1a0e02] font-bold transition-colors">Pesan lewat WhatsApp</button>
        <button onClick={onSeeAll} className="w-full mt-2 py-2 text-sm text-slate-300 hover:text-white">Lihat semua paket</button>
      </div>
    </div>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('home');
  const [dashView, setDashView] = useState('active');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('RYZEN');
  const [openFaq, setOpenFaq] = useState(null);
  const [authError, setAuthError] = useState('');

  // --- Auth Effect ---
  useEffect(() => {
    if (!auth) return;
    const initAuth = async () => {
      try {
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (error) {
        console.error("Auth init error:", error);
      }
    };
    initAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => setUser(currentUser));
    return () => unsubscribe();
  }, []);

  // --- Scroll Effect for Navbar ---
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Handlers ---
  const handleGoogleLogin = async () => {
    setAuthError('');
    try {
      if (!auth) throw new Error('auth-unavailable');
      await signInWithPopup(auth, new GoogleAuthProvider());
      setCurrentView('dashboard');
    } catch (error) {
      console.error("Google Login failed:", error);
      setAuthError('Login belum berhasil. Pastikan popup tidak diblokir browser, lalu coba lagi.');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await signInAnonymously(auth);
      setCurrentView('home');
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const orderViaWA = (pkgName, price, specs = '') => {
    const text = `Halo Karsa Cloud, saya tertarik memesan server *${pkgName}*${specs ? ` (${specs})` : ''}, lokasi Jakarta, harga *${price}/bulan*. Mohon informasi lebih lanjut.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`, '_blank', 'noopener');
  };

  const scrollToSection = (id) => {
    if (currentView !== 'home') {
      setCurrentView('home');
      setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }), 150);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const isFullyLogged = user && !user.isAnonymous;

  // --- Shared Components ---
  const Navbar = () => (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0d1322]/90 backdrop-blur-xl border-b border-white/10 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.5)]' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center cursor-pointer group" onClick={() => scrollToSection('home')}>
            <img src={LOGO_URL} alt="Karsa Cloud Logo" className="h-10 w-10 object-contain mr-3 group-hover:scale-110 transition-transform duration-300" />
            <span className="font-bold text-2xl text-white tracking-tight hidden sm:block">Karsa <span className="text-orange-500">Cloud</span></span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-sm font-semibold text-slate-300 hover:text-orange-500 transition-colors tracking-wide">Beranda</button>
            <button onClick={() => scrollToSection('about')} className="text-sm font-semibold text-slate-300 hover:text-orange-500 transition-colors tracking-wide">Tentang Kami</button>
            <button onClick={() => scrollToSection('features')} className="text-sm font-semibold text-slate-300 hover:text-orange-500 transition-colors tracking-wide">Infrastruktur</button>
            <button onClick={() => scrollToSection('products')} className="text-sm font-semibold text-slate-300 hover:text-orange-500 transition-colors tracking-wide">Produk</button>
            <button onClick={() => scrollToSection('faq')} className="text-sm font-semibold text-slate-300 hover:text-orange-500 transition-colors tracking-wide">FAQ</button>
            
            <div className="w-px h-5 bg-white/20"></div>

            <button 
              onClick={() => setCurrentView('dashboard')}
              className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-500 hover:to-orange-400 text-[#1a0e02] font-bold px-6 py-2.5 rounded-full transition-all duration-300 text-sm flex items-center gap-2 shadow-[0_0_15px_rgba(249,115,22,0.4)] hover:shadow-[0_0_25px_rgba(249,115,22,0.6)] hover:-translate-y-0.5"
            >
              <User className="w-4 h-4" />
              {isFullyLogged ? 'Dashboard' : 'Client Area'}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-300 hover:text-white p-2">
              {isMobileMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0d1322]/95 border-b border-white/10 absolute w-full backdrop-blur-xl">
          <div className="px-4 pt-2 pb-6 space-y-1">
            <button onClick={() => scrollToSection('home')} className="block w-full text-left px-4 py-3 text-base font-semibold text-slate-300 hover:bg-white/5 rounded-xl">Beranda</button>
            <button onClick={() => scrollToSection('about')} className="block w-full text-left px-4 py-3 text-base font-semibold text-slate-300 hover:bg-white/5 rounded-xl">Tentang Kami</button>
            <button onClick={() => scrollToSection('features')} className="block w-full text-left px-4 py-3 text-base font-semibold text-slate-300 hover:bg-white/5 rounded-xl">Infrastruktur</button>
            <button onClick={() => scrollToSection('products')} className="block w-full text-left px-4 py-3 text-base font-semibold text-slate-300 hover:bg-white/5 rounded-xl">Produk</button>
            <button onClick={() => scrollToSection('faq')} className="block w-full text-left px-4 py-3 text-base font-semibold text-slate-300 hover:bg-white/5 rounded-xl">FAQ</button>
            <div className="pt-4 mt-2 border-t border-white/10">
              <button 
                onClick={() => { setCurrentView('dashboard'); setIsMobileMenuOpen(false); }}
                className="w-full flex items-center justify-center gap-2 bg-orange-500 text-[#1a0e02] font-bold px-4 py-3.5 rounded-xl"
              >
                <User className="w-5 h-5" />
                {isFullyLogged ? 'Masuk Dashboard' : 'Login / Client Area'}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );

  const PricingCard = ({ pkg }) => (
    <div className="group relative flex flex-col bg-[#151c30] border border-white/10 rounded-2xl p-7 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(249,115,22,0.15)] hover:border-orange-500/50 overflow-hidden h-full z-10">
      <div className="absolute -right-10 -top-10 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl group-hover:bg-orange-500/20 transition-all"></div>
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-orange-500 text-xs font-black tracking-widest uppercase mb-1 block">{pkg.category} Series</span>
          <h3 className="text-2xl font-bold text-white uppercase">{pkg.name}</h3>
        </div>
        <div className="p-3 bg-white/5 rounded-xl border border-white/10 group-hover:border-orange-500/30 transition-colors">
          {pkg.icon}
        </div>
      </div>
      
      <div className="mb-8">
        <span className="text-3xl font-extrabold text-white tracking-tight">{pkg.price}</span>
        <span className="text-slate-500 font-medium">/bln</span>
      </div>

      <div className="flex-grow space-y-4 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
             <Check className="w-3 h-3 text-orange-500" />
          </div>
          <span className="text-slate-300 text-sm">CPU: <span className="font-bold text-white">{pkg.cpu}</span></span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
             <Check className="w-3 h-3 text-orange-500" />
          </div>
          <span className="text-slate-300 text-sm">Core: <span className="font-bold text-white">{CPU_CORES[pkg.cpu] ?? '-'}</span></span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
             <Check className="w-3 h-3 text-orange-500" />
          </div>
          <span className="text-slate-300 text-sm">RAM: <span className="font-bold text-white">{pkg.ram}</span></span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
             <Check className="w-3 h-3 text-orange-500" />
          </div>
          <span className="text-slate-300 text-sm">Drive: <span className="font-bold text-white">{pkg.storage}</span></span>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-full bg-orange-500/20 flex items-center justify-center shrink-0">
             <Check className="w-3 h-3 text-orange-500" />
          </div>
          <span className="text-slate-300 text-sm">Lokasi: <span className="font-bold text-white">Jakarta, Indonesia</span></span>
        </div>
      </div>

      <button 
        onClick={() => orderViaWA(pkg.name, pkg.price, `${pkg.cpu}, ${pkg.ram} RAM, ${pkg.storage}`)}
        className="w-full py-3.5 px-4 mt-auto bg-white/5 hover:bg-orange-500 border border-white/10 hover:border-orange-500 text-white hover:text-[#1a0e02] font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-[0_0_15px_rgba(249,115,22,0.4)]"
      >
        Pesan Sekarang
      </button>
    </div>
  );

  const ProductsList = () => {
    return (
      <div className="w-full">
        {/* Futuristic Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-14">
          {['RYZEN', 'EPYC', 'XEON'].map(cat => (
            <button 
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`relative px-8 py-3 rounded-full font-bold text-sm tracking-wider transition-all duration-300 overflow-hidden ${
                activeTab === cat 
                  ? 'text-white border border-orange-500 shadow-[0_0_20px_rgba(249,115,22,0.3)] bg-orange-500/10' 
                  : 'text-slate-400 border border-white/10 hover:border-white/30 hover:text-white bg-[#151c30]'
              }`}
            >
              {activeTab === cat && <div className="absolute inset-0 bg-orange-500 opacity-20 blur-md"></div>}
              <span className="relative z-10">{cat} SERIES</span>
            </button>
          ))}
        </div>
        
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {PACKAGES.filter(p => p.category === activeTab).map(pkg => (
            <PricingCard key={pkg.id} pkg={pkg} />
          ))}
        </div>
      </div>
    );
  };

  const FAQAccordion = ({ q, a, open, onToggle }) => (
    <div className={`border-b ${open ? 'border-orange-500/50' : 'border-white/10'} transition-colors duration-300`}>
      <button className="w-full py-6 flex justify-between items-center text-left group" onClick={onToggle} aria-expanded={open}>
        <span className={`font-semibold text-lg md:text-xl pr-4 ${open ? 'text-orange-400' : 'text-slate-200 group-hover:text-white'}`}>{q}</span>
        <div className={`p-2 rounded-full border transition-all duration-300 ${open ? 'bg-orange-500/10 border-orange-500/30 text-orange-400' : 'border-white/10 text-slate-400 group-hover:border-white/30'}`}>
          {open ? <ChevronUp className="w-5 h-5"/> : <ChevronDown className="w-5 h-5"/>}
        </div>
      </button>
      <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr] pb-6' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden text-slate-300 leading-relaxed">{a}</div>
      </div>
    </div>
  );

  const Footer = () => (
    <footer className="bg-[#0a0f1c] border-t border-white/10 pt-24 pb-12 relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[100px] pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <img src={LOGO_URL} alt="Karsa Cloud Logo" className="h-10 w-10 object-contain mr-3" />
              <span className="font-bold text-2xl text-white tracking-tight">Karsa <span className="text-orange-500">Cloud</span></span>
            </div>
            <p className="text-slate-400 leading-relaxed mb-8">
              Penyedia server bare metal dedicated yang berpusat di Jakarta, Indonesia. Hardware fisik penuh untuk Anda, tanpa virtualisasi.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all"><Facebook className="w-5 h-5"/></a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all"><Instagram className="w-5 h-5"/></a>
              <a href="#" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-orange-500 hover:border-orange-500 hover:text-white transition-all"><Linkedin className="w-5 h-5"/></a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 tracking-wide">Produk Kami</h4>
            <ul className="space-y-3 text-slate-400">
              <li><a href="#products" onClick={(e)=>{e.preventDefault();setActiveTab('RYZEN');scrollToSection('products')}} className="hover:text-orange-500 transition-colors flex items-center gap-2"><ChevronDown className="w-3 h-3 -rotate-90"/> Ryzen Servers</a></li>
              <li><a href="#products" onClick={(e)=>{e.preventDefault();setActiveTab('EPYC');scrollToSection('products')}} className="hover:text-orange-500 transition-colors flex items-center gap-2"><ChevronDown className="w-3 h-3 -rotate-90"/> EPYC Enterprise</a></li>
              <li><a href="#products" onClick={(e)=>{e.preventDefault();setActiveTab('XEON');scrollToSection('products')}} className="hover:text-orange-500 transition-colors flex items-center gap-2"><ChevronDown className="w-3 h-3 -rotate-90"/> Intel Xeon</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 tracking-wide">Perusahaan</h4>
            <ul className="space-y-3 text-slate-400">
              <li><button onClick={() => scrollToSection('about')} className="hover:text-orange-500 transition-colors flex items-center gap-2"><ChevronDown className="w-3 h-3 -rotate-90"/> Tentang Kami</button></li>
              <li><button onClick={() => setCurrentView('tos')} className="hover:text-orange-500 transition-colors flex items-center gap-2"><ChevronDown className="w-3 h-3 -rotate-90"/> Ketentuan Layanan</button></li>
              <li><button onClick={() => setCurrentView('privacy')} className="hover:text-orange-500 transition-colors flex items-center gap-2"><ChevronDown className="w-3 h-3 -rotate-90"/> Kebijakan Privasi</button></li>
              <li><a href="#faq" onClick={(e)=>{e.preventDefault();scrollToSection('faq')}} className="hover:text-orange-500 transition-colors flex items-center gap-2"><ChevronDown className="w-3 h-3 -rotate-90"/> FAQ & Bantuan</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-lg mb-6 tracking-wide">Kantor Pusat</h4>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-start gap-3 group">
                <div className="p-2 bg-white/5 rounded-lg shrink-0 mt-1 group-hover:bg-orange-500/20 transition-colors"><MapPin className="w-4 h-4 text-orange-500" /></div>
                <span className="text-sm">Gedung Cyber 1<br/>Jl. Kuningan Barat No. 8<br/>Jakarta Selatan, 12710<br/>Indonesia</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 bg-white/5 rounded-lg shrink-0 group-hover:bg-orange-500/20 transition-colors"><Phone className="w-4 h-4 text-orange-500" /></div>
                <span className="text-sm">+62 857-1727-6390</span>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="p-2 bg-white/5 rounded-lg shrink-0 group-hover:bg-orange-500/20 transition-colors"><Mail className="w-4 h-4 text-orange-500" /></div>
                <span className="text-sm">support@karsacloud.com</span>
              </li>
            </ul>
          </div>

        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} {COMPANY_NAME}. Hak cipta dilindungi.
          </p>
          <div className="flex gap-3">
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-bold text-slate-400">VISA</span>
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-bold text-slate-400">MASTERCARD</span>
            <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-xs font-bold text-slate-400">QRIS</span>
          </div>
        </div>
      </div>
    </footer>
  );

  // --- Views ---
  const LandingPage = () => (
    <div className="min-h-screen bg-[#0d1322] text-slate-300 font-sans selection:bg-orange-500/30 selection:text-orange-200 overflow-x-hidden">
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-24 md:pt-40 md:pb-32 flex items-center min-h-[95vh] overflow-hidden">
        {/* Background Grid & Glow */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#0d1322]"></div>
          <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
          <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/20 rounded-full blur-[150px] pointer-events-none"></div>
          <img src={ILLUS.datacenter} alt="" aria-hidden="true" className="absolute inset-y-0 right-0 h-full w-full lg:w-3/5 object-cover opacity-30 [mask-image:linear-gradient(to_left,black,transparent)]" />
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0d1322] to-transparent z-10"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
             
             {/* Left Content */}
             <div className="text-left">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8">
                  <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
                  <span className="text-xs md:text-sm font-semibold text-slate-300 tracking-wider uppercase">Data Center Jakarta, Indonesia</span>
               </div>
               
               <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6 leading-[1.05]">
                 Sewa server bare metal di Jakarta, tanpa ribet.
               </h1>
               <p className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-xl">
                 Hardware fisik 100% milik Anda, tanpa virtualisasi. Pilih paket, pesan lewat WhatsApp, dan server aktif dalam 1-24 jam kerja.
               </p>
               
               <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                 <button onClick={() => scrollToSection('products')} className="group relative bg-orange-500 text-[#1a0e02] font-bold px-8 py-4 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] hover:-translate-y-1 overflow-hidden">
                   <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
                   <span className="relative flex items-center justify-center gap-2 text-lg">
                     Lihat Layanan <Activity className="w-5 h-5"/>
                   </span>
                 </button>
                 <button onClick={() => setCurrentView('dashboard')} className="bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 text-white font-bold px-8 py-4 rounded-full transition-all duration-300 text-lg flex items-center justify-center gap-2">
                   Client Area <User className="w-5 h-5"/>
                 </button>
               </div>
             </div>

             <PlanFinder onOrder={orderViaWA} onSeeAll={() => scrollToSection('products')} />

           </div>
        </div>
      </section>

      <div className="border-y border-white/10 bg-[#111830] py-6">
        <ul className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-slate-200">
          <li className="font-bold text-white">Sudah termasuk di setiap paket:</li>
          {['Akses root penuh', '100% NVMe', 'Anti-DDoS', 'Port 10 Gbps', 'Support 24/7', 'Uptime SLA 99.9%'].map(t => (
            <li key={t} className="flex items-center gap-2"><Check className="w-4 h-4 text-emerald-400" />{t}</li>
          ))}
        </ul>
      </div>

      {/* About Us Section */}
      <section id="about" className="py-24 bg-[#0d1322] relative border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative order-2 lg:order-1">
               <div className="absolute -inset-4 bg-orange-600/20 rounded-3xl blur-xl"></div>
               <img 
                 src={ILLUS.team} 
                 alt="Karsa Cloud IT Experts" 
                 className="relative rounded-3xl border border-white/10 shadow-[0_0_40px_rgba(249,115,22,0.2)] object-cover w-full h-[400px] hover:scale-105 transition-transform duration-500"
               />
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-orange-500 font-bold tracking-widest uppercase mb-2">Tentang Karsa Cloud</h2>
              <h3 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">Dedikasi Penuh untuk Infrastruktur IT Indonesia.</h3>
              <p className="text-slate-400 text-lg leading-relaxed mb-6">
                Kami adalah kumpulan profesional IT yang berfokus pada penyediaan layanan server premium. Berbasis di <strong className="text-white">Gedung Cyber 1, Jakarta</strong>, Karsa Cloud hadir untuk memangkas latensi dan memaksimalkan *throughput* bagi aplikasi bisnis skala besar di tanah air.
              </p>
              <ul className="space-y-4 text-slate-300">
                <li className="flex items-center gap-3"><Check className="text-orange-500 w-5 h-5"/> Standar Keamanan Data Tingkat Tinggi</li>
                <li className="flex items-center gap-3"><Check className="text-orange-500 w-5 h-5"/> Dukungan Tim Engineer Tersertifikasi</li>
                <li className="flex items-center gap-3"><Check className="text-orange-500 w-5 h-5"/> Skalabilitas Sesuai Pertumbuhan Bisnis</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features & Infrastructure Section */}
      <section id="features" className="py-24 bg-[#0a0f1c] relative border-b border-white/5">
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/10 blur-[120px] pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-orange-500 font-bold tracking-widest uppercase mb-2">Infrastruktur Enterprise</h2>
            <h3 className="text-3xl md:text-5xl font-black text-white mb-6">Kenapa Memilih Karsa Cloud?</h3>
            <p className="text-slate-400 text-lg">Infrastruktur yang dirancang dari nol untuk stabilitas maksimal, keamanan tangguh, dan performa tanpa kompromi yang berpusat di Jakarta.</p>
          </div>
          
          {/* Feature Highlight Image */}
          <div className="mb-16 relative rounded-[2rem] overflow-hidden group">
            <div className="absolute inset-0 bg-orange-600/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-700"></div>
            <img 
              src={ILLUS.datacenter} 
              alt="Data Center Jakarta" 
              className="w-full h-[300px] md:h-[400px] object-cover border border-white/10 shadow-[0_0_50px_rgba(249,115,22,0.15)] group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] via-[#0a0f1c]/50 to-transparent z-10"></div>
            <div className="absolute bottom-8 left-8 z-20">
               <span className="bg-orange-500 text-[#1a0e02] font-bold px-4 py-1 rounded-full text-xs uppercase tracking-wider mb-2 inline-block shadow-lg">Tier 3 Datacenter</span>
               <h4 className="text-3xl font-bold text-white">Gedung Cyber 1, Jakarta Selatan</h4>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feat, idx) => (
              <div key={idx} className="bg-[#151c30] border border-white/5 hover:border-orange-500/30 rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 group">
                <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500 mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors shadow-inner">
                  {feat.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feat.title}</h3>
                <p className="text-slate-400 leading-relaxed text-sm">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="steps" className="py-20 bg-[#0d1322] border-b border-white/5">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-3">Pesan server dalam 3 langkah</h3>
          <p className="text-slate-400 mb-10 max-w-xl">Tanpa formulir panjang. Anda cukup memilih paket lalu berbincang dengan tim kami.</p>
          <ol className="grid md:grid-cols-3 gap-4">
            {STEPS.map((s, i) => (
              <li key={s.t} className="bg-[#151c30] border border-white/10 rounded-2xl p-6">
                <span className="text-orange-400 font-extrabold text-2xl">{i + 1}</span>
                <h4 className="text-white font-bold mt-3 mb-1">{s.t}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 bg-[#0d1322] relative border-b border-white/5">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-orange-600/10 blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-orange-500 font-bold tracking-widest uppercase mb-2">Katalog Server</h2>
            <h3 className="text-3xl md:text-5xl font-black text-white mb-6">Paket Bare Metal Server</h3>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Pilih spesifikasi yang paling sesuai dengan kebutuhan aplikasi dan skala bisnis Anda. Seluruh server dihosting di Jakarta, Indonesia.
            </p>
          </div>
          
          <ProductsList />
        </div>
      </section>

      <section id="security" className="py-24 bg-[#0d1322] border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <h3 className="text-3xl md:text-5xl font-extrabold text-white mb-5 leading-tight">Data Anda tetap milik Anda.</h3>
            <p className="text-slate-400 text-lg leading-relaxed mb-6 max-w-md">Kami menyiapkan hal-hal dasar keamanan sejak awal, supaya Anda tidak perlu memikirkannya saat memesan.</p>
            <button onClick={() => setCurrentView('privacy')} className="text-orange-400 hover:text-orange-300 font-semibold underline underline-offset-4">Baca ringkasan privasi</button>
          </div>
          <ul className="lg:col-span-3 divide-y divide-white/10 border-y border-white/10">
            {SECURITY.map(s => (
              <li key={s.t} className="flex gap-4 py-5">
                <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                <div><h4 className="text-white font-bold mb-1">{s.t}</h4><p className="text-slate-400 text-sm leading-relaxed">{s.d}</p></div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ & Contact Image Section */}
      <section id="faq" className="py-24 bg-[#0a0f1c]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            
            <div className="lg:col-span-2 relative">
               <img 
                 src={ILLUS.support} 
                 alt="Cyber Security & Support" 
                 className="w-full h-full object-cover rounded-3xl border border-white/10 shadow-[0_0_30px_rgba(249,115,22,0.15)] min-h-[400px]"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1c] to-transparent rounded-3xl"></div>
               <div className="absolute bottom-8 left-8 right-8">
                  <div className="bg-[#151c30]/80 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                     <Headset className="w-10 h-10 text-orange-500 mb-3"/>
                     <h4 className="text-xl font-bold text-white mb-2">Butuh Bantuan Teknis?</h4>
                     <p className="text-slate-400 text-sm mb-4">Tim IT Support kami di Jakarta siap membantu Anda 24/7.</p>
                     <button onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank')} className="w-full py-2 bg-orange-500 hover:bg-orange-400 text-[#1a0e02] rounded-lg font-bold transition-colors">
                       Hubungi Support
                     </button>
                  </div>
               </div>
            </div>

            <div className="lg:col-span-3">
              <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Frequently Asked Questions</h2>
                <p className="text-slate-400 text-lg">Pertanyaan umum seputar layanan Karsa Cloud.</p>
              </div>
              
              <div className="bg-[#151c30] border border-white/10 rounded-3xl p-6 md:p-8">
                {FAQS.map((faq, idx) => (
                  <FAQAccordion key={idx} q={faq.q} a={faq.a} open={openFaq === idx} onToggle={() => setOpenFaq(openFaq === idx ? null : idx)} />
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>
      
      <section className="py-16 bg-[#111830] border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-2">Belum yakin paket mana yang cocok?</h3>
            <p className="text-slate-300 max-w-lg">Ceritakan kebutuhan Anda, tim kami bantu pilihkan spesifikasi yang pas.</p>
          </div>
          <button onClick={() => window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Halo Karsa Cloud, saya ingin konsultasi memilih paket bare metal.')}`, '_blank', 'noopener')} className="shrink-0 px-8 py-4 rounded-xl bg-orange-500 hover:bg-orange-400 text-[#1a0e02] font-bold transition-colors">Konsultasi lewat WhatsApp</button>
        </div>
      </section>
      <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" aria-label="Chat WhatsApp dengan tim Karsa Cloud" className="fixed bottom-5 right-5 z-40 flex items-center gap-2 bg-emerald-400 hover:bg-emerald-300 text-[#04210f] font-bold pl-4 pr-5 py-3 rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.5)] transition-colors">
        <Headset className="w-5 h-5" /> Tanya tim
      </a>
      <Footer />
    </div>
  );

  const LoginScreen = () => (
    <div className="min-h-screen bg-[#0d1322] text-white flex flex-col relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-orange-600/20 blur-[100px] pointer-events-none rounded-full"></div>
      
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 relative z-10 pt-20">
        <div className="max-w-md w-full bg-[#151c30]/80 backdrop-blur-xl border border-white/10 p-10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-600 to-orange-400"></div>
          <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-6 shadow-inner">
            <User className="w-10 h-10 text-orange-500" />
          </div>
          <h2 className="text-3xl font-black text-white mb-3">Client Area</h2>
          <p className="text-slate-400 mb-10 text-sm leading-relaxed">Autentikasi aman untuk mengelola layanan infrastruktur Anda di Karsa Cloud.</p>
          
          <button 
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white hover:bg-gray-100 text-[#0d1322] font-bold py-4 px-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Masuk dengan Google
          </button>
          {authError && <p role="alert" className="mt-4 text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl p-3 text-left">{authError}</p>}
          <ul className="mt-8 space-y-2 text-left text-xs text-slate-400">
            <li className="flex gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" />Kami tidak melihat kata sandi Google Anda.</li>
            <li className="flex gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" />Hanya nama, email, dan foto profil yang tampil di Client Area.</li>
            <li className="flex gap-2"><Check className="w-4 h-4 text-emerald-400 shrink-0" />Anda bisa keluar kapan saja.</li>
          </ul>
          <button onClick={() => setCurrentView('home')} className="mt-6 text-sm text-slate-400 hover:text-white">&larr; Kembali ke beranda</button>
        </div>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="min-h-screen bg-[#0a0f1c] flex flex-col md:flex-row font-sans selection:bg-orange-500/30 text-white">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex w-72 flex-col bg-[#0d1322] border-r border-white/5 relative z-10 shadow-2xl">
        <div className="h-20 flex items-center px-6 border-b border-white/5 cursor-pointer hover:bg-white/5 transition-colors" onClick={() => setCurrentView('home')}>
          <img src={LOGO_URL} alt="Karsa Cloud Logo" className="h-8 w-8 object-contain mr-3" />
          <span className="font-bold text-xl tracking-tight">Karsa <span className="text-orange-500">Cloud</span></span>
        </div>
        
        <div className="p-6 flex-1">
          <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 px-2">Menu Utama</div>
          <nav className="space-y-2">
            <button 
              onClick={() => setDashView('active')}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${dashView === 'active' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20 shadow-inner' : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
            >
              <LayoutDashboard className="w-5 h-5" />
              Layanan Aktif
            </button>
            <button 
              onClick={() => setDashView('order')}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${dashView === 'order' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20 shadow-inner' : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
            >
              <ShoppingCart className="w-5 h-5" />
              Pesan Layanan Baru
            </button>
            <button 
              onClick={() => setDashView('invoice')}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold transition-all duration-300 ${dashView === 'invoice' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20 shadow-inner' : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
            >
              <Receipt className="w-5 h-5" />
              Tagihan & Invoice
            </button>
          </nav>
        </div>

        <div className="p-6 border-t border-white/5 bg-[#0d1322]">
          <div className="flex items-center gap-4 mb-6 bg-white/5 p-3 rounded-xl border border-white/5">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-10 h-10 rounded-lg object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-[#151c30] flex items-center justify-center border border-white/10">
                <User className="w-5 h-5 text-slate-400" />
              </div>
            )}
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">{user?.displayName || 'Client'}</p>
              <p className="text-xs text-slate-500 truncate">{user?.email || 'user@example.com'}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-red-500 hover:text-white hover:bg-red-500 rounded-xl transition-all border border-red-500/20">
            <LogOut className="w-4 h-4" />
            Keluar Aplikasi
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-y-auto relative bg-[#0a0f1c]">
        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 bg-[#0d1322] border-b border-white/5 sticky top-0 z-20">
          <div className="flex items-center cursor-pointer" onClick={() => setCurrentView('home')}>
             <img src={LOGO_URL} alt="Logo" className="h-8 w-8 object-contain mr-2" />
             <span className="font-bold text-xl">Karsa <span className="text-orange-500">Cloud</span></span>
          </div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-300 p-2 bg-white/5 rounded-lg border border-white/10">
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-[#0d1322] border-b border-white/5 p-4 space-y-2 sticky top-[73px] z-20 shadow-2xl">
             <button 
              onClick={() => { setDashView('active'); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold ${dashView === 'active' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' : 'text-slate-300 bg-white/5 border border-transparent'}`}
             ><LayoutDashboard className="w-5 h-5"/> Layanan Aktif</button>
             <button 
              onClick={() => { setDashView('order'); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold ${dashView === 'order' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' : 'text-slate-300 bg-white/5 border border-transparent'}`}
             ><ShoppingCart className="w-5 h-5"/> Pesan Layanan Baru</button>
             <button 
              onClick={() => { setDashView('invoice'); setIsMobileMenuOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-semibold ${dashView === 'invoice' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' : 'text-slate-300 bg-white/5 border border-transparent'}`}
             ><Receipt className="w-5 h-5"/> Tagihan & Invoice</button>
             <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 px-4 py-3.5 rounded-xl text-sm font-bold text-red-500 mt-4 border border-red-500/20 hover:bg-red-500/10">
               <LogOut className="w-5 h-5"/> Keluar
             </button>
          </div>
        )}

        <div className="p-6 md:p-10 flex-1 w-full max-w-7xl mx-auto">
          <header className="mb-10">
            <h1 className="text-3xl font-black text-white mb-2">
              {dashView === 'active' && 'Overview Layanan'}
              {dashView === 'order' && 'Katalog Server'}
              {dashView === 'invoice' && 'Manajemen Tagihan'}
            </h1>
            <p className="text-slate-400 text-sm md:text-base">
              {dashView === 'active' && 'Pantau dan kelola infrastruktur aktif yang berjalan di akun Anda.'}
              {dashView === 'order' && 'Upgrade infrastruktur Anda dengan jajaran server premium kami yang berlokasi di Jakarta.'}
              {dashView === 'invoice' && 'Riwayat pembayaran dan invoice yang belum dilunasi.'}
            </p>
          </header>

          {dashView === 'active' && (
            <div className="bg-[#151c30] border border-white/5 rounded-3xl p-12 md:p-20 flex flex-col items-center justify-center text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-600/50 to-orange-400/50"></div>
              <div className="bg-white/5 p-6 rounded-3xl mb-6 border border-white/10 shadow-inner">
                <HardDrive className="w-12 h-12 text-slate-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Tidak Ada Server Aktif</h3>
              <p className="text-slate-400 max-w-md mb-10 text-sm md:text-base leading-relaxed">
                Anda belum melakukan *deployment* server. Mulai bangun infrastruktur bisnis Anda bersama Karsa Cloud hari ini.
              </p>
              <button 
                onClick={() => setDashView('order')}
                className="bg-orange-500 hover:bg-orange-400 text-[#1a0e02] font-bold px-8 py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] flex items-center gap-2"
              >
                <ShoppingCart className="w-5 h-5" />
                Lihat Katalog Produk
              </button>
            </div>
          )}

          {dashView === 'order' && (
             <div className="bg-[#0d1322] md:bg-transparent rounded-3xl p-2 md:p-0">
               <ProductsList />
             </div>
          )}

          {dashView === 'invoice' && (
            <div className="bg-[#151c30] border border-white/5 rounded-3xl p-12 md:p-20 flex flex-col items-center justify-center text-center">
              <div className="bg-white/5 p-6 rounded-3xl mb-6 border border-white/10 shadow-inner">
                <Receipt className="w-12 h-12 text-slate-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Tidak Ada Tagihan</h3>
              <p className="text-slate-400 max-w-md text-sm md:text-base">
                Selamat! Semua tagihan Anda telah terbayar lunas. Invoice baru akan di-generate otomatis saat pesanan dibuat.
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );

  // Legal Text Views
  const LegalView = ({ title }) => (
    <div className="min-h-screen bg-[#0d1322] text-slate-300">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 pt-40 pb-24 text-center">
        <h1 className="text-4xl font-black text-white mb-6">{title}</h1>
        <div className="p-10 bg-[#151c30] border border-white/10 rounded-3xl inline-block text-left shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          {title === 'Kebijakan Privasi' && (
            <div className="mb-6 max-w-xl text-sm leading-relaxed text-slate-300 space-y-2">
              <p className="font-bold text-white">Ringkasan singkat</p>
              <p>Saat Anda masuk lewat Google, Client Area menampilkan nama, email, dan foto profil akun tersebut. Kami tidak melihat kata sandi Google Anda.</p>
              <p>Pesanan lewat WhatsApp hanya berisi nama paket, spesifikasi, dan harga yang Anda pilih.</p>
            </div>
          )}
          <p className="text-slate-400 mb-4">Dokumen lengkap sedang dalam tahap penyusunan.</p>
          <button onClick={() => setCurrentView('home')} className="text-orange-500 hover:text-orange-400 font-semibold flex items-center gap-2">
            &larr; Kembali ke Beranda
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );

  // --- Router ---
  let page = <LandingPage />;
  if (currentView === 'tos') page = <LegalView title="Ketentuan Layanan" />;
  else if (currentView === 'privacy') page = <LegalView title="Kebijakan Privasi" />;
  else if (currentView === 'dashboard') page = isFullyLogged ? <Dashboard /> : <LoginScreen />;
  return <><GlobalStyle />{page}</>;
}
