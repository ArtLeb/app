declare global {
    interface Window {
      Telegram: {
        WebApp: {
          initData: string;
          initDataUnsafe: {
            query_id?: string;
            user?: {
              id: number;
              first_name: string;
              last_name?: string;
              username?: string;
              language_code?: string;
              is_premium?: boolean;
            };
            auth_date?: number;
            hash?: string;
            [key: string]: any;
          };
          init(): void;
          expand(): void;
          close(): void;
          sendData(data: string): void;
          isExpanded: boolean;
          platform: string;
          version: string;
        };
      };
    }
  }
  
  export {};
  