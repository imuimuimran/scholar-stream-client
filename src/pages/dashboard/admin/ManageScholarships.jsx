import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../../api/axiosSecure";

const initialForm = {
  scholarshipName: "",
  universityName: "",
  universityImage: "",
  universityCountry: "",
  universityCity: "",
  universityWorldRank: "",
  subjectCategory: "",
  scholarshipCategory: "",
  degree: "",
  tuitionFees: "",
  applicationFees: "",
  serviceCharge: "",
  applicationDeadline: "",
  description: "",
  stipendDetails: "",
};

const ManageScholarships = () => {
  const queryClient = useQueryClient();

  const [selected, setSelected] = useState(null);
  const [formData, setFormData] = useState(initialForm);

  /* ================= FETCH ================= */

  const { data = [], isLoading } = useQuery({
    queryKey: ["scholarships"],
    queryFn: async () => {
      const res = await axios.get("/api/scholarships");
      return res.data.data || [];
    },
  });

  /* ================= CREATE ================= */

  const createMutation = useMutation({
    mutationFn: async (newData) => {
      const res = await axios.post("/api/scholarships", newData);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["scholarships"]);
      closeModal();
    },

    onError: (err) => {
      console.log(err.response?.data || err.message);
      alert("Create failed");
    },
  });

  /* ================= UPDATE ================= */

  const updateMutation = useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const res = await axios.patch(
        `/api/scholarships/${id}`,
        updatedData
      );

      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["scholarships"]);
      closeModal();
    },
  });

  /* ================= DELETE ================= */

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await axios.delete(`/api/scholarships/${id}`);
      return res.data;
    },

    onSuccess: () => {
      queryClient.invalidateQueries(["scholarships"]);
    },
  });

  /* ================= HANDLERS ================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const openCreate = () => {
    setSelected(null);
    setFormData(initialForm);

    document.getElementById("scholarship_modal").showModal();
  };

  const openEdit = (sch) => {
    setSelected(sch);

    setFormData({
      ...initialForm,
      ...sch,
      applicationDeadline: sch.applicationDeadline
        ? sch.applicationDeadline.split("T")[0]
        : "",
    });

    document.getElementById("scholarship_modal").showModal();
  };

  const closeModal = () => {
    document.getElementById("scholarship_modal").close();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,

      universityWorldRank: Number(formData.universityWorldRank),

      tuitionFees: Number(formData.tuitionFees),

      applicationFees: Number(formData.applicationFees),

      serviceCharge: Number(formData.serviceCharge),
    };

    console.log(payload);

    if (selected) {
      updateMutation.mutate({
        id: selected._id,
        updatedData: payload,
      });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete?"
    );

    if (confirmDelete) {
      deleteMutation.mutate(id);
    }
  };

  /* ================= LOADING ================= */

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div>

      {/* HEADER */}

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">
          Manage Scholarships
        </h1>

        <button
          onClick={openCreate}
          className="btn btn-primary"
        >
          + Add Scholarship
        </button>
      </div>

      {/* TABLE */}

      <div className="overflow-x-auto bg-base-100 rounded-xl shadow">

        <table className="table">

          <thead>
            <tr>
              <th>University</th>
              <th>Country</th>
              <th>Category</th>
              <th>Degree</th>
              <th>Fees</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {data.map((sch) => (
              <tr key={sch._id}>

                <td>{sch.universityName}</td>

                <td>{sch.universityCountry}</td>

                <td>{sch.scholarshipCategory}</td>

                <td>{sch.degree}</td>

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

        <div className="modal-box max-w-3xl">

          <h3 className="font-bold text-2xl mb-5">
            {selected
              ? "Update Scholarship"
              : "Add Scholarship"}
          </h3>

          <form
            onSubmit={handleSubmit}
            className="grid md:grid-cols-2 gap-4"
          >

            <input
              name="scholarshipName"
              value={formData.scholarshipName}
              onChange={handleChange}
              placeholder="Scholarship Name"
              className="input input-bordered w-full"
              required
            />

            <input
              name="universityName"
              value={formData.universityName}
              onChange={handleChange}
              placeholder="University Name"
              className="input input-bordered w-full"
              required
            />

            <input
              name="universityImage"
              value={formData.universityImage}
              onChange={handleChange}
              placeholder="University Image URL"
              className="input input-bordered w-full"
              required
            />

            <input
              name="universityCountry"
              value={formData.universityCountry}
              onChange={handleChange}
              placeholder="University Country"
              className="input input-bordered w-full"
              required
            />

            <input
              name="universityCity"
              value={formData.universityCity}
              onChange={handleChange}
              placeholder="University City"
              className="input input-bordered w-full"
              required
            />

            <input
              type="number"
              name="universityWorldRank"
              value={formData.universityWorldRank}
              onChange={handleChange}
              placeholder="World Rank"
              className="input input-bordered w-full"
              required
            />

            <input
              name="subjectCategory"
              value={formData.subjectCategory}
              onChange={handleChange}
              placeholder="Subject Category"
              className="input input-bordered w-full"
              required
            />

            <select
              name="scholarshipCategory"
              value={formData.scholarshipCategory}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select Category</option>
              <option value="Full fund">Full fund</option>
              <option value="Partial">Partial</option>
              <option value="Self-fund">Self-fund</option>
            </select>

            <select
              name="degree"
              value={formData.degree}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select Degree</option>
              <option value="Diploma">Diploma</option>
              <option value="Bachelor">Bachelor</option>
              <option value="Masters">Masters</option>
            </select>

            <input
              type="number"
              name="tuitionFees"
              value={formData.tuitionFees}
              onChange={handleChange}
              placeholder="Tuition Fees"
              className="input input-bordered w-full"
            />

            <input
              type="number"
              name="applicationFees"
              value={formData.applicationFees}
              onChange={handleChange}
              placeholder="Application Fees"
              className="input input-bordered w-full"
              required
            />

            <input
              type="number"
              name="serviceCharge"
              value={formData.serviceCharge}
              onChange={handleChange}
              placeholder="Service Charge"
              className="input input-bordered w-full"
            />

            <input
              type="date"
              name="applicationDeadline"
              value={formData.applicationDeadline}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Description"
              className="textarea textarea-bordered md:col-span-2"
            />

            <textarea
              name="stipendDetails"
              value={formData.stipendDetails}
              onChange={handleChange}
              placeholder="Stipend Details"
              className="textarea textarea-bordered md:col-span-2"
            />

            <div className="md:col-span-2 flex justify-end gap-3 mt-4">

              <button
                type="button"
                onClick={closeModal}
                className="btn"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="btn btn-primary"
              >
                {selected ? "Update" : "Create"}
              </button>

            </div>

          </form>

        </div>

      </dialog>

    </div>
  );
};

export default ManageScholarships;