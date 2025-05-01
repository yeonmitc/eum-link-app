import { Navigate, Route, Routes } from 'react-router-dom';

// 레이아웃
import AuthLayout from './common/layout/AuthLayout';
import MainLayout from './common/layout/MainLayout';

// 페이지
import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';
import NotFoundPage from './features/common/NotFoundPage';
import HomePage from './features/home/HomePage';

import MissingDetailPage from './features/missing/MissingDetailPage';
import MissingListPage from './features/missing/MissingListPage';
import RegisterMissingPage from './features/missing/RegisterMissingPage';

import MyPage from './features/myPage/MyPage';
import PetListMap from './features/petListMap/PetListMap';
import ReportFormPage from './features/reports/ReportFormPage';
import ReportListPage from './features/reports/ReportListPage';
import ReportDetailPage from './features/reports/ReportDetailPage';

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
          <Route path=":id" element={<ReportDetailPage />} />
        </Route>
        <Route path="myPage" element={<MyPage />} />
        {/* 목록, 지도 */}
        <Route path="pets">
          <Route index element={<Navigate to="missing" replace />} />
          <Route path="missing" element={<PetListMap type="missing" />} />
          <Route path="reports" element={<PetListMap type="reports" />} />
        </Route>
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
