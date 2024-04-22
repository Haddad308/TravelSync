import { LuLayoutDashboard } from "react-icons/lu";
import { FaLocationDot } from "react-icons/fa6";
import NavItem from "./components/NavItem";

const ICON_STYLE = "flex-shrink-0 w-6 h-6 text-white transition duration-75";
const ADMIN_ITEMS = [
    {
        "title": "Dashboard",
        "path": "/dashboard",
        "icon": <LuLayoutDashboard className={ICON_STYLE} />
    },
    { "title": "", "path": "/" },
    { "title": "", "path": "/" },
    { "title": "", "path": "/" },
    { "title": "", "path": "/" },
    { "title": "", "path": "/" },
]

// eslint-disable-next-line no-unused-vars
const USER_ITEMS = [
    {
        "title": "",
        "path": "/",
        "icon":  ""
    },
    { "title": "", "path": "/" },
    { "title": "", "path": "/" },
    { "title": "", "path": "/" },
    { "title": "", "path": "/" },
    { "title": "", "path": "/" },
]

const SideBar = () => {
    return (
        <div className="bg-main h-screen col-span-2 text-white">
            <header className={`bg-second px-[20px] h-[80px] flex items-center justify-start gap-2 text-2xl font-bold`}  >
                <FaLocationDot size={20} />
                <h1 className={`gap-2 transition-all duration-400`}   >
                    Logo here
                </h1>
            </header>
            <div >
                {/* I will add a condition here to add other users ITEMS. */}
                <ul className="my-2 font-medium">
                    {ADMIN_ITEMS.map(({title,path,icon},idx)=>{
                        return <NavItem title={title} path={path} key={idx}> {icon} </NavItem>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default SideBar