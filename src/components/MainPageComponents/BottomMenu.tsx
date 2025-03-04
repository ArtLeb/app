import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/WidgetsTwoTone';
//import useTelegramInitData from '../../helpers/useTelegramInitData';
import { Link } from 'react-router-dom';

export function BottomMenu() {
  //const user: string = String(useTelegramInitData());
  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, height: 80 }} elevation={3}>
      <BottomNavigation showLabels sx={{ background: '#343A40', height: '100%' }}>
        <BottomNavigationAction label="Главная" icon={<HomeIcon sx={{ fontSize: 45 }} />} sx={{ color: '#ffffff' }} component={Link} to="/"/>
        <BottomNavigationAction label="Услуги" icon={<MenuIcon sx={{ fontSize: 45 }} />} sx={{ color: '#ffffff' }} component={Link}  to="/services" />
        <BottomNavigationAction label="Корзина" icon={<ShoppingCartIcon sx={{ fontSize: 45 }} />} sx={{ color: '#ffffff' }}component={Link}  to="/cart" />
      </BottomNavigation>
      
    </Paper>
  );
}