import { useLocation } from "react-router-dom";

const NavBar = () => {

  // !Handling title (Need Actions) .
  const location = useLocation();
  let { pathname } = location;
  pathname = pathname.slice(1);

  return (
    <div className="h-[80px] bg-second flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold ml-5">{pathname}</h1>
        <h1 className=" font-light ml-5">12th Aug, 2024</h1>
      </div>
    </div>
  );
};

export default NavBar;
