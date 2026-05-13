import { NavLink } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

const DashboardNavbar = () => {
  const { user, dbUser, logout } = useAuth();

  const navLinkClass = ({ isActive }) =>
    isActive ? "text-primary font-semibold" : "hover:text-primary";

  return (
    <div className="navbar bg-base-100 shadow px-4">
      
      <div className="flex-1">
        <h1 className="text-xl font-bold text-primary">
          ScholarStream {dbUser?.role} Dashboard 
        </h1>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-4">
          <li>
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/scholarships" className={navLinkClass}>
              All Scholarships
            </NavLink>
          </li>
        </ul>
      </div>

      <div className="flex-none gap-4">
        {/* <div className="text-right hidden md:block">
          <p className="font-semibold">{user?.displayName}</p>
          <p className="text-xs opacity-60">{user?.email}</p>
        </div> */}

        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <img
              src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
              className="rounded-full"
            />
          </label>

          <ul className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li><a href="/dashboard/profile">Profile</a></li>
            <li><button onClick={logout}>Logout</button></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardNavbar;
