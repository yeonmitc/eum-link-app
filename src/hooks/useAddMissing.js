import api from '@/utils/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';

async function postMissing({ data }) {
  try {
    const response = await api.post('/missingPets', data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const useAddMissing = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postMissing,
    onSuccess: () => {
      // 실종 동물 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['missingPets'] });
    },
    onError: (error) => {
      console.error('등록 중 오류 발생:', error);
    },
  });
};
