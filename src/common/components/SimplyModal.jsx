import { X } from 'lucide-react';
import React from 'react';

const SimplyModal = ({ showModal, setShowModal, title, content, btn }) => {
  // 모달 닫기 (추후 이벤트 추가 예정)
  function closeModal() {
    setShowModal(false);
  }

  return (
    <div
      className={`fixed inset-0 z-50 grid place-content-center bg-black/30 p-4 ${
        !showModal ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100'
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
      onClick={closeModal}
    >
      <div
        className={`flex min-h-[30vh] w-150 max-w-lg flex-col gap-y-[10px] rounded-[15px] bg-white shadow-lg transition-all duration-400 ease-out max-md:max-w-xs ${
          !showModal
            ? 'pointer-events-none -translate-y-10 opacity-0'
            : 'pointer-events-auto translate-y-0 opacity-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between">
          <div
            id="modalTitle"
            className="relative w-full rounded-t-[15px] bg-(--secondary) py-[10px] text-center font-bold text-white"
          >
            {title}

            <X className="absolute top-[20%] right-[10px] cursor-pointer" onClick={closeModal} />
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center p-2">
          <p className="text-pretty text-gray-700">{content}</p>
        </div>

        {btn && (
          <footer className="box-border flex justify-end gap-2 pr-2 pb-2">
            <button
              type="button"
              className="cursor-pointer rounded bg-(--secondary) px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-(--primary) hover:bg-blue-700"
              onClick={closeModal}
            >
              {btn}
            </button>
          </footer>
        )}
      </div>
    </div>
  );
};

export default SimplyModal;
