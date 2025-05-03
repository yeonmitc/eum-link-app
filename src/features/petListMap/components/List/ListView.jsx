import { useSpeciesListQuery } from '@/hooks/useSpeciesList';
import { Link } from 'react-router-dom';
import MissingCard from './Card/MissingCard';
import ReportCard from './Card/ReportCard';

const ListView = ({ pets, type }) => {

  const {data: speciesList = []} = useSpeciesListQuery();

  if(pets.length === 0) {
    return (
      <div className="flex flex-col items-center pt-10 h-[50vh] p-4">
        <h3 className="text-xl font-medium mb-2">데이터가 없습니다</h3>
        <p className="text-gray-500">해당 조건에 맞는 {type === "missing" ? "실종" : "목격"} 데이터를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <div className="px-4 py-2 mb-2">
        <p className="text-gray-700">
          총 <span className="font-medium">{pets.length}</span>개의 {type === "missing" ? "실종" : "목격"} 정보가 있습니다.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 px-4">
        {pets.map((pet) => {
          return (
            <Link 
              key={pet.id}
              className="transform-gpu hover:-translate-y-1 transition-transform duration-300 ease-in-out" 
              to={`/${type === "missing" ? "missing" : "reports"}/${pet.id}`}>
                {type === "missing" ? <MissingCard pet={pet} speciesList={speciesList} /> : <ReportCard speciesList={speciesList} pet={pet} />}
              </Link>
        )})}
      </div>
    </div>
  )
}

export default ListView
