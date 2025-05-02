import api from '../utils/api';

// API 엔드포인트 상수 정의 (db.json 키와 일치)
const API_ENDPOINTS = {
  MISSING_PETS: '/missingPets',
  REPORT_PETS: '/reportPets',
  USERS: '/users'
};

// 실종 동물 API
export const missingPetsApi = {
  // 전체 목록 조회
  getAll: () => {
    return api.get(API_ENDPOINTS.MISSING_PETS);
  },

  // 단일 조회
  getById: (id) => {
    return api.get(`${API_ENDPOINTS.MISSING_PETS}/${id}`);
  },

  // 생성
  create: (newPet) => {
    return api.post(API_ENDPOINTS.MISSING_PETS, newPet);
  },

  // 수정
  update: (id, updateData) => {
    return api.patch(`${API_ENDPOINTS.MISSING_PETS}/${id}`, updateData);
  },

  // 삭제
  delete: (id) => {
    return api.delete(`${API_ENDPOINTS.MISSING_PETS}/${id}`);
  },
};

// 목격 신고 API
export const reportPetsApi = {
  // 전체 목록 조회
  getAll: () => {
    return api.get(API_ENDPOINTS.REPORT_PETS);
  },

  // 단일 조회
  getById: (id) => {
    return api.get(`${API_ENDPOINTS.REPORT_PETS}/${id}`);
  },

  // 생성
  create: (newReport) => {
    return api.post(API_ENDPOINTS.REPORT_PETS, newReport);
  },

  // 수정
  update: (id, updateData) => {
    return api.patch(`${API_ENDPOINTS.REPORT_PETS}/${id}`, updateData);
  },

  // 삭제
  delete: (id) => {
    return api.delete(`${API_ENDPOINTS.REPORT_PETS}/${id}`);
  },
};

// 사용자 API
export const userApi = {
  // 전체 목록 조회
  getAll: () => {
    return api.get(API_ENDPOINTS.USERS);
  },

  // 단일 조회
  getById: (id) => {
    return api.get(`${API_ENDPOINTS.USERS}/${id}`);
  },

  // 사용자 생성
  create: (userData) => {
    return api.post(API_ENDPOINTS.USERS, userData);
  },

  // 사용자 정보 수정
  update: (id, updateData) => {
    return api.patch(`${API_ENDPOINTS.USERS}/${id}`, updateData);
  },

  // 사용자 삭제
  delete: (id) => {
    return api.delete(`${API_ENDPOINTS.USERS}/${id}`);
  },
};
