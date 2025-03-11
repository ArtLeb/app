// app/pages/Cart.tsx
import { useState, useEffect } from 'react';
import { Box, Typography, Button, styled, CircularProgress } from '@mui/material';
import { BottomMenu } from '../components/MainPageComponents/BottomMenu';
import useRequest from '../helpers/Request';
import useTelegramInitData from '../helpers/useTelegramInitData';

// Стилизированные компоненты
const ContentWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '200px 16px',
  maxWidth: 430,
  margin: '0 auto',
  minHeight: 'calc(100vh - 144px)'
});

const ReservationCard = styled(Box)({
  width: '100%',
  background: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  padding: '16px 16px 16px 104px',
  marginBottom: 24,
  position: 'relative',
  minHeight: 112
});

const ReservationImage = styled('img')({
  width: 80,
  height: 80,
  position: 'absolute',
  left: 16,
  top: '50%',
  transform: 'translateY(-50%)'
});

// Интерфейсы данных
interface ServiceDetails {
  name: string;
  description: string;
}

interface Booking {
  booking_id: number;
  service_id: number;
  object_id: number | null;
  booking_date: string;
  start_time: string;
  is_confirmed: boolean;
  service?: ServiceDetails;
}

export default function CartPage() {
  const initData = useTelegramInitData();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  // Запрос данных бронирований
  const { responseData, error } = useRequest<Booking[]>({
    method: 'GET',
    url: `/bookings?telegram_id=${initData?.user?.id}`
  });

  // Загрузка данных
  useEffect(() => {
    const fetchData = async () => {
      if (responseData) {
        const updatedBookings = await Promise.all(
          responseData.map(async (booking) => {
            try {
              const serviceRes = await fetch(`/services/${booking.service_id}`);
              const serviceData = await serviceRes.json();
              return {
                ...booking,
                service: {
                  name: serviceData.name,
                  description: serviceData.description
                }
              };
            } catch (err) {
              console.error('Ошибка загрузки сервиса:', err);
              return booking;
            }
          })
        );
        setBookings(updatedBookings);
        setLoading(false);
      }
    };

    fetchData();
  }, [responseData]);

  // Подтверждение бронирования
  const handleConfirm = async (bookingId: number) => {
    try {
      await fetch(`/bookings/${bookingId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_confirmed: true })
      });
      setBookings(bookings.map(b => 
        b.booking_id === bookingId ? { ...b, is_confirmed: true } : b
      ));
    } catch (error) {
      console.error('Ошибка подтверждения:', error);
      alert('Не удалось подтвердить бронь');
    }
  };

  // Отмена бронирования
  const handleCancel = async (bookingId: number) => {
    try {
      await fetch(`/bookings/${bookingId}`, { method: 'DELETE' });
      setBookings(bookings.filter(b => b.booking_id !== bookingId));
    } catch (error) {
      console.error('Ошибка отмены:', error);
      alert('Не удалось отменить бронь');
    }
  };

  // Форматирование даты
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU');
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      position: 'relative',
      backgroundColor: '#f5f5f5',
      overflow: 'hidden'
    }}>
      {/* Верхний баннер */}
      <Box sx={{
        height: 80,
        backgroundImage: 'url(src/assets/img/Top.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: 3
      }}>
        <Typography variant="h5" sx={{
          color: '#fff',
          fontWeight: 'bold',
          textShadow: '0 2px 4px rgba(0,0,0,0.3)'
        }}>
          КОРЗИНА
        </Typography>
      </Box>

      {/* Основной контент */}
      <ContentWrapper>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">Ошибка загрузки данных</Typography>
        ) : bookings.length === 0 ? (
          <Typography>Нет активных бронирований</Typography>
        ) : (
          bookings.map((booking) => (
            <ReservationCard key={booking.booking_id}>
              <ReservationImage 
                src="src/assets/img/record.png" 
                alt="Record" 
              />
              
              <Box>
                {booking.service && (
                  <>
                    <Typography sx={{
                      color: '#000307',
                      fontWeight: 700,
                      fontSize: 16,
                      mb: 1
                    }}>
                      {booking.service.name}
                    </Typography>
                    
                    <Typography sx={{
                      color: '#4a74b4',
                      fontWeight: 700,
                      fontSize: 14,
                      mb: 2
                    }}>
                      {booking.service.description}
                    </Typography>
                  </>
                )}

                <Typography sx={{
                  color: '#000307',
                  fontWeight: 700,
                  fontSize: 14,
                  mb: 0.5
                }}>
                  Номер: {booking.object_id || 'Не указан'}
                </Typography>

                <Typography sx={{
                  color: '#000307',
                  fontWeight: 700,
                  fontSize: 14
                }}>
                  Дата: {formatDate(booking.booking_date)}
                </Typography>

                <Box sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  mt: 2,
                  flexWrap: 'wrap' 
                }}>
                  {!booking.is_confirmed && (
                    <Button 
                      variant="contained"
                      onClick={() => handleConfirm(booking.booking_id)}
                      sx={{ 
                        bgcolor: '#334e77', 
                        color: 'white',
                        '&:hover': { bgcolor: '#2a4060' }
                      }}
                    >
                      Подтвердить
                    </Button>
                  )}
                  <Button
                    variant="outlined"
                    onClick={() => handleCancel(booking.booking_id)}
                    sx={{ 
                      borderColor: '#334e77', 
                      color: '#334e77',
                      '&:hover': { borderColor: '#2a4060' }
                    }}
                  >
                    Отменить
                  </Button>
                </Box>
              </Box>
            </ReservationCard>
          ))
        )}
      </ContentWrapper>

      {/* Нижнее меню */}
      <Box sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 64,
        zIndex: 1000,
        backgroundColor: '#343A40',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.1)'
      }}>
        <BottomMenu />
      </Box>
    </Box>
  );
}