import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      user: null,
      login: () => set({ isLoggedIn: true }),
      logout: () => set({ isLoggedIn: false, user: null }),
      setUser: (user) => set({ user }),
    }),
    {
      name: 'user-store', // 미들워어가 자동으로 로컬스토리지에 값 저장해줌
    }
  )
);

export default useUserStore;
