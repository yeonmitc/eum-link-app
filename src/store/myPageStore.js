import { create } from 'zustand';

export const useMyPageStore = create((set) => ({
  user: null,
  isLoggedIn: false,
  login: (userData) => set({ user: userData, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
}));

export default useMyPageStore;
