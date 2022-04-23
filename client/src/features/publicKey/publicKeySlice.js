import { createSlice } from '@reduxjs/toolkit';

export const publicKeySlice = createSlice(
  {
    name: 'publicKey',
    initialState: {
      value: null,
    },
    reducers: {
      setKey: (state, key) => {
        state.value = key;
      },
      deleteKey: (state) => {
        state.value = null;
      },
    },
  }
);

export const { setKey, deleteKey } = publicKeySlice.actions;

export default publicKeySlice.reducer;
