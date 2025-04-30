import { useSpecies } from '@/hooks/useSpecies';
import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';

const MissingModal = ({ showModal, setShowModal }) => {
  const [refKind, setRefKind] = useState('');
  const [subKindList, setSubKindList] = useState(null);
  const [subKind, setSubKind] = useState(null);
  const [petGender, setPetGender] = useState('m');
  const [isNeuter, setIsNeuter] = useState(false);
  const { data: petSpeciesData, isLoading, isError, error } = useSpecies({ ref: refKind });
  const petSpecies = useRef(petSpeciesData);

  if (petSpecies) {
    if (refKind == '' && petSpecies.current == null) {
      petSpecies.current = petSpeciesData;
    }
  }

  useEffect(() => {
    console.log('petSpeciesData : ', petSpeciesData);

    if (refKind && petSpeciesData) {
      const filteredData = petSpeciesData.filter((item) => item.refKind != null);
      console.log('filteredData : ', filteredData);
      setSubKindList(filteredData);
      console.log('filteredData[0].id : ', filteredData[0].id);
      setSubKind(filteredData.length > 0 ? filteredData[0].id : null);
    } else if (refKind === '') {
      setSubKindList(null);
    }
  }, [refKind, petSpeciesData]);

  useEffect(() => {
    console.log('~~~~~~~~~~~~~~~~~~~~setSubKind : ', subKind);
  }, [setSubKind]);

  function closeModal() {
    console.log('닫기 실행');
    setShowModal(false);
  }

  return (
    <div
      className={`fixed inset-0 z-50 grid place-content-center bg-black/30 p-4 ${
        !showModal ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100'
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
    >
      <div
        className={`flex min-h-[80vh] w-150 max-w-xl flex-col gap-y-[10px] rounded-[15px] bg-white shadow-lg transition-all duration-400 ease-out ${
          !showModal
            ? 'pointer-events-none -translate-y-10 opacity-0'
            : 'pointer-events-auto translate-y-0 opacity-100'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          id="modalTitle"
          className="relative rounded-tl-[15px] rounded-tr-[15px] bg-(--secondary) py-[10px] text-center font-bold text-white"
        >
          실종 신고
          <X className="absolute top-[20%] right-[10px]" onClick={closeModal} />
        </div>

        <form className="flex flex-1 flex-col gap-y-[10px] px-4 pb-4">
          <div className="flex w-full gap-x-[25px]">
            <div className="aspect-square w-[45%] bg-gray-300">
              {/* <input type="file" className="w-full border" /> */}
            </div>

            <div className="10px flex flex-col gap-y-[15px]">
              <div className="flex flex-col gap-y-[5px]">
                <label htmlFor="petName">반려동물 이름</label>
                <input
                  type="text"
                  id="petName"
                  name="petName"
                  className="rounded-[5px] border p-1 px-2"
                  placeholder="이름"
                />
              </div>

              <div className="flex gap-x-5">
                {/* 대분류 */}
                <div className="flex max-w-[calc(50%-10px)] flex-1/2 flex-col gap-y-[5px]">
                  <label htmlFor="petSpecies">종류</label>
                  <select
                    name="petSpecies"
                    id="petSpecies"
                    value={refKind}
                    onChange={(e) => setRefKind(e.target.value)}
                    className={`rounded-[5px] border border-1 border-black p-1 ${refKind === '' ? 'text-gray-400' : 'text-black'}`}
                  >
                    <option value="">선택</option>
                    {petSpecies.current?.map((item) => (
                      <option value={item.id} key={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* 상세 품종 */}
                {subKindList && refKind != 3 && (
                  <div className="flex flex-1/2 flex-col gap-y-[5px]">
                    <label htmlFor="subSpecies">품종</label>
                    <select
                      name="subSpecies"
                      id="subSpecies"
                      value={subKind}
                      onChange={(e) => setSubKind(e.target.value)}
                      className="rounded-[5px] border border-1 p-1"
                    >
                      {subKindList?.map((item) => (
                        <option value={item.id} key={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="flex gap-x-5">
                <div className="flex w-1/3 flex-col gap-y-[5px]">
                  <label htmlFor="petAge">나이</label>
                  <div className="flex items-center rounded-[5px] border px-[5px]">
                    <input
                      type="number"
                      step="0.1"
                      name="petAge"
                      id="petAge"
                      className="w-full p-1 text-right"
                      min={0}
                      defaultValue={0}
                    />
                    <div>살</div>
                  </div>
                </div>

                <div className="flex w-1/3 flex-col gap-y-[5px]">
                  <label htmlFor="subSpecies">성별</label>

                  <div className="flex h-full gap-y-[5px]">
                    <div className="flex h-full flex-1 items-center gap-x-[5px]">
                      <input
                        type="radio"
                        checked={petGender === 'm'}
                        value="m"
                        name="petGender"
                        id="petMale"
                        onChange={(e) => setPetGender(e.target.value)}
                      />
                      <label htmlFor="petMale">남</label>
                    </div>

                    <div className="flex h-full items-center gap-x-[5px]">
                      <input
                        type="radio"
                        checked={petGender === 'f'}
                        value="f"
                        name="petGender"
                        id="petFemale"
                        onChange={(e) => setPetGender(e.target.value)}
                      />
                      <label htmlFor="petFemale">여</label>
                    </div>
                  </div>
                </div>

                <div className="flex w-1/3 flex-col gap-y-[5px]">
                  <label htmlFor="isNeuter" className="text-center">
                    중성화
                  </label>
                  <div className="flex h-full items-center justify-center">
                    <input
                      type="checkbox"
                      checked={isNeuter}
                      onChange={() => setIsNeuter((prev) => !prev)}
                      name="isNeuter"
                      id="isNeuter"
                      className="aspect-square w-[20px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 실종 날짜 & 시간 */}
          <div className="flex gap-x-[10px]">
            <div className="flex w-1/2 flex-col gap-y-[5px]">
              <div>실종 날짜</div>
              <input type="date" className="w-full rounded-[5px] border p-1 px-2" />
            </div>

            <div className="flex w-1/2 flex-col gap-y-[5px]">
              <div>실종 시간</div>
              <input
                type="time"
                className="w-full items-center rounded-[5px] border px-2 py-1 align-middle"
              />
            </div>
          </div>

          {/* 지도 */}
          <div className="flex h-[30%] flex-col">
            <div className="flex items-end gap-x-[5px]">
              <div>실종 위치</div>
              <div className="text-[0.85rem] text-[#797979]">서울 중구 을지로 1가</div>
            </div>

            <div className="h-[30%] w-full flex-1 border"></div>
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
  );
};

export default MissingModal;
