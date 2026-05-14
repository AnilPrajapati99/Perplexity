import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service.js";

export async function handleRegister(req, res) {
  try {
    console.log("controller");
    const { username, email, password } = req.body;

    const isUseralreadyExits = await userModel.findOne({
      $or: [{ username }, { email }],
    });

    if (isUseralreadyExits) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }

    const user = await userModel.create({
      username,
      email,
      password,
    });

    const emailVerfificationtoken = jwt.sign(
      {
        userId: user._id,
        email: user.email,
      },
      process.env.TOKEN,
    );

    await sendEmail({
      to: email,
      subject: "Verify your email — PromptIQ",
      html: `
  <div style="background:#f4f6fb;padding:40px 20px;">
    <div style="max-width:580px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:0.5px solid #e0e0e0;">
      
      <div style="background:#1a56db;padding:36px 40px 28px;text-align:center;">
        <span style="color:#ffffff;font-size:20px;font-weight:500;">PromptIQ</span>
      </div>

      <div style="padding:40px 40px 32px;">
        <h1 style="font-size:22px;font-weight:500;color:#111827;text-align:center;margin:0 0 8px;">Verify your email address</h1>
        <p style="font-size:15px;color:#6b7280;text-align:center;margin:0 0 28px;">Welcome to PromptIQ! Please confirm your email to get started.</p>

        <div style="background:#f9fafb;border-radius:10px;padding:24px;margin-bottom:28px;border:0.5px solid #e5e7eb;">
          <p style="font-size:15px;color:#374151;margin:0 0 6px;">Hi <strong>${username}</strong>,</p>
          <p style="font-size:15px;color:#6b7280;margin:0;line-height:1.7;">Thanks for signing up. Click the button below to verify your email and activate your account.</p>
        </div>

        <div style="text-align:center;margin-bottom:32px;">
          <a href="https://promptiq-ekow.onrender.com/api/auth/verify-email?token=${emailVerfificationtoken}" 
             style="display:inline-block;background:#1a56db;color:#ffffff;text-decoration:none;font-size:15px;font-weight:500;padding:14px 40px;border-radius:8px;">
            Verify email address
          </a>
          <p style="font-size:13px;color:#9ca3af;margin:16px 0 0;">This link expires in 24 hours.</p>
        </div>

        <div style="border-top:0.5px solid #e5e7eb;padding-top:24px;">
          <p style="font-size:13px;color:#9ca3af;margin:0 0 8px;">If you didn't create an account, you can safely ignore this email.</p>
          <p style="font-size:12px;color:#1a56db;margin:6px 0 0;word-break:break-all;">
            https://promptiq-ekow.onrender.com/api/auth/verify-email?token=${emailVerfificationtoken}
          </p>
        </div>
      </div>

      <div style="background:#f9fafb;border-top:0.5px solid #e5e7eb;padding:20px 40px;text-align:center;">
        <p style="font-size:12px;color:#9ca3af;margin:0;">© 2025 PromptIQ. All rights reserved.</p>
      </div>

    </div>
  </div>`,
    });

    return res.status(200).json({
      message: "User Register Successful",
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Registration error:", err.message);
    return res.status(500).json({
      message: "An error occurred during registration",
      error: err.message,
    });
  }
}

export async function verifyEmail(req, res) {
  const { token } = req.query;

  try {
    const decode = jwt.verify(token, process.env.TOKEN);

    const user = await userModel.findOne({ email: decode.email });

    if (!user) {
      return res.redirect(
        "https://promptiq-ekow.onrender.com/verify-email?status=error",
      );
    }

    user.verified = true;
    await user.save();

    return res.redirect(
      "https://promptiq-ekow.onrender.com/verify-email?status=success",
    ); // ✅
  } catch (error) {
    return res.redirect(
      "https://promptiq-ekow.onrender.com/verify-email?status=error",
    ); // ❌
  }
}

export async function HandleLogin(req, res) {
  const { email, password } = req.body;

  const user = await userModel
    .findOne({
      email,
    })
    .select("+password");

  console.log(user);

  if (!user) {
    return res.status(400).json({
      message: "Invalid Email or Password",
      success: false,
      error: "user not found",
    });
  }

  const ispasswordMatch = await user.matchPassword(password);

  if (!ispasswordMatch) {
    return res.status(400).json({
      message: "Invalid Email or Password",
      success: false,
      error: "Invalid password",
    });
  }
  if (!user.verified) {
    return res.status(400).json({
      message: "Please verify your email to login",
      success: false,
      error: "Email not verified",
    });
  }
  const token = jwt.sign(
    {
      username: user.username,
      id: user._id,
      email: user.email,
    },
    process.env.TOKEN,
    { expiresIn: "7d" },
  );

  res.cookie("token", token);

  res.status(200).json({
    message: "User Login Succesfully",
    success: true,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
}

export async function getMe(req, res) {
  const id = req.user._id;
  const user = await userModel.findOne({ id }).select("-password");

  if (!user) {
    return res.status(401).json({
      message: "Usre not Found",
      success: false,
      error: "User not Found",
    });
  }

  res.status(200).json({
    message: "Get me Succesfully",
    success: true,
    user,
  });
}

export async function logOut(req, res) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      message: "Token not Provide",
      success: false,
    });
  }

  res.clearCookie("token");

  res.status(201).json({
    message: "User LogOut Successfully",
    success: true,
  });
}
