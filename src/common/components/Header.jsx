// src/common/components/Header.jsx
import { useState } from 'react';
import { FiMenu, FiSearch, FiUser, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import eumLogo from '../../assets/images/eum-logo.webp';
import SearchBar from './SearchBar';

// 스타일 추가
const style = document.createElement('style');
style.textContent = `

  .nav-link-hover-font:hover {
    font-family: 'KBO_medium', 'Noto Sans KR', sans-serif;
    font-weight: 500;
  }
`;
document.head.appendChild(style);

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState(null); // 터치 중인 navItem 인덱스

  const navItems = [
    { to: '/about', label: '소개' },
    { to: '/pets', label: '전체 현황' },
    { to: '/missing', label: '실종 신고' },
    { to: '/reports', label: '목격 제보' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    // 모바일 메뉴가 열릴 때 스크롤 방지
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[var(--border)]">
        <div className="relative">
          <div className="w-full px-4">
            {/* 최상위 flex 컨테이너: justify-between으로 좌우 분리 */}
            <div className="flex items-center h-16 justify-between w-full">
              {/* 햄버거 메뉴 버튼 (모바일) */}
              <button 
                className="md:hidden pl-1 pr-2 hover:bg-[var(--secondary)]/10 rounded-full"
                onClick={toggleMobileMenu}
                aria-label="메뉴 열기"
              >
                {isMobileMenuOpen ? (
                  <FiX className="w-6 h-6 text-[var(--fg)]" />
                ) : (
                  <FiMenu className="w-6 h-6 text-[var(--fg)]" />
                )}
              </button>

              {/* 로고+이름+네비게이션 (가운데 정렬) */}
              <div className="flex items-center flex-1 min-w-0">
                {/* 로고+이름 */}
                <Link 
                  to="/" 
                  className="flex items-center gap-2 mx-1 md:mx-0 md:mr-8 cursor-pointer group"
                >
                  <div className="overflow-hidden w-[50px] h-[50px] mr-1">
                    <img 
                      src={eumLogo} 
                      alt="이음 로고" 
                      className="w-full h-full object-contain transition-all duration-300 ease-out transform group-hover:scale-125 group-hover:opacity-90" 
                    />
                  </div>
                  <span className="font-kbo-bold text-xl md:text-2xl text-[var(--primary)] whitespace-nowrap transition-colors duration-300 group-hover:text-[var(--point)] ml-1">
                    이음
                  </span>
                </Link>
                {/* 데스크탑 네비게이션 */}
                <nav className="md:flex items-center space-x-6 w-full sm:hidden">
                  {navItems.map((item, idx) => (
                    <Link
                      key={item.to}
                      to={item.to}
                      className={`text-[var(--fg)] hover:text-[var(--primary)] transition-all whitespace-nowrap text-base font-kbo-light nav-link nav-link-hover-font ${
                        activeNav === idx ? 'font-kbo-medium text-[var(--primary)]' : ''
                      }`}
                      onTouchStart={() => setActiveNav(idx)}
                      onTouchEnd={() => setActiveNav(null)}
                      onMouseLeave={() => setActiveNav(null)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>

              {/* 우측 메뉴 */}
              <div className="flex items-center space-x-2 pr-1 md:space-x-4">
                <button 
                  className="p-2 hover:bg-[var(--secondary)]/10 rounded-full"
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                >
                  <FiSearch className="w-5 h-5 text-[var(--fg)]" />
                </button>
                <button className="p-2 hover:bg-[var(--secondary)]/10 rounded-full">
                  <FiUser className="w-5 h-5 text-[var(--fg)]" />
                </button>
              </div>
            </div>
          </div>
          <SearchBar isOpen={isSearchOpen} />
        </div>
      </header>

      {/* 모바일 네비게이션 메뉴 */}
      <div 
        className={`fixed inset-0 bg-white z-40 transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
        style={{ top: '64px' }}
      >
        <nav className="w-full px-4 py-4">
          {navItems.map((item, idx) => (
            <Link
              key={item.to}
              to={item.to}
              className={`block py-3 text-xl font-kbo-light border-b border-[var(--border)] transition-all ${
                activeNav === idx ? 'font-kbo-medium text-[var(--primary)]' : 'text-[var(--fg)]'
              }`}
              onTouchStart={() => setActiveNav(idx)}
              onTouchEnd={() => setActiveNav(null)}
              onMouseLeave={() => setActiveNav(null)}
              onClick={toggleMobileMenu}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* 모바일 메뉴 오버레이 */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          style={{ top: '64px' }}
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
}
