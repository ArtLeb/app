// app/pages/SuccessPage.tsx
import { Box, Typography, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

export default function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { service, slot, location: place, date } = location.state;

  return (
    <Box sx={{ p: 3, textAlign: 'center' }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
         Бронирование подтверждено
      </Typography>
      
      <Typography>Услуга: {service}</Typography>
      <Typography>Номер слота: {slot}</Typography>
      <Typography>Место: {place}</Typography>
      <Typography>
        Дата: {new Date(date).toLocaleDateString('ru-RU')}
      </Typography>

      <Button 
        variant="contained" 
        sx={{ mt: 3 }}
        onClick={() => navigate('/')}
      >
        Вернуться на главную
      </Button>
    </Box>
  );
}