import { useQuery } from "@tanstack/react-query";
import axios from "../../api/axiosSecure";

const ReviewList = ({ scholarshipId }) => {

  const {
    data: reviews = [],
    isLoading,
  } = useQuery({
    queryKey: ["reviews", scholarshipId],

    queryFn: async () => {
      const res = await axios.get(
        `/api/reviews/scholarship/${scholarshipId}`
      );

      return res.data;
    },

    enabled: !!scholarshipId,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-10">
        <span className="loading loading-spinner"></span>
      </div>
    );
  }

  return (
    <div>

      <h2 className="text-2xl font-bold mb-5">
        Reviews
      </h2>

      {reviews.length === 0 && (
        <p className="opacity-70">
          No reviews yet
        </p>
      )}

      <div className="space-y-4">

        {reviews.map((review) => (
          <div
            key={review._id}
            className="card bg-base-100 shadow p-5"
          >

            <div className="flex items-center gap-3 mb-2">

              <img
                src={
                  review.photoURL ||
                  "https://i.ibb.co/4pDNDk1/avatar.png"
                }
                alt=""
                className="w-12 h-12 rounded-full object-cover"
              />

              <div>
                <h4 className="font-semibold">
                  {review.reviewerName}
                </h4>

                <p className="text-sm opacity-70">
                  {new Date(
                    review.reviewDate
                  ).toLocaleDateString()}
                </p>
              </div>

            </div>

            <p className="mb-2">
              Rating: ⭐ {review.rating}/5
            </p>

            <p>{review.comment}</p>

          </div>
        ))}

      </div>

    </div>
  );
};

export default ReviewList;