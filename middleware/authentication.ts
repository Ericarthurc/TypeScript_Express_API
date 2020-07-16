import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import chalk from "chalk";

const authentication = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const token = req.cookies.authToken;
    if (!token) {
      throw new Error("No token");
    }
    const decoded: any = jwt.verify(token, `${process.env.JWT_SECRET}`);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

export default authentication;
