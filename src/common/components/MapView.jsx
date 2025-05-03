import React, { useState, useEffect } from 'react';

const MapView = ({ setLoadAddress, setNumberAddress, lat, setLat, lon, setLon }) => {
  function getCurrentLocation() {
    const geocoder = new window.kakao.maps.services.Geocoder();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const la = position.coords.latitude;
        const lo = position.coords.longitude;
        setLat(la);
        setLon(lo);

        geocoder.coord2Address(lo, la, (result, status) => {
          if (status === window.kakao.maps.services.Status.OK) {
            setLoadAddress(result[0].road_address?.address_name || '');
            setNumberAddress(result[0].address?.address_name || '');
          }
        });
      },
      () => {
        alert('위치 정보를 가져올 수 없습니다.');
      }
    );
  }

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      console.error('카카오 지도 API가 아직 로드되지 않았습니다.');
      return;
    }

    getCurrentLocation();
  }, []);

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) return;

    const mapContainer = document.getElementById('modalMap');
    const mapOption = {
      center: new window.kakao.maps.LatLng(lat, lon),
      level: 3,
    };

    const map = new window.kakao.maps.Map(mapContainer, mapOption);
    const markerImageSrc = 'https://cdn-icons-png.flaticon.com/256/9707/9707706.png';
    const markerImageSize = new window.kakao.maps.Size(55, 50);
    const markerImage = new window.kakao.maps.MarkerImage(markerImageSrc, markerImageSize);

    const markerPosition = new window.kakao.maps.LatLng(lat, lon);
    const marker = new window.kakao.maps.Marker({
      position: markerPosition,
      image: markerImage,
    });

    const infowindow = new window.kakao.maps.InfoWindow({ zindex: 1 });
    marker.setMap(map);

    kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
      const geocoder = new window.kakao.maps.services.Geocoder();

      geocoder.coord2Address(
        mouseEvent.latLng.getLng(),
        mouseEvent.latLng.getLat(),
        function (result, status) {
          if (status === window.kakao.maps.services.Status.OK) {
            setNumberAddress(result[0].address.address_name);
            let detailAddr = result[0].road_address
              ? `<div>도로명주소 : ${result[0].road_address.address_name}</div>`
              : '';
            detailAddr += `<div>지번 주소 : ${result[0].address.address_name}</div>`;

            const content = `<div class="bAddr h-fit text-[0.9rem]">${detailAddr}</div>`;

            marker.setPosition(mouseEvent.latLng);
            marker.setMap(map);
            infowindow.setContent(content);
            infowindow.open(map, marker);
          }
        }
      );
    });
  }, [lat, lon]);

  return (
    <div className="h-full w-full border">
      <div id="modalMap" className="h-full w-full"></div>
    </div>
  );
};

export default MapView;
