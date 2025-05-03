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
    onSuccess: (data) => {
      // 성공 시 아무것도 하지 않음
      console.log('등록 성공:', data);
    },
    onError: (error) => {
      console.error('등록 중 오류 발생:', error);
    },
    // 쿼리 무효화 비활성화
    gcTime: 0,
    retry: false,
    // 쿼리 무효화 비활성화
    invalidateQueries: false,
  });
};
