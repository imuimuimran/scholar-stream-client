import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import axios from "../../../api/axiosSecure";
import { useState } from "react";
import TableSkeleton from "../../../components/shared/TableSkeleton";

const ManageApplications = () => {
  const queryClient = useQueryClient();

  const [selectedApp, setSelectedApp] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");

  /* ================= FETCH ================= */
  const { data: apps = [], isLoading } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axios.get("/api/applications");
      return res.data;
    },
  });

  /* ================= STATUS ================= */
  const statusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      await axios.patch(
        `/api/applications/${id}/status`,
        { status }
      );
    },

    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      }),
  });

  /* ================= FEEDBACK ================= */
  const feedbackMutation = useMutation({
    mutationFn: async ({ id, feedback }) => {
      await axios.patch(
        `/api/applications/${id}/feedback`,
        { feedback }
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      });

      setSelectedApp(null);
    },
  });

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
    <div className="bg-base-100 p-6 rounded-xl shadow">

      <h2 className="text-2xl font-bold mb-6">
        Manage Applications
      </h2>

      <div className="overflow-x-auto">

        <table className="table table-zebra">

          <thead>
            <tr>
              <th>Applicant</th>
              <th>Email</th>
              <th>University</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Details</th>
              <th>Change Status</th>
              <th>Feedback</th>
            </tr>
          </thead>

          <tbody>
            {apps.map((app) => (
              <tr key={app._id}>

                {/* Applicant */}
                <td className="font-medium">
                  {app.name}
                </td>

                {/* Email */}
                <td>{app.userEmail}</td>

                {/* University */}
                <td>{app.universityName}</td>

                {/* Application Status */}
                <td>
                  <span className="badge badge-primary">
                    {app.applicationStatus}
                  </span>
                </td>

                {/* Payment Status */}
                <td>
                  <span
                    className={`badge ${app.paymentStatus === "paid"
                        ? "badge-success"
                        : "badge-warning"
                      }`}
                  >
                    {app.paymentStatus}
                  </span>
                </td>

                {/* Details Button */}
                <td>
                  <button
                    className="btn btn-xs btn-outline"
                    onClick={() => setSelectedApp(app)}
                  >
                    Details
                  </button>
                </td>

                {/* Status Select */}
                <td>
                  <select
                    className="select select-bordered select-xs"
                    value={app.applicationStatus}
                    onChange={(e) =>
                      statusMutation.mutate({
                        id: app._id,
                        status: e.target.value,
                      })
                    }
                  >
                    <option value="pending">
                      pending
                    </option>

                    <option value="processing">
                      processing
                    </option>

                    <option value="completed">
                      completed
                    </option>

                    <option value="rejected">
                      rejected
                    </option>
                  </select>
                </td>

                {/* Feedback */}
                <td>
                  <button
                    className="btn btn-xs btn-primary"
                    onClick={() => {
                      setSelectedApp(app);
                      setFeedbackText(app.feedback || "");
                    }}
                  >
                    Feedback
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* ================= MODAL ================= */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">

          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-xl p-6 max-h-[90vh] overflow-y-auto">

            {/* HEADER */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                Application Details
              </h2>

              <button
                onClick={() => setSelectedApp(null)}
                className="btn btn-sm btn-circle"
              >
                ✕
              </button>
            </div>

            {/* ================= APPLICANT INFO ================= */}
            <div className="border rounded-xl p-5 mb-6">

              <h3 className="text-xl font-semibold mb-4 text-primary">
                Applicant Info
              </h3>

              <div className="flex items-center gap-5">

                {/* Image */}
                <img
                  src={
                    selectedApp.photoURL ||
                    "https://i.ibb.co/4pDNDk1/avatar.png"
                  }
                  alt=""
                  className="w-24 h-24 rounded-full object-cover border"
                />

                {/* Info */}
                <div className="space-y-2">

                  <p>
                    <span className="font-semibold">
                      Applicant Name:
                    </span>{" "}
                    {selectedApp.name}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Applicant Email:
                    </span>{" "}
                    {selectedApp.userEmail}
                  </p>

                  <p>
                    <span className="font-semibold">
                      Payment Status:
                    </span>{" "}
                    {selectedApp.paymentStatus}
                  </p>

                </div>

              </div>
            </div>

            {/* ================= SCHOLARSHIP INFO ================= */}
            <div className="border rounded-xl p-5">

              <h3 className="text-xl font-semibold mb-4 text-primary">
                Scholarship Info
              </h3>

              <div className="grid md:grid-cols-2 gap-4">

                <p>
                  <span className="font-semibold">
                    Scholarship Name:
                  </span>{" "}
                  {selectedApp.scholarshipName}
                </p>

                <p>
                  <span className="font-semibold">
                    University Name:
                  </span>{" "}
                  {selectedApp.universityName}
                </p>

                <p>
                  <span className="font-semibold">
                    World Rank:
                  </span>{" "}
                  {selectedApp.universityWorldRank ||
                    "N/A"}
                </p>

                <p>
                  <span className="font-semibold">
                    Category:
                  </span>{" "}
                  {selectedApp.scholarshipCategory}
                </p>

                <p>
                  <span className="font-semibold">
                    Degree:
                  </span>{" "}
                  {selectedApp.degree}
                </p>

                <p>
                  <span className="font-semibold">
                    Subject:
                  </span>{" "}
                  {selectedApp.subjectCategory}
                </p>

              </div>

            </div>

            {/* ================= FEEDBACK ================= */}
            <div className="mt-6">

              <h3 className="text-lg font-semibold mb-2">
                Moderator Feedback
              </h3>

              <textarea
                className="textarea textarea-bordered w-full"
                rows={5}
                placeholder="Write feedback..."
                value={feedbackText}
                onChange={(e) =>
                  setFeedbackText(e.target.value)
                }
              />

              <div className="flex justify-end mt-4">

                <button
                  className="btn btn-primary"
                  onClick={() =>
                    feedbackMutation.mutate({
                      id: selectedApp._id,
                      feedback: feedbackText,
                    })
                  }
                >
                  Save Feedback
                </button>

              </div>

            </div>

          </div>

        </div>
      )}
    </div>
  );
};

export default ManageApplications;