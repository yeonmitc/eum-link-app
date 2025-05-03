import api from '../utils/api';
import { useQuery } from '@tanstack/react-query';

async function fetchComments(postType,postId) {
  const response = await api.get(`/comments?postType=${postType}&postId=${postId}`);
  return response.data;
}

export const useComments = (postType,postId) => {
  return useQuery({
    queryKey: ['comments',postType, postId],
    queryFn: () => fetchComments(postType,postId),
    enabled: !!postId,
  });
};
