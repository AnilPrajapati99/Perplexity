import jwt from "jsonwebtoken";

export function authUser(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      message: "Unauthrised",
      success: false,
      error: "No token Provide",
    });
  }

  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.TOKEN);
    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Unauthrised",
      success: false,
      error: "Invalid Token",
    });
  }
}
