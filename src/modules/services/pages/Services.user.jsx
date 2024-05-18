import { Tabs, Tab } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { FaCar, FaHotel, FaHouseTsunami } from "react-icons/fa6";
import { FiPackage } from "react-icons/fi";
import { MdOutlineDirectionsBoat } from "react-icons/md";
import { RiHotelBedFill } from "react-icons/ri";
import { getService } from "../services.handlers";
import ServicesWrapper from "../components/ServicesWrapper";

export default function ServicesView() {
  const [selected, setSelected] = useState("hotels");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getService(setData, setIsLoading, selected);
  }, [selected]);

  let tabs = [
    {
      id: "hotels",
      label: (
        <div className="flex items-center space-x-2">
          <FaHotel className="w-4 h-4" />
          <span>Hotels</span>
        </div>
      ),
    },
    {
      id: "hotel-rooms",
      label: (
        <div className="flex items-center space-x-2">
          <RiHotelBedFill className="w-5 h-5" />
          <span>Rooms</span>
        </div>
      ),
    },
    {
      id: "flights",
      label: (
        <div className="flex items-center space-x-2">
          <BiSolidPlaneAlt className="w-5 h-5" />
          <span>Flights</span>
        </div>
      ),
    },
    {
      id: "safari",
      label: (
        <div className="flex items-center space-x-2">
          <FaHouseTsunami className="w-4 h-4" />
          <span>Safari</span>
        </div>
      ),
    },
    {
      id: "cruises",
      label: (
        <div className="flex items-center space-x-2">
          <MdOutlineDirectionsBoat className="w-5 h-5" />
          <span>Cruises</span>
        </div>
      ),
    },
    {
      id: "transportations",
      label: (
        <div className="flex items-center space-x-2">
          <FaCar className="w-4 h-4" />
          <span>Transportation</span>
        </div>
      ),
    },
    {
      id: "standard-packages",
      label: (
        <div className="flex items-center space-x-2">
          <FiPackage className="w-5 h-5" />
          <span>Packages</span>
        </div>
      ),
    },
  ];


  return (
    <div className="flex w-full flex-col m-5 p-5 rounded-lg bg-white ">
      <Tabs
        aria-label="Services tabs"
        selectedKey={selected}
        onSelectionChange={setSelected}
        items={tabs}
        color="primary"
        variant="bordered"
      >
        {(item) => (
          <Tab key={item.id} title={item.label}>
            <ServicesWrapper data={data} isLoading={isLoading} type={item.id} />
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
