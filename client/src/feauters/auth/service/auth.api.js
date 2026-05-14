import axios from "axios";
import BASE_URL from "../../../config/api.config";

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // Include cookies in requests
});

export async function registerUser({ email, username, password }) {
  try {
    const responce = await api.post("/api/auth/register", {
      email,
      username,
      password,
    });
    return responce.data;
  } catch (error) {
    throw error;
  }
}

export async function loginUser({ email, password }) {
  try {
    const responce = await api.post("/api/auth/login", {
      email,
      password,
    });
    return responce.data;
  } catch (error) {
    throw error;
  }
}

export async function getMe() {
  try {
    const responce = await api.get("/api/auth/get-me");
    return responce.data;
  } catch (error) {
    // throw error;
  }
}

export async function logOut() {
  await api.post("/api/auth/logout");
}
