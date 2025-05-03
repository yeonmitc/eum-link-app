import { useSpecies } from '@/hooks/useSpecies';
import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { useAddMissing } from '@/hooks/useAddMissing';
import { Plus } from 'lucide-react';
import { useUploadImg } from '@/hooks/useUploadImg';
import SimplyModal from './SimplyModal';
import MapView from './MapView';

const MissingModal = ({ showModal, setShowModal }) => {
  const [refKind, setRefKind] = useState('');
  const [subKindList, setSubKindList] = useState(null);
  const [subKind, setSubKind] = useState(null);
  const [petGender, setPetGender] = useState('m');
  const [isNeuter, setIsNeuter] = useState(false);
  const { data: petSpeciesData } = useSpecies({ ref: refKind });
  const petSpecies = useRef(petSpeciesData);
  const [numberAddress, setNumberAddress] = useState('제주 제주시 영평동 2181');
  const [loadAddress, setLoadAddress] = useState('제주 제주시 첨단로 242');
  const [lat, setLat] = useState(33.450701);
  const [lon, setLon] = useState(126.570667);

  const [imgFile, setImgFile] = useState('');
  const imgRef = useRef();

  // 서브 모달
  const [subModal, setSubModal] = useState(false);

  // 이미지 업로드 hook
  const {
    mutateAsync: uploadImgFn,
    isSuccess: uploadSuccess,
    isPending: uploadLoading,
    isError: isUploadError,
    error: uploadError,
  } = useUploadImg();
  // 실종 추가 hook
  const {
    mutateAsync: addMissingPet,
    isSuccess: addSuccess,
    isPending: addLoading,
    isError: isAddError,
    error: addError,
  } = useAddMissing();

  // 상위 분류 추가
  if (petSpecies) {
    if (refKind == '' && petSpecies.current == null) {
      petSpecies.current = petSpeciesData;
    }
  }

  // 상세 품종 세팅
  useEffect(() => {
    if (refKind && petSpeciesData) {
      const filteredData = petSpeciesData.filter((item) => item.refKind != null);
      // console.log('filteredData : ', filteredData);
      setSubKindList(filteredData);
      // console.log('filteredData[0].id : ', filteredData[0]?.id);
      setSubKind(filteredData.length > 0 ? filteredData[0].id : null);
    } else if (refKind === '') {
      setSubKindList(null);
    }
  }, [refKind, petSpeciesData]);

  // 모달 닫기 (추후 이벤트 추가 예정)
  function closeModal() {
    setShowModal(false);
  }

  // post 데이터
  async function sendData(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    // form 에 포함된 데이터 확인
    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}:`, value);
    // }

    const uploadImg = formData.get('missingImg');

    if (!uploadImg) {
      console.log('이미지 추가 필수');
      return;
    }

    try {
      const img_result = await uploadImgFn(uploadImg);
      console.log('이미지 업로드 결과 : ', img_result);

      // 보낼 데이터 형태 준비
      const sendData = {
        userId: 3,
        petName: formData.get('petName'),
        refSpecies: Number(formData.get('petSpecies')),
        subSpecies:
          formData.get('subSpecies') != null
            ? Number(formData.get('subSpecies'))
            : formData.get('subSpecies'),
        age: parseFloat(formData.get('petAge')),
        isNeuter,
        petGender,
        description: formData.get('description'),
        imageUrl: img_result.secure_url,
        imageId: img_result.public_id,
        lostDate: formData.get('lostDate'),
        lostTime: formData.get('lostTime'),
        lostLocation: {
          road_address: loadAddress,
          number_address: numberAddress,
          lat: lat,
          lon: lon,
        },
        createdAt: new Date().toISOString(),
        isMissing: true,
      };

      try {
        // 모달 닫기
        // setShowModal(false);

        await addMissingPet({ data: sendData });

        // 폼 초기화
        // e.target.reset();
        // setRefKind('');
        // setSubKind(null);
        // setPetGender('m');
        // setIsNeuter(false);

        setSubModal(true);
      } catch (err) {
        console.error('등록 중 에러 발생:', err);
      }
    } catch (err) {
      console.error('이미지 업로드 중 에러 발생:', uploadError);
    }
  }

  //업로드 이미지 미리보기
  function saveImgFile() {
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  }

  return (
    <>
      <div
        className={`fixed inset-0 z-50 grid place-content-center bg-black/30 p-4 ${
          !showModal ? 'pointer-events-none opacity-0' : 'pointer-events-auto opacity-100'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modalTitle"
      >
        <div
          className={`flex min-h-[80vh] w-150 max-w-xl flex-col gap-y-[10px] rounded-[15px] bg-white shadow-lg transition-all duration-400 ease-out max-md:max-w-xs ${
            !showModal
              ? 'pointer-events-none -translate-y-10 opacity-0'
              : 'pointer-events-auto translate-y-0 opacity-100'
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            id="modalTitle"
            className="relative rounded-t-[15px] bg-(--secondary) py-[10px] text-center font-bold text-white"
          >
            실종 신고
            <X className="absolute top-[20%] right-[10px]" onClick={closeModal} />
          </div>

          <form
            onSubmit={sendData}
            className="flex w-full flex-1 flex-col gap-y-[10px] px-2 pb-2 text-xs md:px-4 md:pb-4 md:text-base"
          >
            <div className="flex w-full gap-x-2 md:gap-x-4">
              <div className="aspect-square w-[40%]">
                {/* 이미지 png, jpg, jpeg만 허용 */}
                <label
                  htmlFor="missingImg"
                  className={`flex h-full w-full cursor-pointer items-center justify-center bg-gray-300`}
                >
                  {imgFile ? (
                    <img src={imgFile} alt="" className="max-h-full max-w-full" />
                  ) : (
                    <Plus className="h-[30%] w-[30%]" />
                  )}
                </label>
                <input
                  id="missingImg"
                  name="missingImg"
                  type="file"
                  onChange={saveImgFile}
                  ref={imgRef}
                  className="hidden"
                  accept=".png, .jpeg, .jpg"
                />
              </div>

              <div className="flex flex-1 flex-col justify-between gap-y-1 md:gap-y-6">
                <div className="flex w-full flex-col md:gap-y-[5px]">
                  <label htmlFor="petName">반려동물 이름</label>
                  <input
                    type="text"
                    id="petName"
                    name="petName"
                    className="box-border w-full rounded-[5px] border px-2 py-1"
                    placeholder="이름"
                  />
                </div>

                <div className="flex w-full justify-between">
                  {/* 대분류 */}
                  <div className="flex w-[48.5%] flex-col md:gap-y-[5px]">
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
                  {subKindList && refKind != '3' && (
                    <div className="flex w-[48.5%] flex-col md:gap-y-[5px]">
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

                <div className="flex w-full gap-x-2 md:gap-x-5">
                  <div className="flex w-1/3 flex-col md:gap-y-[5px]">
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

                  <div className="flex w-1/3 flex-col md:gap-y-[5px]">
                    <label htmlFor="subSpecies">성별</label>

                    <div className="flex h-full gap-y-[5px]">
                      <div className="gap-x-0.3 flex h-full flex-1 items-center md:gap-x-[5px]">
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

                      <div className="gap-x-0.3 flex h-full items-center md:gap-x-[5px]">
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

                  <div className="flex w-1/3 flex-col md:gap-y-[5px]">
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
                        className="aspect-square w-4 md:w-6"
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
                <input
                  type="date"
                  name="lostDate"
                  className="w-full rounded-[5px] border p-1 px-2"
                />
              </div>

              <div className="flex w-1/2 flex-col gap-y-[5px]">
                <div>실종 시간</div>
                <input
                  type="time"
                  name="lostTime"
                  className="w-full items-center rounded-[5px] border px-2 py-1 align-middle"
                />
              </div>
            </div>

            {/* 지도 */}
            <div className="flex h-[30%] flex-col">
              <div className="flex items-end gap-x-[5px]">
                <div>실종 위치</div>
                <div className="text-[0.75rem] text-[#797979]">{numberAddress}</div>
              </div>

              <div className="h-[30%] min-h-[120px] w-full flex-1 md:!min-h-[170px]">
                <MapView
                  setNumberAddress={setNumberAddress}
                  setLoadAddress={setLoadAddress}
                  lat={lat}
                  setLat={setLat}
                  lon={lon}
                  setLon={setLon}
                />
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
              type="submit"
              className="cursor-pointer rounded bg-(--secondary) px-4 py-2 font-bold text-white transition-colors hover:bg-blue-700"
            >
              등록하기
            </button>
          </form>
        </div>
      </div>

      <SimplyModal
        showModal={subModal}
        setShowModal={setSubModal}
        title={'제목'}
        btn={'확인'}
        content={'내용'}
      />
    </>
  );
};

export default MissingModal;
