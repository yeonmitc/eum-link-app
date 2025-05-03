import api from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

async function fetchReportsPets(id) {
  const response = await api.get(`/reportsPets/${id}`);
  return response.data;
}

export const useReportsPets = (id) => {
  return useQuery({
    queryKey: ['reportsPets',id],
    queryFn: () => fetchReportsPets(id),
  });
}; 
