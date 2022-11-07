const isDefined = (v: unknown | undefined | null): v is unknown => {
  return v !== undefined && v !== null;
};

const getHeaders = (params: RequestInit) => {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  if (isDefined(params) && params.headers === null) {
    return undefined;
  }

  if (isDefined(params) && isDefined(params.headers)) {
    return {
      ...defaultHeaders,
      ...params.headers,
    };
  }

  return defaultHeaders;
};

export const post = (endpoint: string, body: BodyInit, params: RequestInit) => {
  const headers = getHeaders(params);

  return fetch(`http://localhost:5000/${endpoint}`, {
    method: "POST",
    body,
    headers,
  });
};

export const postFile = (endpoint: string, body: FormData) => {
  return post(endpoint, body, { headers: null });
};

export const get = (
  endpoint: string,
  query?: Record<string, string>,
  params?: RequestInit
) => {
  const headers = getHeaders(params);

  let queryString = "";

  if (query) {
    queryString = Object.keys(query).reduce((result, key, index) => {
      const sign = index === 0 ? "?" : "&";
      return result + `${sign}${key}=${query[key]}`;
    }, "");
  }

  return fetch(`http://localhost:5000/${endpoint}${queryString}`, {
    method: "GET",
    headers,
  });
};
