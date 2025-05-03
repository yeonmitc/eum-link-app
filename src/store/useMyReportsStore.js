import { create } from 'zustand';

export const useMyReportsStore = create((set) => ({
  reports: [],

  // 전체 제보 불러오기
  fetchReports: async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/reportsPets`);
    const data = await res.json();
    set({ reports: data });
  },

  // 삭제
  deleteReport: async (reportId) => {
    await fetch(`${import.meta.env.VITE_API_URL}/reportsPets/${reportId}`, {
      method: 'DELETE',
    });
    console.log('삭제 요청할 reportId:', reportId); // ex) report1
    // 삭제 후 최신 데이터 다시 불러오기
    const res = await fetch(`${import.meta.env.VITE_API_URL}/reportsPets`);
    const data = await res.json();
    set({ reports: data });
  },
}));
