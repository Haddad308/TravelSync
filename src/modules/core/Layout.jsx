import { Outlet, useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import NavBar from "./NavBar";
import { BreadcrumbItem, Breadcrumbs } from "@nextui-org/react";

export default function Layout() {

  const location = useLocation();

  let { pathname } = location;
  const breadcrumbs = pathname.split("/").filter((crumb) => crumb !== "");
  return (
    <div className={`bg-[#edf2f6] w-screen flex `}>
      <SideBar />
      <div className="flex flex-col w-full">
        <NavBar />
        <div className="h-[calc(100vh-81.5px)] overflow-scroll overflow-x-hidden">
          <Breadcrumbs size="lg" className="px-5 mx-1" >
            {breadcrumbs.map((crumb) => (
              <BreadcrumbItem href={`/${crumb}`} key={crumb}>
                <p className="mb-1">
                  {crumb}
                </p>
              </BreadcrumbItem>
            ))}
          </Breadcrumbs>
          <Outlet />

        </div>
      </div>
    </div>
  );
}

