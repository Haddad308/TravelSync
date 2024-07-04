"use client";

import { useCallback } from "react";
import { AUTH_REFRESH_URL } from "../modules/auth/config";

function useFetchBase() {
  return useCallback(async (input, init, tokens) => {
    let headers = {};

    if (!(init?.body instanceof FormData)) {
      headers = {
        ...headers,
        "Content-Type": "application/json",
      };
    }

    if (tokens?.token) {
      headers = {
        ...headers,
        Authorization: `Bearer ${tokens.token}`,
      };
    }

    if (tokens?.tokenExpires && tokens.tokenExpires <= Date.now()) {
      const newTokens = await fetch(AUTH_REFRESH_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokens.refreshToken}`,
        },
      }).then((res) => res.json());

      if (newTokens.token) {
        tokens?.setTokensInfo?.({
          token: newTokens.token,
          refreshToken: newTokens.refreshToken,
          tokenExpires: newTokens.tokenExpires,
        });

        headers = {
          ...headers,
          Authorization: `Bearer ${newTokens.token}`,
        };
      } else {
        tokens?.setTokensInfo?.(null);

        throw new Error("Refresh token expired");
      }
    }

    return fetch(input, {
      ...init,
      headers: {
        ...headers,
        ...init?.headers,
      },
    });
  }, []);
}

export default useFetchBase;
