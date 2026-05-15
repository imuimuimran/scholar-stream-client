import { Link, useLocation } from "react-router-dom";

const PaymentFailed = () => {
  const location = useLocation();

  // receive optional data from navigate()
  const scholarshipName =
    location.state?.scholarshipName || "Scholarship";

  const errorMessage =
    location.state?.error ||
    "Your payment could not be completed. Please try again.";

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-base-100 shadow-2xl rounded-2xl p-8 text-center border border-error/20">

        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-error/10 flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">❌</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-error mb-3">
          Payment Failed
        </h1>

        {/* Scholarship */}
        <p className="text-lg font-semibold text-primary mb-2">
          {scholarshipName}
        </p>

        {/* Error Message */}
        <div className="bg-base-200 rounded-xl p-4 mb-6">
          <p className="text-sm opacity-80">
            {errorMessage}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">

          <Link
            to="/dashboard/applications"
            className="btn btn-primary"
          >
            Return to Dashboard
          </Link>

          <Link
            to="/scholarships"
            className="btn btn-outline"
          >
            Browse Scholarships
          </Link>

        </div>
      </div>
    </section>
  );
};

export default PaymentFailed;