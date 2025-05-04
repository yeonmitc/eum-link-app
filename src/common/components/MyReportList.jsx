import { useCommentsStore } from '@/store/useCommentsStore';
import { useEffect } from 'react';
import { useMyMissingPetStore } from '../../store/useMyMissingPetStore';

const MyReportList = ({ reports, onEdit, onDelete, isLoading, showModal, setShowModal }) => {
  const { missingPets } = useMyMissingPetStore();
  const { comments, fetchComments } = useCommentsStore();

  useEffect(() => {
    fetchComments();
  }, []);

  const isLinkedMissingExists = (missingId) => {
    if (!missingId) return false;
    return missingPets.some((pet) => pet.id === missingId);
  };

  const formatDate = (iso) => {
    const date = new Date(iso);
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const ampm = hours < 12 ? '오전' : '오후';
    const formattedHour = hours % 12 === 0 ? 12 : hours % 12;

    return `${date.getFullYear()}년 ${date.getMonth() + 1}월 ${date.getDate()}일 ${ampm} ${formattedHour}:${minutes}`;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <p className="text-lg font-semibold">로딩 중입니다...</p>
      </div>
    );
  }

  if (!reports || reports.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <p className="text-lg font-semibold">아직 등록한 제보 내역이 없습니다.</p>
        <button
          onClick={() => setShowModal(true)}
          className="cursor-pointer rounded-full bg-[#FD9B71] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#f2855e]"
        >
          제보 등록하러 가기
        </button>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {reports.map((report) => {
        const pet = missingPets.find((pet) => pet.id === report.missingId);

        if (!isLinkedMissingExists(report.missingId) || !pet) {
          return (
            <li key={report.id} className="rounded-lg border border-gray-300 p-4 shadow-sm">
              <p className="text-sm text-gray-600">
                🚫 해당 실종 등록글이 삭제되어 현재는 확인할 수 없습니다.
              </p>
              <p className="mt-2 text-xs text-gray-400">내용: {report.description}</p>
              <p className="mt-2 text-xs text-gray-400">
                제보 등록일: {formatDate(report.createdAt)}
              </p>
            </li>
          );
        }

        const commentCount = comments.filter(
          (c) => c.postType === 'missing' && String(c.postId) === String(pet.id)
        ).length;

        return (
          <li key={report.id}>
            <a
              href={`/missing/${pet.id}`}
              className="relative flex flex-wrap items-center justify-between gap-4 rounded-lg border border-[#436850] p-4 shadow-lg transition hover:bg-gray-50 lg:flex-nowrap"
            >
              <img
                src={pet.imageUrl}
                alt={pet.petName}
                className="h-32 w-32 rounded object-cover"
              />

              <div className="min-w-[200px] flex-1">
                <p className="pb-1 font-bold">{pet.petName}</p>
                <p className="truncate pb-1 font-bold">{pet.description}</p>
                <p className="text-sm text-gray-600">📍{pet.lostLocation.road_address}</p>
                <p className="text-sm">{formatDate(report.createdAt)}</p>
              </div>

              <div className="mt-2 flex w-full gap-2 font-bold lg:!absolute lg:!top-4 lg:!right-4 lg:!mt-0 lg:!w-auto">
                <span
                  className={`flex h-8 min-w-[80px] items-center justify-center rounded-full px-4 text-sm font-semibold ${
                    pet.isMissing ? 'bg-[#FD9B71] text-white' : 'bg-gray-300 text-gray-600'
                  }`}
                >
                  {pet.isMissing ? '찾고 있어요' : '돌아왔어요'}
                </span>

                <button className="flex h-8 min-w-[60px] cursor-pointer items-center justify-center rounded-full bg-[#5D9471] px-4 text-sm text-white">
                  댓글 {commentCount}
                </button>

                <button
                  className="h-8 min-w-[50px] cursor-pointer rounded-full bg-[#5D9471] px-4 text-sm text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onEdit(report); // ✅ 수정 버튼 클릭 시 report 데이터를 전달
                  }}
                >
                  수정
                </button>

                <button
                  className="h-8 min-w-[50px] cursor-pointer rounded-full border border-[#5D9471] bg-[#5D9471] px-4 text-sm text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDelete(report.id);
                  }}
                >
                  삭제
                </button>
              </div>
            </a>
          </li>
        );
      })}
    </ul>
  );
};

export default MyReportList;
