import { Link } from 'react-router-dom';
import { useMyMissingPetStore } from '../../store/useMyMissingPetStore';

const MyReportList = ({ reports, onEdit }) => {
  const { missingPets } = useMyMissingPetStore(); // 연결된 강쥐 상태 확인용

  if (reports === null) {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <p className="text-lg font-semibold">로딩 중입니다...</p>
      </div>
    );
  }

  if (reports.length === 0) {
    return (
      <div className="flex flex-col items-center gap-4 py-10 text-center">
        <p className="text-lg font-semibold">아직 등록한 제보 내역이 없습니다.</p>
        <Link
          to="/report/new" // 임시로 넣은 url
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
        const pet = missingPets.find((pet) => pet.id === report.petMissingId);

        // 연결된 실종글이 없으면 렌더링 생략
        if (!pet) return null;

        const isMissing = pet?.isMissing ?? true;

        return (
          <li key={report.id}>
            <Link
              to={`/reports/${pet.id}`}
              className="flex gap-4 rounded-lg border border-[#436850] p-4 shadow-lg transition hover:bg-gray-50"
            >
              <img
                src={report.imageUrl || ''}
                alt="제보 이미지"
                className="h-32 w-32 rounded object-cover"
              />
              <div className="flex-1">
                <p className="pb-1 font-bold">{report.description}</p>
                <p className="pb-1 text-sm text-gray-600">{report.sightedLocation.road_address}</p>
                <p>{report.createdAt}</p>
              </div>
              <div className="flex flex-col items-end justify-start gap-2">
                <div className="flex gap-2 font-bold">
                  <span
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    className={`flex h-8 items-center rounded-full px-4 text-sm font-semibold ${
                      isMissing ? 'bg-[#FD9B71] text-white' : 'bg-gray-300 text-gray-600'
                    }`}
                  >
                    {isMissing ? '찾고 있어요' : '돌아왔어요'}
                  </span>
                  <button
                    className="flex h-8 cursor-pointer items-center rounded-full bg-[#5D9471] px-4 text-sm text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    댓글 0
                  </button>
                  <button
                    className="h-8 cursor-pointer rounded-full bg-[#5D9471] px-4 text-sm text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onEdit(report); // 지금은 실종 등록 모달이 나오는데 차후에 제보 등록 모달 연결
                    }}
                  >
                    수정
                  </button>
                  <button
                    className="h-8 cursor-pointer rounded-full border border-[#5D9471] bg-[#5D9471] bg-white px-4 text-sm text-white"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    삭제
                  </button>
                </div>
              </div>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MyReportList;
