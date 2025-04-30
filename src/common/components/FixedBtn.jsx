import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import MissingModal from './MissingModal';

const FixedBtn = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    console.log('showModal : ', showModal);
  }, [showModal]);

  return (
    <div
      className="absolute right-[1rem] bottom-[2rem] z-10 flex aspect-square w-fit cursor-pointer justify-center rounded-full bg-(--point) p-3 align-middle"
      onClick={() => setShowModal((prev) => !prev)}
    >
      <Plus className="text-white" />

      <MissingModal showModal={showModal} setShowModal={setShowModal} />
    </div>
  );
};

export default FixedBtn;
