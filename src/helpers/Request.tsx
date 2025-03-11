import { useEffect, useState } from "react";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

interface UseApiRequestProps {
  method: RequestMethod;
  url: string;
  data?: any;
}

export default function useRequest<T>({ method, url, data }: UseApiRequestProps) {
  const [responseData, setResponseData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:8000${url}`, {
          method,
          headers: {
            "Content-Type": "application/json",
            "X-Telegram-User": window.Telegram?.WebApp?.initData || "",
          },
          body: method !== "GET" ? JSON.stringify(data) : undefined,
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        setResponseData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    if (url) fetchData();
  }, [method, url, data]);

  return { responseData, error, loading };
}