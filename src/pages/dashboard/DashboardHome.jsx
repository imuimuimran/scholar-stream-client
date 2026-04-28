import { useQuery } from "@tanstack/react-query";
import axios from "../../api/axiosSecure";

const DashboardHome = () => {
  const { data = {}, isLoading, isError } = useQuery({
    queryKey: ["analytics-summary"],
    queryFn: async () => {
      const res = await axios.get("/api/analytics/summary");
      return res.data;
    },
  });

  if (isLoading) {
    return <span className="loading loading-spinner"></span>;
  }

  if (isError) {
  return <p className="text-red-500">Failed to load data</p>;
}

  return (
    <div className="grid md:grid-cols-3 gap-6">

      <div className="card bg-primary text-white shadow">
        <div className="card-body">
          <h2 className="text-lg">Total Users</h2>
          <p className="text-3xl font-bold">{data.totalUsers || 0}</p>
        </div>
      </div>

      <div className="card bg-secondary text-white shadow">
        <div className="card-body">
          <h2 className="text-lg">Total Applications</h2>
          <p className="text-3xl font-bold">{data.totalApplications || 0}</p>
        </div>
      </div>

      <div className="card bg-accent text-white shadow">
        <div className="card-body">
          <h2 className="text-lg">Total Revenue</h2>
          <p className="text-3xl font-bold">${data.totalRevenue || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;