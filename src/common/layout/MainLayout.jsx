import { Outlet } from 'react-router-dom';
import FixedBtn from '../components/FixedBtn';
import Footer from '../components/Footer';
import Header from '../components/Header';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen w-full min-w-[320px] flex-col">
      <Header />
      <FixedBtn />
      <main className="scrollbar w-full flex-1 overflow-y-auto pt-16">
        {' '}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
