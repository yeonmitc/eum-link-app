import { create } from 'zustand';

export const useMyReportsStore = create((set) => ({
  reports: [],

  // 전체 제보 불러오기
  fetchReports: async () => {
    const res = await fetch('http://localhost:3001/reports');
    const data = await res.json();
    set({ reports: data });
  },
}));
