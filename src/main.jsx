import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import AppProvider from './providers/AppProvider.jsx';
import './global.css';

createRoot(document.getElementById('root')).render(
  <AppProvider>
    <App />
  </AppProvider>
);
