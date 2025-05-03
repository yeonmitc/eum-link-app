import { useEffect, useRef } from 'react';

const MapListView = ({ pets, type }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // kakao 객체가 로드될 때까지 대기
    const onLoadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        let center;

        if (pets?.length > 0) {
          center =
            type === 'missing'
              ? new window.kakao.maps.LatLng(pets[0].lostLocation.lat, pets[0].lostLocation.lng)
              : new window.kakao.maps.LatLng(
                pets[0].sightedLocation.lat,
                pets[0].sightedLocation.lng
              );
        } else {
          center = new window.kakao.maps.LatLng(37.5662952, 126.9779451);
        }

        const options = {
          center: center,
          level: 5,
          draggable: true,
        };
        const map = new window.kakao.maps.Map(mapRef.current, options);

        // 마커 생성
        // 마커를 표시할 위치와 title 객체 배열입니다
        if (pets && pets?.length > 0) {
          let positions = [];

          pets.map((pet) => {
            positions.push({
              title: pet.id,
              latlng:
                type === 'missing'
                  ? new kakao.maps.LatLng(pet.lostLocation.lat, pet.lostLocation.lng)
                  : new kakao.maps.LatLng(pet.sightedLocation.lat, pet.sightedLocation.lng),
            });
          });

          // 마커 이미지의 이미지 주소입니다
          let imageSrc =
            'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWRvZy1pY29uIGx1Y2lkZS1kb2ciPjxwYXRoIGQ9Ik0xMS4yNSAxNi4yNWgxLjVMMTIgMTd6Ii8+PHBhdGggZD0iTTE2IDE0di41Ii8+PHBhdGggZD0iTTQuNDIgMTEuMjQ3QTEzLjE1MiAxMy4xNTIgMCAwIDAgNCAxNC41NTZDNCAxOC43MjggNy41ODIgMjEgMTIgMjFzOC0yLjI3MiA4LTYuNDQ0YTExLjcwMiAxMS43MDIgMCAwIDAtLjQ5My0zLjMwOSIvPjxwYXRoIGQ9Ik04IDE0di41Ii8+PHBhdGggZD0iTTguNSA4LjVjLS4zODQgMS4wNS0xLjA4MyAyLjAyOC0yLjM0NCAyLjUtMS45MzEuNzIyLTMuNTc2LS4yOTctMy42NTYtMS0uMTEzLS45OTQgMS4xNzctNi41MyA0LTcgMS45MjMtLjMyMSAzLjY1MS44NDUgMy42NTEgMi4yMzVBNy40OTcgNy40OTcgMCAwIDEgMTQgNS4yNzdjMC0xLjM5IDEuODQ0LTIuNTk4IDMuNzY3LTIuMjc3IDIuODIzLjQ3IDQuMTEzIDYuMDA2IDQgNy0uMDguNzAzLTEuNzI1IDEuNzIyLTMuNjU2IDEtMS4yNjEtLjQ3Mi0xLjg1NS0xLjQ1LTIuMjM5LTIuNSIvPjwvc3ZnPg==';

          for (let i = 0; i < positions?.length; i++) {
            // 마커 이미지의 이미지 크기 입니다
            var imageSize = new kakao.maps.Size(24, 35);

            // 마커 이미지를 생성합니다
            var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

            // 마커를 생성합니다
            var marker = new kakao.maps.Marker({
              map: map, // 마커를 표시할 지도
              position: positions[i].latlng, // 마커를 표시할 위치
              title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시됩니다
              image: markerImage, // 마커 이미지
            });
          }
        }
      } else {
        // 아직 로드되지 않았다면 100ms 뒤 재시도
        setTimeout(onLoadKakaoMap, 100);
      }
    };
    onLoadKakaoMap();
  }, []);

  return (
    <div className="w-full flex-col items-center justify-center">
      <div className="mb-2 px-4 py-2">
        <p className="text-gray-700">
          총 <span className="font-medium">{pets?.length}</span>개의{' '}
          {type === 'missing' ? '실종' : '목격'} 정보가 있습니다.
        </p>
      </div>
      <div
        ref={mapRef}
        style={{
          width: '100%',
          minHeight: '400px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      ></div>
    </div>
  );
};

export default MapListView;
