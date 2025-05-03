import SimplyModal from '@/common/components/SimplyModal';
import './HomePage.style.css';
import { useState } from 'react';

const HomePage = () => {
  const [subModal, setSubModal] = useState(false);

  return (
    <div className="bg-bg w-full max-w-5xl px-4">
      HomePage
      <SimplyModal
        showModal={subModal}
        setShowModal={setSubModal}
        title={'제목'}
        btn={'확인'}
        content={'내용'}
      />
    </div>
  );
};

export default HomePage;
