/*
  check our respponsr status
*/
const checkResponse = (resp) => {
  const status = resp.status;
  if (status < 200 || status > 300) {
    throw Error(resp.statusText);
  }
  return resp;
};

// make generic http request fn...
const makeReq = async (url, setOpts) => {
  const request = await fetch(url, setOpts);
  return checkResponse(request);
};

// settings for our CRUD methods
const settings = (method, data) => ({
  method,
  body: JSON.parse(data),
});

/* REST methods: GET, PUT, DELETE, POST */
// GET method
export const getJson = async (url) => {
  const request = await makeReq(url, {});
  return request.json();
};

// POST method
export const postJson = async (url, data) => {
  const request = await makeReq(url, settings('POST', data));
  return request.json();
}

// PUT method
export const putJson = async (url, data) => {
  const request = await makeReq(url, settings('PUT', data));
  return request.json();
}
