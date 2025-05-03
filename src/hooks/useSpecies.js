import api from '../utils/api';
import { useQuery } from '@tanstack/react-query';

async function fetchSpecies({ ref }) {
  // console.log('ref여기 있음 : ', ref);
  const refKindParam = ref == '' ? null : ref;

  console.log('refKindParam : ', refKindParam);

  const response = await api.get(`/species?refKind=${refKindParam}`);
  // console.log('일단 결과임!!!!!!!! : ', response);

  return response;
}

export const useSpecies = ({ ref }) => {
  return useQuery({
    queryKey: ['pet-speciesList', ref],
    queryFn: () => fetchSpecies({ ref }),
    select: (result) => result.data,
  });
};
