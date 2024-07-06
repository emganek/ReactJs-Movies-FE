import axios from "axios";
import { ACCOUNT_INFO_KEY, BASE_URL, TOKEN_CYBERSOFT, USER_INFO_KEY } from "../constants/common";
import { refreshTokenAPI } from "../services/user";
import { store } from "../store/store";
import { setUserInfoAction } from "../store/actions/user.reducer";
import { redirectTo } from "../services/navigation";

let isRefreshTokenProcessing = false;
let requestQueue = [];

const logOut = () => {
  isRefreshTokenProcessing = false;
  requestQueue = [];
  localStorage.removeItem(USER_INFO_KEY);
  localStorage.removeItem(ACCOUNT_INFO_KEY);
  store.dispatch(setUserInfoAction(null));
  redirectTo("/login");
};

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
    if (userInfo?.hasRefreshToken && error?.response?.status === 401) {
      if (!isRefreshTokenProcessing) {
        isRefreshTokenProcessing = true;
        refreshTokenAPI({
          id: userInfo.id,
          hoTen: userInfo.hoTen,
          taiKhoan: userInfo.taiKhoan,
          email: userInfo.email,
          maLoaiNguoiDung: userInfo.maLoaiNguoiDung,
        }).then((res) => {
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

          requestQueue.forEach((req) => {
            req.resolve(request(req.config));
          });

          requestQueue = [];
        });
      }

      // Refresh token fail
      if (originalRequest.url.includes("auth/refresh-token")) {
        logOut();
      }

      return new Promise((resolve, reject) => {
        requestQueue.push({ resolve, reject, config: originalRequest });
      });
    }

    if (error?.response?.status === 401) {
      logOut();
    }

    return Promise.reject(error);
  }
);
