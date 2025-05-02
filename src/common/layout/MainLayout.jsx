import { Outlet } from 'react-router-dom';
import FixedBtn from '../components/FixedBtn';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen w-full min-w-[320px] flex-col overflow-hidden md:overflow-auto h-screen md:h-auto">
      <Header />
      <FixedBtn />
      <main className="flex-1 w-full pt-16 overflow-y-auto scrollbar">        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
