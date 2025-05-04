import { useState } from 'react';

const useToggleMissingStatus = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successData, setSuccessData] = useState(null);

  const toggleStatus = async (petToUpdate) => {
    if (!petToUpdate || typeof petToUpdate.id === 'undefined' || typeof petToUpdate.isMissing !== 'boolean') {
      console.error("유효하지 않은 펫 정보가 전달되었습니다.");
      setError("유효하지 않은 펫 정보입니다.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessData(null);

    const url = `https://eum-db.onrender.com/missingPets/${petToUpdate.id}`;
    const newIsMissingStatus = !petToUpdate.isMissing;

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          isMissing: newIsMissingStatus
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`상태 업데이트 실패 ㅠㅠ 상태 코드: ${response.status} - ${response.statusText}, 응답: ${errorText}`);
        setError(`상태 변경 실패: ${response.status} ${response.statusText}`);
        setIsLoading(false);
        return;
      }

      const updatedPet = await response.json();
      console.log(`게시물 ID ${petToUpdate.id} isMissing 상태 ${newIsMissingStatus}로 업데이트 성공!`);
      setSuccessData(updatedPet);
      setIsLoading(false);

      return updatedPet;

    } catch (err) {
      console.error('서버 업데이트 요청 중 에러 발생:', err);
      setError('네트워크 오류 또는 서버 연결 문제');
      setIsLoading(false);
      return null;
    }
  };

  return {
    toggleStatus,
    isLoading,
    error,
    successData
  };
};

export default useToggleMissingStatus;
