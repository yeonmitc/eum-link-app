import api from '@/utils/api';
import { useMutation } from '@tanstack/react-query';

async function updateMissing({ data, id }) {
  try {
    const response = await api.put(`/missingPets/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const useUpdateMissing = () => {
  return useMutation({
    mutationFn: updateMissing,
    onSuccess: (data) => {
      // 성공 시 아무것도 하지 않음
      console.log('등록 성공:', data);
    },
    onError: (error) => {
      console.error('등록 중 오류 발생:', error);
    },
  });
};
