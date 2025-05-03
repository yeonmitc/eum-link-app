import { useSpeciesListQuery } from '@/hooks/useSpeciesList';
import { Link } from 'react-router-dom';
import MissingCard from './Card/MissingCard';
import ReportCard from './Card/ReportCard';

const ListView = ({ pets, type }) => {

  const {data: speciesList = []} = useSpeciesListQuery();

  return (
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
  )
}

export default ListView
