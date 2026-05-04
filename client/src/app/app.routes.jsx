import { createBrowserRouter } from "react-router-dom";
import Login from "../feauters/auth/pages/Login";
import Register from "../feauters/auth/pages/Register";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
