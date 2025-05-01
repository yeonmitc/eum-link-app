const ConfirmModal = ({ show, onClose, onConfirm }) => {
  return (
    <div>
      <div
        className={`fixed inset-0 z-50 grid place-content-center bg-black/30 p-4 ${
          !show ? 'hidden' : ''
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
      >
        <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
          <h2 id="modalTitle" className="text-center text-xl font-bold text-gray-900 sm:text-2xl">
            반려동물을 찾으셨나요?
          </h2>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-700">
              상태를 <strong className="text-[#FD9B71]">'돌아왔어요'</strong>로 변경하시겠습니까?
            </p>
          </div>

          <footer className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
            >
              아니요
            </button>

            <button
              type="button"
              onClick={onConfirm}
              className="rounded bg-[#FD9B71] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#e6865f]"
            >
              예, 돌아왔어요
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
