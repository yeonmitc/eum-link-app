import { useRef, useState } from 'react';
import MainCard from './MainCard';


const MainCardSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const sliderRef = useRef(null);

  const cards = [
    {
      title: '실종/제보 리스트 보기',
      subtitle: '"내 주변 실종/제보 현황이 궁금하신가요?"',
      description: '현재 위치 기반으로 실종/제보 정보를 확인하세요.',
      to: '/missing'
    },
    {
      title: '목격 제보하기',
      subtitle: '"실종 동물을 발견하셨나요?"',
      description: '당신이 본 그 순간을 알려주세요. 잃어버린 마음을 되찾아 줄 수 있습니다.',
      to: '/reports/new'
    },
    {
      title: '실종 신고하기',
      subtitle: '"반려동물을 잃어버리셨나요?"',
      description: '지금 바로 실종 신고를 등록하고, 다양한 사람들에게 알려주세요.',
      to: '/missing/new'
    }
  ];

  // 현재 활성화된 카드에 따른 비율 계산
  const getCardRatios = (index) => {
    const ratios = [
      [5, 3, 3], // 첫 번째 카드가 활성화될 때
      [3, 5, 3], // 두 번째 카드가 활성화될 때
      [3, 3, 5]  // 세 번째 카드가 활성화될 때
    ];
    return ratios[index];
  };

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  const handlePrevClick = () => {
    setActiveIndex(prev => prev === 0 ? cards.length - 1 : prev - 1);
  };

  const handleNextClick = () => {
    setActiveIndex(prev => prev === cards.length - 1 ? 0 : prev + 1);
  };

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleNextClick();
    }
    if (isRightSwipe) {
      handlePrevClick();
    }
  };

  const currentRatios = getCardRatios(activeIndex);

  return (
    <div className="relative h-[35vh] md:h-[32vh] w-full mx-auto">
      <div className="relative h-full px-0 md:px-6 lg:px-8 md:max-w-[1200px] md:mx-auto">
        {/* 모바일 뷰 */}
        <div className="md:hidden h-full overflow-hidden">
          <div 
            className="flex h-full transition-transform duration-300 ease-out w-full"
            style={{
              transform: `translateX(-${activeIndex * 100}%)`
            }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            ref={sliderRef}
          >
            {cards.map((card, index) => (
              <div 
                key={index}
                className="w-full h-full flex-shrink-0"
                style={{ minWidth: '100%' }}
              >
                <MainCard {...card} isActive={index === activeIndex} />
              </div>
            ))}
          </div>
        </div>

        {/* 데스크탑/태블릿 뷰 */}
        <div className="sm:hidden md:flex h-full gap-5 lg:gap-6 " >
          {cards.map((card, index) => (
            <div 
              key={index}
              className="transition-all duration-300 ease-out cursor-pointer h-full min-h-[230px]"
              style={{
                width: `${currentRatios[index] * (100/11)}%`
              }}
              onClick={() => handleDotClick(index)}
            >
              <MainCard {...card} isActive={currentRatios[index] === 5} />
            </div>
          ))}
        </div>

        {/* 네비게이션 버튼 - 데스크탑 전용 화살표 */}
        <div className="lg:block absolute inset-x-0 top-1/2 -translate-y-1/2 z-10 w-full">
          <div className="container relative mx-auto px-4">
            <button
              onClick={handlePrevClick}
              className="absolute left-0 w-10 h-10 -translate-x-12 bg-white/80 hover:bg-white rounded-full shadow-md transition-all duration-300 group"
              aria-label="이전 슬라이드"
            >
              <div className="w-3 h-3 absolute top-1/2 left-1/2 -translate-x-[40%] -translate-y-1/2 border-[2px] border-[var(--primary)] border-b-0 border-l-0 rotate-[-135deg] group-hover:border-[var(--point)]" />
            </button>
            <button
              onClick={handleNextClick}
              className="absolute right-0 w-10 h-10 translate-x-12 bg-white/80 hover:bg-white rounded-full shadow-md transition-all duration-300 group"
              aria-label="다음 슬라이드"
            >
              <div className="w-3 h-3 absolute top-1/2 left-1/2 -translate-x-[60%] -translate-y-1/2 border-[2px] border-[var(--primary)] border-b-0 border-l-0 rotate-45 group-hover:border-[var(--point)]" />
            </button>
          </div>
        </div>

        {/* 슬라이더 인디케이터 */}
        <div className="flex justify-center gap-2.5 mt-3">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'w-7 bg-[#436850]'
                  : 'w-1.5 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainCardSlider;
