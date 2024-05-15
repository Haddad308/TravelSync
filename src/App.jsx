import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./modules/auth/pages/Login";
import UnAuthorized from "./modules/auth/pages/UnAuthorized";
import NotFound from "./modules/auth/pages/NotFound";
import Layout from "./modules/core/Layout";
import Dashboard from "./modules/dashboard/Dashboard";
import Agencies from "./modules/agencies/Agencies";
import { useEffect } from "react";
// import ProtectRoutes from "./network/ProtectRoutes";
// import Redirection from "./network/Redirection";
import { useTranslation } from "react-i18next";
import { Toaster } from "react-hot-toast";
import Users from "./modules/users/Users";
import Services from "./modules/services/Services";
import Reservation from "./modules/reservation/pages/Reservation";
import ReservationPage from "./modules/reservation/pages/ReservationPage";
import Finance from "./modules/finance/pages/Finance";
import Accounts from "./modules/finance/pages/Accounts";
import UserAccount from "./modules/finance/pages/UserAccount";
// import withPageRequiredAuth from "./modules/auth/context/with-page-required-auth";
import { RoleEnum } from "./enums/role-enum";
import WithPageRequiredAuth from "./modules/auth/context/with-page-required-auth";
import WithPageRequiredGuest from "./modules/auth/context/with-page-required-guest";

const routers = createBrowserRouter([
  {
    path: "",
    element: (
      <WithPageRequiredAuth options={{ roles: [RoleEnum.admin] }}>
        <Layout />
      </WithPageRequiredAuth>
    ),
    children: [
      // { index: true, element: <Redirection /> },
      {
        path: "dashboard",
        element: (
          // <WithPageRequiredAuth options={{ roles: [RoleEnum.admin] }}>
          <Dashboard />
          // </WithPageRequiredAuth>
        ),
      },
      {
        path: "agencies",
        element: (
          // <WithPageRequiredAuth
          //   // roles={[RoleEnum.admin]}
          //   options={{ roles: [RoleEnum.travelAgent] }}
          // >
          <Agencies />
          // </WithPageRequiredAuth>
        ),
      },
      {
        path: "users",
        element: (
          // <WithPageRequiredAuth options={{ roles: [RoleEnum.admin] }}>
          <Users />
          // </WithPageRequiredAuth>
        ),
      },
      {
        path: "services",
        element: (
          // <WithPageRequiredAuth options={{ roles: [RoleEnum.admin] }}>
          <Services />
          // </WithPageRequiredAuth>
        ),
      },
      {
        path: "Reservations",
        element: (
          // <WithPageRequiredAuth options={{ roles: [RoleEnum.admin] }}>
          <Reservation />
          // </WithPageRequiredAuth>
        ),
      },
      {
        path: "Reservation/:id",
        element: (
          // <WithPageRequiredAuth options={{ roles: [RoleEnum.admin] }}>
          <ReservationPage />
          // </WithPageRequiredAuth>
        ),
      },
      {
        path: "Finance",
        element: (
          // <WithPageRequiredAuth options={{ roles: [RoleEnum.admin] }}>
          <Finance />
          // </WithPageRequiredAuth>
        ),
      },
      {
        path: "Accounts",
        element: (
          // <WithPageRequiredAuth options={{ roles: [RoleEnum.admin] }}>
          <Accounts />
          // </WithPageRequiredAuth>
        ),
      },
      {
        path: "UserAccount/:id",
        element: (
          // <WithPageRequiredAuth options={{ roles: [RoleEnum.admin] }}>
          <UserAccount />
          // </WithPageRequiredAuth>
        ),
      },
    ],
  },
  {
    path: "login",
    element: (
      <WithPageRequiredGuest>
        <Login />
      </WithPageRequiredGuest>
    ),
  },
  {
    path: "unauthorized",
    element: <UnAuthorized />,
  },
  { path: "", element: <NotFound /> },
]);

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.resolvedLanguage === "ar")
      document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
    else document.getElementsByTagName("html")[0].setAttribute("dir", "ltr");
  }, [i18n.resolvedLanguage]);

  return (
    <>
      <Toaster />
      <RouterProvider router={routers} />
    </>
  );
}

export default App;
