/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const NavItem = ({ title, path, children }) => {
  return (
    <li>
      <Link
        to={path}
        className="flex items-center p-2 mx-3 rtl:pl-20 ltr:pr-10 mb-1 text-[#3e4740] rounded-lg transition duration-300 hover:text-black focus:text-black hover:bg-primary focus:bg-primary group"
      >
        {children}
        <span className="flex-1 ms-3 whitespace-nowrap text-lg">{title}</span>
      </Link>
    </li>
  );
};

export default NavItem;
