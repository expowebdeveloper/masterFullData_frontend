import { lazy } from "react";
const Register = lazy(() => import("./views/authentication/register"));
const Login = lazy(() => import("./views/authentication/login"));
const ForgotPassword = lazy(() => import("./views/authentication/forgotPassword"));
const ResetPassword = lazy(() => import("./views/authentication/resetPassword"));
const MdDashboard = lazy(() =>
  import("./views/dashboard/mdDashboard/mdDashboard")
);

export const route = [
  {
    path: "/reset-password",
    element: <ResetPassword />,
    private: false,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    private: false,
  },
  {
    path: "/register",
    element: <Register />,
    private: false,
  },
  {
    path: "/login",
    element: <Login />,
    private: false,
  },
  {
    path: "/",
    element: <MdDashboard />,
    private: false,
  },
];
