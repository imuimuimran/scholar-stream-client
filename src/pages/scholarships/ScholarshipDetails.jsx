import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "../../api/axiosSecure";

import ScholarshipInfo from "../../components/scholarships/ScholarshipInfo";
import ApplySection from "../../components/scholarships/ApplySection";
import ReviewList from "../../components/scholarships/ReviewList";
import AddReviewForm from "../../components/scholarships/AddReviewForm";

const ScholarshipDetails = () => {
  const { id } = useParams();

  const { data: scholarship, isLoading } = useQuery({
    queryKey: ["scholarship", id],
    queryFn: async () => {
      const res = await axios.get(`/api/scholarships/${id}`);
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center py-20">Loading...</div>;

  if (!scholarship)
    return <div className="text-center py-20">Scholarship not found</div>;

  return (
    <section className="max-w-6xl mx-auto py-10 space-y-10">
      <ScholarshipInfo scholarship={scholarship} />

      <ApplySection scholarship={scholarship} />

      <ReviewList scholarshipId={id} />

      <AddReviewForm
        scholarshipId={scholarship._id}
        universityName={scholarship.universityName}
      />
    </section>
  );
};

export default ScholarshipDetails;
