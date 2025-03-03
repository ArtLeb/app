import { useEffect, useState } from 'react';

const useTelegramInitData = () => {
  const [initData, setInitData] = useState<null | typeof window.Telegram.WebApp.initDataUnsafe>(null);

  useEffect(() => {
    if (window.Telegram && window.Telegram.WebApp) {
      const dataUnsafe = window.Telegram.WebApp.initDataUnsafe;

      setInitData(dataUnsafe);
    }
  }, []);

  return initData;
};

export default useTelegramInitData;
