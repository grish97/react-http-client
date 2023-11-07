import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk } from "@/utils/thunk";
import { apiEndpoints, privateClient, publicClient } from "@http";

export interface CounterState {
  user: any;
}

const initialState: CounterState = {
  user: null,
}

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
});

export const refreshToken = createAppAsyncThunk(
  "auth/refreshToken",
  async (params, { rejectWithValue }) => {
    const userEmail = localStorage.getItem("userEmail");
    const rToken = localStorage.getItem("refreshToken");

    try {
      const response =  await privateClient.post({
        route: apiEndpoints.API_REFRESH_TOKEN,
        data: {
          username: userEmail,
          deviceIdentifier: "c58ed65d-5621-4be9-9a28-a2f524e86618",
          token: rToken,
        },
      });

      return response.data;
    } catch (refreshError: any) {
      throw refreshError;
    }
  },
);

export const login = createAppAsyncThunk<any, any>(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await publicClient.post({
        route: apiEndpoints.API_LOGIN,
        data: credentials,
      });

      return response.data;
    } catch (refreshError: any) {
      throw refreshError;
    }
  },
);

export const getInitFlags = createAppAsyncThunk<any>(
  "auth/getInitflags",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await publicClient.post({
        route: apiEndpoints.API_LOGIN,
        data: credentials,
      });

      return response.data;
    } catch (refreshError: any) {
      throw refreshError;
    }
  },
);

export default authSlice;
