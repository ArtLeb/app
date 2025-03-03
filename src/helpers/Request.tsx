import { useEffect, useState } from "react";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE"; // Определяем поддерживаемые HTTP методы

interface UseApiRequestProps {
  method: RequestMethod;
  url: string;
  data?: any; // Данные для запроса (например, для POST, PUT)
  headers?: Record<string, string>; // Заголовки, если нужны дополнительные
}

function Request<T>({ method, url, data, headers }: UseApiRequestProps): { responseData: T | null; error: string | null } {
  const [responseData, setResponseData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (window.Telegram?.WebApp) {
        const initData = window.Telegram.WebApp.initData;

        // Основные заголовки
        const requestHeaders: Record<string, string> = {
          "Content-Type": "application/json",
          "X-Telegram-Init-Data": initData,
          ...headers,
        };

        const requestOptions: RequestInit = {
          method,
          headers: requestHeaders,
        };

        // Добавляем тело запроса для POST, PUT, DELETE
        if (method !== "GET" && data) {
          requestOptions.body = JSON.stringify(data);
        }

        try {
          const response = await fetch(`https://abramian-it.ru/bereg-api${url}`, requestOptions);

          if (!response.ok) {
            throw new Error(`Error during request: ${response.statusText}`);
          }

          const result = await response.json();
          setResponseData(result); // Сохраняем ответ в состоянии
        } catch (err) {
          setError(err instanceof Error ? err.message : "Unknown error");
        }
      }
    };

    fetchData();
  }, [method, url, data, headers]);

  return { responseData, error };
}

export default Request;

