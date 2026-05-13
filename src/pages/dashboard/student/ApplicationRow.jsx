import { Link } from "react-router-dom";
import axios from "../../../api/axiosSecure";
import { useState } from "react";
import ReviewModal from "./ReviewModal";

const ApplicationRow = ({ app, refetch }) => {
  const {
    _id,
    universityName,
    subjectCategory,
    applicationFees,
    applicationStatus,
    paymentStatus,
    feedback,
    scholarshipId,
  } = app;

  /* ================= DELETE ================= */
  const handleDelete = async () => {
    if (!confirm("Delete application?")) return;

    await axios.delete(`/api/applications/${_id}`);
    refetch();
  };

  const [openReview, setOpenReview] = useState(false);

  return (
    <tr>
      <td>{universityName}</td>

      <td>{subjectCategory}</td>

      <td>${applicationFees}</td>

      <td>
        <span className="badge badge-info">{applicationStatus}</span> 
      </td>

      <td>
        <span
          className={`badge ${paymentStatus === "paid"
              ? "badge-success"
              : "badge-warning"
            }`}
        >
          {paymentStatus}
        </span>
      </td>

      <td className="max-w-[160px] truncate">
        {feedback || "-"}
      </td>

      <td className="space-x-2">

        {/* PAY */}
        {status === "pending" && paymentStatus === "unpaid" && (
          <Link
            to={`/checkout/${scholarshipId}`}
            className="btn btn-xs btn-primary"
          >
            Pay
          </Link>
        )}

        {/* EDIT */}
        {status === "pending" && (
          <button className="btn btn-xs">Edit</button>
        )}

        {/* DELETE */}
        {status === "pending" && (
          <button
            onClick={handleDelete}
            className="btn btn-xs btn-error"
          >
            Delete
          </button>
        )}

        {/* REVIEW */}
        {/* {status === "completed" && (
          <button className="btn btn-xs btn-success">
            Add Review
          </button>
        )} */}

        {status === "completed" && (
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
                onClose={() => setOpenReview(false)}
              />
            )}
          </>
        )}


      </td>
    </tr>
  );
};

export default ApplicationRow;
