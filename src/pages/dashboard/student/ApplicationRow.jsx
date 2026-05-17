import { Link } from "react-router-dom";
import axios from "../../../api/axiosSecure";
import { useState } from "react";
import ReviewModal from "./ReviewModal";

const ApplicationRow = ({ app, refetch }) => {

  const {
    _id,
    universityName,
    scholarshipName,
    subjectCategory,
    scholarshipCategory,
    degree,
    applicationFees,
    serviceCharge,
    totalAmount,
    applicationStatus,
    paymentStatus,
    feedback,
    scholarshipId,
    transactionId,
    applicationDate,
    name,
    userEmail,
  } = app;

  const [openReview, setOpenReview] = useState(false);

  const [openDetails, setOpenDetails] = useState(false);

  /* ================= DELETE ================= */
  const handleDelete = async () => {

    const confirmDelete = window.confirm(
      "Delete this application?"
    );

    if (!confirmDelete) return;

    try {

      await axios.delete(`/api/applications/${_id}`);

      refetch();

    } catch (error) {

      // console.log(error);
      console.error(error);

      alert("Failed to delete application");
    }
  };

  return (
    <>
      <tr>

        {/* UNIVERSITY */}
        <td>{universityName}</td>

        {/* SUBJECT */}
        <td>{subjectCategory}</td>

        {/* FEE */}
        <td>${applicationFees}</td>

        {/* STATUS */}
        <td>
          <span className="badge badge-info">
            {applicationStatus}
          </span>
        </td>

        {/* PAYMENT */}
        <td>
          <span
            className={`badge ${
              paymentStatus === "paid"
                ? "badge-success"
                : "badge-warning"
            }`}
          >
            {paymentStatus}
          </span>
        </td>

        {/* FEEDBACK */}
        <td className="max-w-[160px] truncate">
          {feedback || "-"}
        </td>

        {/* ACTIONS */}
        <td>

          <div className="flex flex-wrap gap-2">

            {/* DETAILS */}
            <button
              onClick={() => setOpenDetails(true)}
              className="btn btn-xs"
            >
              Details
            </button>

            {/* EDIT */}
            {applicationStatus === "pending" && (
              <button className="btn btn-xs btn-secondary">
                Edit
              </button>
            )}

            {/* PAY */}
            {applicationStatus === "pending" &&
              paymentStatus === "unpaid" && (
                <Link
                  to={`/checkout/${_id}`}
                  className="btn btn-xs btn-primary"
                >
                  Pay
                </Link>
              )}

            {/* DELETE */}
            {applicationStatus === "pending" && (
              <button
                onClick={handleDelete}
                className="btn btn-xs btn-error"
              >
                Delete
              </button>
            )}

            {/* ADD REVIEW */}
            {applicationStatus === "completed" && (
              <>
                <button
                  onClick={() => setOpenReview(true)}
                  className="btn btn-xs btn-success"
                >
                  Add Review
                </button>

                {openReview && (
                  <ReviewModal
                    application={app}
                    onClose={() =>
                      setOpenReview(false)
                    }
                  />
                )}
              </>
            )}

          </div>

        </td>

      </tr>

      {/* ================= DETAILS MODAL ================= */}
      {openDetails && (
        <dialog className="modal modal-open">

          <div className="modal-box max-w-2xl">

            <h3 className="font-bold text-2xl mb-6">
              Application Details
            </h3>

            <div className="grid md:grid-cols-2 gap-6">

              {/* APPLICANT INFO */}
              <div className="space-y-2">

                <h4 className="font-bold text-lg text-primary">
                  Applicant Info
                </h4>

                <p>
                  <strong>Name:</strong> {name}
                </p>

                <p>
                  <strong>Email:</strong> {userEmail}
                </p>

                <p>
                  <strong>Application Date:</strong>{" "}
                  {new Date(
                    applicationDate
                  ).toLocaleDateString()}
                </p>

              </div>

              {/* SCHOLARSHIP INFO */}
              <div className="space-y-2">

                <h4 className="font-bold text-lg text-primary">
                  Scholarship Info
                </h4>

                <p>
                  <strong>Scholarship:</strong>{" "}
                  {scholarshipName}
                </p>

                <p>
                  <strong>University:</strong>{" "}
                  {universityName}
                </p>

                <p>
                  <strong>Subject:</strong>{" "}
                  {subjectCategory}
                </p>

                <p>
                  <strong>Category:</strong>{" "}
                  {scholarshipCategory}
                </p>

                <p>
                  <strong>Degree:</strong> {degree}
                </p>

              </div>

            </div>

            {/* PAYMENT INFO */}
            <div className="mt-6 border-t pt-4 space-y-2">

              <h4 className="font-bold text-lg text-primary">
                Payment Info
              </h4>

              <p>
                <strong>Application Fee:</strong> $
                {applicationFees}
              </p>

              <p>
                <strong>Service Charge:</strong> $
                {serviceCharge || 0}
              </p>

              <p>
                <strong>Total:</strong> $
                {totalAmount}
              </p>

              <p>
                <strong>Payment Status:</strong>{" "}
                {paymentStatus}
              </p>

              {transactionId && (
                <p>
                  <strong>Transaction ID:</strong>{" "}
                  {transactionId}
                </p>
              )}

            </div>

            <div className="modal-action">

              <button
                onClick={() => setOpenDetails(false)}
                className="btn"
              >
                Close
              </button>

            </div>

          </div>

        </dialog>
      )}
    </>
  );
};

export default ApplicationRow;
