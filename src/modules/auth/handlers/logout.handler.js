import Cookies from "js-cookie";

const logout = (navigate) => {
  // Cookies.remove("userToken");
  Cookies.remove("auth-token-data");

  navigate("/login");
};

export { logout };
