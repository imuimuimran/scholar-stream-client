import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaStar } from "react-icons/fa";
import axios from "../../../api/axiosSecure";
import { useAuth } from "../../../providers/AuthProvider";

const ReviewModal = ({ application, onClose }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(null);
  const [comment, setComment] = useState("");

  /* ================= Mutation ================= */
  const mutation = useMutation({
    mutationFn: async (reviewData) => {
      const res = await axios.post("/api/reviews", reviewData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myApplications"]);
      onClose();
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rating) return alert("Select rating");

    mutation.mutate({
      scholarshipId: application.scholarshipId,
      scholarshipName: application.scholarshipName,
      universityName: application.universityName,

      reviewerName: user.displayName,
      reviewerImage: user.photoURL,
      reviewerEmail: user.email,

      rating,
      comment,
      createdAt: new Date(),
    });
  };

  return (
    <dialog className="modal modal-open">
      <div className="modal-box space-y-4">

        <h3 className="font-bold text-lg">
          Review {application.universityName}
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Stars */}
          <div className="flex gap-2 text-2xl">
            {[...Array(5)].map((_, i) => {
              const starValue = i + 1;

              return (
                <FaStar
                  key={i}
                  className="cursor-pointer"
                  color={(hover || rating) >= starValue ? "#facc15" : "#d1d5db"}
                  onMouseEnter={() => setHover(starValue)}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => setRating(starValue)}
                />
              );
            })}
          </div>

          {/* Comment */}
          <textarea
            required
            placeholder="Write your experience..."
            className="textarea textarea-bordered w-full"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <div className="modal-action">
            <button type="submit" className="btn btn-primary btn-sm">
              Submit
            </button>

            <button
              type="button"
              onClick={onClose}
              className="btn btn-ghost btn-sm"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </dialog>
  );
};

export default ReviewModal;
