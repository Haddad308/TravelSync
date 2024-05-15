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

      const returnTo =
        user?.role?.id === RoleEnum.admin ? "/Dashboard" : "/user/Home";
      navigate(returnTo);
    };

    check();
  }, [user, isLoaded, navigate]);

  return !user && isLoaded ? children : null;
}

export default WithPageRequiredGuest;
