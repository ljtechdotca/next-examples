const createRequest = (url: string, init?: RequestInit) => {
  const request = new Request(url, init);
  return request;
};

const _get = async (url: string) => {
  const request = createRequest(url);
  try {
    const response = await fetch(request);
    const { status, message, content } = await response.json();
    return { status, message, content };
  } catch (error) {
    return error;
  }
};

const _post = async (url: string, body: any) => {
  const reqInit: RequestInit = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  const request = createRequest(url, reqInit);
  try {
    const response = await fetch(request);
    const { status, message, content } = await response.json();
    return { status, message, content };
  } catch (error) {
    return error;
  }
};

const _put = async (url: string, body: any) => {
  const reqInit: RequestInit = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  const request = createRequest(url, reqInit);
  try {
    const response = await fetch(request);
    const { status, message, content } = await response.json();
    return { status, message, content };
  } catch (error) {
    return error;
  }
};

const _delete = async (url: string) => {
  const reqInit: RequestInit = {
    method: "DELETE",
  };
  const request = createRequest(url, reqInit);
  try {
    const response = await fetch(request);
    const { status, message, content } = await response.json();
    return { status, message, content };
  } catch (error) {
    return error;
  }
};

export const fetcher = {
  get: _get,
  post: _post,
  put: _put,
  delete: _delete,
};
