const ConfirmModal = ({
  show,
  onClose,
  onConfirm,
  title = '확인',
  message = '이 작업을 진행하시겠습니까?',
  confirmText = '확인',
}) => {
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
            {title}
          </h2>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-700">{message}</p>
          </div>

          <footer className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
            >
              아니요
            </button>

            <button
              type="button"
              onClick={onConfirm}
              className="cursor-pointer rounded bg-[#FD9B71] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#e6865f]"
            >
              {confirmText}
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
