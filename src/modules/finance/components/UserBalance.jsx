import { Link } from "react-router-dom";
import { Avatar } from "@nextui-org/react";

export default function UserBalance({ id, AgnecyName, AgnecyEmail, AgencyBalance }) {
    return (
        <Link to={`/UserAccount/${id}`} >
            <div className="h-[100px] p-5 rounded-2xl border-2 transition-all duration-300 hover:shadow-md hover:border-gray-400  " >
                <div className="flex gap-5">
                    <Avatar isBordered radius="full" size="lg" src="https://nextui.org/avatars/avatar-1.png" />
                    <div className="flex flex-col gap-1 items-start justify-center">
                        <h4 className="text-small font-semibold leading-none text-default-600">{AgnecyName}</h4>
                        <h5 className="text-small tracking-tight text-default-400">{AgnecyEmail}</h5>
                        <h5 className="text-small tracking-tight text-default-400">{AgencyBalance}$</h5>
                    </div>
                </div>
            </div>
        </Link>
    )
}