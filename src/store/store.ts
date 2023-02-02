import { configureStore } from '@reduxjs/toolkit';
import techsReducer from '@/store/features/techs/techsSlice';

export const store = configureStore({
  reducer: {
    techs: techsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
