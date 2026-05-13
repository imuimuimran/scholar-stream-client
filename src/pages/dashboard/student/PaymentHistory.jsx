import { useQuery } from "@tanstack/react-query";
import axios from "../../../api/axiosSecure";

const PaymentHistory = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["my-payments"],
    queryFn: async () => {
      const res = await axios.get("/api/applications/my-payments");
      return res.data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="bg-base-100 p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">
        💳 Payment History 
      </h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Scholarship</th>
              <th>University</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {data?.map((item) => (
              <tr key={item._id}>
                <td>{item.scholarshipName}</td>
                <td>{item.universityName}</td>

                <td className="font-semibold text-primary">
                  ${item.amount || item.applicationFees}
                </td>

                <td>
                  <span className="badge badge-success">
                    {item.paymentStatus}
                  </span>
                </td>

                <td>
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {data?.length === 0 && (
          <p className="text-center py-10 opacity-60">
            No payments found
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;