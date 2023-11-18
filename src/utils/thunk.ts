import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "@/store";

type AsyncThunkConfig = {
  state: RootState;
  dispatch: AppDispatch;
  extra?: unknown;
  rejectValue?: unknown;
  serializedErrorType?: unknown;
  pendingMeta?: unknown;
  fulfilledMeta?: unknown;
  rejectedMeta?: unknown;
};

export const createAppAsyncThunk =
  createAsyncThunk.withTypes<AsyncThunkConfig>();
