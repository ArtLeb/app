// app/components/MainPageComponents/BottomMenu.tsx
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import MenuIcon from '@mui/icons-material/WidgetsTwoTone';
import { Link } from 'react-router-dom';

export function BottomMenu() {
  return (
    <Paper sx={{ 
      position: 'fixed', 
      bottom: 0, 
      left: 0, 
      right: 0, 
      height: 64 
    }} elevation={3}>
      <BottomNavigation showLabels sx={{ 
        backgroundColor: '#343A40', 
        height: '100%',
        '& .Mui-selected': {
          color: '#ffd700 !important'
        }
      }}>
        <BottomNavigationAction 
          label="Главная"
          icon={<HomeIcon sx={{ fontSize: 32 }} />}
          component={Link}
          to="/"
          sx={{ 
            color: '#ffffff',
            minWidth: '60px',
            padding: '6px'
          }}
        />
        <BottomNavigationAction 
          label="Услуги"
          icon={<MenuIcon sx={{ fontSize: 32 }} />}
          component={Link}  
          to="/services"
          sx={{ 
            color: '#ffffff',
            minWidth: '60px',
            padding: '6px'
          }}
        />
        <BottomNavigationAction 
          label="Корзина"
          icon={<ShoppingCartIcon sx={{ fontSize: 32 }} />}
          component={Link}
          to="/cart"
          sx={{ 
            color: '#ffffff',
            minWidth: '60px',
            padding: '6px'
          }}
        />
      </BottomNavigation>
    </Paper>
  );
}