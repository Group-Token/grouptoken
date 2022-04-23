import { configureStore } from '@reduxjs/toolkit';
import publicKeyReducer from '../features/publicKey/publicKeySlice';

const store = configureStore({
  reducer: {
    publicKey: publicKeyReducer,
  },
});

export default store;
