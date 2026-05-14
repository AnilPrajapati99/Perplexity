import { useDispatch } from "react-redux";
import { registerUser, loginUser, getMe, logOut } from "../service/auth.api";
import { setUser, setError, setLoading, setClear } from "../auth.slice";
import { setErrorWithTimeout } from "../auth.slice";

export function useAuth() {
  const dispatch = useDispatch();
  async function handleRegister({ email, username, password }) {
    try {
      dispatch(setLoading(true));
      const data = await registerUser({ email, username, password });
    } catch (error) {
      dispatch(
        setErrorWithTimeout(
          error.response?.data?.message || "Registration Failed",
        ),
      );
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogin({ email, password }) {
    try {
      dispatch(setLoading(true));
      const data = await loginUser({ email, password });
      dispatch(setUser(data.user));
    } catch (error) {
      dispatch(
        setErrorWithTimeout(error.response?.data?.message || "login Failed"),
      );
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleGetMee() {
    try {
      dispatch(setLoading(true));
      const data = await getMe();
      dispatch(setUser(data.user));
    } catch (error) {
      // dispatch(setError(error.response?.data?.message || "User not Found"));
    } finally {
      dispatch(setLoading(false));
    }
  }

  async function handleLogout() {
    dispatch(setLoading(true));
    await logOut();
    dispatch(setClear());
    console.log("hook");
    dispatch(setLoading(false));
  }

  return {
    handleRegister,
    handleLogin,
    handleGetMee,
    handleLogout,
  };
}
