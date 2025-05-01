import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

          {myMissingPets === null ? (
            <div className="flex flex-col items-center gap-4 py-10 text-center">
              <p className="text-lg font-semibold">로딩 중입니다...</p>
            </div>
          ) : myMissingPets.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-10 text-center">
              <p className="text-lg font-semibold">아직 등록한 실종 내역이 없습니다.</p>
              <Link
                to="/missing/new"
                className="rounded-full bg-[#FD9B71] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#f2855e]"
              >
                실종 등록하러 가기
              </Link>
            </div>
          ) : (
            <ul className="space-y-4">
              {myMissingPets.map((pet) => (
                <li key={pet.id}>
                  <Link
                    to={`/missing/${pet.id}`}
                    className="flex gap-4 rounded-lg border border-[#436850] p-4 shadow-lg transition hover:bg-gray-50"
                  >
                    <img
                      src={pet.imageUrl}
                      alt={pet.petName}
                      className="h-32 w-32 rounded object-cover"
                    />
                    <div className="flex-1">
                      <p className="pb-1 font-bold">{pet.petName}</p>
                      <p className="w-[300px] truncate pb-1 font-bold">{pet.description}</p>
                      <p>{pet.createdAt}</p>
                      <p className="text-sm text-gray-600">{pet.lostLocation.road_address}</p>
                    </div>
                    <div className="flex flex-col items-end justify-start gap-2">
                      <div className="flex gap-2 font-bold">
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            openModal(pet.id);
                          }}
                          disabled={!pet.isMissing}
                          title={!pet.isMissing ? '이미 돌아온 동물이에요' : ''}
                          className={`h-8 cursor-pointer rounded-full px-4 text-sm font-semibold ${pet.isMissing ? 'bg-[#FD9B71] text-white' : 'cursor-not-allowed bg-gray-300 text-gray-600'}`}
                        >
                          {pet.isMissing ? '찾고 있어요' : '돌아왔어요'}
                        </button>
                        <button
                          className="flex h-8 cursor-pointer items-center rounded-full bg-[#5D9471] px-4 text-sm text-white"
                          onClick={handleClick}
                        >
                          댓글 0
                        </button>
                        <button
                          className="h-8 cursor-pointer rounded-full bg-[#5D9471] px-4 text-sm text-white"
                          onClick={handleClick}
                        >
                          수정
                        </button>
                        <button
                          className="h-8 cursor-pointer rounded-full border border-[#5D9471] bg-[#5D9471] bg-white px-4 text-sm text-white"
                          onClick={handleClick}
                        >
                          삭제
                        </button>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
        <StatusChangeModal show={isModalOpen} onClose={closeModal} onConfirm={handleConfirm} />
      </div>
    </div>
  );
};

export default MyPage;
