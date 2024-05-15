import { useNavigate } from "react-router-dom";
import useAuth from "./use-auth";
import { useEffect } from "react";

// do not forget to figure out how to pass props to children

function WithPageRequiredGuest({ children }) {
  const { user, isLoaded } = useAuth();
  const navigate = useNavigate();
  // const language = useLanguage();

  useEffect(() => {
    const check = () => {
      if (!user || !isLoaded) return;

      const params = new URLSearchParams(window.location.search);
      const returnTo = params.get("returnTo") ?? `/`;
      navigate(returnTo);
      // router.replace(returnTo);
    };

    check();
  }, [user, isLoaded, navigate]);

  return !user && isLoaded ? children : null;
}

export default WithPageRequiredGuest;
