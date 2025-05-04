// src/common/components/Header.jsx
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { FiMenu, FiSearch, FiUser, FiX } from 'react-icons/fi';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import eumLogo from '../../assets/images/eum-logo.webp';
import useAuth from '../../hooks/useAuth';
import useUserStore from '../../store/userStore';
import RegisterModal from './RegisterModal';
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
  const [isSearchOpen, setIsSearchOpen] = useState(false); // 검색창 열림 여부
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // 모바일 메뉴 열림 여부
  const [activeNav, setActiveNav] = useState(null); // 현재 선택된 네비게이션 항목 인덱스
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const login = useUserStore((state) => state.login);
  const logout = useUserStore((state) => state.logout);
  const { signIn } = useAuth();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const location = useLocation();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [searchType, setSearchType] = useState('실종');
  const [showRegister, setShowRegister] = useState(false);

  // 네비게이션 항목 목록
  const navItems = [
    { to: '/about', label: '소개' },
    { to: '/missing', label: '실종 신고' },
    { to: '/reports', label: '목격 제보' },
  ];

  // 모바일 메뉴 열기/닫기 토글 및 스크롤 방지
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
    document.body.style.overflow = !isMobileMenuOpen ? 'hidden' : '';
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!loginForm.email || !loginForm.password) {
      toast.error('아이디와 비밀번호를 모두 입력하세요.');
      return;
    }
    // 실제 로그인
    const user = await signIn(loginForm.email, loginForm.password);
    if (user) {
      setIsLoginOpen(false);
      setLoginForm({ email: '', password: '' });
      navigate('/mypage');
    }
  };

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    if (searchValue.trim()) {
      if (searchType === '실종') {
        navigate(`/missing?address=${encodeURIComponent(searchValue.trim())}&map=true`);
      } else if (searchType === '목격') {
        navigate(`/reports?address=${encodeURIComponent(searchValue.trim())}&map=true`);
      }
      // 모바일/태블릿에서만: 검색 후 검색바 숨기고 입력값 초기화
      if (window.innerWidth < 1024) {
        setIsSearchOpen(false);
        setSearchValue('');
      }
    }
  };
  return (
    <>
      {/* 상단 헤더 영역 */}
      <header className="fixed top-0 right-0 left-0 z-10 border-b border-[var(--border)] bg-white">
        <div className="w-full px-4">
          <div className="flex h-16 items-center justify-between">
            {/* 모바일 햄버거 메뉴 버튼 */}
            <button
              className="block rounded-full p-2 hover:bg-[var(--secondary)]/10 [@media(min-width:500px)]:hidden"
              onClick={toggleMobileMenu}
              aria-label="메뉴 열기"
            >
              {isMobileMenuOpen ? (
                <FiX className="h-6 w-6 text-[var(--fg)]" />
              ) : (
                <FiMenu className="h-6 w-6 text-[var(--fg)]" />
              )}
            </button>

            {/* 로고 + 데스크탑 네비게이션 */}
            <div className="flex min-w-0 flex-1 items-center">
              {/* 로고 및 사이트 이름 */}
              <Link to="/" className="group mr-6 flex items-center gap-2">
                <div className="h-[50px] w-[50px] overflow-hidden">
                  <img
                    src={eumLogo}
                    alt="이음 로고"
                    className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-125 group-hover:opacity-90"
                  />
                </div>
                <span
                  style={{ fontFamily: 'Gmarket_bold' }}
                  className="text-xl whitespace-nowrap text-[var(--primary)] transition-colors group-hover:text-[var(--point)] md:text-2xl"
                >
                  이음
                </span>
              </Link>

              {/* 데스크탑용 네비게이션 링크 */}
              <nav className="hidden flex-shrink-0 flex-nowrap items-center space-x-6 [&>*]:whitespace-nowrap [@media(min-width:500px)]:block">
                {navItems.map((item, idx) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`hover:font-kbo-medium font-kbo-light text-base text-[var(--fg)] transition-all hover:text-[var(--point)] ${
                      location.pathname === item.to ? 'font-kbo-medium text-[var(--point)]' : ''
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

            {/* 우측 아이콘들 (검색, 사용자) */}
            <div className="flex shrink-0 items-center space-x-2 pr-1 md:space-x-4">
              {/* 데스크탑(800px 이상)만 */}
              <div className="hidden items-center gap-2 [@media(min-width:800px)]:flex">
                <SearchBar
                  isDesktop
                  value={searchValue}
                  setValue={setSearchValue}
                  type={searchType}
                  setType={setSearchType}
                  onSearch={handleSearch}
                />
              </div>

              {/* 모바일/태블릿용 (1023px 이하) 검색 아이콘 */}
              <button
                className="block rounded-full p-2 hover:bg-[var(--secondary)]/10 lg:hidden"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
              >
                <FiSearch className="h-5 w-5 text-[var(--fg)]" />
              </button>

              {/* 사용자 아이콘 및 로그인 드롭다운 */}
              <div className="relative">
                <button
                  className="rounded-full p-2 hover:bg-[var(--secondary)]/10 focus:outline-none"
                  onClick={() => {
                    if (isLoggedIn && location.pathname === '/mypage') {
                      setIsLogoutModalOpen(true);
                    } else if (isLoggedIn) {
                      navigate('/mypage');
                    } else {
                      setIsLoginOpen(!isLoginOpen);
                    }
                  }}
                >
                  <FiUser className="h-5 w-5 text-[var(--fg)]" />
                </button>

                {/* 로그인 드롭다운 폼 */}
                {!isLoggedIn && isLoginOpen && (
                  <div className="absolute top-full right-0 z-50 mt-2 w-64 rounded-lg border border-[var(--border)] bg-white p-4 shadow-lg">
                    <form onSubmit={handleLogin} className="space-y-3">
                      <div>
                        <label
                          htmlFor="email"
                          className="mb-1 block text-sm font-medium text-[var(--fg)]"
                        >
                          이메일
                        </label>
                        <input
                          type="text"
                          id="email"
                          name="email"
                          value={loginForm.email}
                          onChange={handleLoginChange}
                          className="w-full rounded-md border border-[var(--border)] px-3 py-2 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none"
                          placeholder="이메일을 입력하세요"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="password"
                          className="mb-1 block text-sm font-medium text-[var(--fg)]"
                        >
                          비밀번호
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={loginForm.password}
                          onChange={handleLoginChange}
                          className="w-full rounded-md border border-[var(--border)] px-3 py-2 focus:ring-2 focus:ring-[var(--primary)] focus:outline-none"
                          placeholder="비밀번호를 입력하세요"
                        />
                      </div>
                      <button
                        type="submit"
                        className="w-full rounded-md bg-[var(--primary)] py-2 text-white transition-colors hover:bg-[var(--primary)]/90"
                      >
                        로그인
                      </button>
                      <div className="mt-2 text-center">
                        <button
                          type="button"
                          className="text-sm text-[var(--fg)] transition-colors hover:text-[var(--primary)]"
                          onClick={() => {
                            setIsLoginOpen(false);
                            setShowRegister(true);
                          }}
                        >
                          아직 회원이 아니신가요?
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            login();
                            setIsLoginOpen(false);
                            navigate('/mypage');
                          }}
                          className="ml-2 text-sm text-[var(--fg)] transition-colors hover:text-[var(--primary)]"
                        >
                          테스트로그인
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 모바일/태블릿(1023px 이하)에서만 보이는 SearchBar (nav 아래) */}
        <div className="block px-4 pt-2 lg:hidden">
          <SearchBar
            isOpen={isSearchOpen}
            value={searchValue}
            setValue={setSearchValue}
            type={searchType}
            setType={setSearchType}
            onSearch={handleSearch}
          />
        </div>
      </header>

      {/* 모바일 메뉴 영역 */}
      <div
        className={`fixed inset-0 z-40 bg-white transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } md:hidden`}
        style={{ top: '64px' }}
      >
        <nav className="w-full px-4 py-4">
          {navItems.map((item, idx) => (
            <Link
              key={item.to}
              to={item.to}
              className={`font-kbo-light block border-b border-[var(--border)] py-3 text-xl transition-all ${
                location.pathname === item.to
                  ? 'font-kbo-medium text-[var(--point)]'
                  : 'text-[var(--fg)]'
              }`}
              onTouchStart={() => setActiveNav(idx)}
              onTouchEnd={() => setActiveNav(null)}
              onMouseLeave={() => setActiveNav(null)}
              onClick={toggleMobileMenu}
            >
              {item.label}
            </Link>
          ))}
          {/* 로그인 상태일 때만 로그아웃 버튼 노출 */}
          {isLoggedIn && (
            <button
              className="mt-4 block w-full rounded-full bg-[var(--secondary)] px-4 py-2 text-base text-white transition hover:bg-[var(--primary)]"
              onClick={() => {
                logout();
                setIsMobileMenuOpen(false);
                navigate('/');
              }}
            >
              로그아웃
            </button>
          )}
        </nav>
      </div>

      {/* 모바일 메뉴가 열렸을 때 오버레이 배경 */}
      {isMobileMenuOpen && (
        <div
          className="bg-opacity-30 fixed inset-0 z-30 bg-black md:hidden"
          style={{ top: '64px' }}
          onClick={toggleMobileMenu}
        />
      )}

      {/* 로그아웃 모달 */}
      {isLogoutModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.3)' }}
        >
          <div className="w-80 rounded-lg bg-white p-6 text-center shadow-lg">
            <div className="mb-4 text-lg font-semibold">로그아웃 하시겠습니까?</div>
            <div className="mt-6 flex justify-center gap-4">
              <button
                className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
                onClick={() => setIsLogoutModalOpen(false)}
              >
                취소
              </button>
              <button
                className="rounded bg-[var(--primary)] px-4 py-2 text-white hover:bg-[var(--primary)]/90"
                onClick={() => {
                  logout();
                  setIsLogoutModalOpen(false);
                  navigate('/');
                }}
              >
                로그아웃
              </button>
            </div>
          </div>
        </div>
      )}
      <RegisterModal show={showRegister} onClose={() => setShowRegister(false)} />
    </>
  );
}
