import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";

const Navbar = () => {
  const { user, logout } = useAuth();

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-primary font-semibold"
      : "hover:text-primary transition";

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/scholarships"
          className={navLinkClass}
        >
          All Scholarships
        </NavLink>
      </li>

      {user && (
        <li>
          <NavLink
            to="/dashboard"
            className={navLinkClass}
          >
            Dashboard
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4 lg:px-8 sticky top-0 z-50">

      {/* LEFT */}
      <div className="navbar-start">

        {/* MOBILE MENU */}
        <div className="dropdown lg:hidden">

          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-base-100 rounded-box w-56 space-y-1"
          >
            {navLinks}
          </ul>
        </div>

        {/* LOGO */}
        <Link
          to="/"
          className="text-2xl font-bold text-primary"
        >
          ScholarStream
        </Link>

      </div>

      {/* CENTER MENU */}
      <div className="navbar-center hidden lg:flex">

        <ul className="menu menu-horizontal px-1 gap-3">
          {navLinks}
        </ul>

      </div>

      {/* RIGHT */}
      <div className="navbar-end gap-2">

        {!user ? (
          <>
            <Link
              to="/login"
              className="btn btn-ghost btn-sm"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="btn btn-primary btn-sm text-white"
            >
              Register
            </Link>
          </>
        ) : (
          <div className="dropdown dropdown-end">

            {/* AVATAR */}
            <div
              tabIndex={0}
              role="button"
              className="avatar cursor-pointer"
            >
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

            {/* DROPDOWN */}
            <ul
              tabIndex={0}
              className="
              menu menu-sm dropdown-content
              mt-3 z-[1]
              p-3
              shadow
              bg-base-100
              rounded-box
              w-64
              space-y-1
              "
            >
              {/* USER INFO */}
              <li className="pointer-events-none">
                <div className="flex flex-col items-start px-2 py-1 max-w-full">

                  <span className="font-semibold text-sm break-words">
                    {user?.displayName || "User"}
                  </span>

                  <span className="text-xs text-gray-500 break-all">
                    {user?.email}
                  </span>

                </div>
              </li>

              <div className="divider my-1"></div>

              {/* DASHBOARD */}
              <li>
                <Link
                  to="/dashboard"
                  className="rounded-lg"
                >
                  Dashboard
                </Link>
              </li>

              {/* LOGOUT */}
              <li>
                <button
                  onClick={logout}
                  className="rounded-lg text-error"
                >
                  Logout
                </button>
              </li>
            </ul>

          </div>
        )}

      </div>

    </div>
  );
};

export default Navbar;