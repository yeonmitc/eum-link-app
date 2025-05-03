import api from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

const fetchSpeciesList = () => {
  return api.get(`/species`);
}

export const useSpeciesListQuery = () => {
  return useQuery({
    queryKey: ['pet-speciesList', "all"],
    queryFn: fetchSpeciesList,
    select: (result) => result.data,
    staleTime: 30000,
  })
}
