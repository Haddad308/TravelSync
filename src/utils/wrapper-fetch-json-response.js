import HTTP_CODES_ENUM from "../enums/http-codes";

async function wrapperFetchJsonResponse(response) {
  const status = response.status;
  return {
    status,
    data: [
      HTTP_CODES_ENUM.NO_CONTENT,
      HTTP_CODES_ENUM.SERVICE_UNAVAILABLE,
      HTTP_CODES_ENUM.INTERNAL_SERVER_ERROR,
    ].includes(status)
      ? undefined
      : await response.json(),
  };
}

export default wrapperFetchJsonResponse;
