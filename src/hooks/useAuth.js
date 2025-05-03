import { useState } from 'react';
import toast from 'react-hot-toast';
import useUserStore from '../store/userStore';
import api from '../utils/api';

const useAuth = () => {
  const [loading, setLoading] = useState(false);
  const { login, logout, setUser } = useUserStore();

  const signIn = async (email, password) => {
    try {
      setLoading(true);

      const response = await api.get(`/users?email=${email}`);
      console.log('API response:', response.data);
      const users = response.data;

      if (users.length === 0) {
        toast.error('이메일이 존재하지 않습니다. 😢', { id: 'email-error' });
        return;
      }

      const user = users[0];
      if (user.password !== password) {
        toast.error('비밀번호가 일치하지 않습니다. 😢', { id: 'password-error' });
        return;
      }

      console.log('로그인 유저:', user);
      setUser({
        id: user.id,
        email: user.email,
        username: user.username,
      });
      login();
      toast.success('로그인에 성공했습니다! 🎉', { id: 'login-success' });

      return user;
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      toast.error(errorMessage, { id: 'login-error' });
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    logout();
    setUser(null);
    toast.success('로그아웃 되었습니다. 👋', { id: 'logout-success' });
  };

  return {
    signIn,
    signOut,
    loading,
  };
};

export default useAuth;
