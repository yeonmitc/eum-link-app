import { Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/userStore';

export default function PrivateRoute({ children }) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const location = useLocation();

  if (!isLoggedIn) {
    // 로그인하지 않았다면 로그인 페이지로 리디렉션 (현재 경로 기억)
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
