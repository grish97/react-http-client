import { createSlice } from "@reduxjs/toolkit";

export interface CounterState {
  user: any;
}

const initialState: CounterState = {
  user: null,
}

export const slice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {},
});

export default slice;
