import {
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosSecure";
import { useAuth } from "../../providers/AuthProvider";

const CheckoutForm = ({ scholarship }) => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState("");

  /* =============================
     Create PaymentIntent
  ============================= */
  useEffect(() => {
    if (!scholarship?.applicationFees) return;

    axios
      .post("/api/payments/create-intent", {
        amount: scholarship.applicationFees,
      })
      .then((res) => setClientSecret(res.data.clientSecret));
  }, [scholarship]);

  /* =============================
     Handle Payment
  ============================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setProcessing(true);
    setError("");

    const card = elements.getElement(CardElement);

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
          billing_details: {
            email: user?.email,
          },
        },
      }
    );

    if (error) {
      setError(error.message);
      setProcessing(false);
      return;
    }

    /* =============================
       Save application to DB
    ============================= */
    await axios.post("/api/applications", {
      scholarshipId: scholarship._id,
      transactionId: paymentIntent.id,
      amount: scholarship.applicationFees,
    });

    setProcessing(false);

    alert("Payment successful");

    navigate("/dashboard");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-4 border rounded-lg" />

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <button
        disabled={!stripe || processing}
        className="btn btn-primary w-full"
      >
        {processing ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export default CheckoutForm;
