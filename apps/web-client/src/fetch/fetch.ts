const isDefined = (v: unknown | undefined | null): v is unknown => {
  return v !== undefined && v !== null;
};

const getHeaders = (params: RequestInit) => {
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

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

export const get = (endpoint: string) => {
  return fetch(`http://localhost:5000/${endpoint}`, {
    method: "GET",
  });
};
