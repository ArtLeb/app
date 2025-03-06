// app/pages/Cart.tsx
import { Box, Typography, Button, styled } from '@mui/material';
import { BottomMenu } from '../components/MainPageComponents/BottomMenu';

const ContentWrapper = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '200px 16px',
  maxWidth: 430,
  margin: '0 auto',
  minHeight: 'calc(100vh - 144px)' // Фиксированная высота
});

const ReservationCard = styled(Box)({
  width: '100%',
  background: '#fff',
  borderRadius: '8px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  padding: '16px 16px 16px 104px', // Увеличиваем левый отступ
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

const ReservationButton = styled(Button)({
  background: '#334e77',
  color: '#f1f4f9!important',
  borderRadius: '7px',
  padding: '8px 24px',
  fontWeight: 700,
  fontSize: '14px',
  letterSpacing: '0.06em',
  width: '100%',
  maxWidth: 300,
  '&:hover': {
    background: '#2a4060'
  }
});

export default function CartPage() {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      position: 'relative',
      backgroundColor: '#f5f5f5',
      overflow: 'hidden'
    }}>
      {/* Фиксированный верхний баннер */}
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
        <ReservationCard>
          <ReservationImage 
            src="src/assets/img/record.png" 
            alt="Record" 
          />
          
          <Box>
            <Typography sx={{
              color: '#000307',
              fontWeight: 700,
              fontSize: 16,
              mb: 1
            }}>
              Столы
            </Typography>
            
            <Typography sx={{
              color: '#4a74b4',
              fontWeight: 700,
              fontSize: 14,
              mb: 2
            }}>
              Занять столы
            </Typography>

            <Typography sx={{
              color: '#000307',
              fontWeight: 700,
              fontSize: 14,
              mb: 0.5
            }}>
              Номер стола: 12
            </Typography>

            <Typography sx={{
              color: '#000307',
              fontWeight: 700,
              fontSize: 14,
              mb: 0.5
            }}>
              Место: Пляжная зона
            </Typography>

            <Typography sx={{
              color: '#000307',
              fontWeight: 700,
              fontSize: 14
            }}>
              Дата: 15.07.2024
            </Typography>
          </Box>
        </ReservationCard>

        <ReservationButton>
          ПОДТВЕРДИТЬ БРОНЬ
        </ReservationButton>
      </ContentWrapper>

      {/* Фиксированное нижнее меню */}
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