import { RouterProvider, createBrowserRouter } from "react-router-dom"
import Login from "./modules/auth/pages/Login"
import UnAuthorized from "./modules/auth/pages/UnAuthorized"
import NotFound from "./modules/auth/pages/NotFound"
import Layout from "./modules/core/Layout"
import Dashboard from "./modules/dashboard/Dashboard"
import Agencies from "./modules/agencies/Agencies"
import { auth } from "./modules/auth/context/AuthProvider"
import { useContext, useEffect } from "react"
import ProtectRoutes from "./network/ProtectRoutes"
import Redirection from "./network/Redirection"
import { useTranslation } from "react-i18next"

const routers = createBrowserRouter([
  {
    path: "", element: <Layout />, children: [
      { index: true, element: <Redirection /> },
      { path: "dashboard", element: <ProtectRoutes allowedRoles={['admin']} ><Dashboard /></ProtectRoutes> },
      { path: "agencies", element: <ProtectRoutes allowedRoles={['admin']} ><Agencies /></ProtectRoutes> },
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

  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.resolvedLanguage === "ar")
      document.getElementsByTagName('html')[0].setAttribute("dir", "rtl");
    else
      document.getElementsByTagName('html')[0].setAttribute("dir", "ltr");
  }, [i18n.resolvedLanguage])

  
  return (
    <RouterProvider router={routers} />
  )
}

export default App


