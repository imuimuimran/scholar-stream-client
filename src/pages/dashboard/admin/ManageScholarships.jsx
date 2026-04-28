import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../../api/axiosSecure";

const ManageScholarships = () => {
  const queryClient = useQueryClient();

  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState({
    scholarshipName: "",
    universityName: "",
    universityImage: "",
    country: "",
    category: "",
    applicationFees: "",
  });

  /* ================= FETCH ================= */
  const { data = [], isLoading } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const res = await axios.get("/api/scholarships");
      return res.data.data || res.data;
    },
  });

  /* ================= CREATE ================= */
  const createMutation = useMutation({
    mutationFn: (newData) =>
      axios.post("/api/scholarships", newData),
    onSuccess: () => {
      queryClient.invalidateQueries(["scholarships"]);
      closeModal();
    },
  });

  /* ================= UPDATE ================= */
  const updateMutation = useMutation({
    mutationFn: ({ id, updatedData }) =>
      axios.patch(`/api/scholarships/${id}`, updatedData),
    onSuccess: () => {
      queryClient.invalidateQueries(["scholarships"]);
      closeModal();
    },
  });

  /* ================= DELETE ================= */
  const deleteMutation = useMutation({
    mutationFn: (id) =>
      axios.delete(`/api/scholarships/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["scholarships"]);
    },
  });

  /* ================= HANDLERS ================= */
  const openCreate = () => {
    setSelected(null);
    setFormData({
      scholarshipName: "",
      universityName: "",
      universityImage: "",
      country: "",
      category: "",
      applicationFees: "",
    });
    document.getElementById("scholarship_modal").showModal();
  };

  const openEdit = (sch) => {
    setSelected(sch);
    setFormData(sch);
    document.getElementById("scholarship_modal").showModal();
  };

  const closeModal = () => {
    document.getElementById("scholarship_modal").close();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selected) {
      updateMutation.mutate({
        id: selected._id,
        updatedData: formData,
      });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure?")) {
      deleteMutation.mutate(id);
    }
  };

  /* ================= UI ================= */
  if (isLoading) {
    return <span className="loading loading-spinner"></span>;
  }

  return (
    <div>

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Manage Scholarships
        </h1>

        <button onClick={openCreate} className="btn btn-primary">
          + Add Scholarship
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto bg-base-100 rounded-xl shadow">
        <table className="table">
          <thead>
            <tr>
              <th>University</th>
              <th>Category</th>
              <th>Country</th>
              <th>Fees</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((sch) => (
              <tr key={sch._id}>
                <td>{sch.universityName}</td>
                <td>{sch.category}</td>
                <td>{sch.country}</td>
                <td>${sch.applicationFees}</td>

                <td className="space-x-2">
                  <button
                    onClick={() => openEdit(sch)}
                    className="btn btn-sm btn-info"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(sch._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      <dialog id="scholarship_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">
            {selected ? "Update Scholarship" : "Add Scholarship"}
          </h3>

          <form onSubmit={handleSubmit} className="space-y-3">

            <input
              className="input input-bordered w-full"
              placeholder="Scholarship Name"
              value={formData.scholarshipName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  scholarshipName: e.target.value,
                })
              }
              required
            />

            <input
              className="input input-bordered w-full"
              placeholder="University Name"
              value={formData.universityName}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  universityName: e.target.value,
                })
              }
              required
            />

            <input
              className="input input-bordered w-full"
              placeholder="Image URL"
              value={formData.universityImage}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  universityImage: e.target.value,
                })
              }
            />

            <input
              className="input input-bordered w-full"
              placeholder="Country"
              value={formData.country}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  country: e.target.value,
                })
              }
            />

            <select
              className="select select-bordered w-full"
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value,
                })
              }
            >
              <option value="">Select Category</option>
              <option>Full Funded</option>
              <option>Partial</option>
              <option>Self Funded</option>
            </select>

            <input
              type="number"
              className="input input-bordered w-full"
              placeholder="Application Fees"
              value={formData.applicationFees}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  applicationFees: e.target.value,
                })
              }
            />

            <div className="modal-action">
              <button type="submit" className="btn btn-primary">
                {selected ? "Update" : "Create"}
              </button>

              <button
                type="button"
                onClick={closeModal}
                className="btn"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ManageScholarships;