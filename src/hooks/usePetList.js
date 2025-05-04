import api from '@/utils/api';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';

export const usePetListQuery = ({ type, useCurrentLocation, lat, lon, listPage = 1, listLimit = 4 }) => {
  const [searchParams] = useSearchParams();

  const fetchPetList = ({ type }) => {
    let url = type === 'missing' ? `/missingPets` : '/reportsPets';

    const queryParams = new URLSearchParams();

    if (searchParams.has('refSpecies')) {
      queryParams.set('refSpecies', searchParams.get('refSpecies'));
    }

    if (searchParams.has('dateFrom')) {
      if (type === 'missing') queryParams.set('lostDate_gte', searchParams.get('dateFrom'));
      else queryParams.set('sightedDate_gte', searchParams.get('dateFrom'));
    }
    if (searchParams.has('dateTo')) {
      if (type === 'missing') queryParams.set('lostDate_lte', searchParams.get('dateTo'));
      else queryParams.set('sightedDate_lte', searchParams.get('dateTo'));
    }

    const locationField = type === 'missing' ? 'lostLocation' : 'sightedLocation';
    if (searchParams.has('address')) {
      const addressValue = searchParams.get('address');

      // queryParams.set(`${locationField}.road_address_like`, addressValue);
      queryParams.set(`${locationField}.number_address_like`, addressValue);
    } else if (useCurrentLocation && lat && lon) {
      console.log('현재 위치 기반 필터링');
      const radius = 20;
      const boundingBox = calculateBoundingBox(lat, lon, radius);
      // 최소/최대 위도, 경도로 필터링
      queryParams.set(`${locationField}.lat_gte`, boundingBox.minLat);
      queryParams.set(`${locationField}.lat_lte`, boundingBox.maxLat);
      queryParams.set(`${locationField}.lon_gte`, boundingBox.minLon);
      queryParams.set(`${locationField}.lon_lte`, boundingBox.maxLon);
    }

    queryParams.set('_page', listPage);
    queryParams.set('_limit', listLimit);

    if (type === 'missing') queryParams.set('_sort', 'lostDate');
    else queryParams.set('_sort', 'sightedDate');

    queryParams.set('_order', 'desc');

    url = `${url}?${queryParams.toString()}`;

    return api.get(url);
  };

  return useQuery({
    queryKey: ['petList', type, Object.fromEntries(searchParams), useCurrentLocation, listPage, listLimit,],
    queryFn: () => fetchPetList({ type }),
    select: (result) => ({
      data: result.data,
      total: Number(result.headers['x-total-count']),
    }),
    staleTime: 3000,
  });
};

// 위도, 경도, 반경(km)로 bounding box 계산 
// (근사치 - 지구가 완전한 구가 아니고 위도에 따라 경도 1도당 거리가 달라짐)
const calculateBoundingBox = (centerLat, centerLon, radiusInKm) => {
  // 지구 반지름 (km)
  const earthRadius = 6371;

  // 위도 1도당 거리: 약 111km (지구둘레/360)
  const latDegreeDistance = 111;

  // 경도 1도당 거리: 위도에 따라 달라짐 (적도에서 약 111km, 극점에서 0km)
  // cos(위도 * PI/180) 값을 곱해서 계산
  const lonDegreeDistance = Math.cos(centerLat * Math.PI / 180) * 111;

  // 반경을 위도, 경도 단위로 변환
  const latChange = radiusInKm / latDegreeDistance;
  const lonChange = radiusInKm / lonDegreeDistance;

  return {
    minLat: centerLat - latChange,
    maxLat: centerLat + latChange,
    minLon: centerLon - lonChange,
    maxLon: centerLon + lonChange
  };

};
