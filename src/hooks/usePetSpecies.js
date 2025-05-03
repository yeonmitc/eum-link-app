import api from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

async function fetchPetSpecies() {
  const response = await api.get('/species');
  return response.data;
}

export const usePetSpecies = () => {
  return useQuery({
    queryKey: ['species'],
    queryFn: fetchPetSpecies,
  });
}; 
