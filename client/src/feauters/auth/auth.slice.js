import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: true,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
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

export const { setError, setLoading, setUser, setClear, clearError } =
  authSlice.actions;

export default authSlice.reducer;
