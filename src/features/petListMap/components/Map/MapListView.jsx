import { useEffect, useRef } from 'react';
import basicImage from '../../../../assets/images/eum-logo.webp';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

const MapListView = ({ pets, type, isPetListLoading }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // kakao 객체가 로드될 때까지 대기
    const onLoadKakaoMap = () => {
      if (window.kakao && window.kakao.maps) {
        let center;

        if (pets?.length > 0) {
          center =
            type === 'missing'
              ? new window.kakao.maps.LatLng(pets[0].lostLocation.lat, pets[0].lostLocation.lon)
              : new window.kakao.maps.LatLng(pets[0].sightedLocation.lat, pets[0].sightedLocation.lon);
        } else {
          center = new window.kakao.maps.LatLng(37.5662952, 126.9779451);
        }

        const options = {
          center: center,
          level: 5,
          draggable: true,
        };

        const listMap = new window.kakao.maps.Map(mapRef.current, options);

        // 마커 생성
        // 마커를 표시할 위치와 title 객체 배열입니다
        if (pets && pets?.length > 0) {
          let positions = [];

          pets.map((pet) => {
            var contentDate = type === "missing" ? pet?.lostDate : pet?.sightedDate;
            var content = `
                    <div class="w-60 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
                      <div class="bg-(--secondary) text-white font-semibold text-center p-2 flex justify-between">
                        ${type === "missing" ? "실종" : "목격"} 정보
                        <button class="cursor-pointer font-medium overlay-close-button" title="닫기">X</button>
                      </div>
                      <div class="relative">
                        <img 
                          class="w-full h-36 object-cover cursor-pointer"
                          src="${pet?.imageUrl || basicImage}"
                          onclick="location.href='${type === "missing" ? "/missing/" + pet?.id : "/reports/" + pet?.id}'"
                          alt="pet"
                        />
                        <span class="absolute top-2 right-2 bg-white/80 text-xs px-2 py-1 rounded shadow">
                          ${pet?.refSpecies === 1 ? "강아지" : pet?.refSpecies === 2 ? "고양이" : "기타"}
                        </span>
                      </div>
                      <div class="p-3 flex flex-col gap-1">
                        <div class="flex justify-between items-center">
                          <span class="text-gray-500 text-sm">날짜</span>
                          <span class="text-gray-700 text-sm font-medium">${contentDate || "미상"}</span>
                        </div>
                      </div>
                      <div class="px-3 pb-3 flex justify-end">
                        <button 
                          class="bg-(--secondary) hover:bg-(--primary) text-white text-xs px-3 py-1 rounded cursor-pointer"
                          onclick="location.href='${type === "missing" ? "/missing/" + pet?.id : "/reports/" + pet?.id}'"
                        >상세보기</button>
                      </div>
                    </div>
                  `;
            positions.push(
              type === "missing"
                ? {
                  content: content,
                  title: pet?.lostLocation?.road_address || pet?.lostLocation?.number_address || "",
                  latlng: new window.kakao.maps.LatLng(pet.lostLocation.lat, pet.lostLocation.lon)
                }
                : {
                  content: content,
                  title: pet?.sightedLocation?.road_address || pet?.sightedLocation?.number_address,
                  latlng: new window.kakao.maps.LatLng(pet.sightedLocation.lat, pet.sightedLocation.lon)
                });
          });

          // 마커 이미지
          let imageSrc = 'https://cdn-icons-png.flaticon.com/256/9707/9707706.png';

          for (let i = 0; i < positions?.length; i++) {
            // 마커 이미지 크기
            var imageSize = new window.kakao.maps.Size(75, 70);

            // 마커 이미지를 생성
            var markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize);

            // 마커를 생성
            var marker = new window.kakao.maps.Marker({
              map: listMap, // 마커를 표시할 지도
              position: positions[i].latlng, // 마커를 표시할 위치
              title: positions[i].title, // 마커의 타이틀, 마커에 마우스를 올리면 타이틀이 표시
              image: markerImage, // 마커 이미지
            });

            const contentDiv = document.createElement("div");
            contentDiv.innerHTML = positions[i].content;

            const overlay = new window.kakao.maps.CustomOverlay({
              position: marker.getPosition(),
              content: contentDiv,
              yAnchor: 1.3,
            });

            contentDiv.querySelector('.overlay-close-button').addEventListener("click", function () {
              overlay.setMap(null);
            });

            window.kakao.maps.event.addListener(marker, 'mouseover', function () {
              overlay.setMap(listMap);
            });
            window.kakao.maps.event.addListener(marker, 'click', function () {
              overlay.setMap(listMap);
            });

          }

        }
      } else {
        // 아직 로드되지 않았다면 100ms 뒤 재시도
        setTimeout(onLoadKakaoMap, 100);
      }
    };
    onLoadKakaoMap();
  }, [pets, type]);

  if (isPetListLoading) return <LoadingSpinner />

  return (
    <div className="w-full flex-col items-center justify-center h-[80%]">
      <div
        ref={mapRef}
        style={{
          width: '100%',
          height: '60vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      ></div>
    </div>
  );
};

export default MapListView;
