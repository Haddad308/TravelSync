/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

const NavItem = ({ title, path, children }) => {
  return (
    <li>
      <Link
        to={path}
        className="flex items-center p-2 mx-3 mb-1 text-white rounded-lg transition duration-300 hover:bg-[#2477ab] focus:bg-[#2477ab] group"
      >
        {children}
        <span className="flex-1 ms-3 whitespace-nowrap text-lg">{title}</span>
      </Link>
    </li>
  );
};

export default NavItem;
