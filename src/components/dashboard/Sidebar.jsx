import { NavLink } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

const Sidebar = () => {
  const { role } = useAuth();

  return (
    <div className="w-64 bg-base-100 shadow-lg hidden md:block">
      <div className="p-4 text-xl font-bold text-primary">
        Dashboard
      </div>

      <ul className="menu p-4 space-y-2">

        {/* COMMON */}
        <li>
          <NavLink to="/dashboard">🏠 Home</NavLink>
        </li>

        <li>
          <NavLink to="/dashboard/profile">👤 Profile</NavLink>
        </li>

        {/* STUDENT */}
        {role === "Student" && (
          <>
            <li>
              <NavLink to="/dashboard/applications">
                📄 My Applications
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/reviews">
                ⭐ My Reviews
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/payment-history">
                Payment History
              </NavLink>
            </li>
          </>
        )}

        {/* MODERATOR */}
        {role === "Moderator" && (
          <>
            <li>
              <NavLink to="/dashboard/manage-applications">
                📊 Applications
              </NavLink>
            </li>
            <li>
              <NavLink to="/dashboard/all-reviews">
                ⭐ All Reviews
              </NavLink>
            </li>
          </>
        )}

        {/* ADMIN */}
        {role === "Admin" && (
          <>
            <li>
              <NavLink to="/dashboard/manage-users">
                👥 Manage Users
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/manage-scholarships">
                🎓 Scholarships
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/analytics">
                📈 Analytics
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;