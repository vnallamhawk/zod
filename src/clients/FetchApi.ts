import FetchApiError from "./FetchApiError";

const FETCH_ERROR_MESSAGE_PREFIX = "Api Error";

function isString(arg: unknown): arg is string {
  return typeof arg === "string";
}

type NonNullableHeaders = Record<string, string>;

interface ApiProps {
  baseUrl: string;
  errorHandler?: (err: Error) => void;
  headers?: RequestArgs["headerOverrides"];
}

interface RequestArgs {
  body?: any;
  headerOverrides?: Record<string, string> | null; // null is allowed so we can remove those keys from the class' header property
}

const overrideHeaders = (
  originalHeaders: NonNullableHeaders,
  headerOverrides?: RequestArgs["headerOverrides"]
): NonNullableHeaders => {
  let overriddenHeaders = { ...originalHeaders };

  if (headerOverrides != null) {
    Object.keys(headerOverrides).forEach((key) => {
      const headerOverride = headerOverrides[key];

      if (headerOverride === null) {
        // remove the header key that's set to null from the headers object
        const { [key]: deletedHeader, ...cleanedHeaders } = overriddenHeaders;
        overriddenHeaders = cleanedHeaders;
      } else {
        overriddenHeaders[key] = headerOverride;
      }
    });
  }

  return overriddenHeaders;
};

export default class FetchApi {
  baseUrl: Required<ApiProps>["baseUrl"];
  errorHandler: Required<ApiProps>["errorHandler"];
  headers: NonNullableHeaders; // the class' header property will not have null values since we remove those keys if their value is null

  static headers = {
    Accept: "application/json, text/javascript; q=0.9, */*; q=0.6",
    "Accept-Encoding": "gzip, deflate, br",
    "Content-Type": "application/json",
    // uncommenting the x-caller header may cause CORS errors if the BE services don't have their
    // Access-Control-Allow-Headers header properly configured
    // 'X-Caller': name,
  };

  constructor(props: ApiProps) {
    const {
      baseUrl: propsBaseUrl,
      headers: propsHeaders,
      errorHandler: propsErrorHandler,
    } = props;
    this.baseUrl = propsBaseUrl;
    this.headers = {
      ...FetchApi.headers,
    };
    this.errorHandler = (error: Error) => {
      if (typeof propsErrorHandler === "function") {
        propsErrorHandler(error);
      } else {
        throw error;
      }
    };

    this.headers = overrideHeaders(this.headers, propsHeaders);
  }

  request = <T>(url: RequestInfo, options?: RequestInit): Promise<T> => {
    return fetch(url, options).then(
      async (response) => {
        if (options?.method === "HEAD") {
          return response;
        }

        if (response.ok) {
          if (response.status !== 204 && response.status !== 202) {
            let data;

            try {
              switch (response.headers.get("content-type")) {
                case "image/jpeg":
                case "text/csv":
                  data = await response.text();
                  break;
                case "application/pdf":
                  data = response.blob();
                  break;
                default:
                  data = await response.json();
              }
            } catch (error) {
              console.error(error);
            }

            return data;
          }
        } else {
          // sample error message: "Api Error: GET http://example.com/some/path 404 (Not found)"
          const apiError = new FetchApiError(
            `${FETCH_ERROR_MESSAGE_PREFIX}: ${
              isString(options?.method) ? options?.method : "UNKNOWN_METHOD"
            } ${isString(url) ? url : "UNKNOWN_URL"} ${response.status}${
              response.statusText ? ` (${response.statusText})` : ""
            }`
          );
          apiError.response = response;

          if (response.headers.get("content-type") === "application/json") {
            try {
              const json = await response.json();
              apiError.payload = json;
            } catch (e) {
              console.error(e, "could not parse response json");
            }
          }

          this.errorHandler(apiError);
        }
      },
      (err) => {
        const callError = new FetchApiError("Call Error");
        callError.response = err;

        this.errorHandler(callError);
      }
    );
  };

  get<ReturnType>(url: string, args?: RequestArgs): Promise<ReturnType> {
    const { headerOverrides } = args ?? {};
    const { request, baseUrl } = this;
    const headers = overrideHeaders(this.headers, headerOverrides);
    const options: RequestInit = {
      headers,
      method: "GET",
      mode: "cors",
    };

    return request<ReturnType>(`${baseUrl}/${url}`, options);
  }
}
