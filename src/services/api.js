import axios from "axios";

const serverUrl = "http://localhost:8000/api";

export const loginUser = async (user) => {
  return await axios.post(`${serverUrl}/login`, user);
};

// get, add, edit, delete (CRUD) apis for user

export const getStateCovidData = async (id, state, token) => {
  let config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  return await axios.get(
    `${serverUrl}/getstatecoviddata/${state}/${id}`,
    config
  );
};

export const addStateCovidData = async (data, state, token) => {
  let config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  return await axios.post(
    `${serverUrl}/addstatecoviddata/${state}`,
    data,
    config
  );
};

export const editStateCovidData = async (id, data, state, token) => {
  let config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  return await axios.put(
    `${serverUrl}/editstatecoviddata/${state}/${id}`,
    data,
    config
  );
};

export const deleteStateCovidData = async (id, state, token) => {
  let config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  return await axios.delete(
    `${serverUrl}/deletestatecoviddata/${state}/${id}`,
    config
  );
};



export const getStateCovidDataForPublic = async () => {
  return await axios.get(`${serverUrl}/getstatecoviddataforpublic`);
};

export const getStateCovidDataForUser = async (token, state) => {
  let config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  return await axios.get(
    `${serverUrl}/getstatecoviddataforuser/${state}`,
    config
  );
};

export const getStateCovidDataForAdmin = async (token) => {
  let config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  return await axios.get(`${serverUrl}/getstatecoviddataforadmin`, config);
};

export const approveStateCovidData = async (id, token) => {
  let config = {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };

  return await axios.get(`${serverUrl}/approvestatecoviddata/${id}`, config);
};
