// /* eslint-disable react-refresh/only-export-components */
// /* eslint-disable react/prop-types */

// import { createContext, useState } from "react";

// export let auth = createContext();

// export default function AuthProvider({ children }) {
//   let token = useState(null);
//   return <auth.Provider value={token}>{children}</auth.Provider>;
// }

////////////////////////////////////////////////////////////

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AuthActionsContext,
  AuthContext,
  AuthTokensContext,
} from "./auth-context";
import Cookies from "js-cookie";
import useFetchBase from "../../../utils/use-fetch-base";
import { AUTH_LOGOUT_URL, AUTH_ME_URL } from "../config";
import HTTP_CODES_ENUM from "../../../enums/http-codes";

function AuthProvider(props) {
  const AUTH_TOKEN_KEY = "auth-token-data";
  const [isLoaded, setIsLoaded] = useState(false);
  const [user, setUser] = useState(null);
  const tokensInfoRef = useRef({
    token: null,
    refreshToken: null,
    tokenExpires: null,
  });
  const fetchBase = useFetchBase();

  const setTokensInfoRef = useCallback((tokens) => {
    tokensInfoRef.current = tokens ?? {
      token: null,
      refreshToken: null,
      tokenExpires: null,
    };
  }, []);

  const setTokensInfo = useCallback(
    (tokensInfo) => {
      setTokensInfoRef(tokensInfo);

      if (tokensInfo) {
        Cookies.set(AUTH_TOKEN_KEY, JSON.stringify(tokensInfo));
      } else {
        Cookies.remove(AUTH_TOKEN_KEY);
        setUser(null);
      }
    },
    [setTokensInfoRef],
  );

  const logOut = useCallback(async () => {
    if (tokensInfoRef.current.token) {
      await fetchBase(
        AUTH_LOGOUT_URL,
        {
          method: "POST",
        },
        {
          token: tokensInfoRef.current.token,
          refreshToken: tokensInfoRef.current.refreshToken,
          tokenExpires: tokensInfoRef.current.tokenExpires,
        },
      );
    }
    setTokensInfo(null);
  }, [setTokensInfo, fetchBase]);

  const loadData = useCallback(async () => {
    const tokens = JSON.parse(Cookies.get(AUTH_TOKEN_KEY) ?? "null");

    setTokensInfoRef(tokens);

    try {
      if (tokens?.token) {
        const response = await fetchBase(
          AUTH_ME_URL,
          {
            method: "GET",
          },
          {
            token: tokens.token,
            refreshToken: tokens.refreshToken,
            tokenExpires: tokens.tokenExpires,
            setTokensInfo,
          },
        );

        if (response.status === HTTP_CODES_ENUM.UNAUTHORIZED) {
          logOut();
          return;
        }

        const data = await response.json();
        setUser(data);
      }
    } catch {
      logOut();
    } finally {
      setIsLoaded(true);
    }
  }, [fetchBase, logOut, setTokensInfoRef, setTokensInfo]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const contextValue = useMemo(
    () => ({
      isLoaded,
      user,
    }),
    [isLoaded, user],
  );

  const contextActionsValue = useMemo(
    () => ({
      setUser,
      logOut,
    }),
    [logOut],
  );

  const contextTokensValue = useMemo(
    () => ({
      tokensInfoRef,
      setTokensInfo,
    }),
    [setTokensInfo],
  );

  return (
    <AuthContext.Provider value={contextValue}>
      <AuthActionsContext.Provider value={contextActionsValue}>
        <AuthTokensContext.Provider value={contextTokensValue}>
          {props.children}
        </AuthTokensContext.Provider>
      </AuthActionsContext.Provider>
    </AuthContext.Provider>
  );
}

export default AuthProvider;
