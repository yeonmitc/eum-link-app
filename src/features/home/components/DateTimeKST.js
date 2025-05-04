// 날짜/시간을 KST로 변환하여 포맷하는 유틸리티 함수들

export function getKSTDateTime(pet, type = 'missing') {
  if (type === 'missing') {
    if (pet.lostDate && pet.lostTime) {
      const dateObj = new Date(`${pet.lostDate}T${pet.lostTime}:00+09:00`);
      return formatKST(dateObj, true);
    }
    return '';
  } else {
    if (pet.sightedAt) {
      const dateObj = new Date(new Date(pet.sightedAt).toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
      return formatKST(dateObj, true);
    }
    return '';
  }
}

export function getKSTDateOnly(pet, type = 'missing') {
  if (type === 'missing') {
    if (pet.lostDate && pet.lostTime) {
      const dateObj = new Date(`${pet.lostDate}T${pet.lostTime}:00+09:00`);
      return formatKST(dateObj, false);
    }
    return '';
  } else {
    if (pet.sightedAt) {
      const dateObj = new Date(new Date(pet.sightedAt).toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
      return formatKST(dateObj, false);
    }
    return '';
  }
}

function formatKST(dateObj, withTime = false) {
  const options = withTime
    ? { month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Seoul' }
    : { month: 'numeric', day: 'numeric', timeZone: 'Asia/Seoul' };
  const str = dateObj.toLocaleString('ko-KR', options);
  if (withTime) {
    // "3. 14. 19:45" → "3월 14일 19:45"
    return str.replace(/(\d+)\.\s*(\d+)\.\s*(\d{2}:\d{2})/, '$1월 $2일 $3');
  } else {
    // "3. 14." → "3월 14일"
    return str.replace(/(\d+)\.\s*(\d+)\./, '$1월 $2일');
  }
} 
