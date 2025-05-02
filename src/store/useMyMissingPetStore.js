import { create } from 'zustand';

export const useMyMissingPetStore = create((set) => ({
  missingPets: [],

  // 전체 실종 불러오기기
  fetchMissingPets: async () => {
    const res = await fetch('http://localhost:3001/missingPets');
    const data = await res.json();
    set({ missingPets: data });
  },

  updateMissingStatus: async (petId, newStatus) => {
    // 상태 먼저 업데이트
    set((state) => ({
      missingPets: state.missingPets.map((pet) =>
        pet.id === petId ? { ...pet, isMissing: newStatus } : pet
      ),
    }));
    // 서버 반영
    await fetch(`http://localhost:3001/missingPets/${petId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isMissing: newStatus }),
    });
  },
}));
