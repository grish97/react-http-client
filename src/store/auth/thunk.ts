import { apiEndpoints, privateClient, publicClient } from "@http";
import { createAppAsyncThunk } from "@utils/thunk";
import { localStorageConst } from "@utils/constants/localStorage";

export const refreshToken = createAppAsyncThunk(
  "auth/refreshToken",
  async () => {
    const userEmail = localStorage.getItem(localStorageConst.USER_EMAIL);
    const rToken = localStorage.getItem(localStorageConst.REFRESH_TOKEN);

    try {
      const response =  await privateClient.post({
        route: apiEndpoints.API_REFRESH_TOKEN,
        data: {
          username: userEmail,
          deviceIdentifier: "c58ed65d-5621-4be9-9a28-a2f524e86618",
          refreshToken: rToken,
        },
      });

      localStorage.setItem(localStorageConst.REFRESH_TOKEN, response.data.refreshToken);
      localStorage.setItem(localStorageConst.ACCESS_TOKEN, response.data.token);
      localStorage.setItem(localStorageConst.USER_EMAIL, response.data.email);
      localStorage.setItem(localStorageConst.USER_NAME, response.data.firstName);

      return response.data;
    } catch (refreshError: any) {
      return refreshError;
    }
  },
);

export const login = createAppAsyncThunk<any, any>(
  "auth/login",
  async (credentials) => {
    try {
      const response = await publicClient.post({
        route: apiEndpoints.API_LOGIN,
        data: credentials,
      });

      localStorage.setItem(localStorageConst.REFRESH_TOKEN, response.data.refreshToken);
      localStorage.setItem(localStorageConst.ACCESS_TOKEN, response.data.token);
      localStorage.setItem(localStorageConst.USER_EMAIL, response.data.email);
      localStorage.setItem(localStorageConst.USER_NAME, response.data.firstName);

      return response.data;
    } catch (refreshError: any) {
      throw refreshError;
    }
  },
);

export const getInitFlags = createAppAsyncThunk(
  "auth/getInitflags",
  async () => {
    try {
      const response = await privateClient.post({
        route: apiEndpoints.API_INIT_FLAGS,
      });

      return response.data;
    } catch (refreshError: any) {
      throw refreshError;
    }
  },
);

export const getUser = createAppAsyncThunk(
  "auth/getUser",
  async () => {
    try {
      const response = await privateClient.post({
        route: apiEndpoints.CURRENT_USER,
      });

      return response.data;
    } catch (refreshError: any) {
      throw refreshError;
    }
  },
);
