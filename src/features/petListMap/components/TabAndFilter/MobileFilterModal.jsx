import { useSpeciesListQuery } from '@/hooks/useSpeciesList';
import { X } from 'lucide-react';
import React from 'react';

const MobileFilterModal = ({ type, filters, handleFilterChange, handleSearch, closeFilterModal }) => {
  const {data: speciesList = []} = useSpeciesListQuery();
  const speciesFilter = speciesList.filter(item => item.refKind === "null");

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSearch();
    closeFilterModal();
  }
  
  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 z-3 flex items-center justify-center md:!hidden">
      <div className="w-full max-h-[80%] mx-4 bg-white rounded-lg shadow-xl">
        <div className="flex justify-between p-4 bg-(--primary) rounded-t-lg text-white">
          <h3 className="font-medium">{type === "missing" ? "실종 필터" : "목격 필터"}</h3>
          <button className="cursor-pointer"
            onClick={closeFilterModal}><X /></button>
        </div>
        <div className="p-2">
          <form className="flex flex-col justify-between gap-y-5" 
            onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1">
              <label className="text-sm">동물 유형</label>
              <select
                name="refSpecies"
                className="p-2 border border-gray-300 rounded-lg"
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
                    className="p-2 border border-gray-300 rounded-lg"
                    type="date" 
                    value={filters.dateFrom} 
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs">to</label>
                  <input 
                    name="dateTo"
                    className="p-2 border border-gray-300 rounded-lg"
                    type="date"
                    value={filters.dateTo} 
                    onChange={handleFilterChange}
                  />
                </div>
              </div>  
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-sm">지역으로 검색</label>
              <input 
                name="address"
                className="p-2 border border-gray-300 rounded-lg" 
                type="text"
                value={filters.address}
                onChange={handleFilterChange}
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full bg-(--primary) p-3 rounded-lg text-white cursor-pointer">적용</button>
            </div>
          </form>
        </div>
      </div>
      
    </div>
  )
}

export default MobileFilterModal
