/* eslint-disable no-unused-vars */
import { LuClock3 } from "react-icons/lu";
import { Avatar, Button, Card, CardHeader, Chip } from "@nextui-org/react";
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
  CreatedAt,
  status,
  info1,
  info2,
  info3,
  ReservationDate,
  isAdmin,
}) {
  const formattedDate = formatDuration(new Date(CreatedAt), new Date());

  function formatDuration(startDate, endDate) {
    const duration = endDate - startDate;
    const seconds = Math.floor(duration / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days}d`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else if (minutes > 0) {
      return `${minutes}min`;
    } else {
      return `${seconds}s`;
    }
  }
  // const formattedDate = `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
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
    <Card className=" flex flex-col mb-4 rounded-xl border-grey border-2 shadow-md">
      <CardHeader className=" flex justify-between p-3">
        {status === "pending" ? (
          <Chip
            variant="flat"
            color={"warning"}
            className="rounded-md h-6  px-2 gap-0 text-sm text-center"
            startContent={<LuClock3 className="w-4 h-4" />}
          >
            Pending
          </Chip>
        ) : status === "canceled" ? (
          <Chip
            variant="flat"
            color={"danger"}
            className="rounded-md h-6  px-2 gap-0 text-sm text-center"
            startContent={<ImCancelCircle className="w-4 h-4" />}
          >
            Canceled
          </Chip>
        ) : status === "action_required" ? (
          <Chip
            variant="flat"
            color={"secondary"}
            className="rounded-md h-6  px-2 gap-0 text-sm text-center"
            startContent={<FaExclamationCircle className="w-4 h-4" />}
          >
            Action required
          </Chip>
        ) : (
          <Chip
            variant="flat"
            color={"success"}
            className="rounded-md h-6  px-2 gap-0 text-sm text-center"
            startContent={<MdFileDownloadDone className="w-4 h-4" />}
          >
            Reserved
          </Chip>
        )}
        <p>{formattedDate}</p>
      </CardHeader>
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
    </Card>
  );
}
