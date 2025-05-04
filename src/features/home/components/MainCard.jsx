import { useState } from 'react';
import mapImage from '../../../assets/images/map.png';
import markImage from '../../../assets/images/mark.png';
import missingImage from '../../../assets/images/missing.png';

const CARD_CONFIGS = {
  '/missing': {
    bgColor: 'bg-[var(--primary)]',
    image: mapImage,
    imageSize: {
      active: 'w-[calc(56px+3.5vw)] h-[calc(56px+3.5vw)] md:w-[73px] md:h-[73px]',
      default: 'w-[calc(49px+2vw)] h-[calc(49px+2vw)] md:w-[56px] md:h-[56px]',
    },
  },
  '/reports/new': {
    bgColor: 'bg-[var(--secondary)]',
    image: missingImage,
    imageSize: {
      active: 'w-[calc(49px+2.8vw)] h-[calc(49px+2.8vw)] md:w-[54px] md:h-[54px]',
      default: 'w-[calc(42px+2vw)] h-[calc(42px+2vw)] md:w-[42px] md:h-[42px]',
    },
  },
  '/missing/new': {
    bgColor: 'bg-[#77b48d]',
    image: markImage,
    imageSize: {
      active: 'w-[calc(49px+2.8vw)] h-[calc(49px+2.8vw)] md:w-[54px] md:h-[54px]',
      default: 'w-[calc(42px+2vw)] h-[calc(42px+2vw)] md:w-[42px] md:h-[42px]',
    },
  },
};

const MainCard = ({ title, subtitle, description, isActive, image }) => {
  const mapImageName = 'map.png';
  const isMap = image && image.includes && image.includes(mapImageName);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative block h-full w-full cursor-pointer overflow-hidden rounded-2xl bg-[var(--primary)] transition-all duration-300 hover:opacity-90`}
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
      <div
        className={`absolute right-6 bottom-6 flex items-center justify-center ${isMap ? 'h-[90px] w-[90px] md:h-[100px] md:w-[100px]' : 'h-[73px] w-[73px] md:h-[73px] md:w-[73px]'} transition-all duration-300`}
      >
        <img
          src={image}
          alt=""
          className={`h-full w-full object-contain opacity-90 drop-shadow-[0_4px_8px_rgba(0,0,0,0.25)] transition-all duration-150 ${isActive ? 'scale-[1.2]' : ''} ${isHovered ? 'animate-[gentle-bounce_2s_ease-in-out_infinite]' : ''} `}
          style={{ transform: isActive ? 'scale(1.2)' : undefined }}
        />
      </div>

      <div className="absolute inset-0 p-6 md:p-5">
        <h3
          className="mb-2 text-xl font-bold text-white md:mb-1 md:text-lg"
          style={{ fontFamily: 'var(--font-kbo-medium)' }}
        >
          {title}
        </h3>
        <p
          className="mb-2 text-base font-medium text-white/90 italic md:mb-1 md:text-sm"
          style={{ fontFamily: 'var(--font-gmarket-light)' }}
        >
          {subtitle}
        </p>
        <p className="text-base leading-relaxed text-white/80 md:text-sm">{description}</p>
      </div>
    </div>
  );
};

export default MainCard;
