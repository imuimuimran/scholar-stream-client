import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "../../api/axiosSecure";
import CheckoutForm from "./CheckoutForm";

const PaymentPage = () => {
  const { id } = useParams();

  /* fetch scholarship info */
  const { data: scholarship, isLoading } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const res = await axios.get(`/api/scholarships/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center py-20">Loading...</div>;

  return (
    <section className="max-w-xl mx-auto py-12">
      <div className="card bg-base-100 shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold">Payment</h1>

        <div className="text-sm opacity-80">
          <p>Scholarship: {scholarship.scholarshipName}</p>
          <p>University: {scholarship.universityName}</p>
          <p className="font-semibold text-primary">
            Fee: ${scholarship.applicationFees}
          </p>
        </div>

        <CheckoutForm scholarship={scholarship} />
      </div>
    </section>
  );
};

export default PaymentPage;
