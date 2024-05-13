/* eslint-disable no-unused-vars */
import { LuClock3 } from "react-icons/lu";
import { Avatar } from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ClockLoader } from "react-spinners";
import FinanceTable from "../components/FinanceTable";

const UserAccount = () => {

    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false)
    const [reservation, setReservation] = useState([])
    const { pathname } = location;

    const id = parseInt(pathname.slice(pathname.lastIndexOf("/") + 1));

    return (
        <div className="m-5 p-5 rounded-lg bg-white">
            {isLoading ?
                <div className="flex justify-center items-center h-96" >
                    <ClockLoader color="#36d7b7" size={100} />
                </div>
                :
                <>
                    <div className=" flex flex-col mb-4 rounded-3xl border-grey border-2 justify-center" >
                        <div className="text-black flex justify-evenly items-center p-4">
                            <div className="flex items-center justify-center ">
                                <Avatar
                                    isBordered
                                    color="success"
                                    radius="full"
                                    size="lg"
                                    src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                                />
                                <div className="flex flex-col ml-5">
                                    <h4 className="text-md font-semibold">Lorem ipsum dolor sit.</h4>
                                    <h5 className="text-md text-gray-600">Lorem ipsum dolor sit.</h5>
                                    <h5 className="text-md text-gray-600">Lorem ipsum dolor sit.</h5>
                                </div>
                            </div>
                            <div className="bg-gray-300 w-[2px] h-16 mx-4 flex items-center">
                                <span className="text-gray-600">&nbsp;</span>
                            </div>
                            <div>
                                <h1 className="text-lg font-bold mb-2">Lorem ipsum dolor sit.</h1>
                                <p className="mb-2 text-sm">Lorem ipsum dolor sit.</p>
                                <p className="text-sm">Lorem ipsum dolor sit.</p>
                            </div>
                            <div className="bg-gray-300 w-[2px] h-16 mx-4 flex items-center">
                                <span className="text-gray-600">&nbsp;</span>
                            </div>
                            <div>
                                <h1 className="text-lg font-bold mb-2">Lorem ipsum dolor sit.</h1>
                                <p className="mb-2 text-sm">Lorem ipsum dolor sit.</p>
                                <p className="text-sm">Lorem ipsum dolor sit.</p>
                            </div>
                            <div className="bg-gray-300 w-[2px] h-16 mx-4 flex items-center">
                                <span className="text-gray-600">&nbsp;</span>
                            </div>
                            <div >
                                <h1 className="text-lg font-bold mb-2">Total price</h1>
                                <p className="text-sm text-center">Lorem ipsum dolor sit.$</p>
                            </div>
                        </div>
                    </div>
                    <div className="m-6 p-6 bg-white rounded-3xl"  >
                        <h1 className="text-xl font-bold mb-4" >Last Transactions</h1>
                        <FinanceTable users={[]} isLoading={isLoading} />
                    </div>
                </>
            }

        </div>
    )
}

export default UserAccount
