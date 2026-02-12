import { useAuth } from "../../provider/AuthProvider";

const DashboardNavbar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="navbar bg-base-100 shadow-md px-4">

      {/* Mobile menu button */}
      <div className="flex-none lg:hidden">
        <label
          htmlFor="dashboard-drawer"
          className="btn btn-square btn-ghost"
        >
          ☰
        </label>
      </div>

      <div className="flex-1">
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </div>

      <div className="flex items-center gap-3">
        <img
          src={user?.photoURL}
          alt="profile"
          className="w-9 h-9 rounded-full border"
        />

        <button onClick={logout} className="btn btn-sm btn-error text-white">
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardNavbar;
