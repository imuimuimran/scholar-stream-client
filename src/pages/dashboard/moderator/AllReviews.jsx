import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import axios from "../../../api/axiosSecure";
import TableSkeleton from "../../../components/shared/TableSkeleton";

const AllReviews = () => {
  const queryClient = useQueryClient();

  /* ================= FETCH REVIEWS ================= */
  const {
    data: reviews = [],
    isLoading,
  } = useQuery({
    queryKey: ["allReviews"],

    queryFn: async () => {
      const res = await axios.get("/api/reviews");
      return res.data;
    },
  });

  /* ================= DELETE REVIEW ================= */
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      await axios.delete(`/api/reviews/${id}`);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["allReviews"],
      });
    },
  });

  /* ================= LOADING ================= */
  // if (isLoading) {
  //   return (
  //     <div className="flex justify-center py-20">
  //       <span className="loading loading-spinner loading-lg"></span>
  //     </div>
  //   );
  // }

  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <div className="bg-base-100 p-6 rounded-2xl shadow">

      {/* ================= HEADING ================= */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">
          All Reviews
        </h1>

        <p className="text-sm opacity-70 mt-1">
          Moderator can manage and remove inappropriate reviews.
        </p>
      </div>

      {/* ================= TABLE ================= */}
      <div className="overflow-x-auto">

        <table className="table table-zebra">

          <thead>
            <tr>
              <th>Student</th>
              <th>Email</th>
              {/* <th>Scholarship</th>
              <th>University</th> */}
              <th>Rating</th>
              <th>Review</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {reviews.map((review) => (
              <tr key={review._id}>

                {/* STUDENT */}
                <td>
                  <div className="flex items-center gap-3">

                    <div className="avatar">
                      <div className="w-12 rounded-full">
                        <img
                          src={
                            review.photoURL ||
                            "https://i.ibb.co/4pDNDk1/avatar.png"
                          }
                          alt=""
                        />
                      </div>
                    </div>

                    <div>
                      <div className="font-bold">
                        {review.reviewerName ||
                          "Unknown User"}
                      </div>
                    </div>

                  </div>
                </td>

                {/* EMAIL */}
                <td>{review.userEmail}</td>

                {/* SCHOLARSHIP */}
                {/* <td>{review.scholarshipName}</td> */}

                {/* UNIVERSITY */}
                {/* <td>{review.universityName}</td> */}

                {/* RATING */}
                <td>
                  <span className="badge badge-warning font-bold">
                    {review.rating}/5
                  </span>
                </td>

                {/* COMMENT */}
                <td className="max-w-xs">
                  <p className="line-clamp-3">
                    {review.comment}
                  </p>
                </td>

                {/* DATE */}
                <td>
                  {new Date(
                    review.reviewDate
                  ).toLocaleDateString()}
                </td>

                {/* ACTION */}
                <td>

                  <button
                    onClick={() => {
                      const confirmDelete =
                        window.confirm(
                          "Are you sure you want to delete this review?"
                        );

                      if (confirmDelete) {
                        deleteMutation.mutate(review._id);
                      }
                    }}
                    className="btn btn-xs btn-error"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>

        {/* EMPTY */}
        {reviews.length === 0 && (
          <div className="text-center py-20 opacity-70">
            No reviews found
          </div>
        )}

      </div>
    </div>
  );
};

export default AllReviews;