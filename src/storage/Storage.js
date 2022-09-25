import { AsyncStorage } from 'react-native';

export function setUserData(user) {
    return AsyncStorage.setItem("userData", JSON.stringify(user));
}
export function setToken(token) {
    return AsyncStorage.setItem("userToken", JSON.stringify(token));
}
export function getUserData() {
    return AsyncStorage.getItem("userData");
}
export function cleanData() {
    return AsyncStorage.clear();
}
