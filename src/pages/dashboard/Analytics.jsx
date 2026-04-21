import { useQuery } from "@tanstack/react-query";
import axios from "../../api/axiosSecure";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Analytics = () => {
  /* ================= SUMMARY ================= */
  const { data: summary, isLoading: loadingSummary } = useQuery({
    queryKey: ["analytics-summary"],
    queryFn: async () => {
      const res = await axios.get("/api/analytics/summary");
      return res.data;
    },
  });

  /* ================= CHART ================= */
  const { data: chartData, isLoading: loadingChart } = useQuery({
    queryKey: ["analytics-chart"],
    queryFn: async () => {
      const res = await axios.get(
        "/api/analytics/applications-by-category"
      );
      return res.data;
    },
  });

  if (loadingSummary || loadingChart) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* ================= KPI CARDS ================= */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card bg-primary text-white shadow">
          <div className="card-body">
            <h2>Total Users</h2>
            <p className="text-3xl font-bold">
              {summary.totalUsers}
            </p>
          </div>
        </div>

        <div className="card bg-secondary text-white shadow">
          <div className="card-body">
            <h2>Total Applications</h2>
            <p className="text-3xl font-bold">
              {summary.totalApplications}
            </p>
          </div>
        </div>

        <div className="card bg-accent text-white shadow">
          <div className="card-body">
            <h2>Total Revenue</h2>
            <p className="text-3xl font-bold">
              ${summary.totalRevenue}
            </p>
          </div>
        </div>
      </div>

      {/* ================= CHART ================= */}
      <div className="bg-base-100 p-4 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">
          Applications by Category
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData || []}>
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Analytics;