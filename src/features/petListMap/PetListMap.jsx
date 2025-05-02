import { usePetListQuery } from '@/hooks/usePetList';
import { useSearchParams } from 'react-router-dom';
import ListView from './components/List/ListView';
import MapView from './components/Map/MapView';

const PetListMap = ({type}) => {
  // url : /pets/missing,report?map=true
  const [searchParams, setSearchParams] = useSearchParams();
  const isMapView = searchParams.get('map') === true; // 기본값은 false

  const {
    data: petList, 
    isLoading: isPetListLoading, 
    isError: isPetListError, 
    error: petError
  } = usePetListQuery({ type });

  console.log('petList', petList);

  if(isPetListLoading) return <div>Loading...</div>
  if(isPetListError) return <div>Error: {petError.message}</div>

  return (
    <div>
      <div>
        <div>실종</div>
        <div>목격</div>
      </div>
      <div>
        <div>필터</div>
        <div>{isMapView ? (
          <MapView />
        ) : (
          <ListView pets={petList} />
        )}</div>
      </div>
    </div>
  )
}

export default PetListMap
