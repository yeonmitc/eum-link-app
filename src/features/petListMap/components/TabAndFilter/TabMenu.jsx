
import { Funnel } from 'lucide-react';
import { Link } from 'react-router-dom';

const TabMenu = () => {
  return (
      <div className="flex justify-between items-center w-full m-2 p-4">
        <div className="w-10 md:hidden"></div>
        <div className="flex md:flex-col items-center gap-x-4 rounded-full bg-white p-6 outline-black/5 shadow-lg md:min-w-60 md:max-w-70 md:gap-y-4">
          <Link to="/missing" className="cursor-pointer hover:text-[#5D9471]">실종</Link>
          <div className="h-6 w-px bg-gray-300 md:hidden"></div>
          <Link to="/reports" className="cursor-pointer hover:text-[#5D9471]">목격</Link>
        </div>
        <div className="flex justify-center items-center w-10 h-10 bg-white rounded-xl p-2 shadow-lg outline-black/5 md:!hidden">
          <Funnel size={20} />
        </div>
      </div>
  )
}

export default TabMenu
