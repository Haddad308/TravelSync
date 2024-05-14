import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./modules/auth/pages/Login";
import UnAuthorized from "./modules/auth/pages/UnAuthorized";
import NotFound from "./modules/auth/pages/NotFound";
import Layout from "./modules/core/Layout";
import Dashboard from "./modules/dashboard/Dashboard";
import Agencies from "./modules/agencies/Agencies";
import { useEffect } from "react";
import ProtectRoutes from "./network/ProtectRoutes";
import Redirection from "./network/Redirection";
import { useTranslation } from "react-i18next";
import { Toaster } from "react-hot-toast";
import Users from "./modules/users/Users";
import Reservation from "./modules/reservation/pages/Reservation";
import ReservationPage from "./modules/reservation/pages/ReservationPage";
import Finance from "./modules/finance/pages/Finance";
import Accounts from "./modules/finance/pages/Accounts";
import UserAccount from "./modules/finance/pages/UserAccount";
import Services from "./modules/services/pages/Services.admin";
import ServicesView from "./modules/services/pages/Services.user";

const routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Redirection /> },
      {
        path: "dashboard",
        element: (
          <ProtectRoutes allowedRoles={["admin"]}>
            <Dashboard />
          </ProtectRoutes>
        ),
      },
      {
        path: "agencies",
        element: (
          <ProtectRoutes allowedRoles={["admin"]}>
            <Agencies />
          </ProtectRoutes>
        ),
      },
      {
        path: "users",
        element: (
          <ProtectRoutes allowedRoles={["admin"]}>
            <Users />
          </ProtectRoutes>
        ),
      },
      {
        path: "services",
        element: (
          <ProtectRoutes allowedRoles={["admin"]}>
            <Services />
          </ProtectRoutes>
        ),
      },
      {
        path: "services2",
        element: (
          <ProtectRoutes allowedRoles={["admin"]}>
            <ServicesView />
          </ProtectRoutes>
        ),
      },
      {
        path: "Reservations",
        element: (
          <ProtectRoutes allowedRoles={["admin"]}>
            <Reservation />
          </ProtectRoutes>
        ),
      },
      {
        path: "Reservation/:id",
        element: (
          <ProtectRoutes allowedRoles={["admin"]}>
            <ReservationPage />
          </ProtectRoutes>
        ),
      },
      {
        path: "Finance",
        element: (
          <ProtectRoutes allowedRoles={["admin"]}>
            <Finance />
          </ProtectRoutes>
        ),
      },
      {
        path: "Accounts",
        element: (
          <ProtectRoutes allowedRoles={["admin"]}>
            <Accounts />
          </ProtectRoutes>
        ),
      },
      {
        path: "UserAccount/:id",
        element: (
          <ProtectRoutes allowedRoles={["admin"]}>
            <UserAccount />
          </ProtectRoutes>
        ),
      },
    ],
  },
  { path: "login", element: <Login /> },
  { path: "unauthorized", element: <UnAuthorized /> },
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
