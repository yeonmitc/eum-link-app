// src/common/components/Header.jsx
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="flex items-center justify-between border-b bg-red-300 px-6 py-4 shadow-sm">
      <Link to="/" className="text-xl font-bold text-indigo-600">
        🐾 EUM Link
      </Link>

      <nav className="flex gap-4 text-sm font-medium">
        <NavLink
          to="/missing"
          className={({ isActive }) =>
            isActive ? 'text-indigo-600 underline' : 'text-gray-600 hover:text-indigo-500'
          }
        >
          실종
        </NavLink>

        <NavLink
          to="/reports"
          className={({ isActive }) =>
            isActive ? 'text-indigo-600 underline' : 'text-gray-600 hover:text-indigo-500'
          }
        >
          제보
        </NavLink>
        <NavLink
          to="/map"
          className={({ isActive }) =>
            isActive ? 'text-indigo-600 underline' : 'text-gray-600 hover:text-indigo-500'
          }
        >
          지도
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive ? 'text-indigo-600 underline' : 'text-gray-600 hover:text-indigo-500'
          }
        >
          내 정보
        </NavLink>
      </nav>
    </header>
  );
}
