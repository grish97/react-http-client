import { TApiEndpoints } from "@vasg/http-client";

export const apiEndpoints: TApiEndpoints = {
  API_LOGIN: {
    url: "login",
    method: "POST",
    isRequiredAuth: false,
  },
  CURRENT_USER: {
    url: "user",
    method: "GET",
    isRequiredAuth: true,
  },
  API_REGISTER: {
    url: "register",
    method: "POST",
    isRequiredAuth: false,
  },
  API_REFRESH_TOKEN: {
    url: "refresh",
    method: "POST",
    isRequiredAuth: true,
  },
  API_INIT_FLAGS: {
    url: "init-flags",
    method: "POST",
    isRequiredAuth: true,
  },
};
