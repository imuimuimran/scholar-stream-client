import { createBrowserRouter } from "react-router-dom";
import { Navigate } from "react-router-dom";


import PrivateRoute from "./PrivateRoute";
import RoleRoute from "./RoleRoute";

import MainLayout from "../layouts/MainLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Home from "../pages/home/Home";
import AllScholarships from "../pages/scholarships/AllScholarships";
import ScholarshipDetails from "../pages/scholarships/ScholarshipDetails";

import DashboardHome from "../pages/dashboard/DashboardHome";
import ManageUsers from "../pages/dashboard/ManageUsers";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Checkout from "../pages/payment/Checkout";

import PaymentSuccess from "../pages/payment/PaymentSuccess";
import PaymentFailed from "../pages/payment/PaymentFailed";
import PaymentAccept from "../pages/PaymentAccept";
import PaymentCancel from "../pages/PaymentCancel";

import MyApplications from "../pages/dashboard/student/MyApplications";
import Analytics from "../pages/dashboard/Analytics";

import ManageScholarships from "../pages/dashboard/admin/ManageScholarships";
import ManageApplications from "../pages/dashboard/moderator/ManageApplications";
import MyReviews from "../pages/dashboard/student/MyReviews";


const router = createBrowserRouter([
  /* ================= MAIN SITE ================= */
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "scholarships", element: <AllScholarships /> },
      { path: "scholarship/:id", element: <ScholarshipDetails /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "payment/:id", element: <checkout /> }
    ],
  },
  /* ================= DASHBOARD ================= */
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <DashboardHome /> },

      {
        path: "manage-users",
        element: (
          <RoleRoute allowedRoles={["Admin"]}>
            <ManageUsers />
          </RoleRoute>
        ),
      },
      {
        path: "manage-applications",
        element: (
          <RoleRoute allowedRoles={["Moderator", "Admin"]}>
            <ManageApplications />
          </RoleRoute>
        ),
      },
      {
        path: "applications",
        element: <MyApplications />
      },
      {
        path: "analytics",
        element: <Analytics />
      },
      {
        path: "manage-scholarships",
        element: <ManageScholarships />
      },
      {
        path: "my-reviews",
        element: <MyReviews />,
      }
    ],
  },
  /* ================= 404 ================= */
  // {
  //   path: "*",
  //   element: <Error404 />,
  // },

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
]);

export default router;
