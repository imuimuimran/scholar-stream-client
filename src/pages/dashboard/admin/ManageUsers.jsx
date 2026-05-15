import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "../../../api/axiosSecure";
import TableSkeleton from "../../../components/shared/TableSkeleton";

const ManageUsers = () => {
    const queryClient = useQueryClient();

    const [role, setRole] = useState("");

    const { data: users = [], isLoading } = useQuery({
        queryKey: ["users", role],
        queryFn: async () => {
            const res = await axios.get("/api/users", {
                params: { role },
            });
            return res.data;
        },
    });

    /* ================= UPDATE ROLE ================= */
    const roleMutation = useMutation({
        mutationFn: async ({ id, role }) => {
            await axios.patch(`/api/users/${id}/role`, { role });
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
    });

    /* ================= DELETE USER ================= */
    const deleteMutation = useMutation({
        mutationFn: async (id) => {
            await axios.delete(`/api/users/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
    });

    // if (isLoading) {
    //     return <span className="loading loading-spinner"></span>;
    // }

    if (isLoading) {
        return <TableSkeleton />;
    }

    return (
        <div className="bg-base-100 p-6 rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">Manage Users</h2>

            <div className="overflow-x-auto">



                <select
                    className="select select-bordered"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                >
                    <option value="">All Users</option>
                    <option value="Student">Student</option>
                    <option value="Moderator">Moderator</option>
                    <option value="Admin">Admin</option>
                </select>



                <table className="table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Change Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user.name || "N/A"}</td>
                                <td>{user.email}</td>

                                <td>
                                    <span className="badge badge-outline">
                                        {user.role}
                                    </span>
                                </td>

                                <td>
                                    <select
                                        className="select select-sm select-bordered"
                                        defaultValue={user.role}
                                        onChange={(e) =>
                                            roleMutation.mutate({
                                                id: user._id,
                                                role: e.target.value,
                                            })
                                        }
                                    >
                                        <option>Student</option>
                                        <option>Moderator</option>
                                        <option>Admin</option>
                                    </select>
                                </td>

                                <td>
                                    <button
                                        onClick={() => deleteMutation.mutate(user._id)}
                                        className="btn btn-xs btn-error text-red"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;