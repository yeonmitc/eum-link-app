import { usePetListQuery } from '@/hooks/usePetList';
import { useSearchParams } from 'react-router-dom';
import ListView from './components/List/ListView';
import MapView from './components/Map/MapView';
import DesktopFilter from './components/TabAndFilter/DesktopFilter';
import TabMenu from './components/TabAndFilter/TabMenu';

const PetListMap = ({ type }) => {
  // url : /pets/missing,report?map=true
  const [searchParams, setSearchParams] = useSearchParams();
  const isMapView = searchParams.get('map') === true; // 기본값은 false

  const {
    data: petList,
    isLoading: isPetListLoading,
    isError: isPetListError,
    error: petError,
  } = usePetListQuery({ type });

  console.log('petList', petList);

  if (isPetListLoading) return <div>Loading...</div>;
  if (isPetListError) return <div>Error: {petError.message}</div>;

  return (
    <div className="flex flex-col md:!flex-row">
      <div className="w-full md:basis-1/4">
        <TabMenu />
      </div>
      <div className="w-full md:basis-3/4">
        <div className="hidden md:!block">
          <DesktopFilter />
        </div>
        <div>{isMapView ? <MapView /> : <ListView pets={petList} type={type} />}</div>
      </div>
    </div>
  );
};

export default PetListMap;
