
import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './sliceData';

 const store = configureStore({
  reducer: {
    dashboard: dashboardReducer,
  },
});

export default store;
