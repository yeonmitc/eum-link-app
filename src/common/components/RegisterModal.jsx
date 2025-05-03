import useAddUser from '@/hooks/useAddUser';
import useExistEmail from '@/hooks/useExistEmail';
import useExistUsername from '@/hooks/useExistUsername';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-hot-toast';

const EMAIL_REGEX = /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/;
const NICKNAME_REGEX = /^[가-힣a-zA-Z0-9]{2,12}$/;

export default function RegisterModal({ show, onClose }) {
  const [form, setForm] = useState({ email: '', password: '', username: '' });
  const [emailChecked, setEmailChecked] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [usernameChecked, setUsernameChecked] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const { addUser, loading: addLoading } = useAddUser();
  const { checkEmail, loading: checkEmailLoading } = useExistEmail();
  const { checkUsername, loading: checkUsernameLoading } = useExistUsername();
  const modalRef = useRef(null);

  useEffect(() => {
    if (!show) {
      setForm({ email: '', password: '', username: '' });
      setEmailChecked(false);
      setEmailExists(false);
      setUsernameChecked(false);
      setUsernameExists(false);
      setRegisterSuccess(false);
    }
  }, [show]);

  useEffect(() => {
    if (!show) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [show, onClose]);

  const handleBackdropClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (show) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === 'email') {
      setEmailChecked(false);
      setEmailExists(false);
    }
    if (name === 'username') {
      setUsernameChecked(false);
      setUsernameExists(false);
    }
  };

  const handleCheckEmail = async () => {
    if (!form.email || !EMAIL_REGEX.test(form.email)) return;
    const exists = await checkEmail(form.email);
    setEmailExists(exists);
    setEmailChecked(true);
  };

  const handleCheckUsername = async () => {
    if (!form.username || !NICKNAME_REGEX.test(form.username)) return;
    const exists = await checkUsername(form.username);
    setUsernameExists(exists);
    setUsernameChecked(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password || !form.username || form.password.length < 4) {
      toast.error('전체 값을 다 넣어주세요', { id: 'register-invalid' });
      return;
    }
    if (!emailChecked || !usernameChecked) {
      toast.error('중복확인 먼저 해주세요', { id: 'register-must-check' });
      return;
    }
    if (emailExists || usernameExists) {
      toast.error('중복된 값이 있습니다', { id: 'register-duplicate' });
      return;
    }
    const ok = await addUser(form);
    if (ok) {
      toast.success('회원가입 완료되었습니다', { id: 'register-success' });
      setTimeout(() => {
        onClose();
        setRegisterSuccess(false);
      }, 1000);
      setRegisterSuccess(true);
    }
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onMouseDown={handleBackdropClick}
      style={{ animation: 'fadeIn 0.2s' }}
    >
      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl p-8 w-[80vw] max-w-[400px] mx-auto flex flex-col gap-4 relative animate-fadeIn"
        onMouseDown={e => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
          onClick={onClose}
          aria-label="닫기"
        >
          ×
        </button>
        {!registerSuccess ? (
          <>
            <div className="text-xl font-bold text-center mb-2 text-[var(--primary)]">회원가입</div>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <label className="flex flex-col gap-1">
                이메일(아이디)
                {form.email && !EMAIL_REGEX.test(form.email) && (
                  <span className="text-[13px] text-red-500 text-left mb-1">
                    올바른 이메일 형식이 아닙니다.
                  </span>
                )}
                {emailChecked && EMAIL_REGEX.test(form.email) && emailExists && (
                  <span className="text-[13px] text-red-500 text-left mb-1">
                    이미 사용 중인 이메일입니다.
                  </span>
                )}
                {emailChecked && EMAIL_REGEX.test(form.email) && !emailExists && (
                  <span className="text-[13px] text-left mb-1" style={{ color: 'var(--primary)' }}>
                    사용 가능한 이메일입니다.
                  </span>
                )}
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="border rounded px-2 py-1"
                  required
                  autoComplete="off"
                  placeholder="이메일을 입력하세요"
                />
                <div className="flex items-center gap-2 mt-1">
                  <button
                    type="button"
                    onClick={handleCheckEmail}
                    className="min-w-[80px] py-1 px-2 bg-[var(--primary)] text-white rounded text-[15px] cursor-pointer"
                    disabled={checkEmailLoading || !form.email || !EMAIL_REGEX.test(form.email)}
                  >
                    중복확인
                  </button>
                  <span className="text-[13px] text-left" style={{ color: 'var(--primary)' }}>
                    (예: test@example.com)
                  </span>
                </div>
              </label>
              <label className="flex flex-col gap-1">
                비밀번호
                {form.password && form.password.length < 4 && (
                  <span className="text-sm text-red-500 text-left mb-1" style={{ fontSize: '13px' }}>비밀번호는 4글자 이상이어야 합니다.</span>
                )}
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="border rounded px-2 py-1"
                  required
                  placeholder="비밀번호를 입력하세요"
                />
                <span className="text-[13px] mt-1 !text-left" style={{ color: 'var(--primary)' }}>
                  비밀번호는 4글자 이상 입력하세요
                </span>
              </label>
              <label className="flex flex-col gap-1">
                닉네임
                {form.username && !NICKNAME_REGEX.test(form.username) && (
                  <span className="text-[13px] text-red-500 text-left mb-1">
                    닉네임은 2~12자, 한글/영문/숫자만 가능합니다.
                  </span>
                )}
                {usernameChecked && NICKNAME_REGEX.test(form.username) && usernameExists && (
                  <span className="text-[13px] text-red-500 text-left mb-1">
                    이미 사용 중인 닉네임입니다.
                  </span>
                )}
                {usernameChecked && NICKNAME_REGEX.test(form.username) && !usernameExists && (
                  <span className="text-[13px] text-left mb-1" style={{ color: 'var(--primary)' }}>
                    사용 가능한 닉네임입니다.
                  </span>
                )}
                <input
                  type="text"
                  name="username"
                  value={form.username}
                  onChange={handleChange}
                  className="border rounded px-2 py-1"
                  required
                  autoComplete="off"
                  placeholder="닉네임을 입력하세요"
                />
                <div className="flex items-center gap-2 mt-1">
                  <button
                    type="button"
                    onClick={handleCheckUsername}
                    className="min-w-[80px] py-1 px-2 bg-[var(--primary)] text-white rounded text-[15px] cursor-pointer"
                    disabled={checkUsernameLoading || !form.username || !NICKNAME_REGEX.test(form.username)}
                  >
                    중복확인
                  </button>
                  <span className="text-[13px] text-left" style={{ color: 'var(--primary)' }}>
                    (2~12자, 한글/영문/숫자)
                  </span>
                </div>
              </label>
              <button
                type="submit"
                className="mt-2 py-2 bg-[var(--secondary)] text-white rounded disabled:bg-gray-300 transition-all duration-300 transform hover:scale-105 active:scale-110 hover:bg-[var(--secondary)]/90 active:bg-[var(--secondary)]/80 cursor-pointer"
                disabled={addLoading || emailExists || usernameExists || form.password.length < 4}
              >
                {addLoading ? '가입 중...' : '회원가입'}
              </button>
            </form>
          </>
        ) : null}
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
} 
