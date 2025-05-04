export default function SearchBar({
  isOpen,
  isDesktop,
  isTablet,
  value,
  setValue,
  type,
  setType,
  onSearch,
}) {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  if (isDesktop) {
    return (
      <div className="relative hidden min-w-0 [@media(min-width:501px)]:block">
        <select
          className="absolute top-1/2 left-2 flex h-7 -translate-y-1/2 items-center justify-center rounded-full border-none bg-[color:var(--secondary)]/20 px-2 pr-1 text-xs text-[color:var(--primary)] focus:outline-none"
          style={{ appearance: 'none', backgroundColor: 'rgba(93, 148, 113, 0.2)' }}
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="실종">실종</option>
          <option value="목격">목격</option>
        </select>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="위치를 검색하세요"
          className="h-10 w-full rounded-full border-2 border-[var(--primary)] bg-[var(--primary-fg)] pr-10 pl-12 text-sm focus:ring-2 focus:ring-[var(--primary)]/20 focus:outline-none"
        />
        <button
          type="button"
          className="absolute top-1/2 right-2 -translate-y-1/2"
          onClick={onSearch}
        ></button>
      </div>
    );
  }
  if (isTablet) {
    return (
      <div className="relative hidden min-w-0 [@media(min-width:400px)]:block [@media(min-width:501px)]:hidden">
        <select
          className="absolute top-1/2 left-2 flex h-7 -translate-y-1/2 items-center justify-center rounded-full border-none bg-[color:var(--secondary)]/20 px-2 pr-1 text-xs text-[color:var(--primary)] focus:outline-none"
          style={{ appearance: 'none', backgroundColor: 'rgba(93, 148, 113, 0.2)' }}
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="실종">실종</option>
          <option value="목격">목격</option>
        </select>
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="위치를 검색하세요"
          className="h-10 w-full rounded-full border-2 border-[var(--primary)] bg-[var(--primary-fg)] pr-10 pl-12 text-sm focus:ring-2 focus:ring-[var(--primary)]/20 focus:outline-none"
        />
        <button
          type="button"
          className="absolute top-1/2 right-2 -translate-y-1/2"
          onClick={onSearch}
        ></button>
      </div>
    );
  }
  // 모바일
  return (
    <div
      className={`absolute right-0 left-0 block overflow-hidden bg-white/95 transition-all duration-300 ease-in-out lg:hidden ${
        isOpen ? 'h-16 opacity-100' : 'h-0 opacity-0'
      }`}
    >
      <div className="flex h-full items-center px-4">
        <div className="relative mx-auto max-w-3xl flex-1">
          <select
            className="absolute top-1/2 left-2 flex h-7 -translate-y-1/2 items-center justify-center rounded-full border-none bg-[color:var(--secondary)]/20 px-2 pr-1 text-xs text-[color:var(--primary)] focus:outline-none"
            style={{ appearance: 'none', backgroundColor: 'rgba(93, 148, 113, 0.2)' }}
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="실종">실종</option>
            <option value="목격">목격</option>
          </select>
          <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="위치를 검색하세요"
            className="h-10 w-full rounded-full border-2 border-[var(--primary)] bg-[var(--primary-fg)] pr-10 pl-12 text-sm focus:ring-2 focus:ring-[var(--primary)]/20 focus:outline-none"
          />
          <button
            type="button"
            className="absolute top-1/2 right-2 -translate-y-1/2"
            onClick={onSearch}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5 text-[var(--primary)]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
