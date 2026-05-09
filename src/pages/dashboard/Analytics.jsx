import { useQuery } from "@tanstack/react-query";
import axios from "../../api/axiosSecure";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const Analytics = () => {

  /* ================= SUMMARY ================= */
  const { data: summary, isLoading, isError } = useQuery({
    queryKey: ["analytics-summary"],
    queryFn: async () => {
      const res = await axios.get("/api/analytics/summary");
      return res.data;
    },
  });

  

  /* ================= CATEGORY ================= */
  const { data: categoryData } = useQuery({
    queryKey: ["analytics-category"],
    queryFn: async () => {
      const res = await axios.get("/api/analytics/category");
      return res.data;
    },
  });

  /* ================= UNIVERSITY ================= */
  const { data: universityData } = useQuery({
    queryKey: ["analytics-university"],
    queryFn: async () => {
      const res = await axios.get("/api/analytics/university");
      return res.data;
    },
  });

  /* ================= REVENUE ================= */
  const { data: revenueData } = useQuery({
    queryKey: ["analytics-revenue"],
    queryFn: async () => {
      const res = await axios.get("/api/analytics/revenue");
      return res.data;
    },
  });

  if (isLoading) {
    return <span className="loading loading-spinner"></span>;
  }

  if (isError) {
    return (
      <div className="text-center py-20 text-error">
        Access Denied
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* ===== CARDS ===== */}
      <div className="grid md:grid-cols-3 gap-6">
        <div className="card bg-primary text-white">
          <div className="card-body">
            <h2>Total Users</h2>
            <p className="text-3xl font-bold">{summary?.totalUsers}</p>
          </div>
        </div>

        <div className="card bg-secondary text-white">
          <div className="card-body">
            <h2>Total Applications</h2>
            <p className="text-3xl font-bold">{summary?.totalApplications}</p>
          </div>
        </div>

        <div className="card bg-accent text-white">
          <div className="card-body">
            <h2>Total Revenue</h2>
            <p className="text-3xl font-bold">${summary?.totalRevenue}</p>
          </div>
        </div>
      </div>

      {/* ===== CATEGORY ===== */}
      <div className="bg-base-100 p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Applications by Category</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={categoryData || []}>
            <XAxis dataKey="category" /> {/* ✅ FIXED */}
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ===== UNIVERSITY ===== */}
      <div className="bg-base-100 p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Top Universities</h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={universityData || []}>
            <XAxis dataKey="university" /> {/* ✅ FIXED */}
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ===== REVENUE ===== */}
      <div className="bg-base-100 p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4">Monthly Revenue</h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData || []}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="revenue" />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default Analytics;