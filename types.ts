
export interface Quote {
  id: string;
  productName: string;
  price: string;
  supplier: string;
  url: string;
  date: string;
  specs?: string;
  category: 'Split' | 'Window' | 'Industrial' | 'Parts';
}

export interface PortalAccount {
  id: string;
  siteName: string;
  url: string;
  username: string;
  password?: string;
  lastSync?: string;
  status: 'active' | 'error' | 'idle';
}

export interface SearchResult {
  text: string;
  sources: Array<{
    title: string;
    uri: string;
  }>;
}

export enum AppSection {
  HOME = 'home',
  QUOTES = 'quotes',
  AI_SEARCH = 'ai_search',
  PORTALS = 'portals',
  GYM_TRACKER = 'gym',
  MUSIC = 'music'
}
