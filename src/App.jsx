import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./modules/auth/pages/Login";
import UnAuthorized from "./modules/auth/pages/UnAuthorized";
import NotFound from "./modules/auth/pages/NotFound";
import Layout from "./modules/core/Layout";
import Dashboard from "./modules/dashboard/Dashboard";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Toaster } from "react-hot-toast";
import Users from "./modules/users/Users";
import UserAccount from "./modules/finance/pages/UserAccount.admin";
import { RoleEnum } from "./enums/role-enum";
import WithPageRequiredAuth from "./modules/auth/context/with-page-required-auth";
import WithPageRequiredGuest from "./modules/auth/context/with-page-required-guest";
import Services from "./modules/services/pages/Services.admin";
import ServicesView from "./modules/services/pages/Services.user";
import FinanceUser from "./modules/finance/pages/Finance.user";
import Agencies from "./modules/agencies/Agencies";
import Finance from "./modules/finance/pages/Finance.admin";
import Accounts from "./modules/finance/pages/Accounts.admin";
import Reservation from "./modules/reservation/pages/Reservation.admin";
import ReservationPage from "./modules/reservation/pages/ReservationPage.admin";
import HotelsPage from "./modules/services/pages/Hotels.page";
import ReserveService from "./modules/reservation/pages/ReserveService.user";
import RoomsPage from "./modules/services/pages/Rooms.page";
import ReservationPageUser from "./modules/reservation/pages/ReservationPage.user";

function App() {
  const { i18n } = useTranslation();

  const routers = createBrowserRouter([
    {
      path: "",
      element: <WithPageRequiredAuth options={{ roles: [RoleEnum.admin] }}><Layout /></WithPageRequiredAuth>,
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "agencies", index: true, element: <Agencies /> },
        { path: "users", element: <Users /> },
        { path: "Services", element: <Services /> },
        { path: "Reservations", element: <Reservation /> },
        { path: "Reservation/:id", element: <ReservationPage /> },
        { path: "Finance", element: <Finance /> },
        { path: "Accounts", element: <Accounts /> },
        { path: "UserAccount/:id", element: <UserAccount /> },
      ]
    },
    {
      path: "/user",
      element: <WithPageRequiredAuth options={{ roles: [RoleEnum.travelAgent] }}><Layout /></WithPageRequiredAuth>,
      children: [
        { path: "Home", element: <ServicesView /> },
        { path: "Finance", element: <FinanceUser /> },
        { path: "Reservations", element: <Reservation /> },
        { path: "Reserve/:id", element: <ReserveService /> },
        { path: "hotels/:id", element: <HotelsPage /> },
        { path: "hotel-rooms/:id", element: <RoomsPage /> },
        { path: "ReservationUser/:id", element: <ReservationPageUser /> },
      ]
    },
    { path: "login", element: <WithPageRequiredGuest><Login /></WithPageRequiredGuest> },
    { path: "unauthorized", element: <UnAuthorized /> },
    { path: "*", element: <NotFound /> }
  ]);

  useEffect(() => {
    if (i18n.resolvedLanguage === "ar")
      document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
    else document.getElementsByTagName("html")[0].setAttribute("dir", "ltr");
  }, [i18n.resolvedLanguage]);

  return (
    <RouterProvider router={routers} />
  );
}

export default App;
