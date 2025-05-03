import { usePetListQuery } from '@/hooks/usePetList';
import { LayoutList, Map } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ListView from './components/List/ListView';
import MapView from './components/Map/MapView';
import DesktopFilter from './components/TabAndFilter/DesktopFilter';
import MobileFilterModal from './components/TabAndFilter/MobileFilterModal';
import TabMenu from './components/TabAndFilter/TabMenu';

const PetListMap = ({type}) => {
  // url : /missing,report?map=true
  const [searchParams, setSearchParams] = useSearchParams();
  const [isHovered, setIsHovered] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const isMapView = searchParams.get('map') === "true"; // 기본값은 false

  const [filters, setFilters] = useState({
    refSpecies: searchParams.get('refSpecies') || "",
    dateFrom: searchParams.get('dateFrom') || "",
    dateTo: searchParams.get('dateTo') || "",
    address: searchParams.get('address') || ""
  });

  useEffect(() => {
    setFilters({
      refSpecies: "",
      dateFrom: "",
      dateTo: "",
      address: ""
    });
  }, [type])

  const {
    data: petList, 
    isLoading: isPetListLoading, 
    isError: isPetListError, 
    error: petError
  } = usePetListQuery({ type });

  const toggleViewMap = () => {
    const newParams = {...Object.fromEntries(searchParams)};
    newParams.map = isMapView ? "false" : "true";
    setSearchParams(newParams);
  }

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  }

  const handleSearch = () => {
    const newParams = {};

    if(filters.refSpecies) newParams.refSpecies = filters.refSpecies;
    if(filters.dateFrom) newParams.dateFrom = filters.dateFrom;
    if(filters.dateTo) newParams.dateTo = filters.dateTo;
    if(filters.address) newParams.address = filters.address;
    
    if(isMapView) newParams.map = "true";
    else newParams.map = "false";

    setSearchParams(newParams);
  }

  const openFilterModal = () => setIsFilterModalOpen(true);
  const closeFilterModal = () => setIsFilterModalOpen(false);

  if(isPetListLoading) return <div>Loading...</div>
  if(isPetListError) return <div>Error: {petError.message}</div>

  return (
    <div className="w-full flex flex-col md:!flex-row">
      <div className="w-full md:basis-1/4">
        <TabMenu openFilterModal={openFilterModal} />
      </div>
      <div className="w-full md:basis-3/4">
        <div className="hidden md:!block">
          <DesktopFilter
            type={type} 
            filters={filters} 
            handleFilterChange={handleFilterChange} 
            handleSearch={handleSearch} />
        </div>

        <div
          className="relative"
          onMouseEnter={()=>setIsHovered(true)}
          onMouseLeave={()=>setIsHovered(false)}          
        >
          {
            isHovered &&
            <button 
              className="flex z-2 justify-center items-center absolute bottom-[3rem] right-1/2 rounded-sm bg-(--bg) text-black shadow-lg gap-x-2 p-2 w-[150px] h-[50px] cursor-pointer"
              onClick={toggleViewMap}
            >
              {isMapView
              ? <>목록 보기 <LayoutList /></>
              : <>지도로 보기<Map /></>}
            </button>
          }

          { isMapView 
          ? <MapView /> 
          : <ListView pets={petList} type={type} />
          }
        </div>
      </div>

      {/* 모바일 필터 모달 */}
      {isFilterModalOpen && (
        <MobileFilterModal
          type={type}
          filters={filters}
          handleFilterChange={handleFilterChange}
          handleSearch={handleSearch}
          closeFilterModal={closeFilterModal}
        />
      )}

    </div>
  )
}

export default PetListMap