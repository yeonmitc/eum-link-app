import MissingModal from '@/common/components/MissingModal';
import MyMissingPetList from '@/common/components/MyMissingPetList';
import MyReportList from '@/common/components/MyReportList';
import { useMyReportsStore } from '@/store/useMyReportsStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../../common/components/StatusChangeModal';
import { useMyPageStore } from '../../store/myPageStore';
import { useMyMissingPetStore } from '../../store/useMyMissingPetStore';

const MyPage = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, login } = useMyPageStore();
  const { missingPets, fetchMissingPets, updateMissingStatus } = useMyMissingPetStore();
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myMissingPets, setMyMissingPets] = useState(null); // null: 로딩 중

  // 강제 로그인용 useEffect
  useEffect(() => {
    if (!isLoggedIn) {
      login({
        id: 'user2',
        username: '테스트',
        // email: 'park.jiyeon@naver.com',
      });
    }
  }, []);

  // 실종글 fetch 후 필터링해서 따로 저장
  const loadMissingPets = async () => {
    await fetchMissingPets();
    const myPets = useMyMissingPetStore
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

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editPet, setEditPet] = useState(null);

  // 수정 버튼 눌렀을 때 실행
  const handleEdit = (pet) => {
    setEditPet(pet);
    setIsEditModalOpen(true);
  };

  const { reports, fetchReports, deleteReport } = useMyReportsStore();
  // console.log('reports:', reports);

  useEffect(() => {
    fetchReports();
  }, []);

  const myReports = reports?.filter((r) => r.userId === user?.id) || [];

  const { deleteMissingPetWithReports } = useMyMissingPetStore();

  const handleDelete = (petId) => {
    setSelectedPetId(petId);
    openDeleteModal();
  };

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const openDeleteModal = () => setIsDeleteModalOpen(true);
  const closeDeleteModal = () => setIsDeleteModalOpen(false);

  const handleDeleteConfirm = async () => {
    if (selectedPetId !== null) {
      await deleteMissingPetWithReports(selectedPetId);
      await loadMissingPets(); // 갱신
    }
    closeDeleteModal();
  };
  useEffect(() => {
    console.log('isModalOpen:', isModalOpen);
    console.log('isDeleteModalOpen:', isDeleteModalOpen);
  }, [isModalOpen, isDeleteModalOpen]);

  const [selectedReportId, setSelectedReportId] = useState(null);
  const [isReportDeleteModalOpen, setIsReportDeleteModalOpen] = useState(false);

  const handleReportDelete = (reportId) => {
    setSelectedReportId(reportId);
    setIsReportDeleteModalOpen(true);
  };

  const closeReportDeleteModal = () => setIsReportDeleteModalOpen(false);

  const handleReportDeleteConfirm = async () => {
    // console.log('삭제 확인 버튼 눌림:', selectedReportId);
    await deleteReport(selectedReportId); // store 에서 삭제
    await fetchReports(); // 새로 갱신
    closeReportDeleteModal();
  };

  const [isReportLoading, setIsReportLoading] = useState(true);

  useEffect(() => {
    const fetchAndSetReports = async () => {
      setIsReportLoading(true); // fetch 전에 로딩 시작
      await fetchReports();
      setIsReportLoading(false); // fetch 후 로딩 종료
    };
    fetchAndSetReports();
  }, []);

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 pt-20">
      <div className="flex w-full gap-6 md:flex-row">
        {/* 좌측 프로필 */}
        <aside className="min-w-[200px] rounded-lg bg-white p-6 md:w-1/4">
          <p className="text-xl font-bold">{user?.username} 님</p>
        </aside>

        {/* 우측 콘텐츠 */}
        <section className="flex-1 rounded-lg bg-white">
          <h2 className="mb-4 text-lg font-bold">🐾 회원님이 남긴 실종 기록을 확인할 수 있어요.</h2>

          <MyMissingPetList
            pets={myMissingPets}
            onOpenModal={openModal}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <h2 className="mt-10 mb-4 text-lg font-bold">
            🐾 회원님이 남긴 제보 기록을 확인할 수 있어요.
          </h2>
          <MyReportList
            reports={myReports}
            onOpenModal={openModal}
            onEdit={handleEdit}
            onDelete={handleReportDelete}
            isLoading={isReportLoading}
          />
        </section>

        <MissingModal
          showModal={isEditModalOpen}
          setShowModal={setIsEditModalOpen}
          initialValues={editPet}
        />
        <ConfirmModal
          show={isModalOpen} // 🟢 상태 변경용
          onClose={closeModal}
          onConfirm={handleConfirm}
          title="반려동물을 찾으셨나요?"
          message={
            <>
              상태를 <strong className="text-[#FD9B71]">'돌아왔어요'</strong>로 변경하시겠습니까?
            </>
          }
          confirmText="예, 돌아왔어요"
        />
        <ConfirmModal
          show={isDeleteModalOpen} // 🟢 실종 등록 건 삭제용
          onClose={closeDeleteModal}
          onConfirm={handleDeleteConfirm}
          title="정말 삭제하시겠습니까?"
          message="해당 실종글과 관련된 제보도 함께 삭제됩니다."
          confirmText="예, 삭제합니다"
        />
        <ConfirmModal
          show={isReportDeleteModalOpen} // 🟢 제보 등록 건 삭제용
          onClose={closeReportDeleteModal}
          onConfirm={handleReportDeleteConfirm}
          title="정말 삭제하시겠습니까?"
          message="회원님이 등록한 소중한 제보가 삭제됩니다."
          confirmText="예, 삭제합니다"
        />
      </div>
    </div>
  );
};

export default MyPage;
