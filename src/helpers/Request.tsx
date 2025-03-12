import { useEffect, useState } from "react";
import useTelegramInitData from "./useTelegramInitData";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

interface UseApiRequestProps {
  method: RequestMethod;
  url: string;
  data?: any;
}

export default function Request<T>({ method, url, data }: UseApiRequestProps) {
  const [responseData, setResponseData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const initData = useTelegramInitData();

  useEffect(() => {
    const fetchData = async () => {
      if (!initData || !url) return;

      setLoading(true);
      setError(null);

      try {
        const headers = new Headers({
          "Content-Type": "application/json",
          "X-Telegram-User": initData.userId,
          "X-Telegram-Bot-Token": initData.botToken,
          "X-Telegram-Chat-ID": initData.userId
        });

        const response = await fetch(`https://abramian-it.ru/bereg-api${url}`, {
          method,
          headers,
          body: method !== "GET" ? JSON.stringify(data) : undefined,
        });

        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        setResponseData(await response.json());
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [method, url, data, initData]);

  return { responseData, error, loading };
}