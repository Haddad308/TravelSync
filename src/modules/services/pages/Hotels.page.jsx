import { useEffect, useState } from "react";
import { ImageGallery } from "../components/ImageGallery";
import { Button } from "@nextui-org/react";
import { CiLocationOn } from "react-icons/ci";
import { FaStar } from "react-icons/fa6";
import { getService } from "../services.handlers";
import { useLocation, useNavigate } from "react-router-dom";

const HotelsPage = () => {

  const [data, setData] = useState([]);
  const [hotel, setHotel] = useState({});


  const [, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const id = parseInt(pathname.slice(pathname.lastIndexOf("/") + 1));

  useEffect(() => {
    getService(setData, setIsLoading, `hotels/${id}/rooms`);
  }, [id]);


  useEffect(() => {
    getService(setHotel, setIsLoading, `hotels/${id}`);
  }, [id]);

  return (
    <div className="p-5 m-3 rounded-lg bg-white w-full  ">
      <ImageGallery images={hotel?.images} />
      <div className="my-5">
        <div className="flex justify-between mb-3">
          <h1 className="text-2xl font-semibold">
            {hotel?.name}
          </h1>
        </div>
        <div>
          <p className="flex  items-center gap-2">
            {" "}
            <CiLocationOn /> Sidi Gaber, Alexandria
          </p>
          <div className="flex mt-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar key={index} color="#FFCD6B" width={50} />
            ))}
            {Array.from({ length: 5 - 5 }).map((_, index) => (
              <FaStar key={index} color="#F2F2F2" width={50} />
            ))}
          </div>
          <div className="mt-2">
            <h1 className="font-semibold">About Hotel</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              beatae officiis itaque? Temporibus voluptatibus iure tempora
              accusamus incidunt adipisci nesciunt explicabo excepturi sed eaque
              doloremque, velit cupiditate fugiat eligendi itaque? Lorem, ipsum
              dolor sit amet consectetur adipisicing elit. Amet accusantium
              veritatis velit maiores totam quam, voluptate delectus architecto
              aliquid excepturi?
            </p>
          </div>
        </div>
      </div>
      <div>
        <h1 className="text-2xl font-semibold">Rooms</h1>
        <div className="grid grid-cols-4 mt-5 gap-5 ">
          {data?.map((item, index) => (
            <div
              key={index}
              className="border-2 p-3 rounded-2xl flex flex-col gap-4"
            >
              <img
                className="rounded-2xl"
                src={item?.service?.images[0]?.imageUrl}
                alt={item?.type}
              />
              <p className="text-xl font-semibold">{item?.type}</p>
              <Button
                onClick={() => {
                  navigate(`/user/hotel-rooms/${item?.id}`);
                }}
                color="secondary"
              >
                Reserve Room
              </Button>
              <div>
                <p className="text-lg font-semibold">
                  {item?.service?.price} EGP
                </p>
                <p>per night</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HotelsPage;
