import { Avatar, Skeleton } from "@nextui-org/react";
import useAuth from "../auth/context/use-auth";
import { useEffect } from "react";

const NavBar = () => {
  // !Handling title (Need Actions) .
  const { user, isLoaded } = useAuth();

  useEffect(() => {
    console.log("pathname", user);
  }, [user]);

  // const formattedDate = new Date().toLocaleDateString("en-UK", {
  //   day: "numeric",
  //   month: "long",
  //   year: "numeric",
  // });

  // i want do display the date in the following format : 12th, August 2021
  // but the date is displayed in the following format : 12, August 2021

  const formatDate = () => {
    const date = new Date();

    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    let formattedDay;
    if (day === 1 || day === 21 || day === 31) {
      formattedDay = `${day}st`;
    } else if (day === 2 || day === 22) {
      formattedDay = `${day}nd`;
    } else if (day === 3 || day === 23) {
      formattedDay = `${day}rd`;
    } else {
      formattedDay = `${day}th`;
    }

    const formattedDate = `${formattedDay}, ${month} ${year}`;

    return formattedDate;
  };

  const formattedDate = formatDate();

  return (
    <div className="h-[80px] bg-second flex items-center justify-between px-5">
      <div className="flex flex-col items-start  ">
        <h1 className="text-2xl font-bold">Welcome, {user.firstName} </h1>
        <h3 className="text-small  text-[#8f9191] ">
          Today is {formattedDate}
        </h3>
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
