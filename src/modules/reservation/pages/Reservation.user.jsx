import { Tabs, Tab } from "@nextui-org/react";
import { useEffect, useState } from "react";
import ReservationCard from "../components/ReservationCard";
import { ClockLoader } from "react-spinners";
import { getReservation } from "../reservation.handlers";
import useAuthTokens from "../../auth/context/use-auth-tokens";

export default function Reservation() {
  const tokenObj = useAuthTokens();
  const token = tokenObj.tokensInfoRef.current.token;

  const [selected, setSelected] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    getReservation(setReservations, setIsLoading, selected, "", token);
  }, [token, selected]);

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
          title={<p className="font-semibold">All ({reservations.length})</p>}
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <ClockLoader color="#36d7b7" size={100} />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 px-5 mt-5">
              {reservations?.map(
                ({ id, status, travelOffice, service, checkInDate }) => {
                  return (
                    <ReservationCard
                      id={id}
                      key={id}
                      status={status}
                      AgencyName={travelOffice.name}
                      AgencyEmail={travelOffice.email}
                      AgencyContact={travelOffice.phone}
                      info1={service.name}
                      info2={service.type}
                      info3={service.description}
                      ReservationDate={checkInDate}
                      isAdmin={true}
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
            <p className="text-green-500 font-semibold">
              Reserved ({reservations.count.confirmed})
            </p>
          }
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <ClockLoader color="#36d7b7" size={100} />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 px-5 mt-5">
              {reservations?.map(
                ({ id, status, travelOffice, service, checkInDate }) => {
                  return (
                    <ReservationCard
                      id={id}
                      key={id}
                      status={status}
                      AgencyName={travelOffice.name}
                      AgencyEmail={travelOffice.email}
                      AgencyContact={travelOffice.phone}
                      info1={service.name}
                      info2={service.type}
                      info3={service.description}
                      ReservationDate={checkInDate}
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
            <p className="text-yellow-500 font-semibold">
              Pending ({reservations.count.pending})
            </p>
          }
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <ClockLoader color="#36d7b7" size={100} />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 px-5 mt-5">
              {reservations?.map(
                ({ id, status, travelOffice, service, checkInDate }) => {
                  return (
                    <ReservationCard
                      id={id}
                      key={id}
                      status={status}
                      AgencyName={travelOffice.name}
                      AgencyEmail={travelOffice.email}
                      AgencyContact={travelOffice.phone}
                      info1={service.name}
                      info2={service.type}
                      info3={service.description}
                      ReservationDate={checkInDate}
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
            <p className="text-red-500 font-semibold">
              Cancelled ({reservations.count.cancelled})
            </p>
          }
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <ClockLoader color="#36d7b7" size={100} />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 px-5 mt-5">
              {reservations?.map(
                ({ id, status, travelOffice, service, checkInDate }) => {
                  return (
                    <ReservationCard
                      id={id}
                      key={id}
                      status={status}
                      AgencyName={travelOffice.name}
                      AgencyEmail={travelOffice.email}
                      AgencyContact={travelOffice.phone}
                      info1={service.name}
                      info2={service.type}
                      info3={service.description}
                      ReservationDate={checkInDate}
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
            <p className="text-sky-600 font-semibold">
              Action required ({reservations.length})
            </p>
          }
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <ClockLoader color="#36d7b7" size={100} />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 px-5 mt-5">
              {reservations?.map(
                ({ id, status, travelOffice, service, checkInDate }) => {
                  return (
                    <ReservationCard
                      id={id}
                      key={id}
                      status={status}
                      AgencyName={travelOffice.name}
                      AgencyEmail={travelOffice.email}
                      AgencyContact={travelOffice.phone}
                      info1={service.name}
                      info2={service.type}
                      info3={service.description}
                      ReservationDate={checkInDate}
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
