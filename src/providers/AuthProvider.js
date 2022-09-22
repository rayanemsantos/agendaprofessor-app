import axios from 'axios';
import * as config from './config';

export function auth(params){
  var params = {
    registration_id: params.registration_id,
    password: params.password
  }
  return axios.post(`${config.URL_BASE}/user/login`, params)
}

export function logout(params){
  return axios.post(`${config.URL_BASE}/user/logout`, params)
}