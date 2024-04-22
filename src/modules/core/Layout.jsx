import { Outlet } from 'react-router-dom'
import SideBar from './SideBar'
import NavBar from './NavBar'

export default function Layout() {
    return (
        <div className="bg-[#edf2f6] w-screen grid grid-cols-12">
            <SideBar />
            <div className="flex flex-col col-span-10">
                <NavBar />
                <div className='h-[calc(100vh-81.5px)] overflow-scroll overflow-x-hidden' >
                    <Outlet />
                </div>
            </div>
        </div>
    )
}