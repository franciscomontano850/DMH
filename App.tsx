
import React, { useState, useEffect, useRef } from 'react';
import { 
  Music, 
  Dumbbell, 
  Wind, 
  Search, 
  LayoutDashboard, 
  Plus, 
  TrendingUp, 
  ExternalLink,
  ChevronRight,
  Mic2,
  List,
  ShieldCheck,
  Building2,
  Globe,
  Lock,
  Eye,
  EyeOff,
  Trash2,
  AlertCircle,
  Key,
  Github,
  Play,
  RotateCcw,
  Zap,
  Download,
  Upload,
  Calculator
} from 'lucide-react';
import { AppSection, Quote, SearchResult, PortalAccount } from './types';
import { searchHvacQuotes } from './services/geminiService';

// --- Components ---

const Sidebar = ({ activeSection, setActiveSection }: { 
  activeSection: AppSection, 
  setActiveSection: (s: AppSection) => void 
}) => {
  const menuItems = [
    { id: AppSection.HOME, icon: LayoutDashboard, label: 'Hub' },
    { id: AppSection.AI_SEARCH, icon: Search, label: 'AI Hunter' },
    { id: AppSection.PORTALS, icon: Lock, label: 'The Vault' },
    { id: AppSection.QUOTES, icon: Wind, label: 'Workspace' },
    { id: AppSection.MUSIC, icon: Mic2, label: 'Studio' },
    { id: AppSection.GYM_TRACKER, icon: Dumbbell, label: 'Gym' },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-20 md:w-64 glass border-r border-white/5 z-50 flex flex-col items-center md:items-start py-8">
      <div className="px-6 mb-12">
        <h1 className="hidden md:block font-syncopate text-2xl font-bold tracking-tighter neon-accent">DMH</h1>
        <div className="md:hidden w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center font-bold">D</div>
      </div>
      
      <nav className="w-full flex-1 space-y-2 px-3">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center justify-center md:justify-start gap-4 px-4 py-3 rounded-xl transition-all ${
              activeSection === item.id 
                ? 'bg-purple-600/20 text-purple-400 border border-purple-500/30' 
                : 'text-gray-400 hover:bg-white/5 hover:text-white'
            }`}
          >
            <item.icon size={22} />
            <span className="hidden md:block font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
      
      <div className="px-4 mt-auto w-full space-y-4">
        <div className="hidden md:block glass p-4 rounded-2xl border-white/5 bg-white/5">
          <p className="text-[10px] text-gray-500 font-bold mb-2 uppercase tracking-widest flex items-center gap-2">
            <Github size={12} /> GitHub Status
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <p className="text-[10px] font-semibold text-gray-300">Connected & Synced</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const HvacCalculator = () => {
  const [btu, setBtu] = useState<string>('');
  const tons = btu ? (parseFloat(btu) / 12000).toFixed(2) : '0';

  return (
    <div className="glass p-6 rounded-3xl border-white/5">
      <h3 className="text-sm font-bold text-gray-400 mb-4 flex items-center gap-2 uppercase tracking-widest">
        <Calculator size={14} className="text-blue-400" /> Tonnage Calculator
      </h3>
      <div className="flex gap-3 items-center">
        <input 
          type="number" 
          value={btu}
          onChange={(e) => setBtu(e.target.value)}
          placeholder="Enter BTUs"
          className="bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-sm w-full focus:border-blue-500 outline-none"
        />
        <div className="shrink-0 text-2xl font-bold text-blue-400">
          {tons} <span className="text-xs text-gray-500 uppercase">Tons</span>
        </div>
      </div>
    </div>
  );
};

const DashboardHome = ({ portalCount, quotesCount, onExport, onImport }: { portalCount: number, quotesCount: number, onExport: () => void, onImport: (file: File) => void }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-4xl font-bold mb-2">Workspace <span className="neon-accent">DMH</span></h2>
          <p className="text-gray-400">Streamlining operations for Anthony & Son HVAC.</p>
        </div>
        <div className="flex gap-2">
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept=".json"
            onChange={(e) => e.target.files?.[0] && onImport(e.target.files[0])}
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="bg-white/5 hover:bg-white/10 text-gray-400 px-4 py-2 rounded-xl text-xs font-bold border border-white/10 flex items-center gap-2 transition-all"
          >
            <Upload size={14} /> Import
          </button>
          <button 
            onClick={onExport}
            className="bg-purple-600/10 hover:bg-purple-600/20 text-purple-400 px-4 py-2 rounded-xl text-xs font-bold border border-purple-600/20 flex items-center gap-2 transition-all"
          >
            <Download size={14} /> Export Backup
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass p-6 rounded-3xl border-purple-500/10">
          <div className="p-3 bg-purple-600/20 w-fit rounded-2xl text-purple-400 mb-4">
            <Building2 size={24} />
          </div>
          <h3 className="text-sm font-medium text-gray-400">Active Quotes</h3>
          <p className="text-2xl font-bold mt-1">{quotesCount}</p>
        </div>

        <div className="glass p-6 rounded-3xl border-cyan-500/10">
          <div className="p-3 bg-cyan-600/20 w-fit rounded-2xl text-cyan-400 mb-4">
            <Lock size={24} />
          </div>
          <h3 className="text-sm font-medium text-gray-400">Vendor Portals</h3>
          <p className="text-2xl font-bold mt-1">{portalCount}</p>
        </div>

        <div className="glass p-6 rounded-3xl border-blue-500/10">
          <div className="p-3 bg-blue-600/20 w-fit rounded-2xl text-blue-400 mb-4">
            <Dumbbell size={24} />
          </div>
          <h3 className="text-sm font-medium text-gray-400">Gym Streak</h3>
          <p className="text-2xl font-bold mt-1">5 Days</p>
        </div>

        <div className="glass p-6 rounded-3xl border-pink-500/10">
          <div className="p-3 bg-pink-600/20 w-fit rounded-2xl text-pink-400 mb-4">
            <Music size={24} />
          </div>
          <h3 className="text-sm font-medium text-gray-400">Studio Time</h3>
          <p className="text-2xl font-bold mt-1">12h / week</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <HvacCalculator />
        <div className="glass p-8 rounded-3xl border-white/5 bg-gradient-to-r from-blue-600/5 to-transparent flex items-center gap-6">
          <div className="shrink-0 p-4 bg-blue-500/20 rounded-2xl text-blue-400">
            <Wind size={32} />
          </div>
          <div>
            <h4 className="font-bold text-lg">Anthony & Son Quick Tool</h4>
            <p className="text-sm text-gray-500 leading-snug">Dayana, use the search grounding to find real-time inventory at local suppliers.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AiQuoteHunter = ({ onAddQuote, portals }: { onAddQuote: (q: Partial<Quote>) => void, portals: PortalAccount[] }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [focusCompany, setFocusCompany] = useState(true);

  const quickPrompts = [
    "Carrier 3-ton Split System prices",
    "Trane XV20i Variable Speed specs",
    "Mitsubishi Mini-Split stock in NJ",
    "Rheem rooftop unit commercial"
  ];

  const handleSearch = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query) return;
    setLoading(true);
    try {
      const data = await searchHvacQuotes(query, focusCompany);
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Error: Please check your API_KEY in deployment settings.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold mb-2">AI Hunter <span className="text-purple-400 text-sm font-mono tracking-widest ml-4">v2.4</span></h2>
          <p className="text-gray-400">Market intelligence tailored for Anthony & Son.</p>
        </div>
      </header>

      <div className="glass p-8 rounded-3xl border-purple-500/20">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search product models or vendors..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-purple-500 transition-all text-lg"
            />
          </div>
          <button 
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white px-10 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-purple-600/20"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Execute Hunt'}
          </button>
        </form>
        
        <div className="flex flex-wrap gap-2">
           <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mr-2 flex items-center">Quick Tips:</span>
           {quickPrompts.map((p, i) => (
             <button 
              key={i} 
              onClick={() => { setQuery(p); }} 
              className="text-xs bg-white/5 hover:bg-white/10 border border-white/5 px-3 py-1.5 rounded-full text-gray-400 hover:text-white transition-all"
             >
               {p}
             </button>
           ))}
        </div>
      </div>

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass p-8 rounded-3xl border-white/10">
              <h3 className="text-xl font-bold flex items-center gap-2 mb-6 text-purple-400">
                <ShieldCheck size={20} /> Analysis Results
              </h3>
              <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed bg-black/40 p-8 rounded-3xl border border-white/5 whitespace-pre-wrap">
                {result.text}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass p-6 rounded-3xl border-white/10">
              <h4 className="text-lg font-bold mb-4 flex items-center gap-2 text-blue-400">
                <Globe size={18} /> Direct Sources
              </h4>
              <div className="space-y-3">
                {result.sources.map((src, idx) => (
                  <a 
                    key={idx}
                    href={src.uri}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 border border-white/5 hover:border-white/20 transition-all group"
                  >
                    <span className="text-xs font-medium truncate max-w-[180px] text-gray-400 group-hover:text-white">{src.title}</span>
                    <ChevronRight size={14} className="text-gray-600 group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>

            <button 
                onClick={() => {
                   onAddQuote({
                     productName: query,
                     price: "See Analysis",
                     supplier: result.sources[0]?.title || "Market Lead",
                     date: new Date().toISOString().split('T')[0],
                     category: query.toLowerCase().includes('rooftop') ? 'Industrial' : 'Split'
                   });
                   alert("Loaded to Workspace!");
                }}
                className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-gray-200 transition-colors shadow-xl"
              >
                Save to Database
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const PortalManager = ({ portals, setPortals }: { portals: PortalAccount[], setPortals: any }) => {
  const [showAdd, setShowAdd] = useState(false);
  const [newPortal, setNewPortal] = useState<Partial<PortalAccount>>({ siteName: '', url: '', username: '', password: '' });
  const [showPassMap, setShowPassMap] = useState<Record<string, boolean>>({});

  const togglePass = (id: string) => {
    setShowPassMap(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const addPortal = () => {
    if (!newPortal.siteName || !newPortal.url) return;
    const portal: PortalAccount = {
      id: Math.random().toString(36).substr(2, 9),
      siteName: newPortal.siteName || '',
      url: newPortal.url || '',
      username: newPortal.username || '',
      password: newPortal.password || '',
      status: 'idle',
      lastSync: 'Never'
    };
    const updated = [...portals, portal];
    setPortals(updated);
    localStorage.setItem('dmh_portals', JSON.stringify(updated));
    setNewPortal({ siteName: '', url: '', username: '', password: '' });
    setShowAdd(false);
  };

  const deletePortal = (id: string) => {
    const updated = portals.filter(p => p.id !== id);
    setPortals(updated);
    localStorage.setItem('dmh_portals', JSON.stringify(updated));
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Lock className="text-cyan-400" /> The Vault
          </h2>
          <p className="text-gray-400">Private credentials for Anthony & Son portals.</p>
        </div>
        <button 
          onClick={() => setShowAdd(true)}
          className="bg-cyan-600 hover:bg-cyan-700 px-6 py-3 rounded-2xl flex items-center gap-2 font-bold shadow-lg shadow-cyan-600/20 transition-all"
        >
          <Plus size={20} /> Add Portal
        </button>
      </header>

      {showAdd && (
        <div className="glass p-8 rounded-3xl border-cyan-500/30 bg-cyan-500/5 animate-in zoom-in-95 duration-200">
          <h3 className="text-xl font-bold mb-6">Portal Registration</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input 
              type="text" placeholder="Site Name" 
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-500 outline-none"
              value={newPortal.siteName}
              onChange={e => setNewPortal({...newPortal, siteName: e.target.value})}
            />
            <input 
              type="text" placeholder="URL" 
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-500 outline-none"
              value={newPortal.url}
              onChange={e => setNewPortal({...newPortal, url: e.target.value})}
            />
            <input 
              type="text" placeholder="Username" 
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-500 outline-none"
              value={newPortal.username}
              onChange={e => setNewPortal({...newPortal, username: e.target.value})}
            />
            <input 
              type="password" placeholder="Password" 
              className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-500 outline-none"
              value={newPortal.password}
              onChange={e => setNewPortal({...newPortal, password: e.target.value})}
            />
          </div>
          <div className="mt-8 flex gap-3">
            <button onClick={addPortal} className="bg-white text-black px-8 py-3 rounded-xl font-bold">Save</button>
            <button onClick={() => setShowAdd(false)} className="text-gray-400 px-8 py-3 font-bold">Cancel</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portals.map(portal => (
          <div key={portal.id} className="glass p-6 rounded-3xl border-white/5 hover:border-cyan-500/30 transition-all group relative">
            <button onClick={() => deletePortal(portal.id)} className="absolute top-4 right-4 text-gray-600 hover:text-red-400 transition-colors">
              <Trash2 size={16} />
            </button>
            <div className="flex items-center gap-4 mb-6">
              <Globe size={24} className="text-cyan-400" />
              <h4 className="font-bold">{portal.siteName}</h4>
            </div>
            <div className="space-y-3 bg-black/20 p-4 rounded-2xl border border-white/5 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500 uppercase font-bold tracking-tighter">User</span>
                <span>{portal.username}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 uppercase font-bold tracking-tighter">Pass</span>
                <div className="flex items-center gap-2">
                  <span>{showPassMap[portal.id] ? portal.password : '••••••••'}</span>
                  <button onClick={() => togglePass(portal.id)}>{showPassMap[portal.id] ? <EyeOff size={14} /> : <Eye size={14} />}</button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const QuoteListSection = ({ quotes }: { quotes: Quote[] }) => (
  <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
     <header>
        <h2 className="text-3xl font-bold mb-2">Quote Workspace</h2>
        <p className="text-gray-400">Stored configurations for Anthony & Son.</p>
      </header>
      <div className="glass rounded-[2rem] border-white/5 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-white/5 border-b border-white/5">
            <tr>
              <th className="p-6 font-bold text-gray-400 uppercase text-[10px]">Product</th>
              <th className="p-6 font-bold text-gray-400 uppercase text-[10px]">Source</th>
              <th className="p-6 font-bold text-gray-400 uppercase text-[10px]">Date</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {quotes.map((q) => (
              <tr key={q.id} className="hover:bg-white/5 transition-colors">
                <td className="p-6 font-bold">{q.productName}</td>
                <td className="p-6 text-sm text-gray-400">{q.supplier}</td>
                <td className="p-6 text-xs font-mono">{q.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
  </div>
);

// --- Main App Component ---

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.HOME);
  const [portals, setPortals] = useState<PortalAccount[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);

  useEffect(() => {
    const savedP = localStorage.getItem('dmh_portals');
    if (savedP) setPortals(JSON.parse(savedP));
    const savedQ = localStorage.getItem('dmh_quotes');
    if (savedQ) setQuotes(JSON.parse(savedQ));
  }, []);

  const addQuote = (q: Partial<Quote>) => {
    const newQuote: Quote = {
      id: Math.random().toString(36).substr(2, 9),
      productName: q.productName || 'New Solution',
      price: q.price || '$0',
      supplier: q.supplier || 'Anthony & Son Partner',
      url: q.url || '#',
      date: q.date || new Date().toISOString().split('T')[0],
      category: q.category || 'Split'
    };
    const updated = [newQuote, ...quotes];
    setQuotes(updated);
    localStorage.setItem('dmh_quotes', JSON.stringify(updated));
  };

  const exportBackup = () => {
    const data = { quotes, portals, exportDate: new Date().toISOString() };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DMH_Backup_${new Date().toLocaleDateString().replace(/\//g, '-')}.json`;
    a.click();
  };

  const importBackup = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string);
        if (data.quotes) {
          setQuotes(data.quotes);
          localStorage.setItem('dmh_quotes', JSON.stringify(data.quotes));
        }
        if (data.portals) {
          setPortals(data.portals);
          localStorage.setItem('dmh_portals', JSON.stringify(data.portals));
        }
        alert("Backup imported successfully!");
      } catch (err) {
        alert("Error importing file. Make sure it's a valid DMH backup.");
      }
    };
    reader.readAsText(file);
  };

  const renderContent = () => {
    switch (activeSection) {
      case AppSection.HOME:
        return <DashboardHome portalCount={portals.length} quotesCount={quotes.length} onExport={exportBackup} onImport={importBackup} />;
      case AppSection.AI_SEARCH:
        return <AiQuoteHunter onAddQuote={addQuote} portals={portals} />;
      case AppSection.PORTALS:
        return <PortalManager portals={portals} setPortals={setPortals} />;
      case AppSection.QUOTES:
        return <QuoteListSection quotes={quotes} />;
      case AppSection.MUSIC:
        return (
          <div className="py-24 glass rounded-[3rem] border-pink-500/20 text-center animate-pulse">
            <Mic2 size={64} className="mx-auto text-pink-500 mb-6" />
            <h3 className="text-3xl font-bold">Studio Mode</h3>
            <p className="text-gray-400">DAW Integrations coming soon for DMH...</p>
          </div>
        );
      case AppSection.GYM_TRACKER:
        return (
          <div className="py-24 glass rounded-[3rem] border-blue-500/20 text-center">
            <Dumbbell size={64} className="mx-auto text-blue-500 mb-6" />
            <h3 className="text-3xl font-bold">Iron Haven</h3>
            <p className="text-gray-400">Track your progressive overload.</p>
          </div>
        );
      default:
        return <DashboardHome portalCount={portals.length} quotesCount={quotes.length} onExport={exportBackup} onImport={importBackup} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0a0a0a]">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      <main className="flex-1 ml-20 md:ml-64 p-6 md:p-12 lg:p-20">
        <div className="max-w-7xl mx-auto">{renderContent()}</div>
      </main>
      <div className="fixed bottom-8 right-8 z-50">
        <button 
          onClick={() => alert("Syncing with Anthony & Son Enterprise...")}
          className="w-16 h-16 bg-purple-600 rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 transition-all"
        >
          <Github size={32} className="text-white" />
        </button>
      </div>
    </div>
  );
};

export default App;
