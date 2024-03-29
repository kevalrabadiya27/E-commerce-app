import axios from "axios";

export const BASE_URL = "https://e-commerce-api-99id.onrender.com/api/"

// const TOKEN = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.accessToken

// const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const TOKEN = localStorage.getItem("token")
// const currentUser = user && JSON.parse(user).currentUser;
// const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: { token: `keval ${TOKEN}` }
});