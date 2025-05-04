import { usePetListQuery } from '@/hooks/usePetList';
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
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const isMapView = searchParams.get('map') === 'true'; // 기본값은 false

  const [filters, setFilters] = useState({
    refSpecies: searchParams.get('refSpecies') || '',
    dateFrom: searchParams.get('dateFrom') || '',
    dateTo: searchParams.get('dateTo') || '',
    address: searchParams.get('address') || '',
  });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setFilters({
      refSpecies: params.get('refSpecies') || '',
      dateFrom: params.get('dateFrom') || '',
      dateTo: params.get('dateTo') || '',
      address: params.get('address') || ''
    });
  }, [type]);

  const {
    data: petList,
    isLoading: isPetListLoading,
    isError: isPetListError,
    error: petError,
  } = usePetListQuery({ type });

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
            className="w-[95%] p-3 rounded-lg bg-(--primary) text-white"
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
          className="relative flex justify-center items-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {isHovered && (
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
          )}

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
