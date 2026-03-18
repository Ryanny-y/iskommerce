import { useCallback, useEffect, useState } from "react";
import useAuthFetch from "./useAuthFetch";

type FetchOptions = RequestInit & {
  enabled?: boolean;
};

const useFetchData = <T>(url: string | null, options?: FetchOptions) => {
  const { enabled = true } = options || {};

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const authFetch = useAuthFetch();

  const fetchData = useCallback(async () => {
    if (!url || !enabled) return;

    try {
      setLoading(true);
      const result = await authFetch(url, options);
      setData(result);
      setError(null);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An error occurred";
      setError(errorMessage);
      setData(null);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [url, enabled, options, authFetch]);

  useEffect(() => {
    if (!url || !enabled) return;
    fetchData();
  }, [url, enabled, fetchData]);

  return { data, loading, error, refetchData: fetchData };
};

export default useFetchData;
