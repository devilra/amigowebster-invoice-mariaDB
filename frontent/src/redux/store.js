import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/Slices/authSlice";
import settingReducer from "../redux/Slices/settingSlice";
import customerReducer from "../redux/Slices/customerSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    settings: settingReducer,
    customers: customerReducer,
  },
});

export default store;
