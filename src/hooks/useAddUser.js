import { useState } from 'react';
import api from '../utils/api';

export default function useAddUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 회원 추가 함수
  const addUser = async ({ email, password, username }) => {
    setLoading(true);
    setError(null);
    try {
      // 현재 유저 수 조회
      const res = await api.get('/users');
      const userCount = res.data.length;
      const id = `user${userCount + 1}`;
      const createdAt = new Date().toISOString();
      const newUser = { id, email, password, username, createdAt };
      await api.post('/users', newUser);
      return true;
    } catch (err) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { addUser, loading, error };
} 
