import { Avatar } from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getReservation } from "../reservation.handlers";
import { ClockLoader } from "react-spinners";
import CancelReservation from "../components/CancelReservation";
import AcceptReservation from "../components/AcceptReservation";
import ReservationTable from "../components/Reservation.Table";
import useAuthTokens from "../../auth/context/use-auth-tokens";
import ActionRequired from "../components/ActionRequired";
import StatusBadge from "../components/StatusBadge";

const ReservationPage = () => {
  const tokenObj = useAuthTokens();
  const token = tokenObj.tokensInfoRef.current.token;
  const [isLoading, setIsLoading] = useState(false);
  const [reservation, setReservation] = useState([]);
  const location = useLocation();
  const { pathname } = location;

  const id = parseInt(pathname.slice(pathname.lastIndexOf("/") + 1));

  const handleUpdate = () =>
    getReservation(setReservation, setIsLoading, "", id, token);

  useEffect(() => {
    getReservation(setReservation, setIsLoading, "", id, token);
  }, [id, token]);

  const { name, email, phone } = reservation.travelOffice || {};
  const { airline, arrivalAddress, arrivalCity } =
    reservation.service?.flight || {};
  const { status, checkInDate, CancelReason, travelers } = reservation;
  const { type, description } = reservation.service || {};

  const date = new Date(checkInDate);
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

  useEffect(() => {
    console.log(travelers);
  }, [travelers]);

  return (
    <div className="m-5 p-5 rounded-lg bg-white">
      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <ClockLoader color="#36d7b7" size={100} />
        </div>
      ) : (
        <>
          <div className=" flex flex-col mb-4 rounded-lg border-grey border-2">
            <div className=" flex justify-between p-3">
              <StatusBadge status={status} />
              <p>{formattedDate}</p>
            </div>
            <div className="text-black flex justify-evenly items-center mb-5">
              <div className="flex items-center justify-center ">
                <Avatar
                  isBordered
                  color="success"
                  radius="full"
                  size="lg"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                />
                <div className="flex flex-col ml-5">
                  <h4 className="text-md font-semibold">
                    {name?.slice(0, 20)}
                    {name?.length > 20 ? "...." : ""}
                  </h4>
                  <h5 className="text-md text-gray-600">
                    {" "}
                    {email?.slice(0, 20)}
                    {email?.length > 20 ? "...." : ""}
                  </h5>
                  <h5 className="text-md text-gray-600">{phone}</h5>
                </div>
              </div>
              <div className="bg-gray-300 w-[2px] h-16 mx-4 flex items-center">
                <span className="text-gray-600">&nbsp;</span>
              </div>
              <div>
                <h1 className="text-lg font-bold mb-2">{airline}</h1>
                <p className="mb-2 text-sm">{arrivalAddress}</p>
                <p className="text-sm">{arrivalCity}</p>
              </div>
              <div className="bg-gray-300 w-[2px] h-16 mx-4 flex items-center">
                <span className="text-gray-600">&nbsp;</span>
              </div>
              <div>
                <h1 className="text-lg font-bold mb-2">{airline}</h1>
                <p className="mb-2 text-sm">{type}</p>
                <p className="text-sm">{description}</p>
              </div>
              <div className="bg-gray-300 w-[2px] h-16 mx-4 flex items-center">
                <span className="text-gray-600">&nbsp;</span>
              </div>
              <div>
                <h1 className="text-lg font-bold mb-2">Total price</h1>
                <p className="text-sm text-center">{reservation.totalPrice}$</p>
              </div>
            </div>
            {/* Actions */}
          </div>
          <div className="flex flex-col   ">
            {CancelReason ? (
              <div className="bg-gray-200 p-6 rounded-lg mb-5">
                <p>{CancelReason}</p>
              </div>
            ) : (
              ""
            )}
            <div className="flex gap-4 mb-5">
              {status === "pending" ? (
                <>
                  <CancelReservation id={id} handleUpdate={handleUpdate} />
                  <div className="ml-auto self-end">
                    <ActionRequired id={id} handleUpdate={handleUpdate} />
                  </div>
                </>
              ) : (
                ""
              )}
              {status !== "confirmed" ? (
                <AcceptReservation id={id} handleUpdate={handleUpdate} />
              ) : (
                ""
              )}
            </div>
          </div>
          <ReservationTable users={travelers} isLoading={isLoading} />
        </>
      )}
    </div>
  );
};

export default ReservationPage;
