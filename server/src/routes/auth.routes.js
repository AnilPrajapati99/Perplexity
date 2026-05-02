import { Router } from "express";
import {
  getMe,
  HandleLogin,
  handleRegister,
  logOut,
  verifyEmail,
} from "../controlers/auth.controlers.js";
import {
  registerValidationRules,
  validate,
  loginValidator,
} from "../validate/auth.validate.js";
import { authUser } from "../middleware/auth.middleware.js";
const authRouter = Router();

authRouter.post("/register", registerValidationRules, validate, handleRegister);
authRouter.post("/login", loginValidator, validate, HandleLogin);
authRouter.get("/verify-email", verifyEmail);
authRouter.get("/get-me", authUser, getMe);
authRouter.post("/logout", logOut);

export default authRouter;
