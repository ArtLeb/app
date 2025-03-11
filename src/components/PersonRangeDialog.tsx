// app/components/PersonRangeDialog.tsx
import { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogActions, 
  Button,
  DialogContent,
  Box,
  Typography,
  CircularProgress 
} from '@mui/material';
import useRequest from '../helpers/Request';
import DatePickerDialog from './DatePickerDialog';
import TimePickerDialog from './TimePickerDialog';
import useTelegramInitData from '../helpers/useTelegramInitData';

interface PersonRange {
  range_id: number;
  name: string;
  min_persons: number;
  max_persons: number;
}

interface ServicePrice {
  id: number;
  name: string;
  price_per_unit: number;
}

interface Props {
  open: boolean;
  onClose: () => void;
  categoryId: number;
  categoryName: string;
}

const TIME_SELECT_CATEGORIES = [5, 6, 7];

export default function PersonRangeDialog({ open, onClose, categoryId, categoryName }: Props) {
  const initData = useTelegramInitData();
  const [selectedRange, setSelectedRange] = useState<number | null>(null);
  const [dateDialogOpen, setDateDialogOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [timeDialogOpen, setTimeDialogOpen] = useState(false);
  const [selectedTime, setSelectedTime] = useState<{ start: string; end: string } | null>(null);
  const [price, setPrice] = useState<string>('1500 РУБ');

  const { responseData: ranges, error, loading } = useRequest<PersonRange[]>({
    method: 'GET',
    url: `/person-ranges?category_id=${categoryId}`
  });

  const { responseData: servicePrices } = useRequest<ServicePrice[]>({
    method: 'GET',
    url: `/services?name=${encodeURIComponent(categoryName)}`
  });

  useEffect(() => {
    if (servicePrices && servicePrices.length > 0) {
      setPrice(`${servicePrices[0].price_per_unit} РУБ`);
    } else {
      setPrice('1500 РУБ');
    }
  }, [servicePrices]);

  useEffect(() => {
    setSelectedRange(null);
    setSelectedDate(null);
    setSelectedTime(null);
  }, [categoryId]);

  const handleSelectDate = () => {
    setDateDialogOpen(true);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    
    if (TIME_SELECT_CATEGORIES.includes(categoryId)) {
      setTimeDialogOpen(true);
    } else {
      handleBooking();
    }
  };

  const handleTimeConfirm = (start: string, end: string) => {
    setSelectedTime({ start, end });
    handleBooking();
  };

  const handleBooking = async () => {
    try {
      if (!initData?.user?.id || !selectedRange || !selectedDate) {
        throw new Error('Недостаточно данных для бронирования');
      }

      if (TIME_SELECT_CATEGORIES.includes(categoryId) && !selectedTime) {
        throw new Error('Время не выбрано');
      }

      const start = new Date(selectedDate);
      const end = new Date(selectedDate);
      
      if (TIME_SELECT_CATEGORIES.includes(categoryId) && selectedTime) {
        const [startHours, startMinutes] = selectedTime.start.split(':').map(Number);
        const [endHours, endMinutes] = selectedTime.end.split(':').map(Number);
        start.setHours(startHours, startMinutes, 0, 0);
        end.setHours(endHours, endMinutes, 0, 0);
      } else {
        start.setHours(8, 0, 0, 0);
        end.setHours(9, 0, 0, 0);
      }

      const bookingData = {
        service_id: categoryId,
        client_telegram_id: initData.user.id,
        booking_date: selectedDate.toISOString(),
        start_time: start.toISOString(),
        end_time: end.toISOString(),
        quantity: selectedRange,
        total_price: (servicePrices?.[0]?.price_per_unit || 1500) * (selectedRange || 0),
        is_confirmed: false,
        added_to_cart_time: new Date().toISOString()
      };

      const controller = new AbortController();
      const response = await fetch('/bookings/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
        signal: controller.signal
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка бронирования');
      }

      console.log('Бронирование успешно создано:', await response.json());
      onClose();

      return () => controller.abort();
    } catch (error) {
      console.error('Ошибка бронирования:', error);
      alert(`Ошибка: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            borderRadius: 3,
            minHeight: 400,
            overflow: 'hidden'
          }
        }}
      >
        <DialogContent sx={{ padding: 3 }}>
          <Typography variant="h6" sx={{ 
            textAlign: 'center',
            fontWeight: 700,
            color: '#334e77',
            mb: 3
          }}>
            ВЫБЕРИТЕ ВМЕСТИМОСТЬ
          </Typography>

          {loading ? (
            <Box textAlign="center" py={4}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error" textAlign="center">
              Ошибка загрузки
            </Typography>
          ) : (
            <Box sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 2,
              mb: 3
            }}>
              {ranges?.map((range) => (
                <Box
                  key={range.range_id}
                  onClick={() => setSelectedRange(range.range_id)}
                  sx={{
                    cursor: 'pointer',
                    border: selectedRange === range.range_id 
                      ? '2px solid #334e77' 
                      : '1px solid #ddd',
                    borderRadius: 2,
                    padding: 2,
                    textAlign: 'center',
                    backgroundColor: selectedRange === range.range_id 
                      ? '#f5f7fa' 
                      : '#fff'
                  }}
                >
                  <Typography variant="h6" sx={{
                    color: '#334e77',
                    fontWeight: 700
                  }}>
                    {range.max_persons}
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#666' }}>
                    ЧЕЛ
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          <Box sx={{
            backgroundColor: '#f5f5f5',
            borderRadius: 2,
            padding: 2,
            textAlign: 'center'
          }}>
            <Typography variant="body1" sx={{
              fontWeight: 700,
              color: '#464242'
            }}>
              Сумма: {price}
            </Typography>
          </Box>
        </DialogContent>

        <DialogActions sx={{
          justifyContent: 'space-between',
          padding: 3,
          borderTop: '1px solid #eee'
        }}>
          <Button 
            onClick={onClose}
            sx={{ 
              color: '#464242',
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: '0.06em',
              width: 114,
              height: 28,
              borderRadius: 3,
              border: '1px solid #707070'
            }}
          >
            Отменить
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSelectDate}
            disabled={!selectedRange || loading}
            sx={{ 
              backgroundColor: '#334e77',
              color: '#f3e7e7',
              fontWeight: '500',
              fontSize: 14,
              letterSpacing: '0.06em',
              width: 160,
              height: 30,
              borderRadius: 3,
              '&:hover': { 
                backgroundColor: '#2a4060',
                boxShadow: 'none'
              },
              '&:disabled': {
                backgroundColor: '#e0e0e0'
              }
            }}
          >
            Выбрать дату
          </Button>
        </DialogActions>
      </Dialog>

      <DatePickerDialog 
        open={dateDialogOpen}
        onClose={() => setDateDialogOpen(false)}
        onDateSelect={handleDateSelect}
        onConfirm={() => {
          setDateDialogOpen(false);
          handleBooking();
        }}
      />

      <TimePickerDialog
        open={timeDialogOpen}
        onClose={() => setTimeDialogOpen(false)}
        onConfirm={handleTimeConfirm}
      />
    </>
  );
}