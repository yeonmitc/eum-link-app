import { Route, Routes } from 'react-router-dom';
import MainLayout from './common/layout/MainLayout';
import MyPage from './features/Mypage/MyPage';
import RegisterPage from './features/auth/RegisterPage';
import AboutPage from './features/common/AboutPage';
import NotFoundPage from './features/common/NotFoundPage';
import HomePage from './features/home/HomePage';
import MissingDetailPage from './features/missing/MissingDetailPage';
import PetListMap from './features/petListMap/PetListMap';
import ReportDetailPage from './features/reports/ReportDetailPage';
import ReportFormPage from './features/reports/ReportFormPage';

export default function App() {
  return (
    <Routes>
      {/* Main 레이아웃 기반 라우트 */}
      <Route element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* 실종 관련 */}
        <Route path="missing">
          <Route index element={<PetListMap type="missing" />} />
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

      {/* 404 Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
