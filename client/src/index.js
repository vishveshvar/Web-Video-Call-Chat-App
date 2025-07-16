import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { ContextProvider } from './SocketContext';

import './styles.css';

const theme = createTheme(); // You can customize this later

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    
  <React.StrictMode>
    <ThemeProvider theme={theme}>
         <ContextProvider>
      <App />
      </ContextProvider>
    </ThemeProvider>
  </React.StrictMode>
);
