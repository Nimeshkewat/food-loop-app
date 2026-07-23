import jwt from "jsonwebtoken";
import { IUserDocument } from "../models/userModel.js";

export const generateToken = (user: IUserDocument) => {
  return jwt.sign(
    {
      id: user._id,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET!,
    { expiresIn: "3d" },
  );
};
