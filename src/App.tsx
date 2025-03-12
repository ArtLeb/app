import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesConfig from './routers'
import './styles/telegram-theme.css';

function App() {
  return (
    <>
      <Router>
        <RoutesConfig />
      </Router>
    </>
  )
}

export default App
