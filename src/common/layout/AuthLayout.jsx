import { Outlet } from 'react-router-dom';

export default function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-md">
        {/* LoginForm / RegisterForm이 삽입 될 예정 */}
        <Outlet />
      </div>
    </div>
  );
}
