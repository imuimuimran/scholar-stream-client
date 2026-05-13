import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../../api/axiosSecure";
import { useState } from "react";

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
      await axios.patch(`/api/applications/${id}/status`, { status });
    },

    onSuccess: () => queryClient.invalidateQueries({
      queryKey: ["applications"],
    }),
  });

  /* ================= FEEDBACK ================= */
  const feedbackMutation = useMutation({
    mutationFn: async ({ id, feedback }) => {
      await axios.patch(`/api/applications/${id}/feedback`, {
        feedback,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["applications"],
      }),
        setSelectedApp(null);
    },
  });

  if (isLoading) {
    return <span className="loading loading-spinner"></span>;
  }

  return (
    <div className="bg-base-100 p-6 rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Manage Applications</h2>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Applicant</th>
              <th>Email</th>
              <th>University</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {apps.map((app) => (
              <tr key={app._id}>
                <td>{app.name}</td>
                <td>{app.userEmail}</td>
                <td>{app.universityName}</td>

                <td>
                  <span className="badge">{app.applicationStatus}</span>
                </td>

                <td>
                  <span className="badge badge-outline">
                    {app.paymentStatus}
                  </span>
                </td>

                <td className="space-x-1">
                  {/* DETAILS */}
                  <button
                    className="btn btn-xs"
                    onClick={() => setSelectedApp(app)}
                  >
                    Details
                  </button>

                  {/* STATUS */}
                  <select
                    className="select select-xs"
                    value={app.applicationStatus}
                    onChange={(e) =>
                      statusMutation.mutate({
                        id: app._id,
                        status: e.target.value,
                      })
                    }
                  >
                    <option>pending</option>
                    <option>processing</option>
                    <option>completed</option>
                    <option>rejected</option>
                  </select>

                  {/* FEEDBACK */}
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
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-xl w-[400px]">

            <h3 className="font-bold mb-2">
              {selectedApp.universityName}
            </h3>

            <p className="text-sm mb-2">
              {selectedApp.userEmail}
            </p>

            <textarea
              className="textarea textarea-bordered w-full"
              placeholder="Write feedback..."
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                className="btn btn-sm"
                onClick={() => setSelectedApp(null)}
              >
                Close
              </button>

              <button
                className="btn btn-sm btn-primary"
                onClick={() =>
                  feedbackMutation.mutate({
                    id: selectedApp._id,
                    feedback: feedbackText,
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

export default ManageApplications;