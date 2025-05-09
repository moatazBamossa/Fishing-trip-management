import { useApiCache } from './api-cache-store';

// Generate unique cache key from URL + serialized params
export const generateKey = (url: string, params?: Record<string, unknown>) => {
  return `${url}-${JSON.stringify(params || {})}`;
};

// Main cached fetch function
export const fetchWithCache = async (
  url: string,
  params?: Record<string, unknown>
) => {
  const { cache, addToCache } = useApiCache.getState();
  const key = generateKey(url, params);

  console.log('key', key);
  console.log('cache', cache);
  console.log('cache[key]', !!cache[key]);
  // Return cached data if exists
  if (cache[key]) {
    return cache[key].data;
  }
  console.log('22', 22);
  // Fetch and cache new data
  const response = await fetch(url, { ...params });
  const data = await response.json();
  addToCache(key, data);
  return data;
};

// Manual refresh utility
export const refreshCache = async (
  url: string,
  params?: Record<string, unknown>
) => {
  const { refreshCacheEntry } = useApiCache.getState();
  const key = generateKey(url, params);

  await refreshCacheEntry(key, async () => {
    const response = await fetch(url, { ...params });
    return response.json();
  });
};
