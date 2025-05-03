import api from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

async function fetchReportsPets() {
  const response = await api.get('/reportsPets');
  return response.data;
}

export const useReportsPets = () => {
  return useQuery({
    queryKey: ['reportsPets'],
    queryFn: fetchReportsPets,
  });
}; 
