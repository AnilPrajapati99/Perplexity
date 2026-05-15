import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    checkingAuth: true,
    authLoading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    setCheckingAuth: (state, action) => {
      state.checkingAuth = action.payload;
    },

    setAuthLoading: (state, action) => {
      state.authLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = "";
    },
    setClear: (state) => {
      state.user = null;
    },
  },
});

export function setErrorWithTimeout(message) {
  return (dispatch) => {
    dispatch(setError(message));
    setTimeout(() => {
      dispatch(clearError());
    }, 2000);
  };
}

export const {
  setError,
  setAuthLoading,
  setCheckingAuth,
  setUser,
  setClear,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
