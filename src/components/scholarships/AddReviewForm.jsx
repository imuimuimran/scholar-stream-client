import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../api/axiosSecure";
import { useAuth } from "../../providers/AuthProvider";

const AddReviewForm = ({ scholarshipId }) => {
  const { user } = useAuth();
  const [comment, setComment] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (data) => axios.post("/api/reviews", data),
    onSuccess: () => {
      queryClient.invalidateQueries(["reviews", scholarshipId]);
      setComment("");
    },
  });

  if (!user) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({
      scholarshipId,
      comment,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="card bg-base-100 shadow p-4">
      <textarea
        className="textarea textarea-bordered mb-3"
        placeholder="Write review..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      <button className="btn btn-primary btn-sm">Submit Review</button>
    </form>
  );
};

export default AddReviewForm;
