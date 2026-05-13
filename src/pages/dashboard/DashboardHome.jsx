import { useQuery } from "@tanstack/react-query";
import axiosSecure from "../../api/axiosSecure";
import { useAuth } from "../../providers/AuthProvider";

const DashboardHome = () => {
  const { user, dbUser, loading } = useAuth();

  const isAdmin = dbUser?.role === "Admin";

  const {
    data = {},
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["analytics-summary"],
    enabled: !loading && isAdmin, // ✅ ONLY ADMIN
    queryFn: async () => {
      const res = await axiosSecure.get("/api/analytics/summary");
      return res.data;
    },
  });

  if (loading) {
    return <span className="loading loading-spinner"></span>;
  }

  /* =========================
     NON-ADMIN DASHBOARD
  ========================= */
  if (!isAdmin) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-bold">
          Welcome {dbUser?.name}
        </h2>
        <p className="text-xl opacity-60">Email: {user?.email}</p>
        <p className="text-gray-500 text-xl mt-2">
          {dbUser?.role} Dashboard
        </p>
      </div>
    );
  }

  /* =========================
     ADMIN LOADING
  ========================= */
  if (isLoading) {
    return <span className="loading loading-spinner"></span>;
  }

  /* =========================
     ADMIN ERROR
  ========================= */
  if (isError) {
    return (
      <p className="text-red-500">
        Failed to load admin analytics
      </p>
    );
  }

  /* =========================
     ADMIN DASHBOARD
  ========================= */
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="card bg-primary text-white shadow">
        <div className="card-body">
          <h2 className="text-lg">Total Users</h2>
          <p className="text-3xl font-bold">
            {data.totalUsers || 0}
          </p>
        </div>
      </div>

      <div className="card bg-secondary text-white shadow">
        <div className="card-body">
          <h2 className="text-lg">Total Applications</h2>
          <p className="text-3xl font-bold">
            {data.totalApplications || 0}
          </p>
        </div>
      </div>

      <div className="card bg-accent text-white shadow">
        <div className="card-body">
          <h2 className="text-lg">Total Revenue</h2>
          <p className="text-3xl font-bold">
            ${data.totalRevenue || 0}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;