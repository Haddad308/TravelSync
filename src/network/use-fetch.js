"use client";

import { useCallback } from "react";
import useFetchBase from "./use-fetch-base";
import useAuthTokens from "../modules/auth/context/use-auth-tokens";

function useFetch() {
  const { tokensInfoRef, setTokensInfo } = useAuthTokens();
  const fetchBase = useFetchBase();

  const fetchWrapper = useCallback(
    async (input, init) => {
      return fetchBase(input, init, {
        token: tokensInfoRef.current?.token,
        refreshToken: tokensInfoRef.current?.refreshToken,
        tokenExpires: tokensInfoRef.current?.tokenExpires,
        setTokensInfo,
      });
    },
    [fetchBase, setTokensInfo, tokensInfoRef],
  );

  return fetchWrapper;
}

export default useFetch;
