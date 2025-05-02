import api from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

async function fetchMissingPets() {
  const response = await api.get('/missingPets');
  return response.data;
}

export const useMissingPets = () => {
  return useQuery({
    queryKey: ['missingPets'],
    queryFn: fetchMissingPets,
  });
}; 
