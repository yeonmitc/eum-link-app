import { QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';
import queryClient from '../../queryClient';

export default function AppProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
        {/* <ToastManager /> */}
        <Toaster position="top-center" />
      </BrowserRouter>
    </QueryClientProvider>
  );
}
