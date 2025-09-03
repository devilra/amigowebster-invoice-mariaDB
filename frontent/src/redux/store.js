import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/Slices/authSlice";
import settingReducer from "../redux/Slices/settingSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    settings: settingReducer,
  },
});

export default store;
