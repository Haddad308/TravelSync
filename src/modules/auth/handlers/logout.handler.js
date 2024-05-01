import Cookies from 'js-cookie';

const logout = (navigate) => {
    Cookies.remove('userToken')
    navigate("/login")
}

export { logout }