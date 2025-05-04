import { Cat, Dog, PawPrint } from 'lucide-react';
import basicImage from '../../../../../assets/images/eum-logo.webp';

const ReportCard = ({ pet, speciesList }) => {
  const species = speciesList?.find((item) => item.id === pet.refSpecies.toString());

  const imageUrl = pet?.imageUrl || basicImage;

  return (
    <div className="h-[350px] overflow-hidden rounded-lg shadow-xl md:h-[330px]">
      <div
        className="h-[60%] rounded-lg"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundPosition: 'center 40%',
          backgroundSize: 'cover',
        }}
      ></div>
      <div className="my-2 ml-2 flex items-center gap-2">
        <div className="text-md flex items-center gap-2 rounded-full bg-(--secondary) px-3 py-1 text-gray-100">
          {pet?.refSpecies === 1 ? (
            <Dog className="h-5 w-5" />
          ) : pet?.refSpecies === 2 ? (
            <Cat className="h-5 w-5" />
          ) : (
            <PawPrint className="h-5 w-5" />
          )}
          <span className="truncate text-sm">{species?.name || '기타'}</span>
        </div>
        <div className="truncate text-sm font-semibold text-black"></div>
      </div>
      <div className="mx-2 mb-4">
        <div className="mt-2 flex items-center justify-start gap-2">
          <div className="text-sm text-gray-700">목격날짜</div>
          <div className="text-sm text-gray-800">
            {pet?.sightedDate && new Date(pet.sightedDate).toLocaleDateString()}
          </div>
        </div>
        <div className="mt-2 flex items-center justify-start gap-2">
          <div className="text-sm text-gray-700">목격시간</div>
          <div className="text-sm text-gray-800">
            {/* {pet?.sightedTime &&
              new Date(pet.sightedTime).toLocaleTimeString([], {
                hour: 'numeric',
                minute: 'numeric',
              })} */}
            {pet?.sightedTime && pet.sightedTime}
          </div>
        </div>
        <div className="mt-2 flex items-center justify-start gap-2">
          <div className="shrink-0 text-sm text-gray-700">목격장소</div>
          <div className="truncate text-sm text-gray-800">
            {pet?.sightedLocation?.road_address || pet?.sightedLocation?.number_address}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportCard;
