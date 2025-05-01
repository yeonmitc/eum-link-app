import api from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

const fetchPetList = () => {
  return api.get(`missingPets`);
}

export const usePetListQuery = () => {
  return useQuery({
    queryKey: ['petList'],
    queryFn: fetchPetList,
    select: (result) => result.data
  })
}
