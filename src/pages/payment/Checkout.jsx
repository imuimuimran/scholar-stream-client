import { useEffect, useState } from "react";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const Checkout = ({ amount, applicationData }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    axios
      .post("/api/payments/create-payment-intent", { amount })
      .then((res) => setClientSecret(res.data.clientSecret));
  }, [amount]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const card = elements.getElement(CardElement);

    const { paymentIntent, error } = await stripe.confirmCardPayment(
      clientSecret,
      {
        payment_method: {
          card,
        },
      }
    );

    if (error) {
      window.location.href = "/payment-failed";
      return;
    }

    if (paymentIntent.status === "succeeded") {
      // save application with paymentStatus: paid
      await axios.post("/api/applications", {
        ...applicationData,
        paymentStatus: "paid",
      });

      window.location.href = "/payment-success";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-6 bg-base-100 shadow-lg">
      <CardElement className="border p-4 rounded" />
      <button className="btn btn-primary mt-4 w-full">
        Pay ${amount}
      </button>
    </form>
  );
};

export default Checkout;
