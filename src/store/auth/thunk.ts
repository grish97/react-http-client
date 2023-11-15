import { apiEndpoints, privateClient, publicClient } from "@http";
import { createAppAsyncThunk } from "@utils/thunk";

export const refreshToken = createAppAsyncThunk(
  "auth/refreshToken",
  async () => {
    const userEmail = localStorage.getItem("userEmail");
    const rToken = localStorage.getItem("refreshToken");

    try {
      const response =  await privateClient.post({
        route: apiEndpoints.API_REFRESH_TOKEN,
        data: {
          username: userEmail,
          deviceIdentifier: "c58ed65d-5621-4be9-9a28-a2f524e86618",
          refreshToken: rToken,
        },
      });

      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userEmail", response.data.email);
      localStorage.setItem("userName", response.data.firstName);

      return response.data;
    } catch (refreshError: any) {
      throw refreshError;
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

      localStorage.setItem("refreshToken", response.data.refreshToken);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userEmail", response.data.email);
      localStorage.setItem("userName", response.data.firstName);

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
