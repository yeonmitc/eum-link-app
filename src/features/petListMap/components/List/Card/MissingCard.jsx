import { Cat, Dog, PawPrint } from 'lucide-react';

const MissingCard = ({ pet, speciesList }) => {
  const species = speciesList?.find(item => item.id === pet.refSpecies);
  
  return (
    <div className="rounded-lg shadow-xl h-[350px] md:h-[330px] overflow-hidden">
      <div 
        className="rounded-lg h-[60%]"
        style={{
          backgroundImage: `url(${pet?.imageUrl})`,
          backgroundPosition: "center 40%",
          backgroundSize: "cover"
        }}
        ></div>
      <div className="my-2 ml-2 gap-2 flex items-center">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-[#5d9471] text-white text-md">
          {pet?.refSpecies === 1 ? <Dog className="w-5 h-5" />
          : pet?.refSpecies === 2 ? <Cat className="w-5 h-5" />
          : <PawPrint className="w-5 h-5" />
          }
          <span className="text-sm truncate">{species?.name || "기타"}</span>
        </div>
        <div className="text-sm font-semibold text-black truncate">{pet?.petName || "미상"}</div>
      </div>
      <div className="mx-2 mb-4">
        <div className="mt-2 flex justify-start items-center gap-2">
          <div className="text-sm text-gray-700">성별</div>
          <div className="text-sm text-gray-800">{(pet?.petGender === "f" ? "암컷" : "수컷") || "미상" }</div>
        </div>
        <div className="mt-2 flex justify-start items-center gap-2">
          <div className="text-sm text-gray-700">실종날짜</div>
          <div className="text-sm text-gray-800">{pet?.lostDate && new Date(pet.lostDate).toLocaleDateString()}</div>
        </div>
        <div className="mt-2 flex justify-start items-center gap-2">
          <div className="shrink-0 text-sm text-gray-700">실종장소</div>
          <div className="truncate text-sm text-gray-800">{pet?.lostLocation.road_address || pet?.lostLocation.number_address}</div>
        </div>
      </div>
    </div>
  )
}

export default MissingCard
