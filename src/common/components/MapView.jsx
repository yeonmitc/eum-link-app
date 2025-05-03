import { useEffect, useState } from 'react';

const MapView = ({ setLoadAddress, setNumberAddress, lat, setLat, lon, setLon }) => {
  // 카카오맵 스크립트 로딩 상태를 관리하는 상태 변수
  const [isKakaoLoaded, setIsKakaoLoaded] = useState(false);

  // 카카오맵 스크립트 로딩을 확인하는 useEffect
  useEffect(() => {
    // 이미 카카오맵이 로드되어 있는지 확인
    if (window.kakao && window.kakao.maps) {
      setIsKakaoLoaded(true);
      return;
    }

    // 스크립트가 아직 로드되지 않았다면 로드 이벤트를 기다림
    const script = document.querySelector('script[src*="dapi.kakao.com/v2/maps/sdk.js"]');
    if (script) {
      script.addEventListener('load', () => {
        setIsKakaoLoaded(true);
      });
    }
  }, []);

  // 카카오맵 초기화 및 이벤트 설정
  useEffect(() => {
    if (!isKakaoLoaded) return;

    const { kakao } = window;
    const geocoder = new kakao.maps.services.Geocoder();

    // 현재 위치를 가져오는 함수
    function getCurrentLocation() {
      navigator.geolocation.getCurrentPosition((position) => {
        const la = position.coords.latitude;
        const lo = position.coords.longitude;
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);

        // 좌표를 주소로 변환
        geocoder.coord2Address(lo, la, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            setLoadAddress(result[0].road_address ? result[0].road_address?.address_name : null);
            setNumberAddress(result[0].address ? result[0].address?.address_name : null);
          } else {
            console.log('주소 변환 실패');
          }
        });
      }, error);
    }

    // 위치 정보 접근 실패 시 처리
    function error() {
      alert('위치 정보를 가져올 수 없습니다.');
    }

    getCurrentLocation();

    // 지도 컨테이너 설정
    const container = document.getElementById('modalMap');
    const options = {
      center: new kakao.maps.LatLng(lat, lon),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    // 마커 이미지 설정
    const markerImageSrc = 'https://cdn-icons-png.flaticon.com/256/9707/9707706.png';
    const markerImageSize = new kakao.maps.Size(55, 50);
    const markerImage = new kakao.maps.MarkerImage(markerImageSrc, markerImageSize);

    // 마커 생성 및 설정
    const markerPosition = new kakao.maps.LatLng(lat, lon);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });
    const infowindow = new kakao.maps.InfoWindow({ zindex: 1 });

    marker.setMap(map);

    // 지도 클릭 이벤트 처리
    kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
      searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          setNumberAddress(result[0].address.address_name);
          var detailAddr = result[0].road_address
            ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>'
            : '';
          detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';

          var content = '<div class="bAddr h-fit text-[0.9rem]">' + detailAddr + '</div>';

          marker.setPosition(mouseEvent.latLng);
          marker.setMap(map);

          infowindow.setContent(content);
          infowindow.open(map, marker);
        }
      });
    });

    // 좌표로 주소 검색하는 함수
    function searchDetailAddrFromCoords(coords, callback) {
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }
  }, [isKakaoLoaded, lat, lon, setLoadAddress, setNumberAddress, setLat, setLon]);

  // 카카오맵이 로드되기 전에는 로딩 메시지 표시
  if (!isKakaoLoaded) {
    return <div>지도를 불러오는 중...</div>;
  }

  return (
    <div className="h-full w-full border">
      <div id="modalMap" className="h-full w-full"></div>
    </div>
  );
};

export default MapView;
