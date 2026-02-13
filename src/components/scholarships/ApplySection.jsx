import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const ApplySection = ({ scholarship }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleApply = () => {
    if (!user) return navigate("/login");

    navigate(`/dashboard/payment/${scholarship._id}`);
  };

  return (
    <div className="card bg-base-100 shadow p-6">
      <h2 className="text-xl font-semibold mb-3">Apply Now</h2>

      <p className="mb-4">
        Application Fee: <strong>${scholarship.applicationFees}</strong>
      </p>

      <button onClick={handleApply} className="btn btn-primary">
        Apply & Pay
      </button>
    </div>
  );
};

export default ApplySection;
