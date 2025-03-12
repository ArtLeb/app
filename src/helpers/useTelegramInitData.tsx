import { useEffect, useState } from 'react';


const useTelegramInitData = () => {
  const [initData, setInitData] = useState<null | typeof window.Telegram.WebApp.initDataUnsafe>(null);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const dataUnsafe = window.Telegram.WebApp.initDataUnsafe;

      
      const extendedData = {
        ...dataUnsafe,
        botToken: import.meta.env.VITE_TG_BOT_TOKEN,
        botLink: "https://t.me/BeregTurbazaBot",
        userId: String(dataUnsafe?.user?.id || "") // Преобразуем ID в строку
      };

      setInitData(extendedData);
    }
  }, []);

  return initData;
};

export default useTelegramInitData;