import defaultImg from '@/assets/images/eum-logo.webp';
import { GENDER_MAP, SPECIES_MAP } from '@/constants/petInfo';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getKSTDateOnly, getKSTDateTime } from './DateTimeKST';

const PetCard = ({ pet, type = 'missing' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  // 지역명 추출 (시/군/구까지만)
  const getDistrict = (address) => {
    const parts = address.split(' ').slice(0, 2);
    return parts.join(' ');
  };

  const handleClick = () => {
    if (type === 'missing') {
      navigate(`/missing/${pet.id}`);
    } else {
      navigate(`/reports/${pet.id}`);
    }
  };

  const getAddress = () => {
    if (type === 'missing') {
      return pet.lostLocation.road_address;
    }
    return pet.sightedLocation.road_address;
  };

  // 날짜/시간 표시 함수 분리
  const getDisplayDate = () => getKSTDateTime(pet, type);
  const getDisplayDateOnly = () => getKSTDateOnly(pet, type);

  return (
    <div
      className="relative h-[210px] min-w-[180px] cursor-pointer overflow-hidden rounded-lg bg-white shadow-sm transition-all duration-300 ease-in-out hover:-translate-y-1 hover:scale-[1.02] hover:shadow-xl md:h-[190px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* 메인 카드 컨텐츠 */}
      <div className="h-full">
        <div className="relative flex h-[160px] items-center justify-center md:h-[140px]">
          <img
            src={pet.imageUrl || defaultImg}
            alt={type === 'missing' ? `${pet.petName} 사진` : '목격 사진'}
            className="mx-auto h-[160px] w-[160px] rounded-lg object-cover md:h-[140px] md:w-[140px]"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = defaultImg;
            }}
          />
          <div className="absolute top-2 left-2 max-w-[calc(100%-16px)]">
            <span className="inline-block truncate rounded-full bg-white/90 px-2 py-1 text-xs text-gray-700">
              {getDistrict(getAddress())}
            </span>
          </div>
        </div>
        <div className="p-2 pb-[13px] text-xs">
          <div className="flex flex-col gap-y-0.5 md:flex-row md:flex-nowrap md:items-center md:justify-between md:gap-x-2">
            <span className="w-full flex-shrink truncate font-medium md:w-auto">
              {type === 'missing'
                ? `${SPECIES_MAP[pet.refSpecies]} | ${pet.petName}`
                : `${SPECIES_MAP[pet.species]} | 목격`}
            </span>
            <span className="w-full flex-shrink-0 truncate whitespace-nowrap text-gray-500 md:ml-2 md:w-auto">
              {getDisplayDateOnly()}
            </span>
          </div>
        </div>
      </div>

      {/* 호버 시 오버레이 */}
      <div
        className={`absolute inset-0 rounded-lg bg-black/80 p-3 text-xs text-white transition-all duration-300 ease-in-out ${isHovered ? 'opacity-100' : 'pointer-events-none opacity-0'} `}
      >
        <div className="space-y-1.5">
          {type === 'missing' ? (
            <>
              <h3 className="text-sm font-medium">
                {pet.petName} | {GENDER_MAP[pet.petGender]}
              </h3>
              <p className="text-white/90">{getAddress()}</p>
              <p className="text-white/90">중성화: {pet.isNeuter ? 'O' : 'X'}</p>
              <p className="text-white/90">나 이: {pet.age}살</p>
              <p className="text-white/90">실종일: {getDisplayDate()}</p>
            </>
          ) : (
            <>
              <h3 className="text-sm font-medium">{SPECIES_MAP[pet.species]} 목격</h3>
              <p className="text-white/90">{getAddress()}</p>
              <p className="text-white/90">{pet.description}</p>
              <p className="text-white/90">목격일: {getDisplayDate()}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default PetCard;
