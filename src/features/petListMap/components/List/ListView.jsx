import MissingCard from './Card/MissingCard'

const ListView = ({ pets }) => {
  return (
    <div className="grid gap-4 md:grid-cols-4 sm:grid-cols-2 px-4">
      {pets.map((pet) => {
        return <MissingCard key={pet.id} pet={pet} />
      })}
    </div>
  )
}

export default ListView
