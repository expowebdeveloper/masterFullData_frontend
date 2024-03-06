import { lazy } from "react";
import Settings from "./views/adminDashboard/settings/settings";
import Properties from "./views/dashboard/properties/properties";
import Integrations from "./views/integrations/Integrations";
const Register = lazy(() => import("./views/authentication/register"));
const Login = lazy(() => import("./views/authentication/login"));
const ForgotPassword = lazy(() => import("./views/authentication/forgotPassword"));
const OtpVerify = lazy(() => import("./views/authentication/otpVerify"))
const ResetPassword = lazy(() => import("./views/authentication/resetPassword"));
const Dimensions = lazy(() => import("./views/dashboard/dimensions/dimensions") )
const MdDashboard = lazy(() =>
  import("./views/dashboard/mdDashboard/mdDashboard")
);
const SingleDimension = lazy(() =>
  import("./views/dashboard/SingleDimension/singleDimension")
);
const AdminDashboard = lazy(() => import("./views/adminDashboard/dashboard/dashboard"));
const AllUsers = lazy(() => import("./views/adminDashboard/allUsers/allUser"));
const UserDetails = lazy(() => import("./views/adminDashboard/allUsers/userDetails"));
const AssignProperty = lazy(() => import("./views/dashboard/properties/assignProperty"));



export const route = [
  {
    path: "/reset-password/:userId",
    element: <ResetPassword />,
    private: false,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
    private: false,
  },
  {
    path: "/opt-verify/:userId",
    element: <OtpVerify />,
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
    private: true,
  },
  {
    path: "/dimensions",
    element: <Dimensions />,
    private: true,
  },
  {
    path: "/single-dimension",
    element: <SingleDimension />,
    private: true,
  },
  {
    path: "/dashboard",
    element: <AdminDashboard />,
    private: true,
  },
  {
    path: "/properties",
    element: <Properties />,
    private: true,
  },
  {
    path: "/properties/assign-properties/:property-id",
    element: <AssignProperty />,
    private: true,
  },
  {
    path: "/integrations",
    element: <Integrations />,
    private: true,
  },
  {
    path: "/all-users",
    element: <AllUsers />,
    private: true,
  },
  {
    path: "/user-details/:userId",
    element: <UserDetails />,
    private: true,
  },
  {
    path: "/settings",
    element: <Settings/>,
    private: true,
  }
];
