import { createBrowserRouter } from "react-router-dom";

import PrivateRoute from "../routes-guards/PrivateRoute";
import RoleRoute from "../routes-guards/RoleRoute";

import DashboardLayout from "../layouts/DashboardLayout";

import DashboardHome from "../pages/dashboard/DashboardHome";
import ManageUsers from "../pages/dashboard/ManageUsers";


const router = createBrowserRouter([
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        element: <DashboardHome />,
      },
      {
        path: "manage-users",
        element: (
          <RoleRoute allowedRoles={["Admin"]}>
            <ManageUsers />
          </RoleRoute>
        ),
      },
      {
        path: "/payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "/payment-cancel",
        element: <PaymentCancel />,
      }
    ],
  },
]);
