import { usePetListQuery } from '@/hooks/usePetList';
import { LayoutList, Map } from 'lucide-react';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ListView from './components/List/ListView';
import MapView from './components/Map/MapView';
import DesktopFilter from './components/TabAndFilter/DesktopFilter';
import TabMenu from './components/TabAndFilter/TabMenu';

const PetListMap = ({type}) => {
  // url : /missing,report?map=true
  const [searchParams, setSearchParams] = useSearchParams();
  const [isHovered, setIsHovered] = useState(false);
  const isMapView = searchParams.get('map') === "true"; // 기본값은 false

  const {
    data: petList, 
    isLoading: isPetListLoading, 
    isError: isPetListError, 
    error: petError
  } = usePetListQuery({ type });

  console.log('petList', petList);

  const toggleViewMap = () => {
    setSearchParams({map: isMapView ? "false" : "true"})
  }

  if(isPetListLoading) return <div>Loading...</div>
  if(isPetListError) return <div>Error: {petError.message}</div>

  return (
    <div className="w-full flex flex-col md:!flex-row">
      <div className="w-full md:basis-1/4">
        <TabMenu />
      </div>
      <div className="w-full md:basis-3/4">
        <div className="hidden md:!block"><DesktopFilter /></div>

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
    </div>
  )
}

export default PetListMap
