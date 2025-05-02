import { FiSearch } from 'react-icons/fi';

export default function SearchBar({ isOpen }) {
  return (
    <div
      className={`absolute left-0 right-0 bg-white/95 transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? 'h-16 opacity-100' : 'h-0 opacity-0'
      }`}
    >
      <div className="h-full px-4 flex items-center">
        <div className="relative flex-1 max-w-3xl mx-auto">
          <input
            type="text"
            placeholder="찾고자하는 위치를 검색하세요"
            className="w-full h-10 pl-10 pr-4 rounded-full border-2 border-[var(--primary)] bg-[var(--bg)] text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
          />
          <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--primary)]" />
        </div>
      </div>
    </div>
  );
} 