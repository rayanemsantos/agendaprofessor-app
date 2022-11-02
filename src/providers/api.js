import { getToken } from '../storage/Storage';

const URL_PROD = "https://agenda-professor-api.herokuapp.com/api";
const URL_LOCAL = "http://192.168.1.5:8000/api"

export  const URL_BASE = URL_PROD;

export async function get(resource){
  const token = await getToken();
  let url = `${URL_BASE}${resource}`
  return fetch(url, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json; charset=UTF-8'
    }
  }).then(async function (response) {
    let resData = await response.json();
    // check for error response
    if (!response.ok) {
      return Promise.reject(resData);
    }    
    return resData;
  })
}

export async function post(resource, body){
  const token = await getToken();
  let url = `${URL_BASE}${resource}`
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-type': 'application/json; charset=UTF-8'
    },
  }).then(async function (response) {
    let resData = await response.json();
    // check for error response
    console.log(response.ok)
    if (!response.ok) {
      return Promise.reject(resData);
    }    
    return resData;
  })
}