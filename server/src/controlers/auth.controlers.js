import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import { sendEmail } from "../services/mail.service.js";

// export async function handleRegister(req, res) {
//   console.log("controler");
//   const { username, email, password } = req.body;

//   const isUseralreadyExits = await userModel.findOne({
//     $or: [{ username }, { email }],
//   });

//   if (isUseralreadyExits) {
//     return res.status(400).json({
//       message: "User is already exists",
//       success: false,
//       err: "User alredy Exists",
//     });
//   }

//   const user = await userModel.create({
//     username,
//     email,
//     password,
//   });

//   await sendEmail({
//     to: email,
//     subject: "Welcome to Perplexity",
//     html: `<p>${username} </p> <br> <p>Thankouy for Registering</p>`,
//   });

//   res.status(200).json({
//     message: "User REgister Succesfull",
//     success: true,
//     user: {
//       id: user._id,
//       username: user.username,
//       email: user.email,
//     },
//   });
// }

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
      subject: "Welcome to Perplexity",
      html: ` <div style="font-family: Arial, sans-serif; background-color: #f4f4f4; padding: 20px;">
    
    <table width="100%" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center">
          
          <table width="600" style="background: #ffffff; padding: 30px; border-radius: 8px;">
            
            <tr>
              <td align="center">
                <h2 style="color: #333;">Welcome to Perplexity 🚀</h2>
              </td>
            </tr>

            <tr>
              <td>
                <p style="font-size: 16px; color: #555;">
                  Hi <strong>${username}</strong>,
                </p>

                <p style="font-size: 15px; color: #555;">
                  Thank you for registering with us. We're excited to have you on board!
                </p>
                <p style="font-size: 15px; color: #555;">
                  Please Verify your email address by clicking the below:
                </p>
                  <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerfificationtoken}">Verify</a>
                <p style="font-size: 15px; color: #555;">
                  You can now explore all features and get started right away.
                </p>

                <br>
                <p style="font-size: 13px; color: #999;">
                  If you have any questions, feel free to reply to this email.
                </p>
              </td>
            </tr>

          </table>

        </td>
      </tr>
    </table>

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
    return res.status(500).json({
      message: "An error occurred during registration",
    });
  }
}

export async function verifyEmail(req, res) {
  const { token } = req.query;

  try {
    const decode = jwt.verify(token, process.env.TOKEN);

    const user = await userModel.findOne({ email: decode.email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid Token",
        success: false,
        err: "User not Found",
      });
    }

    user.verified = true;
    await user.save();

    const html = `
  <h1>Email Verified Successfully</h1>
    <p>Your Email has been verifed.You can now log in to your account</p>
    <a href="http://localhost:3000/api/auth/login">Go to Login</a>
  `;

    return res.send(html);
  } catch (error) {
    return res.status(400).json({
      message: "Invalid Token",
      success: false,
      error: error.message,
    });
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
