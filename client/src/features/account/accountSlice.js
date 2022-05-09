import { createSlice } from '@reduxjs/toolkit';

export const accountSlice = createSlice(
  {
    name: 'account',
    initialState: {
      value: null,
    },
    reducers: {
      setAccount: (state, account) => {
        state.value = account;
      },
      removeAccount: (state) => {
        state.value = null;
      }
    }
  }
);

export const { setAccount, removeAccount } = accountSlice.actions;

export default accountSlice.reducer;
