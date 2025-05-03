import api from '@/utils/api';
import { useMutation } from '@tanstack/react-query';

async function postReport({ data }) {
  console.log('data : ', data);
  try {
    const response = await api.post('/reportsPets', data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const useAddReport = () => {
  return useMutation({
    mutationFn: postReport,
    onSuccess: (data) => {
      // 성공 시 아무것도 하지 않음
      console.log('등록 성공:', data);
    },
    onError: (error) => {
      console.error('등록 중 오류 발생:', error);
    },
  });
};
