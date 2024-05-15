import { ClockLoader } from "react-spinners"
import FlightCard from "./FlightCard"
import ServiceCard from "./ServiceCard"

const ServicesWrapper = ({ data, isLoading, type }) => {
    return (
        <div className="flex flex-col gap-5">
            {isLoading ? (
                <div className="flex justify-center items-center h-96">
                    <ClockLoader color="#36d7b7" size={100} />
                </div>
            ) : (
                type === "flights" ?
                    data.map(({ id }) => (
                        <FlightCard
                            key={id}
                            img="https://img.freepik.com/premium-vector/airline-logo-plane-travel-icon-airport-flight-world-aviation-aircraft-business-tourism-logo_41737-1254.jpg"
                        />
                    ))
                    :
                    data.map(({ id, name, images, stars }) => (
                        <ServiceCard
                            key={id}
                            img={images[0]?.imageUrl}
                            stars={stars}
                            hotelName={name}
                            numberOfRooms={52}
                        />
                    ))
            )}
        </div>
    );

}

export default ServicesWrapper
