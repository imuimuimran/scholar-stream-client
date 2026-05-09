import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const ApplySection = ({ scholarship }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleApply = () => {
    if (!user) {
      navigate("/login");
      return;
    }

    // TEMPORARY ROUTE
    navigate(`/dashboard/apply/${scholarship._id}`);
  };

  return (
    <div className="card bg-base-100 shadow p-6">
      <h2 className="text-xl font-semibold mb-3">
        Apply Now
      </h2>

      <div className="space-y-2 mb-5">
        <p>
          <strong>Application Fee:</strong> $
          {scholarship.applicationFees}
        </p>

        <p>
          <strong>Degree:</strong> {scholarship.degree}
        </p>

        <p>
          <strong>Deadline:</strong>{" "}
          {new Date(
            scholarship.applicationDeadline
          ).toLocaleDateString()}
        </p>
      </div>

      <button
        onClick={handleApply}
        className="btn btn-primary"
      >
        Apply & Pay
      </button>
    </div>
  );
};

export default ApplySection;