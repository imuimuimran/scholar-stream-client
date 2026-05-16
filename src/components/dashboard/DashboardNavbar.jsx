// import { NavLink } from "react-router-dom";
// import { useAuth } from "../../providers/AuthProvider";

// const DashboardNavbar = () => {
//   const { user, dbUser, logout } = useAuth();

//   const navLinkClass = ({ isActive }) =>
//     isActive ? "text-primary font-semibold" : "hover:text-primary";

//   return (
//     <div className="navbar bg-base-100 shadow px-4">

//       <div className="flex-1">
//         <h1 className="text-xl font-bold text-primary">
//           ScholarStream {dbUser?.role} Dashboard 
//         </h1>
//       </div>

//       <div className="navbar-center hidden lg:flex">
//         <ul className="menu menu-horizontal px-1 gap-4">
//           <li>
//             <NavLink to="/" className={navLinkClass}>
//               Home
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/scholarships" className={navLinkClass}>
//               All Scholarships
//             </NavLink>
//           </li>
//         </ul>
//       </div>

//       <div className="flex-none gap-4">
//         {/* <div className="text-right hidden md:block">
//           <p className="font-semibold">{user?.displayName}</p>
//           <p className="text-xs opacity-60">{user?.email}</p>
//         </div> */}

//         <div className="dropdown dropdown-end">
//           <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
//             <img
//               src={user?.photoURL || "https://i.ibb.co/4pDNDk1/avatar.png"}
//               className="rounded-full"
//             />
//           </label>

//           <ul className="menu dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
//             <li><a href="/dashboard/profile">Profile</a></li>
//             <li><button onClick={logout}>Logout</button></li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardNavbar;






import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

const DashboardNavbar = () => {

  const { user, dbUser, logout } = useAuth();

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

      <li>
        <NavLink
          to="/dashboard"
          className={navLinkClass}
        >
          Dashboard
        </NavLink>
      </li>
    </>
  );

  return (
    <div className="navbar bg-base-100 shadow-md px-4 lg:px-8 sticky top-0 z-50">

      {/* LEFT */}
      <div className="navbar-start gap-2">

        {/* MOBILE SIDEBAR BUTTON */}
        <label
          htmlFor="dashboard-drawer"
          className="btn btn-ghost btn-circle lg:hidden"
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
        </label>

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

        {/* TITLE */}
        <Link
          to="/dashboard"
          className="text-lg md:text-xl font-bold text-primary"
        >
          ScholarStream
        </Link>

        {/* ROLE BADGE */}
        <span className="badge badge-primary badge-sm hidden sm:flex">
          {dbUser?.role || "User"}
        </span>

      </div>

      {/* CENTER */}
      <div className="navbar-center hidden lg:flex">

        <ul className="menu menu-horizontal px-1 gap-3">
          {navLinks}
        </ul>

      </div>

      {/* RIGHT */}
      <div className="navbar-end gap-3">

        {/* USER INFO */}
        <div className="hidden md:block text-right">
          <p className="font-semibold text-sm">
            {user?.displayName || "User"}
          </p>

          <p className="text-xs opacity-60">
            {user?.email}
          </p>
        </div>

        {/* AVATAR */}
        <div className="dropdown dropdown-end">

          <div
            tabIndex={0}
            role="button"
            className="avatar cursor-pointer"
          >

            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">

              <img
                src={
                  user?.photoURL ||
                  "https://i.ibb.co/4pDNDk1/avatar.png"
                }
                alt="profile"
              />

            </div>

          </div>

          {/* DROPDOWN */}
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-56"
          >

            <li className="px-2 py-1 pointer-events-none">

              <span className="font-semibold">
                {user?.displayName || "User"}
              </span>

              <span className="text-xs opacity-60">
                {user?.email}
              </span>

            </li>

            <div className="divider my-1"></div>

            <li>
              <NavLink to="/dashboard/profile">
                Profile
              </NavLink>
            </li>

            <li>
              <button onClick={logout}>
                Logout
              </button>
            </li>

          </ul>

        </div>

      </div>

    </div>
  );
};

export default DashboardNavbar;
