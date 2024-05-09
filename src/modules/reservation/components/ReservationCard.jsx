/* eslint-disable no-unused-vars */
import { LuClock3 } from "react-icons/lu";
import { Avatar, Button } from "@nextui-org/react";

export default function ReservationCard({ AgencyName, AgencyEmail, AgencyContact, status, info1, info2, info3 }) {
    return (
        <div className=" flex flex-col mb-4 rounded-3xl border-grey border-2" >
            <div className=" flex justify-between p-3">
                {status === "Pending" ? <p className="flex items-center justify-between text-yellow-700" ><LuClock3 className="w-4 h-4" /> &nbsp;Pending</p>
                    : status === "Cancelled" ? <p className="flex items-center justify-between text-red-500" ><LuClock3 className="w-4 h-4" /> &nbsp;Cancelled</p> : <p className="flex items-center justify-between text-green-500" ><LuClock3 className="w-4 h-4" /> &nbsp;Reserved</p>}
                <p>13/1/2024</p>
            </div>
            <div className="text-black flex justify-center gap-16 items-center px-6 " >
                <div className="flex gap-5">
                    <Avatar
                        isBordered
                        color="success"
                        radius="full"
                        size="lg"
                        src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                    />
                    <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small font-semibold leading-none ">
                            Zoey Lang
                        </h4>
                        <h5 className="text-small tracking-tight ">@zoeylang</h5>
                    </div>
                </div>
                <div className="bg-gray-300 w-[2px] h-12 mx-4 flex items-center">
                    <span className="text-gray-600">&nbsp;</span>
                </div>
                <div>
                    <h1 className="font-bold mb-1" >Zoey Lang</h1>
                    <p className="mb-1">Zoey Lang</p>
                    <p>Zoey Lang</p>
                </div>
            </div>
            <div className="flex justify-center mt-3 mb-5  " >
                <Button className="bg-[#616CA8] w-96 text-white font-semibold" size="md">Check In</Button>
            </div>
        </div>
    )
}