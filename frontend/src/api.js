import * as axios from "axios";

const baseUrl = 'http://127.0.0.1:8000/'
const API_AUTH = baseUrl + 'auth/'
const API_URL = baseUrl + 'api/v1/'
const API_GET_USER = baseUrl + 'user/'


const access_token = localStorage.getItem('access_token')
const refresh_token = localStorage.getItem('refresh_token')

const axiosInstance = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: access_token ? {
    Authorization: 'Bearer ' + access_token,
    'Content-Type': 'application/json',
    accept: 'application/json',
  } : {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
);

export const getUser = async () => {
  const user_id = localStorage.getItem('user_id')
  const response = await axiosInstance.get(baseUrl + 'user/' + user_id + '/')
  return response.data
}

const facebookLogin = async (accessToken) => {
  await axiosInstance
    .post(`${baseUrl}auth/convert-token/`, {
      token: accessToken,
      backend: 'facebook',
      grant_type: 'convert_token',
      client_id: 'L2zAGU71k77fMa2EcRlZyH1JTRaHZVrn7CBAhCWC',
      client_secret: 'pbtBAkC2O75BQWtho0TagUShaM35lC6AUbHZBxSYeNOx3F20ICE7c7bbpRm3fIboWrER1Nuh1OVRmYpI5xB9wg3oV3VYCVgY6nZRyKhON528FAB73eJlquEBPxqSzuUR',
    })
    .then(res => {
      localStorage.setItem('access_token', res.data.access_token)
      localStorage.setItem('refresh_token', res.data.refresh_token)
    })
}

export const responseFacebook = async (response) => {
  const useId = response.id
  localStorage.setItem('user_id', useId)
  await facebookLogin(response.accessToken)
}

export async function logOut() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  localStorage.removeItem('user_id');
  axiosInstance.defaults.headers['Authorization'] = null;
}

export const getImpressions = async () => {
  let result
  await axiosInstance.get(API_URL).then(res => {
    result = res.data
  })
  return result
}

export const addImpression = async (fields) => {
  await axiosInstance.post(API_URL, fields,)
}

export const removeImpression = async (impressionId) => {
  await axiosInstance.delete(API_URL + impressionId)
}