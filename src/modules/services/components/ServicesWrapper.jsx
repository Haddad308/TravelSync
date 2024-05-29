import { ClockLoader } from "react-spinners";
import FlightCard from "./FlightCard";
import ServiceCard from "./ServiceCard";
// import HotelsFilter from "../components/HotelsFilters";
import RoomCard from "./RoomCard";
import { Pagination } from "@nextui-org/react";

const ServicesWrapper = ({ data, isLoading, type }) => {
  return (
    <div className="flex flex-col  gap-4">

      <div className="flex flex-col gap-2">
        {isLoading ? (
          <div className="flex justify-center items-center h-96">
            <ClockLoader color="#36d7b7" size={100} />
          </div>
        ) : type === "flights" ? (
          data.map(({ id }) => (
            <FlightCard
              key={id}
              img="https://img.freepik.com/premium-vector/airline-logo-plane-travel-icon-airport-flight-world-aviation-aircraft-business-tourism-logo_41737-1254.jpg"
            />
          ))
        ) : type === "hotel-rooms" ? (
          data.map((service) => <RoomCard key={service.id} service={service} />)
        ) : (
          // <HotelsFilter>
          // {
          data.map(({ id, name, images, stars }) => (
            <ServiceCard
              type={type}
              id={id}
              key={id}
              img={images[0]?.imageUrl}
              stars={stars}
              hotelName={name}
              numberOfRooms={52}
            />
          ))
          // }
          // </HotelsFilter>
        )}
      </div>
      <Pagination
        className="self-center"
        showControls
        classNames={{ cursor: "bg-foreground text-background" }}
        color="default"
        page={2}
        total={50}
        variant="light"
      />
    </div>
  );
};

export default ServicesWrapper;
