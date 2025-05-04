import { usePetListQuery } from '@/hooks/usePetList';
import currentLocation from '@/store/currentLocation';
import { LayoutList, Map } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ListView from './components/List/ListView';
import MapListView from './components/Map/MapListView';
import DesktopFilter from './components/TabAndFilter/DesktopFilter';
import MobileFilter from './components/TabAndFilter/MobileFilter';

const PetListMap = ({ type }) => {
  // url : /missing,report?map=true
  const [searchParams, setSearchParams] = useSearchParams();
  // const [isHovered, setIsHovered] = useState(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const isMapView = searchParams.get('map') === 'true'; // 기본값은 false
  const { lat, lon, setLocation } = currentLocation();

  const [filters, setFilters] = useState({
    refSpecies: searchParams.get('refSpecies') || '',
    dateFrom: searchParams.get('dateFrom') || '',
    dateTo: searchParams.get('dateTo') || '',
    address: searchParams.get('address') || '',
  });

  useEffect(() => {
    if (lat && lon) {
      setUseCurrentLocation(true);
    } else {
      getCurrentLocation();
    }
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFilters({
      refSpecies: params.get('refSpecies') || '',
      dateFrom: params.get('dateFrom') || '',
      dateTo: params.get('dateTo') || '',
      address: params.get('address') || '',
    });
  }, [type]);

  const {
    data: petList,
    isLoading: isPetListLoading,
    isError: isPetListError,
    error: petError,
  } = usePetListQuery({ type, useCurrentLocation, lat, lon });

  const toggleViewMap = () => {
    const newParams = { ...Object.fromEntries(searchParams) };
    newParams.map = isMapView ? 'false' : 'true';
    setSearchParams(newParams);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 위치 관련
  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const la = position.coords.latitude;
        const lo = position.coords.longitude;

        const data = { lat: la, lon: lo };
        setLocation(data);
        setUseCurrentLocation(true);
      },
      () => {
        alert('위치 정보를 가져올 수 없습니다.');
        setUseCurrentLocation(false);
      }
    );
  }

  const toggleUseCurrentLocation = () => {
    if (useCurrentLocation) setUseCurrentLocation(false);
    else {
      if (lat && lon) {
        setUseCurrentLocation(true);
      } else {
        getCurrentLocation()
      }
    }
  }

  const handleSearch = () => {
    const newParams = {};

    if (filters.refSpecies) newParams.refSpecies = filters.refSpecies;
    if (filters.dateFrom) newParams.dateFrom = filters.dateFrom;
    if (filters.dateTo) newParams.dateTo = filters.dateTo;
    if (filters.address) newParams.address = filters.address;

    if (isMapView) newParams.map = 'true';
    else newParams.map = 'false';

    setSearchParams(newParams);
  };

  const handleReset = () => {
    setFilters({
      refSpecies: "",
      dateFrom: "",
      dateTo: "",
      address: "",
    });

  }

  const toggleMobileFilter = () => setIsMobileFilterOpen(!isMobileFilterOpen);

  // if (isPetListLoading) return <LoadingSpinner />;
  if (isPetListError) return <div className="min-h-[300px] flex justify-center items-center">Error: {petError.message}</div>;

  return (
    <div className="flex w-full flex-col p-2 my-3">

      <div className="w-full">
        <div className="hidden md:!block">
          <DesktopFilter
            type={type}
            filters={filters}
            handleFilterChange={handleFilterChange}
            handleSearch={handleSearch}
            handleReset={handleReset}
          />
        </div>
        <div className="md:!hidden flex flex-col justify-center items-center">
          <button
            className="w-[95%] p-3 rounded-lg bg-(--primary) text-white cursor-white"
            onClick={toggleMobileFilter}
          >필터</button>
          <div className={`${isMobileFilterOpen ? "block" : "hidden"} w-full`}>
            <MobileFilter
              type={type}
              filters={filters}
              toggleMobileFilter={toggleMobileFilter}
              handleFilterChange={handleFilterChange}
              handleSearch={handleSearch}
              handleReset={handleReset}
            />
          </div>
        </div>

        <div
          className="relative flex-col justify-center items-center"
        // onMouseEnter={() => setIsHovered(true)}
        // onMouseLeave={() => setIsHovered(false)}
        >

          <div className="flex justify-center items-center gap-x-3 m-2">
            <button
              className="flex h-[50px] w-[150px] cursor-pointer items-center justify-center gap-x-2 rounded-sm bg-(--bg) p-2 text-black shadow-lg active:scale-97"
              onClick={toggleViewMap}
            >
              {isMapView ? (
                <>
                  목록 보기 <LayoutList />
                </>
              ) : (
                <>
                  지도로 보기
                  <Map />
                </>
              )}
            </button>
            <button
              className="flex h-[50px] w-[150px] cursor-pointer items-center justify-center gap-x-2 rounded-sm bg-(--bg) p-2 text-black shadow-lg active:scale-97"
              onClick={toggleUseCurrentLocation}
            >{`현재위치 ${useCurrentLocation ? "끄기" : "켜기"}`}</button>
          </div>
          {/* {isHovered && (
            <button
              className="absolute left-1/2 -translate-x-1/2 top-[5rem] z-2 flex h-[50px] w-[150px] cursor-pointer items-center justify-center gap-x-2 rounded-sm bg-(--bg) p-2 text-black shadow-lg"
              onClick={toggleViewMap}
            >
              {isMapView ? (
                <>
                  목록 보기 <LayoutList />
                </>
              ) : (
                <>
                  지도로 보기
                  <Map />
                </>
              )}
            </button>
          )} */}

          {
            petList?.length === 0 ?
              (
                <div className="flex flex-col items-center px-4 py-2 mb-2">
                  <h3 className="text-xl font-medium mb-2">데이터가 없습니다</h3>
                  {useCurrentLocation
                    ? (<p className="text-gray-500">현재 위치 20km 이내의 {type === "missing" ? "실종" : "목격"} 데이터를 찾을 수 없습니다.</p>)
                    : (<p className="text-gray-500">해당 조건에 맞는 {type === "missing" ? "실종" : "목격"} 데이터를 찾을 수 없습니다.</p>)
                  }
                </div>
              )
              : (
                <div className="px-4 py-2 mb-2">
                  {
                    useCurrentLocation ? (<p className="text-md font-medium mb-2">현재 위치 20km 주변에</p>)
                      : ""
                  }
                  <p className="text-gray-700">
                    총 <span className="font-medium">{petList?.length || 0}</span>개의 {type === "missing" ? "실종" : "목격"} 정보가 있습니다.
                    &nbsp;최신 날짜 순서로 정렬됩니다.
                  </p>
                </div>
              )
          }

          {isMapView ? (
            <MapListView pets={petList} type={type} />
          ) : (
            <ListView isPetListLoading={isPetListLoading} pets={petList} type={type} />
          )}
        </div>
      </div>
    </div>
  );
};

export default PetListMap;
