// import { useRouter } from "next/navigation";
import useAuth from "./use-auth";
import { useEffect } from "react";
import { RoleEnum } from "../../../enums/role-enum";
import { useNavigate } from "react-router-dom";
import useAuthActions from "./use-auth-actions";
// import useLanguage from "../i18n/use-language";
// import { RoleEnum } from "../api/types/role";

// type PropsType = {
//   params: { slug: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// };

// type OptionsType = {
//   roles: RoleEnum[];
// };

const roles = Object.values(RoleEnum).filter(
  (value) => !Number.isNaN(Number(value)),
);

function WithPageRequiredAuth({ options, children }) {
  // const optionRoles = options?.roles || roles;
  const optionRoles = options?.roles || roles;
  // return function WithPageRequiredAuth(props) {
  const navigate = useNavigate();
  const { user, isLoaded } = useAuth();
  const { logOut } = useAuthActions();
  // const router = useRouter();
  // const language = useLanguage();

  useEffect(() => {
    const check = () => {
      console.log("optionRoles: ", optionRoles, "userRole: ", user?.role?.id);
      if (
        (user &&
          user?.role?.id &&
          optionRoles.includes(Number(user?.role.id))) ||
        !isLoaded
      )
        return;

      const currentLocation = window.location.toString();
      const returnToPath =
        currentLocation.replace(new URL(currentLocation).origin, "") || `/`;
      const params = new URLSearchParams({
        returnTo: returnToPath,
      });

      let redirectTo = `/login?${params.toString()}`;

      if (user) {
        // logOut();
        redirectTo = `/unauthorized`;
      }

      navigate(redirectTo);
      // router.replace(redirectTo);
    };

    check();
  }, [user, isLoaded, navigate, optionRoles, options, logOut]);

  return user && user?.role?.id && optionRoles.includes(Number(user?.role.id))
    ? // <Component {...props} />
      children
    : null;
  // };
}

export default WithPageRequiredAuth;
