import api from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

async function fetchPetSpecies() {
  const response = await api.get('/refSpecies');
  return response.data;
}

export const usePetSpecies = () => {
  return useQuery({
    queryKey: ['refSpecies'],
    queryFn: fetchPetSpecies,
  });
}; 
