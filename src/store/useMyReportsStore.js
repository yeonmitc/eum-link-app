import api from '@/utils/api';
import { create } from 'zustand';

export const useMyReportsStore = create((set) => ({
  reports: [],

  // 전체 제보 불러오기
  fetchReports: async () => {
    const res = await api.get('/reportsPets');
    set({ reports: res.data });
  },

  // 삭제
  deleteReport: async (reportId) => {
    await api.delete(`/reportsPets/${reportId}`);
    console.log('삭제 요청할 reportId:', reportId); // ex) report1

    // 삭제 후 최신 데이터 다시 불러오기
    const res = await api.get('/reportsPets');
    set({ reports: res.data });
  },
}));
