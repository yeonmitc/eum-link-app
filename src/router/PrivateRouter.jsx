import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/userStore';

export default function PrivateRoute({ children }) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const location = useLocation();

  if (!isLoggedIn) {
    // 로그인하지 않았다면 홈페이지
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
