import { Navigate } from 'react-router-dom'

export default function Redirection() {
    const auth = localStorage.getItem("userToken");
    const role = "Admin";
    console.log("hello from Redirection", role);
    if (auth) {
        if (role === "Admin")
            return <Navigate to={"/Dashboard"} replace />
        else
            return <Navigate to={"/home"} replace />
    } else {
        return <Navigate to={"/login"} />
    }

}