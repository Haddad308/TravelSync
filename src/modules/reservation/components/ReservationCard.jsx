/* eslint-disable no-unused-vars */
import { LuClock3 } from "react-icons/lu";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Divider,
} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { MdFileDownloadDone } from "react-icons/md";
import { ImCancelCircle } from "react-icons/im";
import { FaExclamationCircle } from "react-icons/fa";
import StatusBadge from "./StatusBadge";
import { FiUser } from "react-icons/fi";
import { CiCalendar } from "react-icons/ci";
import { GoTag } from "react-icons/go";
import { useEffect } from "react";
import { IoCartOutline } from "react-icons/io5";

export default function ReservationCard({ Reservation, isAdmin }) {
  const formattedDate = formatDuration(
    new Date(Reservation?.updatedAt),
    new Date(),
  );

  function formatDuration(startDate, endDate) {
    const duration = endDate - startDate;
    const seconds = Math.floor(duration / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 7) {
      return endDate.toDateString();
    } else if (days > 0) {
      return `${days}d`;
    } else if (hours > 0) {
      return `${hours}h`;
    } else if (minutes > 0) {
      return `${minutes}min`;
    } else {
      return `${seconds}s`;
    }
  }
  const navigate = useNavigate();

  const handleCheckInClick = () => {
    if (isAdmin) {
      navigate(`/Reservation/${Reservation?.id}`);
    } else {
      navigate(`/user/ReservationUser/${Reservation?.id}`);
    }
  };

  return (
    <Card
      key={Reservation.id}
      className="flex flex-col mb-4 rounded-lg p-4 border shadow-md"
    >
      <CardHeader className=" flex justify-between p-3">
        <StatusBadge status={Reservation?.status} />
        <div className="text-right text-sm text-gray-500">{formattedDate}</div>
      </CardHeader>
      <CardBody>
        <div className="flex justify-center gap-5 items-center">
          <div className="flex-shrink-0 ">
            <Avatar
              isBordered
              radius="full"
              size="md"
              alt="Agency Profile Photo"
              src={Reservation?.travelOffice?.profilePhoto?.imageUrl}
            />
          </div>
          <div className="flex-1 min-w-0 rtl:text-right">
            <p className="text-sm font-medium text-gray-900  truncate">
              {Reservation?.travelOffice?.name}
            </p>
            <p className="text-sm text-gray-500 truncate">
              {Reservation?.travelOffice?.email}
            </p>
            <p className="text-sm text-gray-500 truncate">
              {Reservation?.travelOffice?.phone}
            </p>
          </div>

          <div className="flex flex-col flex-shrink-0 space-y-2 rtl:text-right">
            <div className="ltr:border-l-2 rtl:border-r-2 border-gray-200 ltr:pl-4 rtl:pr-4 w-60">
              <h3 className="text-sm font-medium text-gray-900">
                {Reservation?.service?.name}
              </h3>
              <p className="text-sm text-gray-500">
                {Reservation?.service?.type}
              </p>
              <div className="flex items-center space-x-2 mt-2">
                <IoCartOutline className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500">
                  {Reservation?.quantity} Units
                </span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <CiCalendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500">
                  Check-in: {new Date(Reservation?.checkInDate).toDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <CiCalendar className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500">
                  Check-out:{" "}
                  {Reservation?.checkOutDate
                    ? new Date(Reservation?.checkOutDate).toDateString()
                    : "-"}
                </span>
              </div>
              <div className="flex items-center space-x-2 mt-1">
                <GoTag className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-500">
                  ${Reservation?.totalPrice}
                </span>
              </div>
            </div>
            <Button
              onClick={handleCheckInClick}
              variant="solid"
              className=" bg-slate-900 text-white rounded-lg justify-self-end"
            >
              Check In
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}
