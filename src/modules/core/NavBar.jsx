import { useLocation } from "react-router-dom";

const NavBar = () => {

  // !Handling title (Need Actions) .
  const location = useLocation();
  let { pathname } = location;
  pathname = pathname.slice(1);

  return (
    <div className="h-[80px] bg-white flex items-center justify-between">
      <h1 className="text-2xl font-bold ml-5">{pathname}</h1>
    </div>
  );
};

export default NavBar;
