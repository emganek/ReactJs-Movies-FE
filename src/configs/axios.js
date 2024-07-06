import axios from "axios";
import { BASE_URL, TOKEN_CYBERSOFT, USER_INFO_KEY } from "../constants/common";
import { refreshTokenAPI } from "../services/user";

let isRefreshTokenProcessing = false;
let requestQueue = [];

export const request = axios.create({
  baseURL: BASE_URL,
  headers: {
    TokenCybersoft: TOKEN_CYBERSOFT,
  },
  withCredentials: true,
});

request.interceptors.request.use((config) => {
  let userInfo = localStorage.getItem(USER_INFO_KEY);

  if (userInfo) {
    userInfo = JSON.parse(userInfo);
    config.headers.Authorization = `Bearer ${userInfo.accessToken}`;
  }

  // Handle refresh token
  console.log("request url", config.url);
  console.log("isRefreshTokenProcessing", isRefreshTokenProcessing);
  if (isRefreshTokenProcessing && !config.url.includes("auth/refresh-token")) {
    return new Promise((resolve, reject) => {
      requestQueue.push({ resolve, reject, config });
    });
  }

  return config;
});

request.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let originalRequest = error.config;
    let userInfo = localStorage.getItem(USER_INFO_KEY);
    userInfo = JSON.parse(userInfo);  
    console.log("error", error);
    if (userInfo?.hasRefreshToken && error?.response?.status === 401) {
      if (!isRefreshTokenProcessing) {
        isRefreshTokenProcessing = true;
        console.log("refreshTokenAPI called");
        refreshTokenAPI({
          id: userInfo.id,
          hoTen: userInfo.hoTen,
          taiKhoan: userInfo.taiKhoan,
          email: userInfo.email,
          maLoaiNguoiDung: userInfo.maLoaiNguoiDung,
        })
          .then((res) => {
            console.log("refresh token response", res);
            isRefreshTokenProcessing = false;
            const { accessToken } = res.data.content;

            const data = {
              id: userInfo.id,
              hoTen: userInfo.hoTen,
              taiKhoan: userInfo.taiKhoan,
              email: userInfo.email,
              maLoaiNguoiDung: userInfo.maLoaiNguoiDung,
              accessToken,
              hasRefreshToken: true,
            };

            localStorage.setItem(USER_INFO_KEY, JSON.stringify(data));

            console.log("requestQueue", requestQueue);

            requestQueue.forEach((req) => {
              req.resolve(request(req.config));
            });

            requestQueue = [];
          })
      }

      return new Promise((resolve, reject) => {
        requestQueue.push({ resolve, reject, config: originalRequest });
      });
    }

    return Promise.reject(error);
  }
);
