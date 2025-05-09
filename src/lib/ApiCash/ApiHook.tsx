import { useEffect, useState } from 'react';
import { fetchWithCache, refreshCache, generateKey } from './apiUtility';
import { useApiCache } from './api-cache-store';

export const useCachedApi = (url: string, params?: Record<string, unknown>) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const key = generateKey(url, params);

  const { cache, deleteCacheEntry } = useApiCache();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchWithCache(url, params);
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, JSON.stringify(params)]); // React to parameter changes

  return {
    data,
    isLoading,
    error,
    refresh: () => refreshCache(url, params),
    deleteCache: () => deleteCacheEntry(key),
    cachedAt: cache[key]?.timestamp
  };
};
