import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="bg-base-100 shadow-xl rounded-2xl p-10 text-center max-w-md w-full">

        <div className="text-6xl mb-4">✅</div>

        <h1 className="text-3xl font-bold text-success mb-3">
          Payment Successful
        </h1>

        <p className="text-gray-500 mb-6">
          Your scholarship application payment has been completed successfully.
        </p>

        <div className="flex flex-col gap-3">
          <Link
            to="/dashboard/applications"
            className="btn btn-primary"
          >
            Go To My Applications
          </Link>

          <Link
            to="/dashboard/payment-history"
            className="btn btn-outline"
          >
            View Payment History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;