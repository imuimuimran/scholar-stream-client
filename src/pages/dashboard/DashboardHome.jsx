// const DashboardHome = () => {
//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-4">Welcome to ScholarStream Dashboard</h2>
//       <p>Select options from the sidebar.</p>
//     </div>
//   );
// };

// export default DashboardHome;


import { useQuery } from "@tanstack/react-query";
import axios from "../../api/axiosSecure";

const DashboardHome = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["analytics-summary"],
    queryFn: async () => {
      const res = await axios.get("/api/analytics/summary");
      return res.data;
    },
  });

  if (isLoading) {
    return <span className="loading loading-spinner"></span>;
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">

      <div className="card bg-primary text-white shadow">
        <div className="card-body">
          <h2 className="text-lg">Total Users</h2>
          <p className="text-3xl font-bold">{data.totalUsers}</p>
        </div>
      </div>

      <div className="card bg-secondary text-white shadow">
        <div className="card-body">
          <h2 className="text-lg">Total Applications</h2>
          <p className="text-3xl font-bold">{data.totalApplications}</p>
        </div>
      </div>

      <div className="card bg-accent text-white shadow">
        <div className="card-body">
          <h2 className="text-lg">Total Revenue</h2>
          <p className="text-3xl font-bold">${data.totalRevenue}</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;