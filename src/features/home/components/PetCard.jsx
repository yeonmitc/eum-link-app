import defaultImg from '@/assets/images/eum-logo.webp';
import { GENDER_MAP, SPECIES_MAP } from '@/constants/petInfo';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getKSTDateOnly, getKSTDateTime } from './DateTimeKST';


const PetCard = ({ pet, type = 'missing' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}월 ${day}일`;
  };

  const formatDateTime = (dateStr, timeStr) => {
    let date;
    if (timeStr) {
      date = new Date(`${dateStr}T${timeStr}`);
    } else {
      date = new Date(dateStr);
    }
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    return `${month}월 ${day}일 ${hour}:${minute}`;
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

  // 날짜/시간 표시 함수 분리
  const getDisplayDate = () => getKSTDateTime(pet, type);
  const getDisplayDateOnly = () => getKSTDateOnly(pet, type);

  return (
    <div 
      className="relative rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 ease-in-out h-[210px] md:h-[190px] hover:scale-[1.02] hover:-translate-y-1 cursor-pointer min-w-[180px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* 메인 카드 컨텐츠 */}
      <div className="h-full">
        <div className="relative h-[160px] md:h-[140px] flex items-center justify-center">
          <img 
            src={pet.imageUrl || defaultImg} 
            alt={type === 'missing' ? `${pet.petName} 사진` : '목격 사진'}
            className="w-[160px] h-[160px] md:w-[140px] md:h-[140px] object-cover mx-auto rounded-lg"
            onError={e => { e.target.onerror = null; e.target.src = defaultImg; }}
          />
          <div className="absolute top-2 left-2 max-w-[calc(100%-16px)]">
            <span className="inline-block px-2 py-1 bg-white/90 rounded-full text-xs text-gray-700 truncate">
              {getDistrict(getAddress())}
            </span>
          </div>
        </div>
        <div className="p-2 text-xs pb-[13px]">
          <div className="flex flex-col md:flex-row md:flex-nowrap md:items-center md:justify-between gap-y-0.5 md:gap-x-2">
            <span className="font-medium truncate w-full md:w-auto flex-shrink">
              {type === 'missing' 
                ? `${SPECIES_MAP[pet.refSpecies]} | ${pet.petName}`
                : `${SPECIES_MAP[pet.species]} | 목격`}
            </span>
            <span className="text-gray-500 md:ml-2 whitespace-nowrap truncate w-full md:w-auto flex-shrink-0">{getDisplayDateOnly()}</span>
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
