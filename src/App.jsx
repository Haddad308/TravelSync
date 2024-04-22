import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Login from "./modules/auth/pages/Login"
import UnAuthorized from "./modules/auth/pages/UnAuthorized"
import NotFound from "./modules/auth/pages/NotFound"
import Layout from "./modules/core/Layout"
import Dashboard from "./modules/dashboard/Dashboard"
import { auth } from "./modules/auth/context/AuthProvider"
import { useContext, useEffect } from "react"
import ProtectRoutes from "./network/ProtectRoutes"
import Redirection from "./network/Redirection"

const routers = createBrowserRouter([
  {
    path: "", element: <Layout />, children: [
      { index: true, element: <Redirection/> },
      { path: "dashboard", element: <ProtectRoutes allowedRoles={['admin']} ><Dashboard /></ProtectRoutes> }
    ]
  },
  { path: "login", element: <Login /> },
  { path: "unauthorized", element: <UnAuthorized /> },
  { path: "*", element: <NotFound /> },
])

function App() {


  // *Make it hook. 
  // check if token is exists in localStorage. 
  let [token, setToken] = useContext(auth);
  useEffect(() => {
    if (localStorage.getItem("userToken")) setToken(localStorage.getItem("userToken"));
  }, [token, setToken])


  return (
    <RouterProvider router={routers} />
  )
}

export default App


