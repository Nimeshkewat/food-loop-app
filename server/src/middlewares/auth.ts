import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        isAdmin: boolean;
      };
    }
  }
}

const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }

    if (!process.env.JWT_SECRET) {
      return res.status(500).json({
        success: false,
        message: "JWT Secret configuration missing on server.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;
    if (!decoded) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    const user = {
      id: decoded.id,
      isAdmin: decoded.isAdmin,
    };

    req.user = user; //* Property 'user' does not exist on type 'Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>'.
    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Not Authorized" });
  }
};

export default isAuthenticated;
