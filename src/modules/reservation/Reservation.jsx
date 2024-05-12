/* eslint-disable no-unused-vars */
import { Tabs, Tab } from "@nextui-org/react";
import { useEffect, useState } from "react";
import ReservationCard from "./components/ReservationCard";
import { ClockLoader } from "react-spinners";

export default function Reservation() {
  // *make the reserve page.

  const [selected, setSelected] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    console.log(selected);
  }, [selected]);

  return (
    <div className="m-5 p-5 rounded-lg bg-white">
      <Tabs
        aria-label="Options"
        variant="underlined"
        selectedKey={selected}
        onSelectionChange={setSelected}
      >
        <Tab key="all" title={<p className="font-semibold">All</p>}>
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <ClockLoader color="#36d7b7" size={100} />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 px-5 mt-5">
              {reservations?.map(({ id }) => {
                return <ReservationCard key={id} />;
              })}
            </div>
          )}
        </Tab>
        <Tab
          key="reserved"
          title={<p className="text-green-500 font-semibold">Reserved (50)</p>}
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <ClockLoader color="#36d7b7" size={100} />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 px-5 mt-5">
              {reservations?.map(({ id }) => {
                return <ReservationCard key={id} />;
              })}
            </div>
          )}
        </Tab>
        <Tab
          key="pending"
          title={<p className="text-yellow-500 font-semibold">Pending (32)</p>}
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <ClockLoader color="#36d7b7" size={100} />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 px-5 mt-5">
              {reservations?.map(({ id }) => {
                return <ReservationCard key={id} />;
              })}
            </div>
          )}
        </Tab>
        <Tab
          key="cancelled"
          title={<p className="text-red-500 font-semibold">Cancelled (15)</p>}
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <ClockLoader color="#36d7b7" size={100} />
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-5 px-5 mt-5">
              {reservations?.map(({ id }) => {
                return <ReservationCard key={id} />;
              })}
            </div>
          )}
        </Tab>
      </Tabs>
    </div>
  );
}
