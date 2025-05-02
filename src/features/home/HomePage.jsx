import React from 'react';

import './HomePage.style.css';
import MainCardSlider from './components/MainCardSlider';
import PetCardSlider from './components/PetCardSlider';
const HomePage = () => {
  return (
    <div className="h-[calc(100vh-120px)] bg-[#F5EEDD] overflow-y-auto overflow-x-hidden scrollbar">
      <div className="container mx-auto px-4 py-4 md:pb-0 space-y-8">
        {/* 카드 슬라이더 섹션 */}
        <MainCardSlider />

        {/* 최근 실종 동물 섹션 */}
        <PetCardSlider />
      </div>
    </div>
  );
};

export default HomePage;