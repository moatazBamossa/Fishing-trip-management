import { create } from 'zustand';

type CacheEntry = {
  data: Record<string, unknown>;
  timestamp: number;
};

type ApiCacheStore = {
  cache: Record<string, CacheEntry>;
  addToCache: (key: string, data: Record<string, unknown>) => void;
  refreshCacheEntry: (
    key: string,
    fetchFn: () => Promise<Record<string, unknown>>
  ) => Promise<void>;
  deleteCacheEntry: (key: string) => void;
};

export const useApiCache = create<ApiCacheStore>((set) => ({
  cache: {},
  addToCache: (key, data) =>
    set((state) => ({
      cache: { ...state.cache, [key]: { data, timestamp: Date.now() } }
    })),
  refreshCacheEntry: async (key, fetchFn) => {
    const newData = await fetchFn();
    set((state) => ({
      cache: { ...state.cache, [key]: { data: newData, timestamp: Date.now() } }
    }));
  },
  deleteCacheEntry: (key) =>
    set((state) => {
      const newCache = { ...state.cache };
      delete newCache[key];
      return { cache: newCache };
    })
}));
