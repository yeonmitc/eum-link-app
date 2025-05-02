import { create } from 'zustand';

export const useMissingPetStore = create((set) => ({
  missingPets: [],
  fetchMissingPets: async () => {
    const res = await fetch('http://localhost:3001/missingPets');
    const data = await res.json();
    set({ missingPets: data });
  },
}));
