import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import axios from "../../api/axiosSecure";

const Checkout = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [loading, setLoading] = useState(true);

  const [application, setApplication] = useState(null);

  const [clientSecret, setClientSecret] = useState("");

  /* ================= FETCH APPLICATION ================= */

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const res = await axios.get(`/api/applications/${id}`);

        setApplication(res.data);

        const paymentRes = await axios.post(
          "/api/payments/create-payment-intent",
          {
            amount:
              res.data.applicationFees +
              (res.data.serviceCharge || 0),
          }
        );

        setClientSecret(paymentRes.data.clientSecret);

        setLoading(false);
      } catch (error) {
        console.log(error);

        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  /* ================= PAYMENT ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const card = elements.getElement(CardElement);

    if (!card) return;

    const { error, paymentIntent } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card,
        },
      });

    if (error) {
      console.log(error);

      navigate("/payment-failed");

      return;
    }

    if (paymentIntent.status === "succeeded") {
      try {
        await axios.patch(`/api/applications/payment/${id}`, {
          transactionId: paymentIntent.id,
          paymentStatus: "paid",
        });

        navigate("/payment-success");
      } catch (err) {
        console.log(err);
      }
    }
  };

  /* ================= LOADING ================= */

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  /* ================= NOT FOUND ================= */

  if (!application) {
    return (
      <div className="text-center py-20">
        Application not found
      </div>
    );
  }

  const total =
    application.applicationFees +
    (application.serviceCharge || 0);

  return (
    <div className="max-w-xl mx-auto py-10">

      <div className="card bg-base-100 shadow-xl p-6">

        <h2 className="text-2xl font-bold mb-4">
          Checkout
        </h2>

        <div className="space-y-2 mb-6">
          <p>
            <strong>University:</strong>{" "}
            {application.universityName}
          </p>

          <p>
            <strong>Subject:</strong>{" "}
            {application.subject}
          </p>

          <p>
            <strong>Application Fee:</strong> $
            {application.applicationFees}
          </p>

          <p>
            <strong>Service Charge:</strong> $
            {application.serviceCharge || 0}
          </p>

          <p className="text-lg font-bold text-primary">
            Total: ${total}
          </p>
        </div>

        <form onSubmit={handleSubmit}>

          <div className="border rounded-lg p-4">
            <CardElement />
          </div>

          <button
            type="submit"
            disabled={!stripe || !clientSecret}
            className="btn btn-primary w-full mt-6"
          >
            Pay ${total}
          </button>

        </form>

      </div>

    </div>
  );
};

export default Checkout;