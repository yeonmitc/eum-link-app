import { FiArrowLeft, FiHome } from 'react-icons/fi';
import { Link, useNavigate } from 'react-router-dom';
import pawIcon from '../../assets/images/paw-icon.png';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-screen bg-[var(--bg)] flex flex-col items-center justify-center p-4 overflow-hidden">
      <div className="w-full max-w-full sm:max-w-md text-center space-y-8 overflow-visible">
        {/* 404 애니메이션 아이콘 */}
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 mx-auto mb-12 animate-bounce">
          <img 
            src={pawIcon} 
            alt="404" 
            className="w-full h-full object-contain"
            style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.18)) invert(65%) sepia(75%) saturate(401%) hue-rotate(325deg) brightness(101%) contrast(101%)" }}
          />
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-2 bg-[var(--primary)]/20 rounded-full blur-sm animate-pulse" />
        </div>

        {/* 404 텍스트 */}
        <h1 className="text-6xl sm:text-8xl font-bold text-[var(--primary)] animate-pulse mt-4">404</h1>
        
        {/* 메시지 */}
        <div className="space-y-4 break-words">
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--fg)]">앗! 길을 잃으셨나요?</h2>
          <p className="text-[var(--fg)]/70 text-base sm:text-lg">
            찾으시는 페이지가 없거나 이동되었을 수 있습니다.
            <br />
            아래 버튼을 통해 다른 페이지로 이동해보세요.
          </p>
        </div>

        {/* 네비게이션 버튼 */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 px-6 py-3 bg-[var(--primary)] text-white rounded-full hover:bg-[var(--secondary)] transition-colors duration-300 min-w-[160px]"
          >
            <FiArrowLeft className="w-5 h-5" />
            이전 페이지
          </button>
          <Link
            to="/"
            className="flex items-center gap-2 px-6 py-3 bg-[var(--primary)] text-white rounded-full hover:bg-[var(--secondary)] transition-colors duration-300 min-w-[160px]"
          >
            <FiHome className="w-5 h-5" />
            홈으로 가기
          </Link>
        </div>

        {/* 추가 도움말 */}
        <div className="pt-8 text-sm text-[var(--fg)]/50 break-words">
          도움이 필요하신가요?{' '}
          <Link to="/about" className="text-[var(--primary)] hover:underline">
            고객센터
          </Link>
          에 문의해주세요.
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage; 
