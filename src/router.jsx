import { lazy } from "react";
const Register = lazy(() => import("./views/authentication/register"));
const Login = lazy(() => import("./views/authentication/login"));
const MdDashboard = lazy(() =>
  import("./views/dashboard/mdDashboard/mdDashboard")
);

export const route = [
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
