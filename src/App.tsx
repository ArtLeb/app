// src/App.tsx
import { BrowserRouter as Router } from 'react-router-dom';
import RoutesConfig from './routers/index';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';


const theme = createTheme({
  palette: {
    primary: { main: '#334e77' },
    secondary: { main: '#4a74b4' },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: 'none', borderRadius: '8px' }
      }
    }
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <RoutesConfig />
      </Router>
    </ThemeProvider>
  );
}

export default App;