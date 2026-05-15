import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
const Dashboard = lazy(()=>import("../feauters/chat/pages/Dashboard")) ;
const Login = lazy(()=>import("../feauters/auth/pages/Login")) ;
const Register = lazy(()=>import("../feauters/auth/pages/Register")) ;
import Protected from "../feauters/auth/components/Protected";
import PublicProtected from "../feauters/auth/components/PublicProtected";
const VerifyEmail = lazy(()=>import("../feauters/auth/components/VerifyEmail"))
import { WithSuspense } from "./components/WithSuspense";
const EmailSent = lazy(()=>import("../feauters/auth/components/EmailSent"));

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
  {
    path:"/verify-email",
    element:<VerifyEmail/>
  },
  {
    path:"/email-sent",
    element:<EmailSent/>
  }
]);
