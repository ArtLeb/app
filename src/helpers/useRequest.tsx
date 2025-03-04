// helpers/useRequest.ts
import { useEffect, useState } from "react";

// Определение типа для методов HTTP-запросов
type RequestMethod = "GET" | "POST" | "PUT" | "DELETE";

// Интерфейс для параметров хука
interface UseApiRequestProps {
  method: RequestMethod;
  url: string;
  data?: any;
  headers?: Record<string, string>;
}

// Основной хук для выполнения запросов
export default function useRequest<T>({ method, url, data, headers }: UseApiRequestProps) {
  // Состояния для хранения данных, ошибок и статуса загрузки
  const [responseData, setResponseData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // Добавлено состояние загрузки

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Сбрасываем статус загрузки при новом запросе
      setError(null); // Очищаем предыдущие ошибки

      try {
        // Получаем данные Telegram WebApp (если есть)
        const initData = window.Telegram?.WebApp?.initData || '';

        // Выполняем запрос
        const response = await fetch(`http://localhost:8000${url}`, {
          method,
          headers: {
            "Content-Type": "application/json",
            "X-Telegram-Init-Data": initData, // Добавляем Telegram-данные
            ...headers, // Дополнительные заголовки из параметров
          },
          // Тело запроса для не-GET методов
          body: method !== "GET" && data ? JSON.stringify(data) : undefined,
        });

        // Обработка HTTP-ошибок
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        // Парсим и сохраняем результат
        const result = await response.json();
        setResponseData(result);
      } catch (err) {
        // Обработка ошибок
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false); // Всегда сбрасываем статус загрузки
      }
    };

    // Выполняем запрос только если URL валиден
    if (url) fetchData();
  }, [method, url, data, headers]); // Зависимости для повторного запроса

  // Возвращаем состояние запроса
  return { responseData, error, loading }; // Добавлен loading в возвращаемые значения
}