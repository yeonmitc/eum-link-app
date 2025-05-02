import { format } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GENDER_MAP, SPECIES_MAP } from '../../../constants/petInfo';

const PetCard = ({ pet, type = 'missing' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const formatDate = (date) => {
    return format(new Date(date), 'M월 d일', { locale: ko });
  };

  const formatDateTime = (date, time) => {
    if (type === 'report') {
      return format(new Date(date), 'M월 d일 HH:mm', { locale: ko });
    }
    return format(new Date(`${date}T${time}`), 'M월 d일 HH:mm', { locale: ko });
  };

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

  const getDisplayDate = () => {
    if (type === 'missing') {
      return formatDateTime(pet.lostDate, pet.lostTime);
    }
    return formatDateTime(pet.sightedAt);
  };

  return (
    <div 
      className="relative rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out h-[200px] md:h-[180px] hover:scale-[1.02] hover:-translate-y-1 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* 메인 카드 컨텐츠 */}
      <div className="h-full">
        <div className="relative h-[150px] md:h-[130px] flex items-center justify-center">
          <img 
            src={pet.imageUrl} 
            alt={type === 'missing' ? `${pet.petName} 사진` : '목격 사진'}
            className="w-[150px] h-[150px] md:w-[130px] md:h-[130px] object-cover mx-auto rounded-lg border-none shadow-none"
          />
          <div className="absolute top-2 left-2 max-w-[calc(100%-16px)]">
            <span className="inline-block px-2 py-1 bg-white/90 rounded-full text-xs text-gray-700 truncate">
              {getDistrict(getAddress())}
            </span>
          </div>
        </div>
        <div className="p-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-medium">
              {type === 'missing' 
                ? `${SPECIES_MAP[pet.refSpecies]} | ${pet.petName}`
                : `${SPECIES_MAP[pet.species]} | 목격`}
            </span>
            <span className="text-gray-500">{formatDate(type === 'missing' ? pet.lostDate : pet.sightedAt)}</span>
          </div>
        </div>
      </div>

      {/* 호버 시 오버레이 */}
      <div 
        className={`
          absolute inset-0 bg-black/80 text-white p-3 text-xs rounded-lg
          transition-all duration-300 ease-in-out
          ${isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'}
        `}
      >
        <div className="space-y-1.5">
          {type === 'missing' ? (
            <>
              <h3 className="font-medium text-sm">{pet.petName} | {GENDER_MAP[pet.petGender]}</h3>
              <p className="text-white/90">{getAddress()}</p>
              <p className="text-white/90">중성화: {pet.isNeuter ? 'O' : 'X'}</p>
              <p className="text-white/90">나 이: {pet.age}살</p>
              <p className="text-white/90">실종일: {getDisplayDate()}</p>
            </>
          ) : (
            <>
              <h3 className="font-medium text-sm">{SPECIES_MAP[pet.species]} 목격</h3>
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
