/* eslint-disable react/prop-types */
import { BsClock } from "react-icons/bs"
import line from "../../../assets/system/line.svg"
import { Button } from "@nextui-org/react"

export default function FlightCard({ img }) {
    return (
        <div className="flex items-center gap-5 justify-between p-5 border-2 rounded-xl m-2 ">
            <div className="w-40  ">
                <img
                    className="w-full rounded-lg object-cover object-center border-2 shadow-md m-2"
                    src={img}
                    alt="nature image"
                />
            </div>
            <div className="flex gap-4 " >
                <div className="flex flex-col items-center" >
                    <h1 className="font-semibold" >CAI</h1>
                    <p>12:20 PM</p>
                </div>
                <div className="flex flex-col items-center" >
                    <div className="flex gap-2 items-center">
                        <BsClock width={20} />
                        <p>2h:30m</p>
                    </div>
                    <img
                        className="w-full rounded-lg object-cover object-center "
                        src={line}
                        alt="nature image"
                    />
                </div>
                <div className="flex flex-col items-center" >
                    <h1 className="font-semibold" >CAI</h1>
                    <p>12:20 PM</p>
                </div>
            </div>
            <div id="right part" className="text-center w-1/6 flex flex-col justify-center " >
                <div className="mb-4" >
                    <h1 className="font-semibold" >1500 EGP</h1>
                    <h1>Per Flight</h1>
                </div>
                <Button className="bg-[#616CA8] text-white font-semibold" >Reserve Flight</Button>
            </div>
        </div>
    )
}