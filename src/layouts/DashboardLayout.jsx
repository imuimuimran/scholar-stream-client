// import { Outlet } from "react-router-dom";
// import Sidebar from "../components/dashboard/Sidebar";
// import DashboardNavbar from "../components/dashboard/DashboardNavbar";

// const DashboardLayout = () => {
//   return (
//     <div className="flex min-h-screen bg-base-200">
      
//       {/* Sidebar */}
//       <Sidebar />

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col">
//         <DashboardNavbar />

//         <div className="p-4 md:p-6">
//           <Outlet />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardLayout;



import { Outlet } from "react-router-dom";

import Sidebar from "../components/dashboard/Sidebar";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";

const DashboardLayout = () => {

  return (
    <div className="drawer lg:drawer-open bg-base-200 min-h-screen">

      {/* TOGGLE INPUT */}
      <input
        id="dashboard-drawer"
        type="checkbox"
        className="drawer-toggle"
      />

      {/* PAGE CONTENT */}
      <div className="drawer-content flex flex-col">

        {/* NAVBAR */}
        <DashboardNavbar />

        {/* MAIN */}
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>

      </div>

      {/* SIDEBAR */}
      <div className="drawer-side z-40">

        {/* OVERLAY */}
        <label
          htmlFor="dashboard-drawer"
          className="drawer-overlay"
        ></label>

        <Sidebar />

      </div>

    </div>
  );
};

export default DashboardLayout;

