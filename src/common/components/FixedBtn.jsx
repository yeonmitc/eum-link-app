import React, { useState, useEffect, useRef } from 'react';
import { Plus } from 'lucide-react';
import MissingModal from './MissingModal';
import ReportModal from './ReportModal';
import useUserStore from '@/store/userStore';
import { toast } from 'react-hot-toast';

const FixedBtn = () => {
  // 실종 모달
  const [showModal, setShowModal] = useState(false);

  // 목격 모달
  const [reportModal, setReportModal] = useState(false);

  const [isExpanded, setIsExpanded] = useState(false);
  const buttonRef = useRef(null);

  // 로그인한 user 정보
  const { user } = useUserStore();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleButtonClick = (type) => {
    if (type === 'missing') {
      if (user != null) {
        setShowModal(true);
      } else {
        return toast.error('로그인이 필요한 서비스 입니다.', { id: 'login-invalid' });
      }
    } else if (type === 'report') {
      setReportModal(true);
    }
    setIsExpanded(false);
  };

  useEffect(() => {
    console.log('로그인한 유저 정보 : ', user);
  }, [user]);

  return (
    <div ref={buttonRef} className="fixed right-[1rem] bottom-[2rem] z-10">
      <div className="relative">
        <div
          className={`absolute right-0 bottom-full mb-2 flex flex-col gap-2 transition-all duration-300 ease-in-out ${
            isExpanded ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
          }`}
        >
          <button
            className="flex aspect-square w-[3.5rem] cursor-pointer items-center justify-center rounded-full bg-(--point) p-3 text-white transition-transform"
            onClick={() => handleButtonClick('missing')}
          >
            실종
          </button>
          <button
            className="flex aspect-square w-[3.5rem] cursor-pointer items-center justify-center rounded-full bg-(--point) p-3 text-white transition-transform"
            onClick={() => handleButtonClick('report')}
          >
            제보
          </button>
        </div>
        <div
          className="flex aspect-square w-[3.5rem] cursor-pointer items-center justify-center rounded-full bg-(--point) p-3 transition-transform"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Plus
            className={`text-white transition-transform duration-300 ${
              isExpanded ? 'rotate-45' : 'rotate-0'
            }`}
          />
        </div>
      </div>

      <MissingModal showModal={showModal} setShowModal={setShowModal} />
      <ReportModal showModal={reportModal} setShowModal={setReportModal} />
    </div>
  );
};

export default FixedBtn;
