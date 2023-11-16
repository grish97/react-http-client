import { RootState } from '@store';

export const selectUser = (state: RootState) => {
  return {
    user: state.auth.user,
    error: state.auth.error,
  };
};
