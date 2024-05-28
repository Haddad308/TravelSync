import { Tabs, Tab } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import ReservationCard from "../components/ReservationCard";
import { ClockLoader } from "react-spinners";
import { getReservation } from "../reservation.handlers";
import useAuthTokens from "../../auth/context/use-auth-tokens";
import useAuth from "../../auth/context/use-auth";
import { RoleEnum } from "../../../enums/role-enum";

export default function Reservation() {
  const tokenObj = useAuthTokens();
  const token = tokenObj.tokensInfoRef.current.token;

  const { user, isLoaded } = useAuth();
  const role = user?.role?.id;

  const isAdmin = useRef(false);

  useEffect(() => {
    isAdmin.current = role === RoleEnum.admin;
  }, [isLoaded, role]);

  const [selected, setSelected] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    getReservation(setReservations, setIsLoading, selected, "", token);
  }, [token, selected]);

  useEffect(() => {
    console.log(reservations);
  }, [reservations]);

  return (
    <div className="m-5 p-5 rounded-lg bg-white">
      <Tabs
        aria-label="Options"
        variant="underlined"
        selectedKey={selected}
        onSelectionChange={setSelected}
      >
        <Tab
          key="all"
          title={
            <p className="font-semibold">All ({reservations?.count?.all})</p>
          }
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <ClockLoader color="primary" size={100} />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 px-5 mt-5">
              {reservations &&
                reservations.data?.map(
                  ({ id, status, travelOffice, service, checkInDate }) => {
                    return (
                      <ReservationCard
                        id={id}
                        key={id}
                        status={status}
                        AgencyProfilePhoto={
                          travelOffice?.profilePhoto?.imageUrl
                        }
                        AgencyName={travelOffice.name}
                        AgencyEmail={travelOffice.email}
                        AgencyContact={travelOffice.phone}
                        info1={service.name}
                        info2={service.type}
                        info3={service.description}
                        ReservationDate={checkInDate}
                        isAdmin={isAdmin.current}
                      />
                    );
                  },
                )}
            </div>
          )}
        </Tab>
        <Tab
          key="confirmed"
          title={
            <p className="text-success font-semibold">
              Reserved ({reservations.count?.confirmed ?? 0})
            </p>
          }
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <ClockLoader color="#36d7b7" size={100} />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 px-5 mt-5">
              {reservations.data?.map(
                ({ id, status, travelOffice, service, checkInDate }) => {
                  return (
                    <ReservationCard
                      id={id}
                      key={id}
                      status={status}
                      AgencyProfilePhoto={travelOffice?.profilePhoto?.imageUrl}
                      AgencyName={travelOffice.name}
                      AgencyEmail={travelOffice.email}
                      AgencyContact={travelOffice.phone}
                      info1={service.name}
                      info2={service.type}
                      info3={service.description}
                      ReservationDate={checkInDate}
                      isAdmin={isAdmin.current}
                    />
                  );
                },
              )}
            </div>
          )}
        </Tab>
        <Tab
          key="pending"
          title={
            <p className="text-warning font-semibold">
              Pending ({reservations.count?.pending ?? 0})
            </p>
          }
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <ClockLoader color="#36d7b7" size={100} />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 px-5 mt-5">
              {reservations.data?.map(
                ({ id, status, travelOffice, service, checkInDate }) => {
                  return (
                    <ReservationCard
                      id={id}
                      key={id}
                      status={status}
                      AgencyProfilePhoto={travelOffice?.profilePhoto?.imageUrl}
                      AgencyName={travelOffice.name}
                      AgencyEmail={travelOffice.email}
                      AgencyContact={travelOffice.phone}
                      info1={service.name}
                      info2={service.type}
                      info3={service.description}
                      ReservationDate={checkInDate}
                      isAdmin={isAdmin.current}
                    />
                  );
                },
              )}
            </div>
          )}
        </Tab>
        <Tab
          key="canceled"
          title={
            <p className="text-danger font-semibold">
              Cancelled ({reservations.count?.canceled ?? 0})
            </p>
          }
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <ClockLoader color="#36d7b7" size={100} />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 px-5 mt-5">
              {reservations.data?.map(
                ({ id, status, travelOffice, service, checkInDate }) => {
                  return (
                    <ReservationCard
                      id={id}
                      key={id}
                      status={status}
                      AgencyProfilePhoto={travelOffice?.profilePhoto?.imageUrl}
                      AgencyName={travelOffice.name}
                      AgencyEmail={travelOffice.email}
                      AgencyContact={travelOffice.phone}
                      info1={service.name}
                      info2={service.type}
                      info3={service.description}
                      ReservationDate={checkInDate}
                      isAdmin={isAdmin.current}
                    />
                  );
                },
              )}
            </div>
          )}
        </Tab>
        <Tab
          key="action_required"
          title={
            <p className="text-secondary font-semibold">
              Action required ({reservations.count?.action_required ?? 0})
            </p>
          }
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <ClockLoader color="#36d7b7" size={100} />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 px-5 mt-5">
              {reservations.data?.map(
                ({ id, status, travelOffice, service, checkInDate }) => {
                  return (
                    <ReservationCard
                      id={id}
                      key={id}
                      status={status}
                      AgencyProfilePhoto={travelOffice?.profilePhoto?.imageUrl}
                      AgencyName={travelOffice.name}
                      AgencyEmail={travelOffice.email}
                      AgencyContact={travelOffice.phone}
                      info1={service.name}
                      info2={service.type}
                      info3={service.description}
                      ReservationDate={checkInDate}
                      isAdmin={isAdmin.current}
                    />
                  );
                },
              )}
            </div>
          )}
        </Tab>
      </Tabs>
    </div>
  );
}
