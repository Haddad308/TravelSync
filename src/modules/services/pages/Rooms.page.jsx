import { useEffect, useState } from "react";
import { ImageGallery } from "../components/ImageGallery";
import { Button } from "@nextui-org/react";
import { CiLocationOn } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { useLocation, useNavigate } from "react-router-dom";
import { getService } from "../services.handlers";

const RoomsPage = () => {


    const [data, setData] = useState([]);
    const [, setIsLoading] = useState(false);

    const location = useLocation();
    const { pathname } = location;

    const id = parseInt(pathname.slice(pathname.lastIndexOf("/") + 1));
    const navigate = useNavigate();


    useEffect(() => {
        getService(setData, setIsLoading, `hotel-rooms/${id}`);
    }, [id]);

    return (
        <div className="m-5 mt-1 pr-10  p-5 rounded-lg bg-white w-full  ">
            <ImageGallery images={data?.images} />
            <div className="my-5" >
                <div className="flex justify-between mb-3" >
                    <h1 className="text-2xl font-semibold" >{data?.name}</h1>
                    <Button onClick={() => { navigate(`/user/Reserve/${id}`) }} className="font-semibold bg-black text-white" >Reserve room</Button>
                </div>
                <div>
                    <p className="flex  items-center gap-2"> <CiLocationOn /> Sidi Gaber, Alexandria</p>
                    <div className="flex mt-2" >
                        {Array.from({ length: 5 }).map((_, index) => (
                            <FaStar key={index} color="#FFCD6B" width={50} />
                        ))}
                        {Array.from({ length: 5 - 5 }).map((_, index) => (
                            <FaStar key={index} color="#F2F2F2" width={50} />
                        ))}
                    </div>
                    <div className="mt-2">
                        <h1 className="font-semibold">About room</h1>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe beatae officiis itaque? Temporibus voluptatibus iure tempora accusamus incidunt adipisci nesciunt explicabo excepturi sed eaque doloremque, velit cupiditate fugiat eligendi itaque? Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet accusantium veritatis velit maiores totam quam, voluptate delectus architecto aliquid excepturi?</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RoomsPage