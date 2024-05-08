import { instance } from "../../../network/axios";
import Cookies from "js-cookie";

export default async function UserLogin(
  values,
  setIsLoading,
  setApiError,
  navigate,
) {
  setIsLoading(true);
  setApiError("");

  try {
    const response = await instance.post("/api/v1/auth/email/login", values);
    if (response.status === 200) {
      const { token } = response.data;
      setIsLoading(false);
      navigate("/");
      Cookies.set("userToken", token, { expires: 7, secure: true });
    }
  } catch (error) {
    console.error("Login error:", error);
    setApiError(error.message || "Login failed");
    setIsLoading(false);
  }
}

// *why we make the token in context
