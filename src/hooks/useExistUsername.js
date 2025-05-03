import { useState } from 'react';
import api from '../utils/api';

export default function useExistUsername() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 닉네임 존재 여부 확인 함수
  const checkUsername = async (username) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/users?username=${username}`);
      return res.data.length > 0;
    } catch (err) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { checkUsername, loading, error };
} 
