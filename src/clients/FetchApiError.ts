type ResponseType = Response | undefined;
type PayloadType = { code?: string; errorMessage?: string } | undefined;

export default class FetchApiError extends Error {
  response: ResponseType;
  payload: PayloadType;

  constructor(
    message = "",
    response: ResponseType = undefined,
    payload: PayloadType = undefined
  ) {
    super(message);
    this.name = "FetchApiError";
    this.response = response;
    this.payload = payload;
  }
}
