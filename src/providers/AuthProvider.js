import axios from 'axios';
import { getToken } from '../storage/Storage';
import { URL_BASE } from './config';

axios.interceptors.request.use(
  async config => {
    const token = await getToken();
    config.headers['Content-Type'] = 'application/json';
    if(token){
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config
  },
  error => {
    return Promise.reject(error);
  }
);

export function login(params){
  var params = {
    username: params.username,
    password: params.password
  }
  return axios.post(`${URL_BASE}/auth/login`, params)
}

export function logout(){
  return axios.post(`${URL_BASE}/auth/logout`)
}