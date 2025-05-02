import MissingModal from '@/common/components/MissingModal';
import MyMissingPetList from '@/common/components/MyMissingPetList';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatusChangeModal from '../../common/components/StatusChangeModal';
import { useMissingPetStore } from '../../store/missingPetStore';
import { useMyPageStore } from '../../store/myPageStore';

const MyPage = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, login } = useMyPageStore();
  const { missingPets, fetchMissingPets, updateMissingStatus } = useMissingPetStore();
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myMissingPets, setMyMissingPets] = useState(null); // null: 로딩 중

  // 강제 로그인용 useEffect
  useEffect(() => {
    if (!isLoggedIn) {
      login({
        id: 1,
        username: '민호맘',
        email: 'kim.minho@gmail.com',
      });
    }
  }, []);

  // 실종글 fetch 후 필터링해서 따로 저장
  const loadMissingPets = async () => {
    await fetchMissingPets();
    const myPets = useMissingPetStore
      .getState()
      .missingPets.filter((pet) => pet.userId === user?.id);
    setMyMissingPets(myPets);
  };

  useEffect(() => {
    if (isLoggedIn && user) {
      loadMissingPets();
    }
  }, [isLoggedIn, user]);

  // 로그인 안 되어있으면 로그인 페이지 이동 (임시)
  // useEffect(() => {
  //   if (!isLoggedIn) {
  //     navigate('/login');
  //   } else {
  //     fetchMissingPets();
  //   }
  // }, [isLoggedIn]);

  console.log('현재 로그인 유저:', user);
  console.log('missingPets', missingPets);

  // 이벤트 버블링 막아놓기
  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };
  // 버튼 클릭 시 모달 열기
  const openModal = (petId) => {
    setSelectedPetId(petId);
    setIsModalOpen(true);
  };
  // 모달 닫기
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPetId(null);
  };

  // 모달 '예' 눌렀을 때 실행
  const handleConfirm = async () => {
    if (selectedPetId !== null) {
      setMyMissingPets(null); // 깜빡임 방지용: 일시적으로 렌더 중단
      await updateMissingStatus(selectedPetId, false);
      await loadMissingPets(); // 다시 로드 후 렌더
    }
    closeModal();
  };

  // 수정 - 상태 추가
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editPet, setEditPet] = useState(null);

  // 수정 버튼 눌렀을 때 실행
  const handleEdit = (pet) => {
    setEditPet(pet);
    setIsEditModalOpen(true);
  };

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 pt-20">
      <div className="flex w-full gap-6 md:flex-row">
        {/* 좌측 프로필 */}
        <aside className="min-w-[200px] rounded-lg bg-white p-6 md:w-1/4">
          <p className="text-xl font-bold">{user?.username} 님</p>
        </aside>

        {/* 우측 콘텐츠 */}
        <section className="flex-1 rounded-lg bg-white">
          <h2 className="mb-4 text-lg font-bold">
            🐾 회원님이 남긴 실종/제보 기록을 확인할 수 있어요.
          </h2>

          <MyMissingPetList pets={myMissingPets} onOpenModal={openModal} onEdit={handleEdit} />
        </section>
        <StatusChangeModal show={isModalOpen} onClose={closeModal} onConfirm={handleConfirm} />
        <MissingModal
          showModal={isEditModalOpen}
          setShowModal={setIsEditModalOpen}
          initialValues={editPet}
        />
      </div>
    </div>
  );
};

export default MyPage;
