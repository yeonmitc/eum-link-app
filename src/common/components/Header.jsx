// src/common/components/Header.jsx
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-[var(--primary)] underline'
      : 'text-[var(--fg)] hover:text-[var(--primary)] transition-colors';

  return (
    <header className="flex h-[10vh] min-h-[64px] w-full items-center justify-between border-b border-[var(--border)] bg-[var(--bg)] px-6 shadow-sm">
      <Link to="/" className="text-xl font-bold text-[var(--primary)] hover:opacity-90">
        🐾 EUM Link
      </Link>

      <nav className="flex gap-4 text-sm font-medium">
        {[
          { to: '/missing', label: '실종' },
          { to: '/reports', label: '제보' },
          { to: '/map', label: '지도' },
          { to: '/myPage', label: '내 정보' },
        ].map(({ to, label }) => (
          <NavLink key={to} to={to} className={linkClass}>
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}
