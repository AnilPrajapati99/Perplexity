import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/auth",
  withCredentials: true, // Include cookies in requests
});

export async function registerUser({email.username,password}) {
    try {
        const responce = await api.post("/register",{
            email,
            username,
            password
        })
        return responce.data;
    } catch (error) {
        throw error;
    }
}


export async function loginUser({email,password}) {
    try {
        const responce = await api.post("/login",{
            email,
            password
        })
        return responce.data;
    } catch (error) {
        throw error;
    }
}

export async function getMe() {

    try {
        const responce = await api.get("/get-me");
        return responce.data;
    } catch (error) {
        throw error;
    }
    
} 