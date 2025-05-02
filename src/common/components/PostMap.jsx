import React, { useEffect } from "react";

export default function PostMap() {
  useEffect(() => {
    // 카카오 지도 API가 로드되었는지 확인
    if (window.kakao && window.kakao.maps) {
      const container = document.getElementById("map");
      const options = {
        center: new window.kakao.maps.LatLng(33.450701, 126.570667), // 중심 좌표
        level: 3, // 확대 수준
      };
      const map = new window.kakao.maps.Map(container, options); // 지도 생성

      // 마커 이미지 설정
      const markerImageSrc = 'https://cdn-icons-png.flaticon.com/256/9707/9707706.png'; // 마커 이미지 URL
      const markerImageSize = new window.kakao.maps.Size(75,70); // 마커 이미지 크기
      const markerImage = new window.kakao.maps.MarkerImage(markerImageSrc, markerImageSize);

      // 마커 생성
      const markerPosition = new window.kakao.maps.LatLng(33.450701, 126.570667); // 마커 위치
      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
        image: markerImage, // 마커 이미지 설정
      });

      marker.setMap(map); // 지도에 마커 추가
    } else {
      console.error("Kakao Maps API is not loaded.");
    }
  }, []);

  return (
    <div
      id="map"
      style={{
        width: "100%",
        height: "80%",
      }}
    ></div>
  );
}
