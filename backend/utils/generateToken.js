import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/enVars.js";

// Generate a JWT token
export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ userId }, ENV_VARS.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("jwt-netflix", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    httpOnly: true, // accessible only by web server xxs
    sameSite: "strict", // csrf attack cross site request forgery
    secure: ENV_VARS.NODE_ENV !== "development",
  });
  return token;
};
