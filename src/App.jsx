import { Route, Routes } from 'react-router-dom';

// 레이아웃
import AuthLayout from './common/layout/AuthLayout';
import MainLayout from './common/layout/MainLayout';

// 페이지
import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';
import NotFoundPage from './features/common/NotFoundPage';
import HomePage from './features/home/HomePage';
import ProfilePage from './features/profile/ProfilePage';

import MissingDetailPage from './features/missing/MissingDetailPage';
import MissingListPage from './features/missing/MissingListPage';
import RegisterMissingPage from './features/missing/RegisterMissingPage';

import ReportFormPage from './features/reports/ReportFormPage';
import ReportListPage from './features/reports/ReportListPage';

import MapPage from './features/map/MapPage';
export default function App() {
  return (
    <Routes>
      {/* Main 레이아웃 기반 라우트 */}
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        {/* 실종 관련 */}
        <Route path="missing">
          <Route index element={<MissingListPage />} />
          <Route path="new" element={<RegisterMissingPage />} />
          <Route path=":id" element={<MissingDetailPage />} />
        </Route>
        {/* 제보 관련 */}
        <Route path="reports">
          <Route index element={<ReportListPage />} />
          <Route path="new" element={<ReportFormPage />} />
        </Route>
        <Route path="profile" element={<ProfilePage />} />
        <Route path="map" element={<MapPage />} />
      </Route>

      {/* Auth 레이아웃 라우트 */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* 404 Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
