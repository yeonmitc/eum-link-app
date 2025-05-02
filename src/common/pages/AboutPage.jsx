import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-[calc(100vh-128px)] bg-[var(--bg)] overflow-y-auto scrollbar">
      <div className="container mx-auto w-full px-2 py-2 md:py-12">
        <h1 className="text-3xl font-bold text-[var(--primary)] mb-3">이음 소개</h1>
        <div className="bg-white/70 backdrop-blur-sm rounded-[20px] p-6 md:p-8 space-y-8">
          <section>
            <p className="text-lg leading-relaxed text-[var(--fg)]/80">
              이음은 잃어버린 반려동물과 그들의 가족을 다시 연결해주는 서비스입니다.
              우리는 모든 반려동물이 안전하게 가족의 품으로 돌아갈 수 있도록 돕고 있습니다.
            </p>
          </section>
          
          <section>
            <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">주요 기능</h2>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 rounded-full bg-[var(--primary)] mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">실종 신고</h3>
                  <p className="text-[var(--fg)]/70">잃어버린 반려동물의 정보를 등록하고 주변에 알릴 수 있습니다.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 rounded-full bg-[var(--primary)] mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">목격 제보</h3>
                  <p className="text-[var(--fg)]/70">실종된 반려동물을 목격하면 바로 제보할 수 있습니다.</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 mt-2 rounded-full bg-[var(--primary)] mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-medium mb-1">지도 기반 검색</h3>
                  <p className="text-[var(--fg)]/70">내 주변의 실종/목격 정보를 지도에서 쉽게 확인할 수 있습니다.</p>
                </div>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[var(--primary)] mb-4">함께하는 방법</h2>
            <p className="text-[var(--fg)]/80">
              이음과 함께 더 많은 반려동물이 가족의 품으로 돌아갈 수 있도록 도와주세요.
              실종된 반려동물을 목격하셨다면 바로 제보해 주시고, 주변에 알려주세요.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 