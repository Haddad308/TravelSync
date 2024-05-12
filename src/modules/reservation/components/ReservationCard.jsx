/* eslint-disable no-unused-vars */
import { LuClock3 } from "react-icons/lu";
import { Avatar, Button } from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";

export default function ReservationCard({ id, AgencyName, AgencyEmail, AgencyContact, status, info1, info2, info3, ReservationDate }) {

    const date = new Date(ReservationDate);
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const navigate = useNavigate();

    const handleCheckInClick = () => {
        navigate(`/Reservation/${id}`);
    };

    return (
        <div className=" flex flex-col mb-4 rounded-3xl border-grey border-2" >
            <div className=" flex justify-between p-3">
                {status === "pending" ? <p className="flex items-center justify-between text-yellow-500 font-semibold" ><LuClock3 className="w-4 h-4" /> &nbsp;Pending</p>
                    : status === "canceled" ? <p className="flex items-center justify-between text-red-500 font-semibold" ><LuClock3 className="w-4 h-4" /> &nbsp;Cancelled</p> : <p className="flex items-center justify-between font-semibold text-green-500" ><LuClock3 className="w-4 h-4" /> &nbsp;Reserved</p>}
                <p>{formattedDate}</p>
            </div>
            <div className="text-black flex justify-center items-center">
                <div className="flex items-center justify-center w-[50%]">
                    <Avatar
                        isBordered
                        color="success"
                        radius="full"
                        size="md"
                        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                    />
                    <div className="flex flex-col ml-5">
                        <h4 className="text-md font-semibold">{AgencyName.slice(0, 20)}{AgencyName.length > 20 ? "...." : ""}</h4>
                        <h5 className="text-md text-gray-600"> {AgencyEmail.slice(0, 20)}{AgencyEmail.length > 20 ? "...." : ""}</h5>
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
            <div className="flex justify-center mt-3 mb-5  " >
                <Button onClick={handleCheckInClick} className="bg-[#616CA8] w-96 text-white font-semibold" size="md">Check In</Button>
            </div>
        </div>
    )
}