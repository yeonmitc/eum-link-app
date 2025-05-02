import api from '@/utils/api';
import { useQuery } from '@tanstack/react-query';

async function fetchSpecies({ ref }) {
  const response = await api.get(`/species?refKind=${ref}`);
  return response;
}

export const useSpecies = ({ ref }) => {
  return useQuery({
    queryKey: ['pet-speciesList', ref],
    queryFn: () => fetchSpecies({ ref }),
    select: (result) => result.data,
  });
};
