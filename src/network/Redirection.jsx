import { Navigate } from 'react-router-dom'
import Cookies from 'js-cookie';

export default function Redirection() {
    const auth = Cookies.get('userToken');
    const role = "Admin";
    
    if (auth) {
        if (role === "Admin")
            return <Navigate to={"/Dashboard"} replace />
        else
            return <Navigate to={"/home"} replace />
    } else {
        return <Navigate to={"/login"} />
    }

}