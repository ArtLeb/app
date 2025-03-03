import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesConfig from './routers'

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
