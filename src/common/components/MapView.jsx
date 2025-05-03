import React, { useState, useEffect } from 'react';
const { kakao } = window;

const MapView = ({ setLoadAddress, setNumberAddress, lat, setLat, lon, setLon }) => {
  const geocoder = new kakao.maps.services.Geocoder();

  function getCurrentLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      const la = position.coords.latitude;
      const lo = position.coords.longitude;
      setLat(position.coords.latitude);
      setLon(position.coords.longitude);

      console.log(
        geocoder.coord2Address(lo, la, (result, status) => {
          if (status === kakao.maps.services.Status.OK) {
            console.log('result[0] : ', result[0]);
            setLoadAddress(result[0].road_address ? result[0].road_address?.address_name : null);
            setNumberAddress(result[0].address ? result[0].address?.address_name : null);
          } else {
            console.log('변환 실패');
          }
        })
      );
    }, error);
  }

  function error() {
    alert('Sorry, no position available.');
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);

  useEffect(() => {
    // 카카오 지도 API가 로드되었는지 확인
    if (window.kakao && window.kakao.maps) {
      const container = document.getElementById('modalMap');
      const options = {
        center: new kakao.maps.LatLng(lat, lon),
        level: 3,
      };
      const map = new kakao.maps.Map(container, options);

      // 마커 이미지 설정
      const markerImageSrc = 'https://cdn-icons-png.flaticon.com/256/9707/9707706.png'; // 마커 이미지 URL
      const markerImageSize = new kakao.maps.Size(55, 50); // 마커 이미지 크기
      const markerImage = new kakao.maps.MarkerImage(markerImageSrc, markerImageSize);

      // 마커 생성
      const markerPosition = new kakao.maps.LatLng(lat, lon); // 마커 위치
      const marker = new kakao.maps.Marker({
          position: markerPosition,
          image: markerImage, // 마커 이미지 설정
        }),
        infowindow = new kakao.maps.InfoWindow({ zindex: 1 });

      marker.setMap(map); // 지도에 마커 추가

      // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
      kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
        searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
          if (status === kakao.maps.services.Status.OK) {
            setNumberAddress(result[0].address.address_name);
            var detailAddr = !!result[0].road_address
              ? '<div>도로명주소 : ' + result[0].road_address.address_name + '</div>'
              : '';
            detailAddr += '<div>지번 주소 : ' + result[0].address.address_name + '</div>';

            var content = '<div class="bAddr h-fit text-[0.9rem]">' + detailAddr + '</div>';

            // 마커를 클릭한 위치에 표시합니다
            marker.setPosition(mouseEvent.latLng);
            marker.setMap(map);

            // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
            infowindow.setContent(content);
            infowindow.open(map, marker);
          }
        });
      });
    } else {
      console.error('Kakao Maps API is not loaded');
    }
  }, [lat, lon]);

  function searchDetailAddrFromCoords(coords, callback) {
    // 좌표로 법정동 상세 주소 정보를 요청합니다
    geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
  }

  return (
    <div className="h-full w-full border">
      <div id="modalMap" className="h-full w-full"></div>
    </div>
  );
};

export default MapView;
