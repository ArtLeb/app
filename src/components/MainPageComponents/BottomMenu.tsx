import { useNavigate } from 'react-router-dom'; // Исправлен импорт
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/WidgetsTwoTone';
import useTelegramInitData from '../../helpers/useTelegramInitData';

export function BottomMenu() {
  const user = String(useTelegramInitData());
  const navigate = useNavigate(); // Добавлена инициализация навигации

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 80 }} elevation={3}>
      <BottomNavigation showLabels sx={{ background: '#343A40', height: '100%' }}>
        <BottomNavigationAction 
          label="Главное" 
          icon={<HomeIcon sx={{ fontSize: 45 }} />} 
          onClick={() => navigate('/')} // Добавлен обработчик
          sx={{ color: '#ffffff' }} 
        />
        <BottomNavigationAction 
          label="Услуги" 
          icon={<MenuIcon sx={{ fontSize: 45 }} />} 
          onClick={() => navigate('/service_categories')} // Исправлен обработчик
          sx={{ color: '#ffffff' }} 
        />
        <BottomNavigationAction 
          label="Корзина" 
          icon={<ShoppingCartIcon sx={{ fontSize: 45 }} />} 
          sx={{ color: '#ffffff' }} 
        />
      </BottomNavigation>
      <h1>{user}</h1>
    </Paper>
  );
}