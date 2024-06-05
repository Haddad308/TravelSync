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

          <Route
            path="/"
            element={
              <WithPageRequiredAuth options={{ roles: [RoleEnum.admin] }}>
                <Layout>
                  <Dashboard />
                </Layout>
              </WithPageRequiredAuth>
            }
          />
          <Route
            path="dashboard"
            element={
              <WithPageRequiredAuth options={{ roles: [RoleEnum.admin] }}>
                <Layout>
                  <Dashboard />
                </Layout>
              </WithPageRequiredAuth>
            }
          />
          <Route
            path="Agencies"
            element={
              <WithPageRequiredAuth options={{ roles: [RoleEnum.admin] }}>
                <Layout>
                  <Agencies />
                </Layout>
              </WithPageRequiredAuth>
            }
          />
          <Route
            path="/users"
            element={
              <WithPageRequiredAuth options={{ roles: [RoleEnum.admin] }}>
                <Layout>
                  <Users />
                </Layout>
              </WithPageRequiredAuth>
            }
          />
          <Route
            path="/services"
            element={
              <WithPageRequiredAuth options={{ roles: [RoleEnum.admin] }}>
                <Layout>
                  <Services />
                </Layout>
              </WithPageRequiredAuth>
            }
          />
          <Route
            path="/reservations"
            element={
              <WithPageRequiredAuth options={{ roles: [RoleEnum.admin] }}>
                <Layout>
                  <Reservation />
                </Layout>
              </WithPageRequiredAuth>
            }
          />
          <Route
            path="/reservation/:id"
            element={
              <WithPageRequiredAuth options={{ roles: [RoleEnum.admin] }}>
                <Layout>
                  <ReservationPage />
                </Layout>
              </WithPageRequiredAuth>
            }
          />
          <Route
            path="/finance"
            element={
              <WithPageRequiredAuth options={{ roles: [RoleEnum.admin] }}>
                <Layout>
                  <Finance />
                </Layout>
              </WithPageRequiredAuth>
            }
          />
          <Route
            path="/accounts"
            element={
              <WithPageRequiredAuth options={{ roles: [RoleEnum.admin] }}>
                <Layout>
                  <Accounts />
                </Layout>
              </WithPageRequiredAuth>
            }
          />
          <Route
            path="/userAccount/:id"
            element={
              <WithPageRequiredAuth options={{ roles: [RoleEnum.admin] }}>
                <Layout>
                  <UserAccount />
                </Layout>
              </WithPageRequiredAuth>
            }
          />
          <Route
            path="/user/Home"
            element={
              <WithPageRequiredAuth options={{ roles: [RoleEnum.travelAgent] }}>
                <Layout>
                  <ServicesView />
                </Layout>
              </WithPageRequiredAuth>
            }
          />
          <Route
            path="/user/Finance"
            element={
              <WithPageRequiredAuth options={{ roles: [RoleEnum.travelAgent] }}>
                <Layout>
                  <FinanceUser />
                </Layout>
              </WithPageRequiredAuth>
            }
          />
          <Route
            path="/user/Reservations"
            element={
              <WithPageRequiredAuth options={{ roles: [RoleEnum.travelAgent] }}>
                <Layout>
                  <Reservation />
                </Layout>
              </WithPageRequiredAuth>
            }
          />
          <Route
            path="/user/Reserve/:id"
            element={
              <WithPageRequiredAuth options={{ roles: [RoleEnum.travelAgent] }}>
                <Layout>
                  <ReserveService />
                </Layout>
              </WithPageRequiredAuth>
            }
          />
          <Route
            path="/user/hotels/:id"
            element={
              <WithPageRequiredAuth options={{ roles: [RoleEnum.travelAgent] }}>
                <Layout>
                  <HotelsPage />
                </Layout>
              </WithPageRequiredAuth>
            }
          />
          <Route
            path="/user/hotel-rooms/:id"
            element={
              <WithPageRequiredAuth options={{ roles: [RoleEnum.travelAgent] }}>
                <Layout>
                  <RoomsPage />
                </Layout>
              </WithPageRequiredAuth>
            }
          />
          <Route
            path="/user/ReservationUser/:id"
            element={
              <WithPageRequiredAuth options={{ roles: [RoleEnum.travelAgent] }}>
                <Layout>
                  <ReservationPageUser />
                </Layout>
              </WithPageRequiredAuth>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
