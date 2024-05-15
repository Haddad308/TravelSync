import { useNavigate } from "react-router-dom";
import useAuth from "./use-auth";
import { useEffect } from "react";
import { RoleEnum } from "../../../enums/role-enum";

function WithPageRequiredGuest({ children }) {
  const { user, isLoaded } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const check = () => {
      if (!user || !isLoaded) return;

      const params = new URLSearchParams(window.location.search);
      const returnTo =
        params.get("returnTo") ??
        (user?.role?.id === RoleEnum.admin ? "/Dashboard" : "/home");
      navigate(returnTo);
    };

    check();
  }, [user, isLoaded, navigate]);

  return !user && isLoaded ? children : null;
}

export default WithPageRequiredGuest;
