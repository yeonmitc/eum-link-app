import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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

  return (
    <div>
      <div className="flex gap-4 p-4">
        {/* 좌측 프로필 영역 */}
        <aside className="w-1/4 rounded-lg bg-gray-50 p-4 shadow">
          {user && <p className="text-xl font-semibold">{user.username} 님</p>}
        </aside>

        {/* 우측 콘텐츠 영역 */}
        <section className="rounded-lg p-4 shadow">
          <h2 className="mb-4 text-lg font-bold">
            🐾 회원님이 남긴 실종/제보 기록을 확인할 수 있어요.
          </h2>
          {/* 이후 여기에 실종/제보 섹션이 들어갈 예정 */}
          {myMissingPets.length === 0 ? (
            <p>아직 등록한 실종 내역이 없어요.</p>
          ) : (
            <ul className="grid grid-cols-3 gap-4">
              {myMissingPets.map((pet) => (
                <li key={pet.id} className="rounded border p-4 shadow">
                  <img
                    src={pet.imageUrl}
                    alt={pet.petName}
                    className="mb-2 h-40 w-full rounded object-cover"
                  />
                  <p className="font-bold">{pet.petName}</p>
                  {/* <p>{pet.description}</p> */}
                  <p>{pet.createdAt}</p>
                  <p className="text-sm">{pet.lostLocation.road_address}</p>
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
