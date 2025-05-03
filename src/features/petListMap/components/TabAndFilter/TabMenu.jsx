
import { Funnel } from 'lucide-react';
import { Link } from 'react-router-dom';

const TabMenu = ({ openFilterModal }) => {
  return (
      <div className="flex justify-between items-center w-full max-w-full my-2 p-4">
        <div className="w-auto md:hidden"></div>
        <div className="flex md:flex-col justify-center items-center gap-x-4 rounded-full bg-white p-4 border border-gray-200 shadow-lg min-w-50 lg:min-w-70 md:gap-y-4">
          <Link to="/missing" className="cursor-pointer hover:text-[#5D9471]">실종</Link>
          <div className="h-6 w-px bg-gray-300 md:hidden"></div>
          <Link to="/reports" className="cursor-pointer hover:text-[#5D9471]">목격</Link>
        </div>
        <button 
          onClick={openFilterModal}
          className="flex justify-center items-center w-10 h-10 bg-white rounded-xl p-2 shadow-lg border border-gray-200 md:!hidden">
          <Funnel size={20} />
        </button>
      </div>
  )
}

export default TabMenu
