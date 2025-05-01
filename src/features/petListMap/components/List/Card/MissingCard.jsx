
const MissingCard = ({ pet }) => {
  /* 
    카드에 들어갈 정보
    1. 사진 imageUrl
    2. 이름 petName
    3. 품종 (species)
    4. 실종일 lostDate
    5. 클릭 시, 상세페이지 연결
  */
  return (
    <div className="rounded-lg shadow-xl h-[350px] md:h-[330px]">
      <div 
        className="rounded-lg h-[60%]"
        style={{
          backgroundImage: `url(${pet?.imageUrl})`,
          backgroundPosition: "center 40%",
          backgroundSize: "cover"
        }}
        ></div>
      <div className="my-2 ml-2 flex">
        <div>
          {
          pet?.refSpecies === 1 ? <div>강아지 얼굴</div>
          : pet?.refSpecies === 2 ? <div>고양이 얼굴</div>
          : <div>아무거나 얼굴</div>
          }
        </div>
        <div className="text-lg font-semibold text-black">종 이름</div>
      </div>
      <div className="mx-2 mb-4">
        <div className="mt-2 flex justify-start items-center gap-2">
          <div className="text-sm text-gray-700">성별</div>
          <div className="text-sm text-gray-800">{pet?.petGender === "f" ? "암컷" : "수컷" }</div>
        </div>
        <div className="mt-2 flex justify-start items-center gap-2">
          <div className="text-sm text-gray-700">실종날짜</div>
          <div className="text-sm text-gray-800">{pet?.lostDate}</div>
        </div>
        <div className="mt-2 flex justify-start items-center gap-2">
          <div className="shrink-0 text-sm text-gray-700">실종장소</div>
          <div className="truncate text-sm text-gray-800">{pet?.lostLocation.road_address || pet?.lostLocation.number_address}</div>
        </div>
      </div>
    </div>
  )
}

export default MissingCard
