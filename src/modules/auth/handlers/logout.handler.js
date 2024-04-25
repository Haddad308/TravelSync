const logout = (navigate) => {
    localStorage.removeItem("userToken");
    navigate("/login")
}

export { logout }