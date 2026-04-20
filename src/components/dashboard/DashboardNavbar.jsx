import { useAuth } from "../../providers/AuthProvider";

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




// import { useAuth } from "../../provider/AuthProvider";

// const DashboardNavbar = () => {
//   const { user, logout } = useAuth();

//   return (
//     <div className="navbar bg-base-100 shadow px-4">
      
//       <div className="flex-1">
//         <h1 className="text-xl font-bold text-primary">
//           ScholarStream Dashboard
//         </h1>
//       </div>

//       <div className="flex-none gap-4">
//         <div className="text-right hidden md:block">
//           <p className="font-semibold">{user?.displayName}</p>
//           <p className="text-xs opacity-60">{user?.email}</p>
//         </div>

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
