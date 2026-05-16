import { Link, useLocation } from "react-router-dom";

const PaymentSuccess = () => {

  const { state } = useLocation();

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">

      <div className="bg-base-100 shadow-2xl rounded-3xl p-8 md:p-10 max-w-lg w-full">

        {/* SUCCESS ICON */}
        <div className="text-center">
          <div className="text-6xl mb-4">✅</div>

          <h1 className="text-3xl font-bold text-success mb-2">
            Payment Successful
          </h1>

          <p className="text-gray-500 mb-8">
            Your scholarship payment has been completed successfully.
          </p>
        </div>

        {/* PAYMENT DETAILS */}
        <div className="bg-base-200 rounded-2xl p-5 space-y-3 mb-8">

          <h2 className="text-lg font-bold mb-4">
            Scholarship Details
          </h2>

          <div className="flex justify-between gap-4">
            <span className="font-medium">Scholarship</span>
            <span className="text-right">
              {state?.scholarshipName || "N/A"}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="font-medium">University</span>
            <span className="text-right">
              {state?.universityName || "N/A"}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="font-medium">Subject</span>
            <span className="text-right">
              {state?.subject || "N/A"}
            </span>
          </div>

          <div className="flex justify-between gap-4">
            <span className="font-medium">Degree</span>
            <span className="text-right">
              {state?.degree || "N/A"}
            </span>
          </div>

          <div className="divider my-1"></div>

          <div className="flex justify-between gap-4 text-lg font-bold text-primary">
            <span>Amount Paid</span>
            <span>
              ${state?.amount || 0}
            </span>
          </div>

          <div className="flex justify-between gap-4 text-sm opacity-70">
            <span>Transaction ID</span>

            <span className="break-all text-right">
              {state?.transactionId || "N/A"}
            </span>
          </div>

        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-col gap-3">

          <Link
            to="/dashboard/applications"
            className="btn btn-primary text-white"
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