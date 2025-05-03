import { Link } from 'react-router-dom';

const MyMissingPetList = ({ pets, onOpenModal, onEdit, onDelete }) => {
  if (pets === null) {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <p className="text-lg font-semibold">로딩 중입니다...</p>
      </div>
    );
  }

  if (pets.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <p className="text-lg font-semibold">아직 등록한 실종 내역이 없습니다.</p>
        <Link
          to="/missing/new"
          className="rounded-full bg-[#FD9B71] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#f2855e]"
        >
          실종 등록하러 가기
        </Link>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {pets.map((pet) => (
        <li key={pet.id}>
          <Link
            to={`/missing/${pet.id}`}
            className="relative flex flex-wrap items-center justify-between gap-4 rounded-lg border border-[#436850] p-4 shadow-lg transition hover:bg-gray-50 lg:flex-nowrap"
          >
            {/* 이미지 */}
            <img src={pet.imageUrl} alt={pet.petName} className="h-32 w-32 rounded object-cover" />

            {/* 설명 */}
            <div className="min-w-[200px] flex-1">
              <p className="pb-1 font-bold">{pet.petName}</p>
              <p className="truncate pb-1 font-bold">{pet.description}</p>
              <p className="text-sm text-gray-600">📍{pet.lostLocation.road_address}</p>
              <p>{pet.createdAt}</p>
            </div>

            {/* 버튼들 */}
            <div className="mt-2 flex w-full gap-2 font-bold lg:!absolute lg:!top-4 lg:!right-4 lg:!mt-0 lg:!w-auto">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onOpenModal(pet.id);
                }}
                disabled={!pet.isMissing}
                title={!pet.isMissing ? '이미 돌아온 동물이에요' : ''}
                className={`h-8 min-w-[80px] cursor-pointer rounded-full px-4 text-sm font-semibold ${
                  pet.isMissing
                    ? 'bg-[#FD9B71] text-white'
                    : 'cursor-not-allowed bg-gray-300 text-gray-600'
                }`}
              >
                {pet.isMissing ? '찾고 있어요' : '돌아왔어요'}
              </button>

              <button className="flex h-8 min-w-[60px] cursor-pointer items-center justify-center rounded-full bg-[#5D9471] px-4 text-sm text-white">
                댓글 0
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onEdit(pet);
                }}
                className="h-8 min-w-[50px] cursor-pointer rounded-full bg-[#5D9471] px-4 text-sm text-white"
              >
                수정
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  onDelete(pet.id);
                }}
                className="h-8 min-w-[50px] cursor-pointer rounded-full border border-[#5D9471] bg-[#5D9471] px-4 text-sm text-white"
              >
                삭제
              </button>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MyMissingPetList;
