import React from 'react';

const Modaltest = ({ show }) => {
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
          <h2 id="modalTitle" className="text-xl font-bold text-gray-900 sm:text-2xl">
            Modal Title
          </h2>

          <div className="mt-4">
            <p className="text-pretty text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu
              consectetur. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </div>

          <footer className="mt-6 flex justify-end gap-2">
            <button
              type="button"
              className="rounded bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
            >
              Cancel
            </button>

            <button
              type="button"
              className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
            >
              Done
            </button>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Modaltest;
