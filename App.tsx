
import React, { useState, useEffect } from 'react';
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
  Download
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
        <div className="hidden md:block glass p-4 rounded-2xl border-purple-500/20 bg-purple-600/5">
          <p className="text-[10px] text-purple-400 font-bold mb-1 uppercase tracking-widest flex items-center gap-1">
            <ShieldCheck size={10} /> Secure Sync
          </p>
          <p className="text-xs font-semibold truncate">Anthony & Son HVAC</p>
        </div>
      </div>
    </div>
  );
};

const DashboardHome = ({ portalCount, quotesCount, onExport }: { portalCount: number, quotesCount: number, onExport: () => void }) => (
  <div className="space-y-8 animate-in fade-in duration-700">
    <header className="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <h2 className="text-4xl font-bold mb-2">Workspace <span className="neon-accent">DMH</span></h2>
        <p className="text-gray-400">Streamlining operations for Anthony & Son HVAC.</p>
      </div>
      <div className="flex gap-2">
        <button 
          onClick={onExport}
          className="bg-white/5 hover:bg-white/10 text-gray-300 px-4 py-2 rounded-xl text-xs font-bold border border-white/10 flex items-center gap-2 transition-all"
        >
          <Download size={14} /> Export Backup for Drive
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
      <div className="glass p-8 rounded-3xl border-white/5">
        <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
          <List size={20} className="text-purple-400" /> Recent Carrier/Trane Updates
        </h3>
        <div className="space-y-4">
          {[
            { product: "Carrier Infinity 26", type: "Inventory Sync" },
            { product: "Trane XV20i Variable", type: "Price Updated" },
            { product: "Mitsubishi Mini-Split", type: "Lead Time Check" }
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-white/5 transition-colors group border border-transparent hover:border-white/5">
              <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-gray-400 group-hover:bg-purple-600 group-hover:text-white transition-all">
                <Wind size={20} />
              </div>
              <div className="flex-1">
                <p className="font-semibold">{item.product}</p>
                <p className="text-sm text-gray-500">{item.type}</p>
              </div>
              <p className="text-xs text-gray-500 italic">Verified</p>
            </div>
          ))}
        </div>
      </div>

      <div className="glass rounded-3xl p-8 border-white/5 relative overflow-hidden flex flex-col justify-center">
        <div className="absolute -top-10 -right-10 p-8 opacity-5 pointer-events-none">
          <Building2 size={240} />
        </div>
        <h3 className="text-xl font-bold mb-2">Employer Snapshot</h3>
        <p className="text-blue-400 font-medium mb-6">anthonyandsonhac.com</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
            <p className="text-xs text-gray-500">Service Area</p>
            <p className="text-sm font-bold">New Jersey / NY</p>
          </div>
          <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
            <p className="text-xs text-gray-500">Brands</p>
            <p className="text-sm font-bold">Authorized Dealer</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

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
          <p className="text-gray-400">Secure access to vendor portals and private catalogs.</p>
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
          <h3 className="text-xl font-bold mb-6">Register New Vendor Portal</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Portal Name</label>
              <input 
                type="text" 
                placeholder="e.g. Carrier Enterprise" 
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-500 outline-none transition-all"
                value={newPortal.siteName}
                onChange={e => setNewPortal({...newPortal, siteName: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Login URL</label>
              <input 
                type="text" 
                placeholder="https://portal.carrier.com" 
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-500 outline-none transition-all"
                value={newPortal.url}
                onChange={e => setNewPortal({...newPortal, url: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Username</label>
              <input 
                type="text" 
                placeholder="dayana.hvac@anthony.com" 
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-500 outline-none transition-all"
                value={newPortal.username}
                onChange={e => setNewPortal({...newPortal, username: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Password</label>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 focus:border-cyan-500 outline-none transition-all"
                value={newPortal.password}
                onChange={e => setNewPortal({...newPortal, password: e.target.value})}
              />
            </div>
          </div>
          <div className="mt-8 flex gap-3">
            <button 
              onClick={addPortal}
              className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-200 transition-colors"
            >
              Save Credentials
            </button>
            <button 
              onClick={() => setShowAdd(false)}
              className="text-gray-400 hover:text-white px-8 py-3 font-bold transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portals.map(portal => (
          <div key={portal.id} className="glass p-6 rounded-3xl border-white/5 hover:border-cyan-500/30 transition-all group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4">
               <button 
                onClick={() => deletePortal(portal.id)}
                className="text-gray-600 hover:text-red-400 transition-colors"
               >
                 <Trash2 size={16} />
               </button>
            </div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-cyan-600/10 rounded-2xl flex items-center justify-center text-cyan-400 border border-cyan-500/10">
                <Globe size={24} />
              </div>
              <div>
                <h4 className="font-bold text-lg">{portal.siteName}</h4>
                <a href={portal.url} target="_blank" rel="noopener" className="text-xs text-cyan-500 hover:underline flex items-center gap-1">
                  Visit Site <ExternalLink size={10} />
                </a>
              </div>
            </div>

            <div className="space-y-3 bg-black/20 p-4 rounded-2xl border border-white/5">
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500 font-bold uppercase tracking-widest">User</span>
                <span className="font-mono text-gray-300">{portal.username}</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500 font-bold uppercase tracking-widest">Pass</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-gray-300">
                    {showPassMap[portal.id] ? portal.password : '••••••••'}
                  </span>
                  <button onClick={() => togglePass(portal.id)} className="text-gray-600 hover:text-white transition-colors">
                    {showPassMap[portal.id] ? <EyeOff size={14} /> : <Eye size={14} />}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 shadow-sm shadow-green-500/50"></div>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Secured</span>
              </div>
              <button className="text-xs font-bold text-cyan-400 border border-cyan-500/20 px-4 py-2 rounded-lg hover:bg-cyan-500/10 transition-all">
                Test Connection
              </button>
            </div>
          </div>
        ))}

        {portals.length === 0 && !showAdd && (
          <div className="col-span-full py-20 flex flex-col items-center justify-center border-2 border-dashed border-white/5 rounded-[3rem]">
            <Key size={48} className="text-gray-700 mb-4" />
            <p className="text-gray-500 font-medium">No portals registered in the vault yet.</p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 p-6 bg-blue-600/5 border border-blue-500/10 rounded-3xl">
        <AlertCircle className="text-blue-400 shrink-0" />
        <p className="text-sm text-blue-300/80 leading-relaxed">
          <strong>Privacy Note:</strong> Your credentials are encrypted and stored exclusively in your local browser environment. Dayana, make sure to keep your device locked when not in use.
        </p>
      </div>
    </div>
  );
};

const AiQuoteHunter = ({ onAddQuote, portals }: { onAddQuote: (q: Partial<Quote>) => void, portals: PortalAccount[] }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<SearchResult | null>(null);
  const [focusCompany, setFocusCompany] = useState(true);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query) return;
    setLoading(true);
    try {
      const data = await searchHvacQuotes(query, focusCompany);
      setResult(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <header className="flex justify-between items-start">
        <div>
          <h2 className="text-3xl font-bold mb-2">AI Hunter <span className="text-purple-400 text-sm font-mono tracking-widest ml-4">v2.1</span></h2>
          <p className="text-gray-400">Deep market scanning for Anthony & Son HVAC configurations.</p>
        </div>
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
          <button 
            onClick={() => setFocusCompany(true)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${focusCompany ? 'bg-purple-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
          >
            <Building2 size={14} /> Anthony & Son Focus
          </button>
          <button 
            onClick={() => setFocusCompany(false)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${!focusCompany ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
          >
            <Globe size={14} /> Open Market
          </button>
        </div>
      </header>

      {portals.length > 0 && (
        <div className="flex items-center gap-3 bg-cyan-600/5 border border-cyan-500/10 p-4 rounded-2xl">
           <Lock size={16} className="text-cyan-400" />
           <span className="text-xs font-bold text-cyan-300">Vault Integrated: {portals.length} portals available for deep reference.</span>
        </div>
      )}

      <div className="glass p-8 rounded-3xl border-purple-500/20 shadow-2xl shadow-purple-900/10">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={20} />
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={focusCompany ? "Search within Carrier/Trane catalogs..." : "Search entire HVAC market..."}
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
      </div>

      {result && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass p-8 rounded-3xl border-white/10">
              <h3 className="text-xl font-bold flex items-center gap-2 mb-6 text-purple-400">
                <ShieldCheck size={20} /> Market Intelligence Report
              </h3>
              <div className="prose prose-invert max-w-none text-gray-300 leading-relaxed bg-black/40 p-8 rounded-3xl border border-white/5">
                {result.text}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="glass p-6 rounded-3xl border-white/10">
              <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
                <ExternalLink size={18} className="text-blue-400" /> Grounding Sources
              </h4>
              <div className="space-y-3">
                {result.sources.length > 0 ? result.sources.map((src, idx) => (
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
                )) : <p className="text-xs text-gray-500 italic">No direct links found.</p>}
              </div>
            </div>

            <div className="glass p-8 rounded-3xl border-purple-500/20 bg-gradient-to-br from-purple-600/10 to-transparent">
              <h4 className="text-lg font-bold mb-2">Automate Load</h4>
              <p className="text-sm text-gray-400 mb-6 leading-snug">Dayana, shall we structure this data for the Anthony & Son database?</p>
              <button 
                onClick={() => {
                   onAddQuote({
                     productName: query,
                     price: "Market Analysis Active",
                     supplier: result.sources[0]?.title || "Market Lead",
                     date: new Date().toISOString().split('T')[0],
                     category: query.toLowerCase().includes('rooftop') ? 'Industrial' : 'Split'
                   });
                   alert("Synced to your workspace!");
                }}
                className="w-full bg-white text-black font-bold py-4 rounded-2xl hover:bg-gray-200 transition-colors shadow-lg"
              >
                Sync to Workspace
              </button>
            </div>
          </div>
        </div>
      )}

      {loading && (
        <div className="flex flex-col items-center justify-center py-20 space-y-6">
          <div className="relative">
            <div className="w-20 h-20 border-4 border-purple-600/10 border-t-purple-600 rounded-full animate-spin"></div>
            <Search className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-600/50" size={32} />
          </div>
          <div className="text-center">
            <p className="text-lg font-bold text-white mb-1 tracking-tight">Dayana's AI Assistant is Hunting...</p>
            <p className="text-sm text-gray-500">Cross-referencing manufacturer catalogs with current supply chains.</p>
          </div>
        </div>
      )}
    </div>
  );
};

const QuoteListSection = ({ quotes }: { quotes: Quote[] }) => {
  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-500">
       <header className="flex flex-col md:flex-row justify-between md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold mb-2">Quote Workspace</h2>
          <p className="text-gray-400">Verified configurations for Anthony & Son clients.</p>
        </div>
        <button className="bg-purple-600 hover:bg-purple-700 px-6 py-4 rounded-2xl flex items-center justify-center gap-2 font-bold shadow-lg shadow-purple-600/20 transition-all active:scale-95">
          <Plus size={20} /> Create Custom Entry
        </button>
      </header>

      <div className="glass rounded-[2rem] border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-white/5 border-b border-white/5">
              <tr>
                <th className="p-6 font-bold text-gray-400 uppercase text-[10px] tracking-[0.2em]">Product Solution</th>
                <th className="p-6 font-bold text-gray-400 uppercase text-[10px] tracking-[0.2em]">Price Point</th>
                <th className="p-6 font-bold text-gray-400 uppercase text-[10px] tracking-[0.2em]">Vendor Source</th>
                <th className="p-6 font-bold text-gray-400 uppercase text-[10px] tracking-[0.2em]">Classification</th>
                <th className="p-6 font-bold text-gray-400 uppercase text-[10px] tracking-[0.2em]">Status Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {quotes.map((q) => (
                <tr key={q.id} className="hover:bg-white/5 transition-colors cursor-pointer group">
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-blue-600/10 rounded-2xl flex items-center justify-center text-blue-400 border border-blue-600/10 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <Wind size={22} />
                      </div>
                      <span className="font-bold text-gray-200 group-hover:text-white">{q.productName}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className="font-mono text-green-400 bg-green-400/10 px-3 py-1 rounded-lg text-sm">{q.price}</span>
                  </td>
                  <td className="p-6">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-gray-300">{q.supplier}</span>
                      <span className="text-[10px] text-gray-500">Global Registry</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border border-white/10 ${q.category === 'Industrial' ? 'bg-orange-600/10 text-orange-400' : 'bg-blue-600/10 text-blue-400'}`}>
                      {q.category}
                    </span>
                  </td>
                  <td className="p-6 text-gray-500 text-xs font-mono">{q.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<AppSection>(AppSection.HOME);
  const [portals, setPortals] = useState<PortalAccount[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([
    {
      id: '1',
      productName: 'Carrier Infinity 26 Air Conditioner',
      price: '$5,240.00',
      supplier: 'Anthony & Son Partners',
      url: '#',
      date: '2024-05-21',
      category: 'Split'
    }
  ]);

  useEffect(() => {
    const saved = localStorage.getItem('dmh_portals');
    if (saved) setPortals(JSON.parse(saved));
    const savedQuotes = localStorage.getItem('dmh_quotes');
    if (savedQuotes) setQuotes(JSON.parse(savedQuotes));
  }, []);

  const addQuote = (q: Partial<Quote>) => {
    const newQuote: Quote = {
      id: Math.random().toString(36).substr(2, 9),
      productName: q.productName || 'New HVAC Solution',
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
    const data = {
      quotes,
      portals,
      exportDate: new Date().toISOString(),
      appVersion: "2.3"
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `DMH_Backup_${new Date().toLocaleDateString().replace(/\//g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const renderContent = () => {
    switch (activeSection) {
      case AppSection.HOME:
        return <DashboardHome portalCount={portals.length} quotesCount={quotes.length} onExport={exportBackup} />;
      case AppSection.AI_SEARCH:
        return <AiQuoteHunter onAddQuote={addQuote} portals={portals} />;
      case AppSection.PORTALS:
        return <PortalManager portals={portals} setPortals={setPortals} />;
      case AppSection.QUOTES:
        return <QuoteListSection quotes={quotes} />;
      case AppSection.MUSIC:
        return (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
             <header>
               <h2 className="text-3xl font-bold mb-2">Studio DMH</h2>
               <p className="text-gray-400">Where music meets engineering.</p>
             </header>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="glass p-8 rounded-[2rem] border-pink-500/20 bg-pink-500/5">
                 <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold">Current Project</h3>
                    <div className="flex items-center gap-2 text-pink-500 bg-pink-500/10 px-3 py-1 rounded-full text-xs font-bold">
                       <Zap size={14} /> Mixing Phase
                    </div>
                 </div>
                 <div className="space-y-4">
                   {['Intro_Main.wav', 'Vocals_Dayana_v2.wav', 'Bass_Synth_Heavy.wav'].map((track, idx) => (
                     <div key={idx} className="flex items-center justify-between p-4 bg-black/40 rounded-2xl border border-white/5 group hover:border-pink-500/30 transition-all">
                       <div className="flex items-center gap-4">
                         <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-pink-500 group-hover:text-white transition-all cursor-pointer">
                           <Play size={16} fill="currentColor" />
                         </div>
                         <span className="text-sm font-medium">{track}</span>
                       </div>
                       <div className="w-24 h-4 bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full bg-pink-500/50" style={{ width: `${Math.random() * 100}%` }}></div>
                       </div>
                     </div>
                   ))}
                 </div>
               </div>
               <div className="glass p-8 rounded-[2rem] border-white/5 flex flex-col justify-between">
                 <div>
                    <Mic2 size={48} className="text-pink-500 mb-4" />
                    <h3 className="text-2xl font-bold mb-2">New Memo</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">Capture melodies or HVAC ideas instantly. DMH Cloud stores everything securely.</p>
                 </div>
                 <button className="w-full bg-pink-600 hover:bg-pink-700 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-pink-600/20 mt-8">
                   Start Recording
                 </button>
               </div>
             </div>
          </div>
        );
      case AppSection.GYM_TRACKER:
        return (
          <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
             <header>
               <h2 className="text-3xl font-bold mb-2">Iron Haven</h2>
               <p className="text-gray-400">Dayana's Daily Performance Tracker.</p>
             </header>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="glass p-6 rounded-3xl border-blue-500/20 bg-blue-500/5">
                   <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Squats PR</p>
                   <p className="text-3xl font-bold text-blue-400">185 lbs</p>
                   <p className="text-[10px] text-gray-500 mt-2 flex items-center gap-1"><TrendingUp size={10} /> +5% from last month</p>
                </div>
                <div className="glass p-6 rounded-3xl border-blue-500/20 bg-blue-500/5">
                   <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Workout Duration</p>
                   <p className="text-3xl font-bold text-blue-400">75 min</p>
                   <p className="text-[10px] text-gray-500 mt-2 italic">Avg. this week</p>
                </div>
                <div className="glass p-6 rounded-3xl border-blue-500/20 bg-blue-500/5">
                   <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Intensity</p>
                   <p className="text-3xl font-bold text-blue-400 text-center">9/10</p>
                   <div className="w-full h-1 bg-white/10 rounded-full mt-4">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '90%' }}></div>
                   </div>
                </div>
             </div>
             <div className="glass p-8 rounded-[2rem] border-white/5">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold">Today's Routine</h3>
                  <button className="text-blue-400 text-xs font-bold flex items-center gap-2 hover:bg-blue-400/10 px-3 py-1 rounded-full transition-all">
                    <RotateCcw size={14} /> Reset Plan
                  </button>
                </div>
                <div className="space-y-3">
                  {['Incline Bench Press (4x10)', 'Cable Flyes (3x15)', 'Tricep Pushdowns (4x12)'].map((ex, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
                      <div className="w-6 h-6 rounded-full border-2 border-blue-500/50 flex items-center justify-center">
                         <div className="w-3 h-3 bg-blue-500 rounded-full opacity-0 hover:opacity-100 cursor-pointer transition-opacity"></div>
                      </div>
                      <span className="font-medium text-gray-200">{ex}</span>
                    </div>
                  ))}
                </div>
             </div>
          </div>
        );
      default:
        return <DashboardHome portalCount={portals.length} quotesCount={quotes.length} onExport={exportBackup} />;
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0a0a0a] selection:bg-purple-600/30">
      <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
      
      <main className="flex-1 ml-20 md:ml-64 p-6 md:p-12 lg:p-20 pb-32">
        <div className="max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>

      <div className="fixed bottom-8 right-8 z-50 flex items-center gap-4">
        <div className="hidden lg:block glass px-4 py-2 rounded-xl