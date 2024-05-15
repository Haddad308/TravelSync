import { HiMiniPresentationChartBar } from "react-icons/hi2";
import { FaLocationDot } from "react-icons/fa6";
import NavItem from "./components/NavItem";
import { Avatar, Skeleton } from "@nextui-org/react";
import ChangeLocale from "./components/ChangeLocale";
import Logout from "../auth/components/Logout";
import { IoPeopleSharp } from "react-icons/io5";
import { SiOnlyoffice } from "react-icons/si";
import { GrServices } from "react-icons/gr";
import { IoDocumentText } from "react-icons/io5";
import { PiCurrencyDollarFill } from "react-icons/pi";
import useAuth from "../auth/context/use-auth";
import { IoHome } from "react-icons/io5";
import { RoleEnum } from "../../enums/role-enum";

const ICON_STYLE = "flex-shrink-0 w-6 h-6 text-white transition duration-75";

const ADMIN_ITEMS = [
  {
    title: "Dashboard",
    path: "/Dashboard",
    icon: <HiMiniPresentationChartBar className={ICON_STYLE} />,
  },
  {
    title: "Agencies",
    path: "/Agencies",
    icon: <SiOnlyoffice className={ICON_STYLE} />,
  },
  {
    title: "Users",
    path: "/Users",
    icon: <IoPeopleSharp className={ICON_STYLE} />,
  },
  {
    title: "Services",
    path: "/Services",
    icon: <GrServices className={ICON_STYLE} />,
  },
  {
    title: "Reservations",
    path: "/Reservations",
    icon: <IoDocumentText className={ICON_STYLE} />,
  },
  {
    title: "Finance",
    path: "/Finance",
    icon: <PiCurrencyDollarFill className={ICON_STYLE} />,
  },
];

// eslint-disable-next-line no-unused-vars
const USER_ITEMS = [
  {
    title: "Home",
    path: "/user/Home",
    icon: <IoHome className={ICON_STYLE} />,
  },
  {
    title: "Finance",
    path: "/user/Finance",
    icon: <PiCurrencyDollarFill className={ICON_STYLE} />,
  },
  {
    title: "Reservation",
    path: "/user/Reservations",
    icon: <IoDocumentText className={ICON_STYLE} />,
  },
];

const SideBar = () => {
  const { user, isLoaded } = useAuth();
  return (
    <div className="bg-main h-screen col-span-2 text-white flex flex-col justify-between w-2/12">
      <div>
        <header
          className={`bg-second px-[20px] h-[80px] flex items-center justify-start gap-2 text-2xl font-bold`}
        >
          <FaLocationDot size={20} />
          <h1 className={`gap-2 transition-all duration-400`}>Logo here</h1>
        </header>
        <div>
          {/* I will add a condition here to add other users ITEMS. */}
          <ul className="my-2 font-medium">
            {user.role.id === RoleEnum.admin &&
              ADMIN_ITEMS.map(({ title, path, icon }, idx) => {
                return (
                  <NavItem title={title} path={path} key={idx}>
                    {icon}
                  </NavItem>
                );
              })}
            {user.role.id === RoleEnum.travelAgent &&
              USER_ITEMS.map(({ title, path, icon }, idx) => {
                return (
                  <NavItem title={title} path={path} key={idx}>
                    {icon}
                  </NavItem>
                );
              })}
          </ul>
        </div>
      </div>

      <div>
        <div className="flex flex-col justify-start  ">
          <ChangeLocale />
          <Logout />
        </div>
        <footer className="text-white py-3 px-[20px] border-t-2 gap-4 border-gray-500 flex flex-col justify-center items-start">
          {isLoaded ? (
            <div className="flex gap-5">
              <Avatar
                isBordered
                color="success"
                radius="full"
                size="md"
                // src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                src={user && user.profilePhoto.imageUrl}
              />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none ">
                  {user?.firstName} {user?.lastName}
                </h4>
                <h5 className="text-small tracking-tight ">{user?.email}</h5>
              </div>
            </div>
          ) : (
            <div className="max-w-[300px] w-full flex items-center gap-3">
              <div>
                <Skeleton className="flex rounded-full w-12 h-12" />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Skeleton className="h-3 w-3/5 rounded-lg" />
                <Skeleton className="h-3 w-4/5 rounded-lg" />
              </div>
            </div>
          )}
        </footer>
      </div>
    </div>
  );
};

export default SideBar;
