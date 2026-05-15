import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../../api/axiosSecure";
import { useState } from "react";

const MyReviews = () => {
  const queryClient = useQueryClient();

  const [editReview, setEditReview] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  /* ================= FETCH ================= */
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["my-reviews"],
    queryFn: async () => {
      const res = await axios.get("/api/reviews/my");
      return res.data;
    },
  });

  /* ================= UPDATE ================= */
  const updateMutation = useMutation({
    mutationFn: async (data) => {
      await axios.patch(`/api/reviews/${data.id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-reviews"],
      });
      setEditReview(null);
    },
  });

  /* ================= DELETE ================= */
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`/api/reviews/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["my-reviews"],
      });
    },
  });

  if (isLoading) {
    return <span className="loading loading-spinner"></span>;
  }

  return (
    <div className="bg-base-100 p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">My Reviews</h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Scholarship</th>
              <th>University</th>
              <th>Rating</th>
              <th>Comment</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((rev) => (
              <tr key={rev._id}>
                <td>{rev.scholarshipName}</td>
                <td>{rev.universityName}</td>
                <td>⭐ {rev.rating}</td>
                <td>{rev.comment}</td>
                <td>{new Date(rev.createdAt).toLocaleDateString()}</td>

                <td className="space-x-1">
                  <button
                    className="btn btn-xs btn-primary"
                    onClick={() => {
                      setEditReview(rev);
                      setRating(rev.rating);
                      setComment(rev.comment);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-xs btn-error text-red"
                    onClick={() => deleteMutation.mutate(rev._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ================= MODAL ================= */}
      {editReview && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[400px]">

            <h3 className="font-bold mb-2">Edit Review</h3>

            {/* Rating */}
            <input
              type="number"
              min="1"
              max="5"
              className="input input-bordered w-full mb-3"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            />

            {/* Comment */}
            <textarea
              className="textarea textarea-bordered w-full"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="btn btn-sm"
                onClick={() => setEditReview(null)}
              >
                Cancel
              </button>

              <button
                className="btn btn-sm btn-primary"
                onClick={() =>
                  updateMutation.mutate({
                    id: editReview._id,
                    rating,
                    comment,
                  })
                }
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyReviews;