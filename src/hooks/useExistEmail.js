import { useState } from 'react';
import api from '../utils/api';

export default function useExistEmail() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 이메일 존재 여부 확인 함수
  const checkEmail = async (email) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/users?email=${email}`);
      return res.data.length > 0;
    } catch (err) {
      setError(err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { checkEmail, loading, error };
} 
