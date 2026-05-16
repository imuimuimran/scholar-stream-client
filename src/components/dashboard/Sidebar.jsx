// import { Link, NavLink } from "react-router-dom";
// import { useAuth } from "../../providers/AuthProvider";

// const Sidebar = () => {
//   const { role } = useAuth();

//   return (
//     <div className="w-64 bg-base-100 shadow-lg hidden md:block">
//       <div className="p-4 text-2xl font-bold text-primary">
//         <Link to="/">
//           ScholarStream
//         </Link>
//       </div>

//       <ul className="menu p-4 space-y-2">

//         {/* COMMON */}
//         <li>
//           <NavLink to="/dashboard">🏠 Home</NavLink>
//         </li>

//         <li>
//           <NavLink to="/dashboard/profile">👤 Profile</NavLink>
//         </li>

//         {/* STUDENT */}
//         {role === "Student" && (
//           <>
//             <li>
//               <NavLink to="/dashboard/applications">
//                 📄 My Applications
//               </NavLink>
//             </li>
//             <li>
//               <NavLink to="/dashboard/reviews">
//                 ⭐ My Reviews
//               </NavLink>
//             </li>
//             <li>
//               <NavLink to="/dashboard/payment-history">
//                 Payment History
//               </NavLink>
//             </li>
//           </>
//         )}

//         {/* MODERATOR */}
//         {role === "Moderator" && (
//           <>
//             <li>
//               <NavLink to="/dashboard/manage-applications">
//                 📊 Applications
//               </NavLink>
//             </li>
//             <li>
//               <NavLink to="/dashboard/all-reviews">
//                 ⭐ All Reviews
//               </NavLink>
//             </li>
//           </>
//         )}

//         {/* ADMIN */}
//         {role === "Admin" && (
//           <>
//             <li>
//               <NavLink to="/dashboard/manage-users">
//                 👥 Manage Users
//               </NavLink>
//             </li>

//             <li>
//               <NavLink to="/dashboard/manage-scholarships">
//                 🎓 Scholarships
//               </NavLink>
//             </li>

//             <li>
//               <NavLink to="/dashboard/analytics">
//                 📈 Analytics
//               </NavLink>
//             </li>
//           </>
//         )}
//       </ul>
//     </div>
//   );
// };

// export default Sidebar;





import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

const Sidebar = () => {

  const { role } = useAuth();

  const navClass = ({ isActive }) =>
    isActive
      ? "bg-primary text-white font-medium rounded-lg"
      : "hover:bg-base-300 rounded-lg";

  return (
    <aside className="w-72 min-h-full bg-base-100 shadow-xl">

      {/* LOGO */}
      <div className="p-6 border-b">

        <Link
          to="/"
          className="text-2xl font-bold text-primary"
        >
          ScholarStream
        </Link>

        <p className="text-sm opacity-60 mt-1">
          Dashboard Panel
        </p>

      </div>

      {/* MENU */}
      <ul className="menu p-4 space-y-2">

        {/* COMMON */}
        <li>
          <NavLink
            to="/dashboard"
            className={navClass}
          >
            🏠 Dashboard Home
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/dashboard/profile"
            className={navClass}
          >
            👤 Profile
          </NavLink>
        </li>

        {/* STUDENT */}
        {role === "Student" && (
          <>
            <li>
              <NavLink
                to="/dashboard/applications"
                className={navClass}
              >
                📄 My Applications
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/reviews"
                className={navClass}
              >
                ⭐ My Reviews
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/payment-history"
                className={navClass}
              >
                💳 Payment History
              </NavLink>
            </li>
          </>
        )}

        {/* MODERATOR */}
        {role === "Moderator" && (
          <>
            <li>
              <NavLink
                to="/dashboard/manage-applications"
                className={navClass}
              >
                📊 Manage Applications
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/all-reviews"
                className={navClass}
              >
                ⭐ All Reviews
              </NavLink>
            </li>
          </>
        )}

        {/* ADMIN */}
        {role === "Admin" && (
          <>
            <li>
              <NavLink
                to="/dashboard/manage-users"
                className={navClass}
              >
                👥 Manage Users
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/manage-scholarships"
                className={navClass}
              >
                🎓 Scholarships
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/dashboard/analytics"
                className={navClass}
              >
                📈 Analytics
              </NavLink>
            </li>
          </>
        )}

      </ul>

    </aside>
  );
};

export default Sidebar;