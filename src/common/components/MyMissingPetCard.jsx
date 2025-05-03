import { Link } from 'react-router-dom';

const MyMissingPetCard = ({ pet, reports }) => {
  if (!reports || reports.length === 0) {
    return (
      <div>
        <p className="text-sm">아직 도착한 제보 내역이 없습니다. 조금만 더 기다려볼까요?</p>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {reports.map((report) => (
        <li key={report.id}>
          <Link
            to={`/reports/${report.id}`}
            className="flex gap-4 rounded-lg border border-[#436850] p-4 shadow-lg transition hover:bg-gray-50"
          >
            <img
              src={report.imageUrl || ''}
              alt="제보 이미지"
              className="h-32 w-32 rounded object-cover"
            />
            <div className="flex-1">
              <p className="font-semibold text-gray-800">{report.description}</p>
              <p className="mt-1 text-sm text-gray-500">
                📍 {report.sightedLocation?.road_address || '위치 정보 없음'}
              </p>
              <p className="mt-1 text-sm">{report.createdAt}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};
export default MyMissingPetCard;
