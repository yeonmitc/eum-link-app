import { usePetListQuery } from '@/hooks/usePetList';

const PetListMap = ({type}) => {
  // url : /pets/missing,report?map=true

  const {
    data: petList, 
    isLoading: isPetListLoading, 
    isError: isPetListError, 
    error: petError
  } = usePetListQuery();

  console.log('petList', petList);

  return (
    <div>
    </div>
  )
}

export default PetListMap
