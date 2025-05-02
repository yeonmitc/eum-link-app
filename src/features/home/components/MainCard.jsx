import { useState } from 'react';
import { Link } from 'react-router-dom';
import mapImage from '../../../assets/images/map.png';
import markImage from '../../../assets/images/mark.png';
import missingImage from '../../../assets/images/missing.png';

const CARD_CONFIGS = {
  '/missing': {
    bgColor: 'bg-[var(--primary)]',
    image: mapImage,
    imageSize: {
      active: 'w-[calc(80px+5vw)] h-[calc(80px+5vw)] md:w-[104px] md:h-[104px]',
      default: 'w-[calc(70px+3vw)] h-[calc(70px+3vw)] md:w-[80px] md:h-[80px]'
    }
  },
  '/reports/new': {
    bgColor: 'bg-[var(--secondary)]',
    image: missingImage,
    imageSize: {
      active: 'w-[calc(70px+4vw)] h-[calc(70px+4vw)] md:w-[78px] md:h-[78px]',
      default: 'w-[calc(60px+3vw)] h-[calc(60px+3vw)] md:w-[60px] md:h-[60px]'
    }
  },
  '/missing/new': {
    bgColor: 'bg-[#77b48d]',
    image: markImage,
    imageSize: {
      active: 'w-[calc(70px+4vw)] h-[calc(70px+4vw)] md:w-[78px] md:h-[78px]',
      default: 'w-[calc(60px+3vw)] h-[calc(60px+3vw)] md:w-[60px] md:h-[60px]'
    }
  }
};

const MainCard = ({ title, subtitle, description, to, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);
  const config = CARD_CONFIGS[to];
  if (!config) return null;

  return (
    <Link
      to={to}
      className={`block w-full h-full min-h-[200px] ${config.bgColor} hover:opacity-90 rounded-2xl relative overflow-hidden transition-all duration-300`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <style>
        {`
          @keyframes gentle-bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
        `}
      </style>
      <div className={`absolute right-6 bottom-6 flex items-center justify-center ${isActive ? config.imageSize.active : config.imageSize.default} transition-all duration-300`}>
        <img 
          src={config.image}
          alt=""
          className={`w-full h-full object-contain opacity-90 drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)] transition-all duration-150 ${
            isHovered ? 'animate-[gentle-bounce_2s_ease-in-out_infinite]' : ''
          }`}
        />
      </div>

      <div className="absolute inset-0 p-6 md:p-5 z-10">
        <h3 className="text-xl md:text-lg font-bold text-white mb-2 md:mb-1" style={{ fontFamily: 'var(--font-kbo-medium)' }}>
          {title}
        </h3>
        <p className="text-base md:text-sm text-white/90 font-medium mb-2 md:mb-1 italic" style={{ fontFamily: 'var(--font-gmarket-light)' }}>
          {subtitle}
        </p>
        <p className="text-base md:text-sm text-white/80 leading-relaxed">
          {description}
        </p>
      </div>
    </Link>
  );
};

export default MainCard; 
