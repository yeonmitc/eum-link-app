import MissingModal from '@/common/components/MissingModal';
import MyMissingPetCard from '@/common/components/MyMissingPetCard';
import MyMissingPetList from '@/common/components/MyMissingPetList';
import MyReportList from '@/common/components/MyReportList';
import ReportModal from '@/common/components/ReportModal';
import { useMyReportsStore } from '@/store/useMyReportsStore';
import useUserStore from '@/store/userStore';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmModal from '../../common/components/StatusChangeModal';
import { useMyMissingPetStore } from '../../store/useMyMissingPetStore';

const MyPage = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useUserStore();
  const { missingPets, fetchMissingPets, updateMissingStatus, deleteMissingPetWithReports } =
    useMyMissingPetStore();

  const [selectedPetId, setSelectedPetId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myMissingPets, setMyMissingPets] = useState(null);

  const loadMissingPets = async () => {
    await fetchMissingPets();
  };

  useEffect(() => {
    if (user?.id && Array.isArray(missingPets)) {
      const myPets = missingPets.filter((pet) => String(pet.userId) === String(user.id));
      setMyMissingPets(myPets);
    }
  }, [missingPets, user]);

  useEffect(() => {
    if (isLoggedIn && user) {
      loadMissingPets();
    }
  }, [isLoggedIn, user]);

  const openModal = (petId) => {
    setSelectedPetId(petId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPetId(null);
  };

  const handleConfirm = async () => {
    if (selectedPetId !== null) {
      setMyMissingPets(null);
      await updateMissingStatus(selectedPetId, false);
      await loadMissingPets();
    }
    closeModal();
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editPet, setEditPet] = useState(null);
  const [editReport, setEditReport] = useState(null);
  const [isReportModalOpen, setIsReportModalOpen] = useState(false);

  const handleEdit = (item) => {
    if ('petName' in item) {
      setEditPet(item);
      setIsEditModalOpen(true);
    } else {
      setEditReport(item);
      setIsReportModalOpen(true);
    }
  };

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
      await loadMissingPets();
    }
    closeDeleteModal();
  };

  const { reports, fetchReports, deleteReport } = useMyReportsStore();
  const [selectedReportId, setSelectedReportId] = useState(null);
  const [isReportDeleteModalOpen, setIsReportDeleteModalOpen] = useState(false);

  const handleReportDelete = (reportId) => {
    setSelectedReportId(reportId);
    setIsReportDeleteModalOpen(true);
  };

  const closeReportDeleteModal = () => setIsReportDeleteModalOpen(false);

  const handleReportDeleteConfirm = async () => {
    await deleteReport(selectedReportId);
    await fetchReports();
    closeReportDeleteModal();
  };

  const [isReportLoading, setIsReportLoading] = useState(true);

  useEffect(() => {
    const fetchAndSetReports = async () => {
      setIsReportLoading(true);
      await fetchReports();
      setIsReportLoading(false);
    };
    fetchAndSetReports();
  }, []);

  const groupedReportsByPetId = myMissingPets?.map((pet) => {
    const relatedReports = reports.filter((r) => r.missingId === pet.id);
    return { pet, reports: relatedReports };
  });

  const [myReports, setMyReports] = useState([]);

  useEffect(() => {
    if (user?.id && reports.length > 0) {
      const filtered = reports.filter((r) => r.userId === user.id);
      setMyReports(filtered);
    }
  }, [user, reports]);

  // 🔸 등록용 실종 모달 추가
  const [isNewMissingModalOpen, setIsNewMissingModalOpen] = useState(false);
  const handleNewMissingOpen = () => {
    setEditPet(null);
    setIsNewMissingModalOpen(true);
  };

  return (
    <div className="mx-auto w-full max-w-screen-2xl px-4 pt-20">
      <div className="flex flex-col gap-6 lg:!flex-row">
        <aside className="!block w-full rounded-lg !border-t !border-gray-200 bg-white p-6 text-center shadow-sm lg:!w-1/4 lg:!border-none lg:!text-left lg:!shadow-none">
          <p className="text-xl font-bold">{user?.username} 님</p>
          <div className="mt-6">
            <p className="text-lg font-semibold">나의 계정정보</p>
            <p className="mt-1 cursor-pointer text-sm text-gray-500 hover:underline">
              회원정보수정
            </p>
          </div>
        </aside>

        <section className="flex-1 rounded-lg bg-white">
          <h2 className="mb-4 text-lg font-bold">🐾 회원님이 남긴 실종 기록을 확인할 수 있어요.</h2>
          <MyMissingPetList
            pets={myMissingPets}
            onOpenModal={openModal}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onNewMissingOpen={() => setIsEditModalOpen(true)}
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
            showModal={isReportModalOpen}
            setShowModal={setIsReportModalOpen}
          />

          <h2 className="mt-10 mb-4 text-lg font-bold">🐾 소중한 제보 내역을 확인할 수 있어요.</h2>
          {!groupedReportsByPetId ? (
            <p className="text-sm">제보 데이터를 불러오는 중입니다...</p>
          ) : groupedReportsByPetId.flatMap((g) => g.reports).length === 0 ? (
            <div className="pb-12">
              <p className="text-lg">아직 도착한 제보 내역이 없습니다. 조금만 더 기다려볼까요?</p>
            </div>
          ) : (
            groupedReportsByPetId
              .filter((group) => group.reports.length > 0)
              .map(({ pet, reports }) => (
                <div key={pet.id} className="mb-6">
                  <MyMissingPetCard pet={pet} reports={reports} />
                </div>
              ))
          )}
        </section>

        {/* 수정용 모달 */}
        <MissingModal
          showModal={isEditModalOpen}
          setShowModal={setIsEditModalOpen}
          initialValues={editPet}
        />

        {/* 등록용 모달 (null로 초기화) */}
        <MissingModal
          showModal={isNewMissingModalOpen}
          setShowModal={setIsNewMissingModalOpen}
          initialValues={null}
        />

        <ReportModal
          showModal={isReportModalOpen}
          setShowModal={setIsReportModalOpen}
          initialValues={editReport}
        />

        <ConfirmModal
          show={isModalOpen}
          onClose={closeModal}
          onConfirm={handleConfirm}
          title="반려동물을 찾으셨나요?"
          message={
            <>
              <strong className="text-[#FD9B71]">'돌아왔어요'</strong>로 상태를 변경하시겠습니까?
            </>
          }
          confirmText="예, 돌아왔어요"
        />

        <ConfirmModal
          show={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onConfirm={handleDeleteConfirm}
          title="정말 삭제하시겠습니까?"
          message="해당 실종글과 관련된 제보도 함께 삭제됩니다."
          confirmText="예, 삭제합니다"
        />

        <ConfirmModal
          show={isReportDeleteModalOpen}
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
