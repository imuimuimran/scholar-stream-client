import { NavLink } from "react-router-dom"; 
import { useAuth } from "../../providers/AuthProvider";


const Sidebar = () => {
  const { role } = useAuth(); // Student | Moderator | Admin

  const linkClass =
    "block px-4 py-2 rounded-lg hover:bg-primary hover:text-white transition";

  return (
    <div className="drawer-side z-50">
      <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

      <aside className="w-64 bg-base-100 min-h-full p-4 space-y-2">

        {/* Logo */}
        <h2 className="text-2xl font-bold text-primary mb-6">
          ScholarStream
        </h2>

        {/* Common */}
        <NavLink to="/dashboard" className={linkClass}>
          Dashboard Home
        </NavLink>

        <NavLink to="/dashboard/profile" className={linkClass}>
          My Profile
        </NavLink>

        {/* ================= STUDENT ================= */}
        {role === "Student" && (
          <>
            <NavLink to="/dashboard/my-applications" className={linkClass}>
              My Applications
            </NavLink>

            <NavLink to="/dashboard/my-reviews" className={linkClass}>
              My Reviews
            </NavLink>
          </>
        )}

        {/* ================= MODERATOR ================= */}
        {role === "Moderator" && (
          <>
            <NavLink to="/dashboard/manage-applications" className={linkClass}>
              Manage Applications
            </NavLink>

            <NavLink to="/dashboard/all-reviews" className={linkClass}>
              All Reviews
            </NavLink>
          </>
        )}

        {/* ================= ADMIN ================= */}
        {role === "Admin" && (
          <>
            <NavLink to="/dashboard/add-scholarship" className={linkClass}>
              Add Scholarship
            </NavLink>

            <NavLink to="/dashboard/manage-scholarships" className={linkClass}>
              Manage Scholarships
            </NavLink>

            <NavLink to="/dashboard/manage-users" className={linkClass}>
              Manage Users
            </NavLink>

            <NavLink to="/dashboard/analytics" className={linkClass}>
              Analytics
            </NavLink>
          </>
        )}

        <div className="divider"></div>

        <NavLink to="/" className="btn btn-outline btn-sm w-full">
          Back Home
        </NavLink>
      </aside>
    </div>
  );
};

export default Sidebar;
