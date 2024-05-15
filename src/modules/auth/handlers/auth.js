import { useCallback } from "react";
import wrapperFetchJsonResponse from "../../../utils/wrapper-fetch-json-response";
import useFetchBase from "../../../utils/use-fetch-base";
import { API_URL } from "../config";

export function useAuthLoginService() {
  const fetchBase = useFetchBase();

  return useCallback(
    (data) => {
      return fetchBase(`${API_URL}/v1/auth/email/login`, {
        method: "POST",
        body: JSON.stringify(data),
      }).then(wrapperFetchJsonResponse);
    },
    [fetchBase],
  );
}
