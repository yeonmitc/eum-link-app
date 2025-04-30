import React, { Suspense, useState, useRef, useEffect } from 'react';
import { useSpecies } from '@/hooks/useSpecies';
import './RegisterMissingPage.css';

const RegisterMissingPage = () => {
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

  return (
    <div className="h-90 border border-red-500 p-3">
      <div>
        <label htmlFor="petName">반려동물 이름 : </label>
        <input type="text" id="petName" name="petName" />
      </div>

      <div>
        {/* 대분류 */}
        <label htmlFor="petSpecies">종류 : </label>
        <select
          name="petSpecies"
          id="petSpecies"
          value={refKind}
          onChange={(e) => setRefKind(e.target.value)}
        >
          <option value="">선택</option>
          {petSpecies.current?.map((item) => (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        {/* 상세 품종 */}
        {subKindList && refKind != 3 && (
          <>
            <label htmlFor="subSpecies">품종 : </label>
            <select
              name="subSpecies"
              id="subSpecies"
              value={subKind}
              onChange={(e) => setSubKind(e.target.value)}
            >
              {subKindList?.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </>
        )}
      </div>

      <div>
        {/* 대분류 */}
        <label htmlFor="petAge">나이 : </label>
        <input type="number" step="0.1" name="petAge" id="petAge" />

        {/* 상세 품종 */}
        <label htmlFor="subSpecies">성별 : </label>

        <input type="radio" value="m" name="petGender" id="petMale" />
        <label htmlFor="petMale">남</label>

        <input type="radio" value="f" name="petGender" id="petFemale" />
        <label htmlFor="petFemale">여</label>
      </div>
    </div>
  );
};

export default RegisterMissingPage;
