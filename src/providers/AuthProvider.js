import { post } from "./api"

export function login(params){
  var params = {
    username: params.username,
    password: params.password
  }
  return post('/auth/login', params)
}

export function logout(){
  return post('/auth/logout')
}