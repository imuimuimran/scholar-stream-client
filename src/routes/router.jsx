import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";


import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

import DashboardLayout from "../layouts/DashboardLayout";

import DashboardHome from "../pages/dashboard/DashboardHome";
import ManageUsers from "../pages/dashboard/ManageUsers";

import Login from "../pages/auth/Login";      
import Register from "../pages/auth/Register"; 

import Checkout from "../pages/payment/Checkout";

import PaymentSuccess from "../pages/payment/PaymentSuccess";
import PaymentFailed from "../pages/payment/PaymentFailed";
import PaymentAccept from "../pages/PaymentAccept";
import PaymentCancel from "../pages/PaymentCancel";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/dashboard" replace />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
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
        path: "payment-accept",
        element: <PaymentAccept />,
      },
      {
        path: "payment-cancel",
        element: <PaymentCancel />,
      },
      {
        path: "checkout",
        element: <PrivateRoute><Checkout /></PrivateRoute>
      },
      {
        path: "payment-success",
        element: <PaymentSuccess />
      },
      {
        path: "payment-failed",
        element: <PaymentFailed />
      }
    ],
  },
]);

export default router;
