// app/types.ts
export interface ServiceCategory {
    id: number;
    name: string;
  }
  
  export interface PersonRange {
    id: number;
    category_id: number;
    min_persons: number;
    max_persons: number;
    price_per_unit: number;
  }
  
  export interface BookingData {
    category_id: number;
    persons: number;
    date: string;
    time: string;
    telegram_id: number;
    total_price: number;
  }
  
  export interface TimeRange {
    start: string;
    end: string;
  }