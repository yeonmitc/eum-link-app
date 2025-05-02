import { Route, Routes } from 'react-router-dom';

// 레이아웃
import AuthLayout from './common/layout/AuthLayout';
import MainLayout from './common/layout/MainLayout';

// 페이지
import LoginPage from './features/auth/LoginPage';
import RegisterPage from './features/auth/RegisterPage';
import NotFoundPage from './features/common/NotFoundPage';
import HomePage from './features/home/HomePage';

import MissingDetailPage from './features/missing/MissingDetailPage';
import RegisterMissingPage from './features/missing/RegisterMissingPage';

import MyPage from './features/myPage/MyPage';
import PetListMap from './features/petListMap/PetListMap';
import ReportDetailPage from './features/reports/ReportDetailPage';
import ReportFormPage from './features/reports/ReportFormPage';

export default function App() {
  return (
    <Routes>
      {/* Main 레이아웃 기반 라우트 */}
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        {/* 실종 관련 */}
        <Route path="missing">
          <Route index element={<PetListMap type="missing" />} />
          <Route path="new" element={<RegisterMissingPage />} />
          <Route path=":id" element={<MissingDetailPage />} />
        </Route>
        {/* 제보 관련 */}
        <Route path="reports">
          <Route index element={<PetListMap type="reports" />} />
          <Route path="new" element={<ReportFormPage />} />
          <Route path=":id" element={<ReportDetailPage />} />
        </Route>
        <Route path="myPage" element={<MyPage />} />
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
