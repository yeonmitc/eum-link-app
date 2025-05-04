import { usePetListQuery } from '@/hooks/usePetList';
import useUsers from '@/hooks/useUsers';
import { useState } from 'react';
import PetCard from './PetCard';

const sliderStyles = {
  container: {
    position: 'relative',
  },
  arrows: {
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      width: '24px',
      height: '24px',
      borderWidth: '3px 3px 0 0',
      borderStyle: 'solid',
      borderColor: '#436850',
      cursor: 'pointer',
      zIndex: 10,
      transition: 'border-color 0.3s ease',
    },
    '&::before': {
      left: '-30px',
      transform: 'translateY(-50%) rotate(-135deg)',
    },
    '&::after': {
      right: '-30px',
      transform: 'translateY(-50%) rotate(45deg)',
    },
    '&:hover::before, &:hover::after': {
      borderColor: '#FBFADA',
    },
  },
};

const PetCardSlider = () => {
  const [activeTab, setActiveTab] = useState('missing'); // 'missing' 또는 'report'
  const { data: pets, isLoading: isPetsLoading } = usePetListQuery({ type: 'missing' });
  const { data: reports, isLoading: isReportsLoading } = usePetListQuery({ type: 'report' });
  const { data: users, isLoading: isUsersLoading } = useUsers();

  console.log('pets', pets);
  console.log('reports', reports);
  console.log('users', users);

  // users 배열을 Map으로 변환
  const userMap = new Map((users || []).map((user) => [user.id, user]));

  // 실종 상태인 펫들만 필터링하고 최근 실종일 순으로 정렬
  const sortedPets = Array.isArray(pets?.data)
    ? pets.data
        .filter((pet) => pet.isMissing)
        .sort((a, b) => {
          const dateA = new Date(`${a.lostDate}T${a.lostTime}`);
          const dateB = new Date(`${b.lostDate}T${b.lostTime}`);
          return dateB - dateA;
        })
        .slice(0, 6)
    : [];

  // 실종 상태인 목격 신고만 필터링하고 최근 목격일 순으로 정렬
  const sortedReports = Array.isArray(reports?.data)
    ? reports.data
        .filter((report) => report.isMissing)
        .sort((a, b) => {
          const dateA = new Date(`${a.sightedDate || ''}T${a.sightedTime || '00:00'}`);
          const dateB = new Date(`${b.sightedDate || ''}T${b.sightedTime || '00:00'}`);
          return dateB - dateA;
        })
        .slice(0, 6)
    : [];

  const [activeIndex, setActiveIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const currentData = activeTab === 'missing' ? sortedPets : sortedReports;
  const isLoading = activeTab === 'missing' ? isPetsLoading : isReportsLoading;

  // 모바일/태블릿에서 보여줄 페이지 수 계산
  const getMobilePages = () => Math.ceil(currentData.length / 2);
  const getTabletPages = () => Math.ceil(currentData.length / 3);

  const totalMobilePages = getMobilePages();
  const totalTabletPages = getTabletPages();

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = (totalPages) => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      const nextIndex = activeIndex === totalPages - 1 ? 0 : activeIndex + 1;
      setActiveIndex(nextIndex);
    }
    if (isRightSwipe) {
      const prevIndex = activeIndex === 0 ? totalPages - 1 : activeIndex - 1;
      setActiveIndex(prevIndex);
    }
  };

  const handlePrevSlide = () => {
    setActiveIndex((activeIndex - 1 + totalMobilePages) % totalMobilePages);
  };

  const handleNextSlide = () => {
    setActiveIndex((activeIndex + 1) % totalMobilePages);
  };

  if (isLoading) {
    return (
      <div className="relative mx-auto h-[40vh] w-full">
        <section className="flex h-full flex-col overflow-hidden rounded-2xl bg-white md:mx-auto md:max-w-[1200px]">
          <div className="flex items-center gap-4 p-4 px-6 pb-0">
            <button
              onClick={() => setActiveTab('missing')}
              className={`text-xl font-bold transition-all duration-300 md:text-lg ${
                activeTab === 'missing' ? 'scale-105 text-[var(--primary)]' : 'text-gray-400'
              }`}
              style={{ fontFamily: 'var(--font-kbo-medium)', cursor: 'pointer' }}
            >
              최근 실종
            </button>
            <button
              onClick={() => setActiveTab('report')}
              className={`text-xl font-bold transition-all duration-300 md:text-lg ${
                activeTab === 'report' ? 'scale-105 text-[var(--primary)]' : 'text-gray-400'
              }`}
              style={{ fontFamily: 'var(--font-kbo-medium)', cursor: 'pointer' }}
            >
              최근 목격
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-[var(--primary)] border-t-transparent"></div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="relative mx-auto h-[40vh] w-full">
      <section className="flex h-full flex-col overflow-hidden rounded-2xl bg-white md:mx-auto md:w-[95%] md:max-w-[1140px]">
        <div className="flex items-center gap-4 p-4 px-6 pb-0">
          <button
            onClick={() => setActiveTab('missing')}
            className={`text-xl font-bold transition-all duration-300 md:text-lg ${
              activeTab === 'missing' ? 'scale-105 text-[var(--primary)]' : 'text-gray-400'
            }`}
            style={{ fontFamily: 'var(--font-kbo-medium)', cursor: 'pointer' }}
          >
            최근 실종
          </button>
          <button
            onClick={() => setActiveTab('report')}
            className={`text-xl font-bold transition-all duration-300 md:text-lg ${
              activeTab === 'report' ? 'scale-105 text-[var(--primary)]' : 'text-gray-400'
            }`}
            style={{ fontFamily: 'var(--font-kbo-medium)', cursor: 'pointer' }}
          >
            최근 목격
          </button>
        </div>

        <div
          className="relative flex flex-1 items-center overflow-hidden"
          style={{
            ...sliderStyles.container,
            '&::before, &::after': sliderStyles.arrows['&::before, &::after'],
            '&::before': sliderStyles.arrows['&::before'],
            '&::after': sliderStyles.arrows['&::after'],
            '&:hover::before, &:hover::after':
              sliderStyles.arrows['&:hover::before, &:hover::after'],
          }}
        >
          {currentData.length === 0 ? (
            <div className="flex h-full w-full flex-col items-center justify-center px-4">
              <div className="space-y-2 text-center">
                <p className="text-gray-500">
                  {activeTab === 'missing'
                    ? '현재 등록된 실종 동물이 없습니다.'
                    : '현재 등록된 목격 제보가 없습니다.'}
                </p>
                <p className="text-sm text-gray-400">
                  {activeTab === 'missing'
                    ? '실종 동물 발견 시 제보해주세요.'
                    : '실종 동물 목격 시 제보해주세요.'}
                </p>
              </div>
            </div>
          ) : (
            <>
              {/* ✅ 모바일: 0 ~ 299px만 보임 */}
              <div className="hidden h-[300px] w-full overflow-hidden [@media(max-width:499px)]:block">
                {/* 모바일 슬라이더 */}
                <div
                  className="h-full overflow-hidden"
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={() => onTouchEnd(totalMobilePages)}
                >
                  <div
                    className="flex h-full transition-transform duration-300 ease-out"
                    style={{
                      transform: `translateX(-${activeIndex * 100}%)`,
                    }}
                  >
                    {Array.from({ length: totalMobilePages }).map((_, pageIndex) => (
                      <div
                        key={pageIndex}
                        className="grid w-full grid-cols-2 gap-4 px-4"
                        style={{ minWidth: '100%' }}
                      >
                        {currentData.slice(pageIndex * 2, (pageIndex + 1) * 2).map((item) => {
                          const user = userMap.get(item.userId);
                          return (
                            <div key={item.id} className="flex items-center justify-center">
                              <PetCard pet={item} username={user?.username} type={activeTab} />
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ✅ 태블릿: 300 ~ 599px만 보임 */}
              <div className="hidden h-[300px] w-full overflow-hidden [@media(min-width:500px)]:block [@media(min-width:600px)]:hidden">
                {/* 태블릿 슬라이더 */}
                <div
                  className="h-full"
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={() => onTouchEnd(totalTabletPages)}
                >
                  <div
                    className="flex h-full transition-transform duration-300 ease-out"
                    style={{
                      transform: `translateX(-${activeIndex * 100}%)`,
                    }}
                  >
                    {Array.from({ length: totalTabletPages }).map((_, pageIndex) => (
                      <div
                        key={pageIndex}
                        className="grid w-full flex-shrink-0 grid-cols-3 gap-4 px-6"
                        style={{ minWidth: '100%' }}
                      >
                        {currentData.slice(pageIndex * 3, (pageIndex + 1) * 3).map((item) => {
                          const user = userMap.get(item.userId);
                          return (
                            <div key={item.id} className="flex items-center justify-center">
                              <PetCard pet={item} username={user?.username} type={activeTab} />
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ✅ 데스크탑: 600px 이상에서만 보임 */}
              <div className="hidden h-[85%] grid-cols-6 items-center gap-4 px-6 md:mx-auto md:max-w-[1200px] [@media(min-width:600px)]:grid">
                {currentData.map((item) => {
                  const user = userMap.get(item.userId);
                  return (
                    <PetCard key={item.id} pet={item} username={user?.username} type={activeTab} />
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      {/* 슬라이더 인디케이터 - 모바일 */}
      {totalMobilePages > 1 && (
        <div className="mt-3 flex justify-center gap-2.5 pb-3 md:hidden">
          {Array.from({ length: totalMobilePages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'w-7 bg-[var(--primary)]'
                  : 'w-1.5 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}

      {/* 슬라이더 인디케이터 - 태블릿 */}
      {totalTabletPages > 1 && (
        <div className="mt-3 hidden justify-center gap-2.5 md:flex lg:hidden">
          {Array.from({ length: totalTabletPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => handleDotClick(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? 'w-7 bg-[var(--primary)]'
                  : 'w-1.5 bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PetCardSlider;
