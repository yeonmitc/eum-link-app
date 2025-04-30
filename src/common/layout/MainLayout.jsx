import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

export default function MainLayout() {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <Header />
      <main className="flex w-full flex-1 flex-col items-center justify-center">
        <Outlet />
      </main>
      <footer className="">&copy; {new Date().getFullYear()} EUM Link. All rights reserved.</footer>
    </div>
  );
}
