import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../feauters/auth/auth.slice";
import chatReducer from "../feauters/chat/chat.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
});
