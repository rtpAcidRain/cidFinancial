import { configureStore } from '@reduxjs/toolkit';
import { StateSchema } from './StateSchema';
import { apiSlice } from '@/shared/api';

export const store = configureStore({
    devTools: __IS_DEV__,
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});
