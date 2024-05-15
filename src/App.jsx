import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./modules/auth/pages/Login";
import UnAuthorized from "./modules/auth/pages/UnAuthorized";
import NotFound from "./modules/auth/pages/NotFound";
import Layout from "./modules/core/Layout";
import Dashboard from "./modules/dashboard/Dashboard";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Toaster } from "react-hot-toast";
import Users from "./modules/users/Users";
// import Reservation from "./modules/reservation/pages/Reservation";
// import ReservationPage from "./modules/reservation/pages/ReservationPage";
import UserAccount from "./modules/finance/pages/UserAccount";
import { RoleEnum } from "./enums/role-enum";
import WithPageRequiredAuth from "./modules/auth/context/with-page-required-auth";
import WithPageRequiredGuest from "./modules/auth/context/with-page-required-guest";
import Services from "./modules/services/pages/Services.admin";
import ServicesView from "./modules/services/pages/Services.user";
import FinanceUser from "./modules/finance/pages/Finance.user";
import ReservationUser from "./modules/reservation/pages/Reservation.user";
import Agencies from "./modules/agencies/Agencies";
import Finance from "./modules/finance/pages/Finance.admin";
import Accounts from "./modules/finance/pages/Accounts";
import Reservation from "./modules/reservation/pages/Reservation.admin";
import ReservationPage from "./modules/reservation/pages/ReservationPage.admin";

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
      <BrowserRouter>
        <Routes>
          <Route
            path="login"
            element={
              <WithPageRequiredGuest>
                <Login />
              </WithPageRequiredGuest>
            }
          />
          <Route path="unauthorized" element={<UnAuthorized />} />
          <Route path="*" element={<NotFound />} />

          {/* Admin View */}
          <Route
            path="/"
            element={
              <WithPageRequiredAuth options={{ roles: [RoleEnum.admin] }}>
                <Layout />
              </WithPageRequiredAuth>
            }
          >
            <Route path="Dashboard" element={<Dashboard />} />
            <Route path="Agencies" element={<Agencies />} />
            <Route path="Users" element={<Users />} />
            <Route path="Services" element={<Services />} />
            <Route path="Reservations" element={<Reservation />} />
            <Route path="Reservation/:id" element={<ReservationPage />} />
            {/* <Route path="Reservation" element={<Reservation />} /> */}
            <Route path="Finance" element={<Finance />} />
            <Route path="Accounts" element={<Accounts />} />
            <Route path="UserAccount/:id" element={<UserAccount />} />
          </Route>

          {/* Users View */}
          <Route
            path="/user"
            element={
              <WithPageRequiredAuth options={{ roles: [RoleEnum.travelAgent] }}>
                <Layout />
              </WithPageRequiredAuth>
            }
          >
            <Route path="Home" element={<ServicesView />} />
            <Route path="Finance" element={<FinanceUser />} />
            <Route path="Reservations" element={<ReservationUser />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
