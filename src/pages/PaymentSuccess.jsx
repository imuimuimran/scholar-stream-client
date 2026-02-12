import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");

  return (
    <div className="text-center mt-20">
      <h1 className="text-3xl font-bold text-green-600">
        Payment Successful 🎉
      </h1>
      <p>Session ID: {sessionId}</p>
    </div>
  );
};

export default PaymentSuccess;
