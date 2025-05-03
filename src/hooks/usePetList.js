import api from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

const fetchPetList = ({ type }) => {
  if (type === 'missing') return api.get(`/missingPets?isMissing=true&_sort=-lostDate`);
  else return api.get(`/reportsPets`);
}

export const usePetListQuery = ({ type }) => {
  return useQuery({
    queryKey: ['petList', type],
    queryFn: () => fetchPetList({ type }),
    select: (result) => result.data,
    staleTime: 3000,
  })
}
