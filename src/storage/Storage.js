import AsyncStorage from '@react-native-async-storage/async-storage';

export function setUserData(user) {
    return AsyncStorage.setItem("userData", JSON.stringify(user));
}
export function setToken(token) {
    return AsyncStorage.setItem("userToken", token);
}
export function getToken() {
    return AsyncStorage.getItem("userToken");
}
export function getUserData() {
    return AsyncStorage.getItem("userData");
}
export function cleanData() {
    return AsyncStorage.clear();
}
