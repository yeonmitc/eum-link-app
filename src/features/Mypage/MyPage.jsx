import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useMissingPetStore } from '../../store/missingPetStore';
import { useMyPageStore } from '../../store/myPageStore';

const MyPage = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn, login } = useMyPageStore();
  const { missingPets, fetchMissingPets } = useMissingPetStore();

  // 강제 로그인용 useEffect
  useEffect(() => {
    if (!isLoggedIn) {
      login({
        id: 1, // 테스트하려는 userId
        username: '민호맘',
        email: 'kim.minho@gmail.com',
      });
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      console.log('실종글가져오기 test');
      fetchMissingPets();
    }
  }, [isLoggedIn]);

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

  const myMissingPets = missingPets.filter((pet) => pet.userId === user?.id);

  // 이벤트 버블링 막아놓기
  const handleClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <div className="mx-auto w-full max-w-screen-xl px-4">
      <div className="flex w-full gap-6 md:flex-row">
        {/* 좌측 프로필 */}
        <aside className="min-w-[200px] rounded-lg bg-white p-6 md:w-1/4">
          <p className="text-xl font-bold">{user?.username} 님</p>
        </aside>

        {/* 우측 콘텐츠 */}
        <section className="flex-1 rounded-lg bg-white p-10">
          <h2 className="mb-4 text-lg font-bold">
            🐾 회원님이 남긴 실종/제보 기록을 확인할 수 있어요.
          </h2>

          {myMissingPets.length === 0 ? (
            <div className="flex flex-col items-center gap-4 py-10 text-center">
              <p className="text-lg font-semibold">아직 등록한 실종 내역이 없습니다.</p>
              <Link
                to="/missing/new" //
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
                          className="h-8 rounded-full bg-[#FD9B71] px-4 text-sm text-white"
                          onClick={handleClick}
                        >
                          찾고 있어요
                        </button>
                        <button
                          className="flex h-8 items-center rounded-full bg-[#5D9471] px-4 text-sm text-white"
                          onClick={handleClick}
                        >
                          댓글 0
                        </button>
                        <button
                          className="h-8 rounded-full bg-[#5D9471] px-4 text-sm text-white"
                          onClick={handleClick}
                        >
                          수정
                        </button>
                        <button
                          className="h-8 rounded-full border border-[#5D9471] bg-[#5D9471] bg-white px-4 text-sm text-white"
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
      </div>
    </div>
  );
};

export default MyPage;
