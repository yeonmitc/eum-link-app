import { useSpecies } from '@/hooks/useSpecies';
import React, { useState, useEffect, useRef } from 'react';

const MissingModal = ({ showModal, setShowModal }) => {
  const [refKind, setRefKind] = useState('');
  const [subKindList, setSubKindList] = useState(null);
  const [subKind, setSubKind] = useState(null);
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
    <div>
      <div
        className={`fixed inset-0 z-50 grid place-content-center bg-black/30 p-4 ${
          !showModal ? 'hidden' : ''
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
      >
        <div
          className="flex min-h-[80vh] w-150 max-w-xl flex-col gap-y-[10px] rounded-[15px] bg-white shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            id="modalTitle"
            className="rounded-tl-[15px] rounded-tr-[15px] bg-(--secondary) py-[10px] text-center font-bold text-white"
          >
            실종 신고
          </div>

          <div className="flex flex-1 flex-col gap-y-[10px] border px-4">
            <div className="flex w-full gap-x-[10px]">
              <img src="#" alt="" className="aspect-square w-[40%] border" />

              <div className="border">
                <div className="flex flex-col gap-y-[5px]">
                  <label htmlFor="petName">반려동물 이름</label>
                  <input type="text" id="petName" name="petName" className="rounded-[5px] border" />
                </div>

                <div className="flex gap-x-5">
                  {/* 대분류 */}
                  <div>
                    <label htmlFor="petSpecies">종류 : </label>
                    <select
                      name="petSpecies"
                      id="petSpecies"
                      value={refKind}
                      onChange={(e) => setRefKind(e.target.value)}
                      className="border border-1"
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
                    <div>
                      <label htmlFor="subSpecies">품종 : </label>
                      <select
                        name="subSpecies"
                        id="subSpecies"
                        value={subKind}
                        onChange={(e) => setSubKind(e.target.value)}
                        className="border border-1"
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
                  <div className="w-[30%]">
                    <label htmlFor="petAge">나이 : </label>
                    <input
                      type="number"
                      step="0.1"
                      name="petAge"
                      id="petAge"
                      className="w-[60%] border-b"
                    />
                  </div>

                  <div>
                    <label htmlFor="subSpecies">성별 : </label>

                    <input type="radio" value="m" name="petGender" id="petMale" />
                    <label htmlFor="petMale">남</label>

                    <input type="radio" value="f" name="petGender" id="petFemale" />
                    <label htmlFor="petFemale">여</label>
                  </div>
                </div>
              </div>
            </div>

            {/* <p className="text-pretty text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque euismod, nisi eu
              consectetur. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p> */}

            <button
              type="button"
              className="rounded bg-(--secondary) px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              onClick={closeModal}
            >
              등록하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissingModal;
