import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { Plus } from 'lucide-react';
import { useSpecies } from '@/hooks/useSpecies';

const ReportModal = ({ showModal, setShowModal }) => {
  const [refKind, setRefKind] = useState('');
  const { data: petSpeciesData } = useSpecies({ ref: refKind });
  const petSpecies = useRef(petSpeciesData);

  // 모달 닫기 (추후 이벤트 추가 예정)
  function closeModal() {
    setShowModal(false);
  }

  // 상위 분류 추가
  if (petSpecies) {
    if (refKind == '') {
      petSpecies.current = petSpeciesData;
    }
  }

  function sendReport() {}

  return (
    <div>
      <div
        className={`fixed inset-0 z-50 grid place-content-center bg-black/30 p-4 ${
          !showModal ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
        onClick={closeModal}
      >
        <div
          className={`flex min-h-[80vh] w-150 max-w-xl flex-col gap-y-[10px] rounded-[15px] bg-white shadow-lg transition-all duration-400 ease-out max-md:max-w-xs ${
            !showModal
              ? 'pointer-events-none -translate-y-10 opacity-0'
              : 'pointer-events-auto translate-y-0 opacity-100'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between">
            <div
              id="modalTitle"
              className="relative w-full rounded-t-[15px] bg-(--secondary) py-[10px] text-center font-bold text-white"
            >
              목격 제보
              <X className="absolute top-[20%] right-[10px] cursor-pointer" onClick={closeModal} />
            </div>
          </div>

          <form
            onSubmit={sendReport}
            className="flex w-full flex-1 flex-col gap-y-[10px] px-2 pb-2 text-xs md:px-4 md:pb-4 md:text-base"
          >
            <div className="flex w-full gap-x-2 md:gap-x-4">
              <div className="aspect-square w-[40%]">
                {/* 이미지 png, jpg, jpeg만 허용 */}
                <label
                  htmlFor="missingImg"
                  className={`flex h-full w-full cursor-pointer items-center justify-center bg-gray-300`}
                >
                  {/* {imgFile ? (
                    <img src={imgFile} alt="" className="max-h-full max-w-full" />
                  ) : (
                    <Plus className="h-[30%] w-[30%]" />
                  )} */}
                  <Plus className="h-[30%] w-[30%]" />
                </label>
                {/* <input
                  id="missingImg"
                  name="missingImg"
                  type="file"
                  onChange={saveImgFile}
                  ref={imgRef}
                  className="hidden"
                  accept=".png, .jpeg, .jpg"
                /> */}
              </div>
            </div>

            {/* 실종 날짜 & 시간 */}
            <div className="flex items-center justify-between gap-x-[3px]">
              <div className="flex h-full w-1/3 flex-col gap-y-[5px]">
                <div>실종 날짜</div>
                <input
                  type="date"
                  name="lostDate"
                  className="w-full flex-1 rounded-[5px] border p-1 px-1"
                />
              </div>

              <div className="flex w-1/3 flex-col gap-y-[5px]">
                <div>실종 시간</div>
                <input
                  type="time"
                  name="lostTime"
                  className="w-full items-center rounded-[5px] border px-1 py-1 align-middle"
                />
              </div>

              <div className="flex h-full w-1/3 flex-col gap-y-[5px]">
                <label htmlFor="petSpecies">종류</label>
                <select
                  name="petSpecies"
                  id="petSpecies"
                  value={refKind}
                  onChange={(e) => setRefKind(e.target.value)}
                  className={`flex-1 rounded-[5px] border border-1 border-black p-1 ${refKind === '' ? 'text-gray-400' : 'text-black'}`}
                >
                  <option value="">선택</option>
                  {petSpecies.current?.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 지도 */}
            <div className="flex h-[30%] flex-col">
              <div className="flex items-end gap-x-[5px]">
                <div>실종 위치</div>
                <div className="text-[0.75rem] text-[#797979]">위치</div>
              </div>

              <div className="h-[30%] min-h-[120px] w-full flex-1 border md:!min-h-[170px]">
                {/* <MapView
                  setNumberAddress={setNumberAddress}
                  setLoadAddress={setLoadAddress}
                  lat={lat}
                  setLat={setLat}
                  lon={lon}
                  setLon={setLon}
                /> */}
              </div>
            </div>

            {/* 특이사항 */}
            <div className="flex flex-1 flex-col">
              <div>특이사항</div>
              <textarea
                name="description"
                id="description"
                className="w-full flex-1 resize-none border p-1"
              ></textarea>
            </div>

            <button
              type="button"
              className="cursor-pointer rounded bg-(--secondary) px-4 py-2 font-bold text-white transition-colors hover:bg-blue-700"
              onClick={closeModal}
            >
              등록하기
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportModal;
