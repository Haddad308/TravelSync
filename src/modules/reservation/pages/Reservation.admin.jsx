import { Tabs, Tab, } from "@nextui-org/react";
import { useEffect, useState } from "react";
import ReservationCard from "../components/ReservationCard";
import { ClockLoader } from "react-spinners";
import { getReservation } from "../reservation.handlers";




export default function Reservation() {

    const [selected, setSelected] = useState("all");
    const [isLoading, setIsLoading] = useState(false)
    const [reservations, setReservations] = useState([])
    const [reserved, setReserved] = useState([])
    const [pending, setPending] = useState([])
    const [canceled, setCanceled] = useState([])

    useEffect(() => {
        getReservation(setReservations, setIsLoading);
        getReservation(setReserved, setIsLoading, "confirmed");
        getReservation(setCanceled, setIsLoading, "canceled");
        getReservation(setPending, setIsLoading, "pending");
    }, [])


    return (
        <div className="m-5 p-5 rounded-lg bg-white">
            <Tabs
                aria-label="Options"
                variant="underlined"
                selectedKey={selected}
                onSelectionChange={setSelected}>
                <Tab key="all" title={<p className="font-semibold" >All ({reservations.length})</p>}>
                    {
                        isLoading ? <div className="flex justify-center items-center h-96" >
                            <ClockLoader color="#36d7b7" size={100} />
                        </div> :
                            <div className="grid grid-cols-2 gap-5 px-5 mt-5" >
                                {reservations?.map(({ id, status, travelOffice, service, checkInDate }) => {
                                    return <ReservationCard
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
                                })}
                            </div>
                    }
                </Tab>
                <Tab key="reserved" title={
                    <p className="text-green-500 font-semibold">
                        Reserved ({reserved.length})
                    </p>
                }>
                    {
                        isLoading ? <div className="flex justify-center items-center h-96" >
                            <ClockLoader color="#36d7b7" size={100} />
                        </div> :
                            <div className="grid grid-cols-2 gap-5 px-5 mt-5" >
                                {reserved?.map(({ id, status, travelOffice, service, checkInDate }) => {
                                    return <ReservationCard
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
                                })}
                            </div>
                    }
                </Tab>
                <Tab key="pending" title={
                    <p className="text-yellow-500 font-semibold">
                        Pending ({pending.length})
                    </p>
                }>
                    {
                        isLoading ? <div className="flex justify-center items-center h-96" >
                            <ClockLoader color="#36d7b7" size={100} />
                        </div> :
                            <div className="grid grid-cols-2 gap-5 px-5 mt-5" >
                                {pending?.map(({ id, status, travelOffice, service, checkInDate }) => {
                                    return <ReservationCard
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
                                })}
                            </div>
                    }
                </Tab>
                <Tab key="cancelled" title={
                    <p className="text-red-500 font-semibold">
                        Cancelled ({canceled.length})
                    </p>
                }>
                    {
                        isLoading ? <div className="flex justify-center items-center h-96" >
                            <ClockLoader color="#36d7b7" size={100} />
                        </div> :
                            <div className="grid grid-cols-2 gap-5 px-5 mt-5" >
                                {canceled?.map(({ id, status, travelOffice, service, checkInDate }) => {
                                    return <ReservationCard
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
                                })}
                            </div>
                    }
                </Tab>
            </Tabs>
        </div>
    );
}
