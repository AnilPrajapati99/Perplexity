import { useDispatch } from "react-redux";
import { registerUser, loginUser, getMe, logOut } from "../service/auth.api";
import {
  setUser,
  setError,
  setAuthLoading,
  setCheckingAuth,
  setClear,
} from "../auth.slice";
import { setErrorWithTimeout } from "../auth.slice";
import { Heading1 } from "lucide-react";

export function useAuth() {
  const dispatch = useDispatch();
  async function handleRegister({ email, username, password }) {
    try {
      dispatch(setAuthLoading(true));
      const data = await registerUser({ email, username, password });
      return true;
    } catch (error) {
      dispatch(
        setErrorWithTimeout(
          error.response?.data?.message || "Registration Failed",
        ),
      );
      return false;
    } finally {
      dispatch(setAuthLoading(false));
    }
  }

  async function handleLogin({ email, password }) {
    try {
      dispatch(setAuthLoading(true));
      const data = await loginUser({ email, password });
      dispatch(setUser(data.user));
    } catch (error) {
      dispatch(
        setErrorWithTimeout(error.response?.data?.message || "login Failed"),
      );
    } finally {
      dispatch(setAuthLoading(false));
    }
  }

  async function handleGetMee() {
    try {
      const data = await getMe();
      dispatch(setUser(data.user));
    } catch (error) {
      dispatch(setUser(null));
    } finally {
      dispatch(setCheckingAuth(false));
    }
  }

  async function handleLogout() {
    // dispatch(setLoading(true));
    await logOut();
    dispatch(setClear());
    console.log("hook");
    // dispatch(setLoading(false));
  }

  return {
    handleRegister,
    handleLogin,
    handleGetMee,
    handleLogout,
  };
}
