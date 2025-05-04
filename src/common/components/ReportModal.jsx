import { useAddReport } from '@/hooks/useAddReport';
import { useSpecies } from '@/hooks/useSpecies';
import { useUploadImg } from '@/hooks/useUploadImg';
import useUserStore from '@/store/userStore';
import { Plus, X } from 'lucide-react';
import { useRef, useState } from 'react';
import MapView from './MapView';

const ReportModal = ({ showModal, setShowModal, missingId }) => {
  const [refKind, setRefKind] = useState('');
  const { data: petSpeciesData } = useSpecies({ ref: refKind });
  const petSpecies = useRef(petSpeciesData);
  const { user } = useUserStore();

  const [imgFile, setImgFile] = useState('');
  const imgRef = useRef();

  // 지도
  const [numberAddress, setNumberAddress] = useState('제주 제주시 영평동 2181');
  const [loadAddress, setLoadAddress] = useState('제주 제주시 첨단로 242');
  const [lat, setLat] = useState(33.450701);
  const [lon, setLon] = useState(126.570667);

  // 이미지 업로드 hook
  const {
    mutateAsync: uploadImgFn,
    isSuccess: uploadSuccess,
    isPending: uploadLoading,
    isError: isUploadError,
    error: uploadError,
  } = useUploadImg();

  // 제보 추가
  const {
    mutateAsync: addReportPet,
    isSuccess: addSuccess,
    isPending: addLoading,
    isError: isAddError,
    error: addError,
  } = useAddReport();

  // 모달 닫기 (추후 이벤트 추가 예정)
  function closeModal() {
    setImgFile('');
    if (imgRef.current) {
      imgRef.current.value = '';
    }
    setShowModal(false);
  }

  // 상위 분류 추가
  if (petSpecies) {
    if (refKind == '') {
      petSpecies.current = petSpeciesData;
    }
  }

  async function sendReport(e) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    const btn = document.querySelector('#addReportBtn');
    btn.textContent = '등록 중...';
    btn.disabled = true;

    const uploadImg = formData.get('sightImg');

    if (!uploadImg) {
      console.log('이미지 추가 필수');
      btn.textContent = '등록하기';
      btn.disabled = false;
      return;
    }

    try {
      const img_result = await uploadImgFn(uploadImg);
      console.log('이미지 업로드 결과 : ', img_result);

      // 보낼 데이터 형태 준비
      const sendData = {
        refSpecies: Number(formData.get('petSpecies')),
        missingId: missingId || null, // missingId가 없으면 null로 설정
        description: formData.get('description'),
        imageUrl: img_result.secure_url,
        imageId: img_result.public_id,
        sightedDate: formData.get('sightDate'),
        sightedTime: formData.get('sightTime'),
        sightedLocation: {
          road_address: loadAddress,
          number_address: numberAddress,
          lat: lat,
          lon: lon,
        },
        createdAt: new Date().toISOString(),
        userId: user != null ? user.id : 'null',
      };

      try {
        // 모달 닫기
        // setShowModal(false);

        await addReportPet({ data: sendData });
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
        btn.textContent = '등록하기';
        btn.disabled = false;
      }
    } catch (err) {
      console.error('이미지 업로드 중 에러 발생:', err);
      btn.textContent = '등록하기';
      btn.disabled = false;
    }
  }

  //업로드 이미지 미리보기
  function saveImgFile() {
    console.log('호출');
    const file = imgRef.current.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImgFile(reader.result);
    };
  }

  return (
    <div>
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
            <div className="flex items-start justify-between">
              <div
                id="modalTitle"
                className="relative w-full rounded-t-[15px] bg-(--secondary) py-[10px] text-center font-bold text-white"
              >
                목격 제보
                <X
                  className="absolute top-[20%] right-[10px] cursor-pointer"
                  onClick={closeModal}
                />
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
                    htmlFor="sightImg"
                    className={`flex h-full w-full cursor-pointer items-center justify-center bg-gray-300`}
                  >
                    {imgFile ? (
                      <img src={imgFile} alt="" className="max-h-full max-w-full" />
                    ) : (
                      <Plus className="h-[30%] w-[30%]" />
                    )}
                  </label>
                  <input
                    id="sightImg"
                    name="sightImg"
                    type="file"
                    onChange={saveImgFile}
                    ref={imgRef}
                    className="hidden"
                    accept=".png, .jpeg, .jpg"
                  />
                </div>
              </div>

              {/* 실종 날짜 & 시간 */}
              <div className="flex items-center justify-between gap-x-[3px]">
                <div className="flex h-full w-1/3 flex-col gap-y-[5px]">
                  <div>목격 날짜</div>
                  <input
                    type="date"
                    name="sightDate"
                    className="w-full flex-1 rounded-[5px] border p-1 px-1"
                  />
                </div>

                <div className="flex w-1/3 flex-col gap-y-[5px]">
                  <div>목격 시간</div>
                  <input
                    type="time"
                    name="sightTime"
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
                ></textarea>
              </div>

              <button
                type="submit"
                id="addReportBtn"
                className="cursor-pointer rounded bg-[var(--secondary)] px-4 py-2 font-bold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:!bg-gray-300"
              >
                등록하기
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportModal;
