import { useQueries } from '@tanstack/react-query';
import api from '../utils/api';

async function fetchSpecies({ ref }) {
  const refKindParam = ref == '' ? null : ref;

  const response = await api.get(`/refSpecies?refKind=${refKindParam}`);

  return response;
}

export const useSpeciesQueries = ({ speciesRefs }) => {
  return useQueries({
    queries: speciesRefs.map(ref => ({
      queryKey: ['pet-speciesList', ref],
      queryFn: () => fetchSpecies({ ref }),
      select: (result) => result.data,
    })),
  });
};
