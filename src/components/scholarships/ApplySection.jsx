import { useAuth } from "../../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axiosSecure";

const ApplySection = ({ scholarship }) => {

  const { user } = useAuth();

  const navigate = useNavigate();

  const handleApply = async () => {

    // LOGIN CHECK
    if (!user) {
      navigate("/login");
      return;
    }

    try {

      // CREATE APPLICATION
      const applicationData = {
        scholarshipId: scholarship._id,

        scholarshipName:
          scholarship.scholarshipName,

        name: user.displayName,
        userEmail: user.email,

        universityName:
          scholarship.universityName,

        subjectCategory:
          scholarship.subjectCategory,

        scholarshipCategory:
          scholarship.scholarshipCategory,

        degree: scholarship.degree,

        applicationFees:
          scholarship.applicationFees,

        serviceCharge:
          scholarship.serviceCharge || 0,

        totalAmount:
          scholarship.applicationFees +
          (scholarship.serviceCharge || 0),

        paymentStatus: "unpaid",
      };

      const res = await axios.post(
        "/api/applications",
        applicationData
      );

      /*
        IMPORTANT:
        Navigate using APPLICATION ID
      */

      navigate(
        // `/checkout/${res.data.insertedId}`
        `/checkout/${res.data._id}`
      );

    } catch (error) {

      console.log(error);

      alert(
        error?.response?.data?.message ||
        "Failed to create application"
      );
    }
  };

  return (
    <div className="card bg-base-100 shadow p-6">

      <h2 className="text-xl font-semibold mb-3">
        Apply Now
      </h2>

      <div className="space-y-2 mb-5">

        <p>
          <strong>Application Fee:</strong>
          ${scholarship.applicationFees}
        </p>

        <p>
          <strong>Degree:</strong>
          {scholarship.degree}
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