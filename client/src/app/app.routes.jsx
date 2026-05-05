import { createBrowserRouter } from "react-router-dom";
import Login from "../feauters/auth/pages/Login";
import Register from "../feauters/auth/pages/Register";
import Dashboard from "../feauters/chat/pages/Dashboard";
import Protected from "../feauters/auth/components/Protected";
import PublicProtected from "../feauters/auth/components/PublicProtected";

export const router = createBrowserRouter([
  {
    path:"/",
    element:  <Protected>
      <Dashboard/>
    </Protected>  
  },
  {
    path: "/login",
    element:  <PublicProtected>
 <Login />
    </PublicProtected>,
  },
  {
    path: "/register",
    element: <PublicProtected><Register /></PublicProtected>,
  },
]);
