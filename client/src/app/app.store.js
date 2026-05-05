import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feauters/auth/auth.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
