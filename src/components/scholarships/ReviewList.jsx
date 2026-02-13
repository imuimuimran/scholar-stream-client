import { useQuery } from "@tanstack/react-query";
import axios from "../../api/axiosSecure";

const ReviewList = ({ scholarshipId }) => {
  const { data: reviews = [] } = useQuery({
    queryKey: ["reviews", scholarshipId],
    queryFn: async () => {
      const res = await axios.get(`/api/reviews/${scholarshipId}`);
      return res.data;
    },
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Reviews</h2>

      {reviews.map((r) => (
        <div key={r._id} className="card bg-base-100 shadow mb-3 p-4">
          <p className="font-semibold">{r.userName}</p>
          <p className="text-sm">{r.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
