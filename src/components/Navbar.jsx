import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const Navbar = () => {
  const { user, logout } = useAuth();

  const navLinkClass = ({ isActive }) =>
    isActive ? "text-primary font-semibold" : "hover:text-primary";

  return (
    <div className="navbar bg-base-200 shadow-md px-4">
      {/* Left */}
      <div className="flex-1">
        <Link to="/" className="text-2xl font-bold text-primary">
          ScholarStream
        </Link>
      </div>

      {/* Center */}
      <div className="hidden md:flex gap-6">
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>

        <NavLink to="/scholarships" className={navLinkClass}>
          All Scholarships
        </NavLink>
      </div>

      {/* Right */}
      <div className="flex items-center gap-3">
        {!user ? (
          <>
            <Link to="/login" className="btn btn-ghost btn-sm">
              Login
            </Link>
            <Link to="/register" className="btn btn-primary btn-sm">
              Register
            </Link>
          </>
        ) : (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} className="avatar cursor-pointer">
              <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={
                    user.photoURL ||
                    "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  alt="profile"
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 shadow rounded-box mt-3 w-44"
            >
              <li>
                <Link to="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button onClick={logout}>Logout</button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
