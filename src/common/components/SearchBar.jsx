import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar({ isOpen, isDesktop }) {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (value.trim()) {
      navigate(`/pet?q=${encodeURIComponent(value.trim())}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  if (isDesktop) {
    return (
      <div className="relative w-[220px] min-w-0">
        <select
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-[color:var(--secondary)]/20 text-[color:var(--primary)] rounded-full px-2 h-7 flex items-center justify-center border-none text-xs focus:outline-none pr-1"
          style={{ appearance: 'none', backgroundColor: 'rgba(93, 148, 113, 0.2)' }}
          defaultValue="실종"
        >
          <option value="실종">실종</option>
          <option value="목격">목격</option>
        </select>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="찾고자하는 위치를 검색하세요"
          className="w-full h-10 pl-12 pr-10 rounded-full border-2 border-[var(--primary)] bg-[var(--primary-fg)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
        />
        <button
          type="button"
          className="absolute right-2 top-1/2 -translate-y-1/2"
          onClick={handleSearch}
        >

        </button>
      </div>
    );
  }
  return (
    <div
      className={`absolute left-0 right-0 bg-white/95 transition-all duration-300 ease-in-out overflow-hidden ${
        isOpen ? 'h-16 opacity-100' : 'h-0 opacity-0'
      }`}
    >
      <div className="h-full px-4 flex items-center">
        <div className="relative flex-1 max-w-3xl mx-auto">
          <select
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-[color:var(--secondary)]/20 text-[color:var(--primary)] rounded-full px-2 h-7 flex items-center justify-center border-none text-xs focus:outline-none pr-1"
            style={{ appearance: 'none', backgroundColor: 'rgba(93, 148, 113, 0.2)' }}
            defaultValue="실종"
          >
            <option value="실종">실종</option>
            <option value="목격">목격</option>
          </select>
          <input
            type="text"
            value={value}
            onChange={e => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="찾고자하는 위치를 검색하세요"
            className="w-full h-10 pl-12 pr-10 rounded-full border-2 border-[var(--primary)] bg-[var(--primary-fg)] text-sm focus:outline-none focus:ring-2 focus:ring-[var(--primary)]/20"
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2"
            onClick={handleSearch}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 text-[var(--primary)]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
} 
