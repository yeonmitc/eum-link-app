import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMyMissingPetStore } from '../../store/useMyMissingPetStore';

const MyReportList = ({ reports, onEdit, onDelete, isLoading, onOpenModal }) => {
  const { missingPets } = useMyMissingPetStore(); // 연결 확인용
  useEffect(() => {
    console.log('🐾 MyReportList에 전달된 reports:', reports);
  }, [reports]);

  // 연결된 실종글 존재 여부 확인 함수
  const isLinkedMissingExists = (missingId) => {
    if (!missingId) return false;
    return missingPets.some((pet) => pet.id === missingId);
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
        <Link
          to="/report/new" // 임시 경로
          className="rounded-full bg-[#FD9B71] px-6 py-2 text-sm font-semibold text-white transition hover:bg-[#f2855e]"
        >
          제보 등록하러 가기
        </Link>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {reports.map((report) => {
        const pet = missingPets.find((pet) => pet.id === report.missingId); //MissingId 매칭 시켜서 부르기

        if (!isLinkedMissingExists(report.missingId) || !pet) {
          // 연결된 실종글이 삭제되었을 경우
          return (
            <li key={report.id} className="rounded-lg border border-gray-300 p-4 shadow-sm">
              <p className="text-sm text-gray-600">
                🚫 해당 실종 등록글이 삭제되어 현재는 확인할 수 없습니다.
              </p>
              <p className="mt-2 text-xs text-gray-400">내용: {report.description}</p>
              <p className="mt-2 text-xs text-gray-400">제보 등록일: {report.createdAt}</p>
            </li>
          );
        }

        // 연결된 실종글이 있는 경우에만 아래 코드 실행
        const isMissing = pet.isMissing;

        return (
          <li key={report.id}>
            <Link
              to={`/missing/${pet.id}`}
              className="flex justify-between gap-4 rounded-lg border border-[#436850] p-4 shadow-lg transition hover:bg-gray-50"
            >
              {/* 이미지 + 텍스트 묶음 */}
              <div className="flex gap-4">
                <img
                  src={pet.imageUrl}
                  alt={pet.petName}
                  className="h-32 w-32 rounded object-cover"
                />
                <div className="flex flex-col justify-center">
                  <p className="pb-1 font-bold">{pet.petName}</p>
                  <p className="w-[300px] truncate pb-1 font-bold">{pet.description}</p>
                  <p className="text-sm text-gray-600">📍{pet.lostLocation.road_address}</p>
                  <p>{pet.createdAt}</p>
                </div>
              </div>

              {/* 우측 버튼 */}
              <div className="flex items-start gap-2 font-bold">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onOpenModal(pet.id);
                  }}
                  disabled={!pet.isMissing}
                  title={!pet.isMissing ? '이미 돌아온 동물이에요' : ''}
                  className={`h-8 cursor-pointer rounded-full px-4 text-sm font-semibold ${
                    pet.isMissing
                      ? 'bg-[#FD9B71] text-white'
                      : 'cursor-not-allowed bg-gray-300 text-gray-600'
                  }`}
                >
                  {pet.isMissing ? '찾고 있어요' : '돌아왔어요'}
                </button>

                <button className="flex h-8 cursor-pointer items-center rounded-full bg-[#5D9471] px-4 text-sm text-white">
                  댓글 0
                </button>

                <button
                  className="h-8 cursor-pointer rounded-full bg-[#5D9471] px-4 text-sm text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onEdit(pet);
                  }}
                >
                  수정
                </button>

                <button
                  className="h-8 cursor-pointer rounded-full border border-[#5D9471] bg-[#5D9471] px-4 text-sm text-white"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onDelete(pet.id);
                  }}
                >
                  삭제
                </button>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MyReportList;
