import {  missingPetsApi, reportPetsApi, userApi  } from '@/api/petApi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';


// 실종 동물 관련 hooks
export const useMissingPets = () => {
  return useQuery({
    queryKey: ['missing-pets'],
    queryFn: missingPetsApi.getAll,
    select: (result) => result.data,
    staleTime: 1000 * 60 *10, // 10분
    refetchInterval: 1000 * 60*30 // 30분
  });
};

export const useMissingPet = (id) => {
  return useQuery({
    queryKey: ['missing-pets', id],
    queryFn: () => missingPetsApi.getById(id),
    enabled: !!id
  });
};

export const useAddMissingPet = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: missingPetsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['missing-pets'] });
    }
  });
};

export const useUpdateMissingPet = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => missingPetsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['missing-pets'] });
    }
  });
};

export const useDeleteMissingPet = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: missingPetsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['missing-pets'] });
    }
  });
};

// 목격 신고 관련 hooks
export const useReportPets = () => {
  return useQuery({
    queryKey: ['report-pets'],
    queryFn: reportPetsApi.getAll,
    select: (result) => result.data,
    staleTime: 1000 * 60,
    refetchInterval: 1000 * 30
  });
};

export const useReportPet = (id) => {
  return useQuery({
    queryKey: ['report-pets', id],
    queryFn: () => reportPetsApi.getById(id),
    enabled: !!id
  });
};

export const useAddReportPet = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: reportPetsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['report-pets'] });
    }
  });
};

export const useUpdateReportPet = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ id, data }) => reportPetsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['report-pets'] });
    }
  });
};

export const useDeleteReportPet = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: reportPetsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['report-pets'] });
    }
  });
};

// 사용자 관련 hooks
export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: userApi.getAll,
    select: (result) => result.data,
    staleTime: 1000 * 60 * 5 // 5분
  });
};

export const useUser = (id) => {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => userApi.getById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5
  });
}; 