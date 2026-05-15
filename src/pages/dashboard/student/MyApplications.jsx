import { useQuery } from "@tanstack/react-query";
import axios from "../../../api/axiosSecure";
import { useAuth } from "../../../providers/AuthProvider";
import ApplicationRow from "./ApplicationRow";
import TableSkeleton from "../../../components/shared/TableSkeleton";

const MyApplications = () => {
  const { user } = useAuth();

  const { data = [], isLoading, refetch } = useQuery({
    queryKey: ["myApplications", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axios.get("/api/applications/my", {
        params: { email: user.email },
      });
      return res.data;
    },
  });

  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center py-20">
  //       <span className="loading loading-spinner loading-lg text-primary"></span>
  //     </div>
  //   );
  // }

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <section className="space-y-6">
      <h1 className="text-2xl font-bold text-primary">My Applications</h1>

      <div className="overflow-x-auto bg-base-100 shadow rounded-xl">
        <table className="table">
          <thead>
            <tr>
              <th>University</th>
              <th>Subject</th>
              <th>Fee</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Feedback</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((app) => (
              <ApplicationRow
                key={app._id}
                app={app}
                refetch={refetch}
              />
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default MyApplications;
