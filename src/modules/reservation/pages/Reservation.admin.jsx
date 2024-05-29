import { Tabs, Tab, Pagination } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import ReservationCard from "../components/ReservationCard";
import { ClockLoader } from "react-spinners";
import { getAllReservations } from "../reservation.handlers";
import useAuthTokens from "../../auth/context/use-auth-tokens";
import useAuth from "../../auth/context/use-auth";
import { RoleEnum } from "../../../enums/role-enum";

export default function Reservation() {
  // Get auth token and user info
  const tokenObj = useAuthTokens();
  const token = tokenObj.tokensInfoRef.current.token;
  const { user, isLoaded } = useAuth();
  const role = user?.role?.id;

  // Refs and state variables
  const isAdmin = useRef(false);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 6;

  // Effect to update the total number of pages based on reservations count
  useEffect(() => {
    if (reservations.count !== undefined) {
      setTotal(Math.ceil(parseInt(reservations.count[selected]) / limit));
    }
  }, [reservations, selected]);

  // Effect to check if the user is an admin
  useEffect(() => {
    isAdmin.current = role === RoleEnum.admin;
  }, [isLoaded, role]);

  // Effect to fetch reservations whenever token, selected tab or page changes
  useEffect(() => {
    getAllReservations(setReservations, setIsLoading, selected, page, limit, {}, {}, token);
  }, [token, selected, page]);

  return (
    <div className="m-5 mt-1 p-5 rounded-lg bg-white flex flex-col justify-center">
      <Tabs
        aria-label="Options"
        variant="underlined"
        selectedKey={selected}
        onSelectionChange={setSelected}
      >
        {/* Tab for All Reservations */}
        <Tab
          key="all"
          title={<p className="font-semibold">All ({reservations?.count?.all ?? 0})</p>}
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <ClockLoader color="primary" size={100} />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 px-5 mt-5 lg:grid-cols-2">
              {reservations?.data?.map((reservation) => (
                <ReservationCard
                  Reservation={reservation}
                  key={reservation.id}
                  isAdmin={isAdmin.current}
                />
              ))}
            </div>
          )}
        </Tab>

        {/* Tab for Confirmed Reservations */}
        <Tab
          key="confirmed"
          title={<p className="text-success font-semibold">Reserved ({reservations.count?.confirmed ?? 0})</p>}
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <ClockLoader color="#36d7b7" size={100} />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 px-5 mt-5 lg:grid-cols-2">
              {reservations?.data?.map((reservation) => (
                <ReservationCard
                  Reservation={reservation}
                  key={reservation.id}
                  isAdmin={isAdmin.current}
                />
              ))}
            </div>
          )}
        </Tab>

        {/* Tab for Pending Reservations */}
        <Tab
          key="pending"
          title={<p className="text-warning font-semibold">Pending ({reservations.count?.pending ?? 0})</p>}
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <ClockLoader color="#36d7b7" size={100} />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 px-5 mt-5 lg:grid-cols-2">
              {reservations?.data?.map((reservation) => (
                <ReservationCard
                  Reservation={reservation}
                  key={reservation.id}
                  isAdmin={isAdmin.current}
                />
              ))}
            </div>
          )}
        </Tab>

        {/* Tab for Canceled Reservations */}
        <Tab
          key="canceled"
          title={<p className="text-danger font-semibold">Cancelled ({reservations.count?.canceled ?? 0})</p>}
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <ClockLoader color="#36d7b7" size={100} />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 px-5 mt-5 lg:grid-cols-2">
              {reservations?.data?.map((reservation) => (
                <ReservationCard
                  Reservation={reservation}
                  key={reservation.id}
                  isAdmin={isAdmin.current}
                />
              ))}
            </div>
          )}
        </Tab>

        {/* Tab for Reservations Requiring Action */}
        <Tab
          key="action_required"
          title={<p className="text-secondary font-semibold">Action required ({reservations.count?.action_required ?? 0})</p>}
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <ClockLoader color="#36d7b7" size={100} />
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 px-5 mt-5 lg:grid-cols-2">
              {reservations?.data?.map((reservation) => (
                <ReservationCard
                  Reservation={reservation}
                  key={reservation.id}
                  isAdmin={isAdmin.current}
                />
              ))}
            </div>
          )}
        </Tab>
      </Tabs>

      {/* Pagination Control */}
      <Pagination
        className="self-center"
        showControls
        classNames={{ cursor: "bg-foreground text-background" }}
        color="default"
        page={page}
        total={total}
        variant="light"
        onChange={setPage}
      />
    </div>
  );
}
