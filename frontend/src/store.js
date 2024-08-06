import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import tasksReducer from '../src/slices/taskSlice';
import { apiSlice } from './slices/apiSlice';
import themeReducer from './slices/themeSlice';

const store = configureStore({
  reducer: {
    theme: themeReducer,
    tasks: tasksReducer,
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
