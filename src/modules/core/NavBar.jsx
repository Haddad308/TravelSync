import { Avatar, Skeleton } from "@nextui-org/react";
import { useLocation } from "react-router-dom";
import useAuth from "../auth/context/use-auth";

const NavBar = () => {

  // !Handling title (Need Actions) .
  const location = useLocation();
  const { user, isLoaded } = useAuth();

  let { pathname } = location;
  pathname = pathname.slice(1);

  return (
    <div className="h-[80px] bg-second flex items-center justify-between">
      <div className="flex flex-col items-start  ml-5">
        <h1 className="text-2xl font-bold">{pathname}</h1>
        <h1 className="text-small  text-[#8f9191] ">12th Aug, 2024</h1>
      </div>
      <div className="text-black py-3 px-[20px] gap-4  flex flex-col justify-center items-start">
        {isLoaded ? (
          <div className="flex gap-5">
            <Avatar
              radius="full"
              isBordered
              size="md"
              src={user && user.profilePhoto.imageUrl}
            />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-base font-semibold leading-none text-[#3e4740] ">
                {user?.firstName} {user?.lastName}
              </h4>
              <h5 className="text-small  text-[#8f9191] ">{user?.email}</h5>
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
      </div>
    </div>
  );
};

export default NavBar;
