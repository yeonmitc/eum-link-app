import { useSpeciesListQuery } from '@/hooks/useSpeciesList';
import { Search } from 'lucide-react';
import React from 'react';

const DesktopFilter = ({ type, filters, handleFilterChange, handleSearch, handleReset }) => {
  const { data: speciesList = [] } = useSpeciesListQuery();

  const speciesFilter = speciesList.filter(item => item.refKind === "null");
  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch();
  }

  return (
    <div className="w-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="relative w-full xl:max-w-2/3 flex flex-wrap justify-center items-center gap-x-3 min-h-[100px] bg-white rounded-full shadow-lg my-4 overflow-hidden">

        <button
          type="button"
          onClick={handleReset}
          className="absolute -left-8 h-[95%] w-[95px] rounded-full bg-gray-400 shadow-lg p-4 text-white flex justify-end items-center cursor-pointer hover:scale-95 hover:bg-gray-400 active:scale-95 active:bg-gray-500 transition-all duration-150">
          초기화
        </button>

        {/* 동물 종류 선택 */}
        <div className="flex flex-col border-r border-gray-300 px-4">
          <div className="text-sm text-gray-600 mb-1">동물 유형</div>
          <select id="refSpecies"
            onChange={handleFilterChange}
            value={filters.refSpecies}
            name="refSpecies" className="rounded-full p-2">
            <option value="">전체</option>
            {speciesFilter && speciesFilter
              .map(ref => (
                <React.Fragment key={ref.id}>
                  <option value={ref.id}>{ref.name}</option>
                </React.Fragment>
              ))}
          </select>
        </div>

        {/* 날짜 범위 */}
        <div className="border-r border-gray-300 flex flex-col px-2">
          <div className="flex gap-x-2">
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1">
                <span className="text-sm mr-1">{type === "missing" ? "실종" : "목격"}날짜</span>
                <span className="text-xs text-gray-500">from</span>
              </label>
              <input
                name="dateFrom"
                className="rounded-full p-2 text-sm focus:z-1 focus:bg-white"
                onChange={handleFilterChange}
                value={filters.dateFrom} type="date" />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-600 mb-1">
                <span className="text-sm mr-1"></span>
                <span className="text-xs text-gray-500">to</span>
              </label>
              <input
                name="dateTo"
                className="rounded-full p-2 text-sm focus:z-1 focus:bg-white"
                onChange={handleFilterChange}
                value={filters.dateTo} type="date" />
            </div>
          </div>
        </div>
        <div className="flex flex-col py-2 pr-16">
          <label className="text-sm text-gray-600 mb-1" htmlFor="">지역으로 검색 (지번 주소)</label>
          <input
            name="address"
            placeholder="예: 서울"
            value={filters.address}
            onChange={handleFilterChange}
            className="rounded-full p-2 text-sm focus:z-1 focus:bg-white" type="text" />
        </div>
        <button
          type="submit"
          className="absolute right-0 h-[95%] w-[95px] rounded-full bg-(--secondary) shadow-lg p-4 text-white flex justify-center items-center cursor-pointer hover:scale-97 active:scale-95 active:bg-(--primary) transition-all duration-150">
          <Search size={30} />
        </button>
      </form>
    </div>
  )
}

export default DesktopFilter
