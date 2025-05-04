import api from '@/utils/api';
import { create } from 'zustand';

export const useMyMissingPetStore = create((set) => ({
  missingPets: [],

  // 전체 실종 불러오기
  fetchMissingPets: async () => {
    const res = await api.get('/missingPets');
    set({ missingPets: res.data });
  },

  // 실종 상태 업데이트
  updateMissingStatus: async (petId, newStatus) => {
    // 상태 먼저 업데이트
    set((state) => ({
      missingPets: state.missingPets.map((pet) =>
        pet.id === petId ? { ...pet, isMissing: newStatus } : pet
      ),
    }));

    // 서버 반영
    await api.patch(`/missingPets/${petId}`, {
      isMissing: newStatus,
    });
  },

  // 실종글 + 관련 제보 함께 삭제
  deleteMissingPetWithReports: async (missingId) => {
    try {
      console.log('삭제하려는 missingId:', missingId);

      // 1. 실종글 삭제
      await api.delete(`/missingPets/${missingId}`);

      // 2. 전체 제보 목록 가져오기
      const reportRes = await api.get('/reportsPets');
      const reports = reportRes.data;

      // 3. 관련 제보만 추출 (문자열 비교로 안전하게)
      const relatedReports = reports.filter((r) => String(r.missingId) === String(missingId));

      // 4. 관련 제보 삭제 (병렬 처리)
      await Promise.all(relatedReports.map((r) => api.delete(`/reportsPets/${r.id}`)));

      // 5. 실종글 상태 최신화
      const newRes = await api.get('/missingPets');
      set({ missingPets: newRes.data });

      console.log(`실종글(${missingId}) 및 관련 제보 ${relatedReports.length}건 삭제 완료`);
    } catch (err) {
      console.error('삭제 중 오류 발생:', err);
    }
  },
}));
