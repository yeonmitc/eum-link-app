import { useSpeciesListQuery } from '@/hooks/useSpeciesList';
import React from 'react';

const MobileFilter = ({ type, filters, handleFilterChange, handleSearch, handleReset, toggleMobileFilter }) => {
  const { data: speciesList = [] } = useSpeciesListQuery();
  const speciesFilter = speciesList.filter(item => item.refKind === "null");

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch();
    toggleMobileFilter();
  }

  return (
    <div>
      <div className="p-2">
        <form className="flex flex-col justify-between gap-y-5"
          onSubmit={handleSubmit}>
          <div className="flex flex-col gap-1">
            <label className="text-sm">동물 유형</label>
            <select
              name="refSpecies"
              className="p-3 border border-gray-300 rounded-lg w-full"
              value={filters.refSpecies}
              onChange={handleFilterChange}
            >
              <option value="">전체</option>
              {speciesFilter && speciesFilter
                .map(ref => (
                  <React.Fragment key={ref.id}>
                    <option value={ref.id}>{ref.name}</option>
                  </React.Fragment>
                ))
              }
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm">{type === "missing" ? "실종" : "목격"} 날짜</label>
            <div>
              <div className="flex flex-col gap-1">
                <label className="text-xs">from</label>
                <input
                  name="dateFrom"
                  className="p-2 border border-gray-300 rounded-lg w-full"
                  type="date"
                  value={filters.dateFrom}
                  onChange={handleFilterChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs">to</label>
                <input
                  name="dateTo"
                  className="p-2 border border-gray-300 rounded-lg w-full"
                  type="date"
                  value={filters.dateTo}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm">지역으로 검색 (지번 주소)</label>
            <input
              name="address"
              className="p-2 border border-gray-300 rounded-lg w-full"
              type="text"
              placeholder="예: 서울"
              value={filters.address}
              onChange={handleFilterChange}
            />
          </div>
          <div className="flex flex-col justify-center items-center gap-y-2">
            <button
              onClick={handleReset}
              type="button"
              className="w-full bg-gray-400 p-3 rounded-lg text-white cursor-pointer active:scale-97 active:bg-gray-500">초기화</button>
            <button
              type="submit"
              className="w-full bg-(--primary) p-3 rounded-lg text-white cursor-pointer active:scale-97 active:bg-(--secondary)">적용</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default MobileFilter
