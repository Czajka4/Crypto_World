// Redux reducer for crypto API

import { configureStore } from '@reduxjs/toolkit';
import { cryptoApi } from '../services/cryptoApi';

export default configureStore({
    reducer: {
      [cryptoApi.reducerPath]: cryptoApi.reducer,
    },
  });