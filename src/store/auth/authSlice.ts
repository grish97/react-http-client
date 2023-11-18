import { createSlice } from "@reduxjs/toolkit";
import { getUser, login, refreshToken } from "./thunk";

export interface IAuthState {
  user: any;
  error: any;
}

const initialState: IAuthState = {
  user: null,
  error: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.payload;
      });

    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload;
    });


    builder
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.user = action.payload;
        state.error = null;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

const { reducer } = authSlice;

export * from "./thunk.ts";

export default reducer;
