import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import ServiceCategories from '../pages/ServiceCategories';
import CartPage from '../pages/Card';

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/services" element={<ServiceCategories />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
};

export default RoutesConfig;