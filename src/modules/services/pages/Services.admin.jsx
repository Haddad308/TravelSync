/* eslint-disable no-unused-vars */
import { Tabs, Tab } from "@nextui-org/react";
import { FaCar, FaHotel } from "react-icons/fa6";
import HotelsTable from "../hotels/Hotels.Table";
import { useEffect, useMemo, useState } from "react";
import { RiHotelBedFill } from "react-icons/ri";
import { BiSolidPlaneAlt } from "react-icons/bi";
import { FaHouseTsunami } from "react-icons/fa6";
import { MdOutlineDirectionsBoat } from "react-icons/md";
import { FiPackage } from "react-icons/fi";
import { getService } from "../services.handlers";
import RoomsTable from "../rooms/Rooms.Table";
import FlightsTable from "../flights/Flights.Table";
import SafariTable from "../safari/Safari.Table";
import CruisesTable from "../cruises/Cruises.Table";
import TransportationTable from "../transportation/Transportation.Table";
import PackagesTable from "../packages/Packages.Table";

// ! Last 4 services need to specify the the columns.

export default function Services() {
  const [selected, setSelected] = useState("flights");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdate = (selected) => {
    getService(setData, setIsLoading, selected);
  };

  useEffect(() => {
    getService(setData, setIsLoading, selected);
  }, [selected]);

  return (
    <div className="m-5 p-5 rounded-lg bg-white ">
      {/* <div className="flex w-full flex-col"> */}
      <Tabs
        aria-label="Options"
        selectedKey={selected}
        onSelectionChange={setSelected}
        color="primary"
        variant="bordered"
      >
        <Tab
          key="hotels"
          title={
            <div className="flex items-center space-x-2">
              <FaHotel className="w-4 h-4" />
              <span>Hotels</span>
            </div>
          }
        >
          <HotelsTable
            data={data}
            isLoading={isLoading}
            handleUpdate={handleUpdate}
          />
        </Tab>
        <Tab
          key="hotel-rooms"
          title={
            <div className="flex items-center space-x-2">
              <RiHotelBedFill className="w-5 h-5" />
              <span>Rooms</span>
            </div>
          }
        >
          <RoomsTable
            data={data}
            isLoading={isLoading}
            handleUpdate={handleUpdate}
          />
        </Tab>
        <Tab
          key="flights"
          title={
            <div className="flex items-center space-x-2">
              <BiSolidPlaneAlt className="w-5 h-5" />
              <span>Flights</span>
            </div>
          }
        >
          <FlightsTable
            data={data}
            isLoading={isLoading}
            handleUpdate={handleUpdate}
          />
        </Tab>
        <Tab
          key="safari"
          title={
            <div className="flex items-center space-x-2">
              <FaHouseTsunami className="w-4 h-4" />
              <span>Safari</span>
            </div>
          }
        >
          <SafariTable
            data={data}
            isLoading={isLoading}
            handleUpdate={handleUpdate}
          />
        </Tab>
        <Tab
          key="cruises"
          title={
            <div className="flex items-center space-x-2">
              <MdOutlineDirectionsBoat className="w-5 h-5" />
              <span>Cruises</span>
            </div>
          }
        >
          <CruisesTable
            data={data}
            isLoading={isLoading}
            handleUpdate={handleUpdate}
          />
        </Tab>
        <Tab
          key="transportations"
          title={
            <div className="flex items-center space-x-2">
              <FaCar className="w-4 h-4" />
              <span>Transportation</span>
            </div>
          }
        >
          <TransportationTable
            data={data}
            isLoading={isLoading}
            handleUpdate={handleUpdate}
          />
        </Tab>
        <Tab
          key="standard-packages"
          title={
            <div className="flex items-center space-x-2">
              <FiPackage className="w-5 h-5" />
              <span>Packages</span>
            </div>
          }
        >
          <PackagesTable
            data={data}
            isLoading={isLoading}
            handleUpdate={handleUpdate}
          />
        </Tab>
      </Tabs>
      {/* </div> */}
    </div>
  );
}
