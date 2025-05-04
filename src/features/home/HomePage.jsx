import MainCardSlider from './components/MainCardSlider';
import PetCardSlider from './components/PetCardSlider';
import './HomePage.style.css';

const HomePage = () => {
  return (
    <div className="scrollbar h-[calc(100vh-120px)] overflow-x-hidden overflow-y-auto bg-[#F5EEDD]">
      <div className="mx-auto h-full space-y-8 px-4 py-4 md:pb-0">
        {/* 카드 슬라이더 섹션 */}
        <MainCardSlider />
        {/* 최근 실종 동물 섹션 */}
        <PetCardSlider />
      </div>
    </div>
  );
};

export default HomePage;
