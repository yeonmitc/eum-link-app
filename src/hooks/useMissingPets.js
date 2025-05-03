import api from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

async function fetchMissingPets(id) {
  const response = await api.get(`/missingPets/${id}`); 
  return response.data;
}

export const useMissingPets = (id) => {
  return useQuery({
    queryKey: ['missingPets',id],
    queryFn: () => fetchMissingPets(id),
  });
}; 
