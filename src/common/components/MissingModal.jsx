import { useAddMissing } from '@/hooks/useAddMissing';
import { useSpecies } from '@/hooks/useSpecies';
import { useUpdateMissing } from '@/hooks/useUpdateMissing';
import { useUploadImg } from '@/hooks/useUploadImg';
import useUserStore from '@/store/userStore';
import { Plus, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import MapView from './MapView';
import SimplyModal from './SimplyModal';

const MissingModal = ({ showModal, setShowModal, initialValues }) => {
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

  const [petName, setPetName] = useState('');
  const [petAge, setPetAge] = useState(0);
  const [lostDate, setLostDate] = useState('');
  const [lostTime, setLostTime] = useState('');
  const [description, setDescription] = useState('');

  const [imgFile, setImgFile] = useState('');
  const imgRef = useRef();

  // 로그인한 user 정보
  const { user } = useUserStore();

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

  // 실종  수정 hook
  const {
    mutateAsync: updateMissingPet,
    isSuccess: updateSuccess,
    isPending: updateLoading,
    isError: isUpdateError,
    error: updateError,
  } = useUpdateMissing();

  // 상위 분류 추가
  if (petSpecies) {
    if (refKind == '' && petSpecies.current == null) {
      petSpecies.current = petSpeciesData;
    }
  }

  useEffect(() => {
    if (initialValues) {
      console.log('initialValues : ', initialValues);

      setRefKind(initialValues.refSpecies);
      setSubKind(initialValues.subSpecies);
      setPetGender(initialValues.petGender);
      setIsNeuter(initialValues.isNeuter);
      setNumberAddress(initialValues.lostLocation.numberAddress);
      setLoadAddress(initialValues.lostLocation.loadAddress);
      setLat(initialValues.lostLocation.lat);
      setLon(initialValues.lostLocation.lon);
      setImgFile(initialValues.imageUrl);
      setPetName(initialValues.petName);
      setPetAge(initialValues.age);
      setLostDate(initialValues.lostDate);
      setLostTime(initialValues.lostTime);
      setDescription(initialValues.description);
    } else {
      console.log('초기값 없음');

      setRefKind('');
      setSubKind(null);
      setPetGender('m');
      setIsNeuter(false);
      setNumberAddress('제주 제주시 영평동 2181');
      setLoadAddress('제주 제주시 첨단로 242');
      setLat(33.450701);
      setLon(126.570667);
      setImgFile('');

      setPetName('');
      setPetAge(0);
      setLostDate('');
      setLostTime('');
      setDescription('');
    }
  }, [initialValues]);

  // 상세 품종 세팅
  useEffect(() => {
    if (refKind && petSpeciesData) {
      const filteredData = petSpeciesData.filter((item) => item.refKind != null);
      setSubKindList(filteredData);
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
    const btn = document.querySelector('#addMissingBtn');
    btn.textContent = '등록 중...';
    btn.disabled = true;

    const uploadImg = formData.get('missingImg');

    if (!uploadImg) {
      console.log('이미지 추가 필수');
      btn.textContent = '등록하기';
      btn.disabled = false;
      return;
    }

    let img_result = { public_id: '', secure_url: '' };

    if (initialValues) {
      img_result = {
        public_id: initialValues.imageId,
        secure_url: initialValues.imageUrl,
      };
    }

    try {
      if (uploadImg) {
        const uploadResult = await uploadImgFn(uploadImg);

        // 업로드 실패 시 기존 값 유지
        if (uploadResult?.secure_url && uploadResult?.public_id) {
          img_result = uploadResult;
        } else {
          console.warn('⚠️ 이미지 업로드 결과가 유효하지 않습니다. 기존 이미지 사용.');
        }
      }
      console.log('이미지 업로드 결과 : ', img_result);

      // 보낼 데이터 형태 준비
      const sendData = {
        userId: user.id,
        petName: formData.get('petName'),
        refSpecies: Number(formData.get('petSpecies')),
        subSpecies:
          formData.get('subSpecies') != null ? Number(formData.get('subSpecies')) : 'null',
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

        // 수정
        if (initialValues) {
          await updateMissingPet({ data: sendData, id: initialValues.id });
        } else {
          await addMissingPet({ data: sendData });
        }
        setShowModal(false);
        // 성공 후 폼 초기화 및 버튼 복구
        btn.textContent = '등록하기';
        btn.disabled = false;

        // 폼 초기화
        // e.target.reset();
        // setRefKind('');
        // setSubKind(null);
        // setPetGender('m');
        // setIsNeuter(false);

        // setSubModal(true);
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
      {showModal && (
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
                      value={petName}
                      onChange={(e) => setPetName(e.target.value)}
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
                          value={petAge}
                          onChange={(e) => setPetAge(e.target.value)}
                          min={0}
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
                    value={lostDate}
                    onChange={(e) => setLostDate(e.target.value)}
                    className="w-full rounded-[5px] border p-1 px-2"
                  />
                </div>

                <div className="flex w-1/2 flex-col gap-y-[5px]">
                  <div>실종 시간</div>
                  <input
                    value={lostTime}
                    onChange={(e) => setLostTime(e.target.value)}
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
                  {showModal && (
                    <MapView
                      setNumberAddress={setNumberAddress}
                      setLoadAddress={setLoadAddress}
                      lat={lat}
                      setLat={setLat}
                      lon={lon}
                      setLon={setLon}
                    />
                  )}
                </div>
              </div>

              {/* 특이사항 */}
              <div className="flex flex-1 flex-col">
                <div>특이사항</div>
                <textarea
                  name="description"
                  id="description"
                  className="w-full flex-1 resize-none border p-1"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <button
                type="submit"
                id="addMissingBtn"
                className="cursor-pointer rounded bg-[var(--secondary)] px-4 py-2 font-bold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:!bg-gray-300"
              >
                {initialValues ? '저장하기' : '등록하기'}
              </button>
            </form>
          </div>
        </div>
      )}

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
