/* eslint-disable no-unused-vars */
import { LuClock3 } from "react-icons/lu";
import { Avatar, Button, Tooltip } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { MdFileDownloadDone } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { FaExclamationCircle } from "react-icons/fa";

export default function ReservationCard({
  id,
  AgencyProfilePhoto,
  AgencyName,
  AgencyEmail,
  AgencyContact,
  status,
  info1,
  info2,
  info3,
  ReservationDate,
  isAdmin,
}) {
  const date = new Date(ReservationDate);
  const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  const navigate = useNavigate();

  const handleCheckInClick = () => {
    if (isAdmin) {
      console.log("Admin");
      navigate(`/Reservation/${id}`);
    } else {
      console.log("User");
      navigate(`/user/ReservationUser/${id}`);
    }
  };

  return (
    <div className=" flex flex-col mb-4 rounded-xl border-grey border-2">
      <div className=" flex justify-between p-3">
        {status === "pending" ? (
          <Tooltip key={"warning"} color={"warning"} content={"Created at: " + formattedDate} className="capitalize ">
            <Button variant="flat" color={"warning"} className="capitalize  h-[35px]  px-2 gap-0
            ">
              <LuClock3 className="w-4 h-4" /> &nbsp;
              {"Pending"}
            </Button>
          </Tooltip>
        ) : status === "canceled" ? (
          <Tooltip key={"danger"} color={"danger"} content={"Created at: " + formattedDate} className="capitalize ">
            <Button variant="flat" color={"danger"} className="capitalize  h-[35px]  px-2 gap-0
            ">
              <ImCancelCircle className="w-4 h-4" /> &nbsp;
              {"Canceled"}
            </Button>
          </Tooltip>
        ) : status === "action_required" ? (
          <Tooltip key={"secondary"} color={"secondary"} content={"Created at: " + formattedDate} className="capitalize ">
            <Button variant="flat" color={"secondary"} className="capitalize  h-[35px]  px-2 gap-0
            ">
              <FaExclamationCircle className="w-4 h-4" /> &nbsp;
              {"Action required"}
            </Button>
          </Tooltip>
        ) : (
          <Tooltip key={"success"} color={"success"} content={"Created at: " + formattedDate} className="capitalize ">
            <Button variant="flat" color={"success"} className="capitalize  h-[35px]  px-2 gap-0
            ">
              <MdFileDownloadDone className="w-4 h-4" /> &nbsp;
              {"Reserved"}
            </Button>
          </Tooltip>
        )}
        <p>{formattedDate}</p>
      </div>
      <div className="text-black flex justify-center items-center">
        <div className="flex items-center justify-center w-[50%]">
          <Avatar
            isBordered
            radius="full"
            size="md"
            alt="Agency Profile Photo"
            src={AgencyProfilePhoto}
          />
          <div className="flex flex-col ml-5">
            <h4 className="text-md font-semibold">
              {AgencyName.slice(0, 20)}
              {AgencyName.length > 20 ? "...." : ""}
            </h4>
            <h5 className="text-md text-gray-600">
              {" "}
              {AgencyEmail.slice(0, 20)}
              {AgencyEmail.length > 20 ? "...." : ""}
            </h5>
            <h5 className="text-md text-gray-600">{AgencyContact}</h5>
          </div>
        </div>
        <div className="bg-gray-300 w-[.5%] h-16 mx-4 flex items-center">
          <span className="text-gray-600">&nbsp;</span>
        </div>
        <div className="w-[50%]">
          <h1 className="text-lg font-bold mb-2">{info1}</h1>
          <p className="mb-2 text-sm">{info2}</p>
          <p className="text-sm">{info3}</p>
        </div>
      </div>
      <div className="flex justify-center mt-3 mb-5  ">
        <Button
          onClick={handleCheckInClick}
          className="bg-black w-36 rounded-lg  text-white font-semibold"
          size="md"
        >
          Check In
        </Button>
      </div>
    </div>
  );
}
