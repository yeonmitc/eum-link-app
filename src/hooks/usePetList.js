import api from '@/utils/api';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

export const usePetListQuery = ({ type }) => {
  const [searchParams] = useSearchParams();

  const fetchPetList = ({ type }) => {

    let url = type === "missing" ? `/missingPets` : "/reportsPets";

    const queryParams = new URLSearchParams();

    if (searchParams.has('refSpecies')) {
      queryParams.set('refSpecies', searchParams.get('refSpecies'));
    }

    if (searchParams.has('dateFrom')) {
      if (type === "missing") queryParams.set('lostDate_gte', searchParams.get('dateFrom'));
      else queryParams.set('sightedAt_gte', searchParams.get('dateFrom'));
    }
    if (searchParams.has('dateTo')) {
      if (type === "missing") queryParams.set('lostDate_lte', searchParams.get('dateTo'));
      else queryParams.set('sightedAt_lte', searchParams.get('dateTo'));
    }
    if (searchParams.has('address')) {
      const addressValue = searchParams.get('address');
      const locationField = (type === "missing") ? "lostLocation" : "sightedLocation";
      queryParams.set(`${locationField}.road_address_like'`, addressValue);
      queryParams.set(`${locationField}.number_address_like`, addressValue);
    }

    if (type === "missing") queryParams.set("_sort", "-lostDate");
    else queryParams.set("_sort", "-sightedAt");

    url = `${url}?${queryParams.toString()}`

    return api.get(url);
  }

  return useQuery({
    queryKey: ['petList', type, Object.fromEntries(searchParams)],
    queryFn: () => fetchPetList({ type }),
    select: (result) => result.data,
    staleTime: 3000,
  })
}
