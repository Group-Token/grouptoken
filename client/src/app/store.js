import { configureStore } from '@reduxjs/toolkit';
import publicKeyReducer from '../features/publicKey/publicKeySlice';
import accountReducer from '../features/account/accountSlice';

const store = configureStore({
  reducer: {
    publicKey: publicKeyReducer,
    account: accountReducer,
  },
});

export default store;
