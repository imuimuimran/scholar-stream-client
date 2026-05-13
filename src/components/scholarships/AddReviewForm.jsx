import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../api/axiosSecure";
import { useAuth } from "../../providers/AuthProvider";

const AddReviewForm = ({ scholarshipId, universityName, }) => {
  const { user } = useAuth();

  const queryClient = useQueryClient();

  const [reviewData, setReviewData] = useState({
    rating: 5,
    comment: "",
  });

  const mutation = useMutation({
    mutationFn: async (data) => {
      const res = await axios.post("/api/reviews", data);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reviews", scholarshipId],
      });

      setReviewData({
        rating: 5,
        comment: "",
      });

      alert("Review added successfully");
    },

    onError: (err) => {
      console.error(err);
      alert(
        err?.response?.data?.message ||
          "Failed to submit review"
      );
    },
  });

  if (!user) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!reviewData.comment) {
      return alert("Comment required");
    }

    mutation.mutate({
      scholarshipId,
      universityName,
      rating: Number(reviewData.rating),
      comment: reviewData.comment,

      reviewerName: user.name,
      reviewerEmail: user.email,
      photoURL: user.photoURL,

      reviewDate: new Date(),
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="card bg-base-100 shadow p-5"
    >
      <h2 className="text-xl font-bold mb-4">
        Add Review
      </h2>

      <select
        className="select select-bordered mb-4"
        value={reviewData.rating}
        onChange={(e) =>
          setReviewData({
            ...reviewData,
            rating: e.target.value,
          })
        }
      >
        <option value={5}>5 Stars</option>
        <option value={4}>4 Stars</option>
        <option value={3}>3 Stars</option>
        <option value={2}>2 Stars</option>
        <option value={1}>1 Star</option>
      </select>

      <textarea
        className="textarea textarea-bordered mb-4"
        placeholder="Write your review..."
        value={reviewData.comment}
        onChange={(e) =>
          setReviewData({
            ...reviewData,
            comment: e.target.value,
          })
        }
        required
      />

      <button
        type="submit"
        className="btn btn-primary"
        disabled={mutation.isPending}
      >
        {mutation.isPending
          ? "Submitting..."
          : "Submit Review"}
      </button>
    </form>
  );
};

export default AddReviewForm;