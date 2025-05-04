import api from '@/utils/api';
import { create } from 'zustand';

export const useCommentsStore = create((set) => ({
  comments: [],
  fetchComments: async () => {
    const res = await api.get('/comments');
    set({ comments: res.data });
  },
}));
