import { useState, useEffect, useCallback } from "react";
import api from "@/services/api";
import type { ApiPractitionerProfile } from "@/types/api";

interface UseFeaturedPractitionersOptions {
  limit?: number;
}

interface UseFeaturedPractitionersResult {
  practitioners: ApiPractitionerProfile[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => void;
}

export function useFeaturedPractitioners(
  options: UseFeaturedPractitionersOptions = {}
): UseFeaturedPractitionersResult {
  const { limit = 8 } = options;
  const [practitioners, setPractitioners] = useState<ApiPractitionerProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchPractitioners = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await api.getFeaturedPractitioners(limit);
      setPractitioners(data);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch practitioners"));
      console.error("Error fetching featured practitioners:", err);
    } finally {
      setIsLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchPractitioners();
  }, [fetchPractitioners]);

  return {
    practitioners,
    isLoading,
    error,
    refetch: fetchPractitioners,
  };
}
