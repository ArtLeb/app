import { Routes, Route } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import ServicesPage from '../pages/ServicesPage'

const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/service_categories" element={<ServicesPage />} />
    </Routes>
  );
};

export default RoutesConfig;