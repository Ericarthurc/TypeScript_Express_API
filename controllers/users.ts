import express from "express";
import User from "../models/User";

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Private
export const getUsers = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const users = await User.find();

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

// @desc    Get a user
// @route   GET /api/v1/users/me
// @access  Private
export const getUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  res.status(200).json({ success: true, data: req.user });
};

// @desc    Create a user
// @route   POST /api/v1/users/
// @access  Public
export const createUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user = await User.create(req.body);
    const token = await user.generateAuthToken();

    res.status(201).json({ success: true, data: user, token });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

// @desc    Login user
// @route   POST /api/v1/users/login
// @access  Public
export const loginUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user = await User.findByCredentials(
      req.body.username,
      req.body.password
    );

    const token = await user.generateAuthToken();

    let options = {};
    if (process.env.NODE_ENV === "development") {
      options = {
        secure: false,
      };
    } else if (process.env.NODE_ENV === "production") {
      options = {
        secure: true,
      };
    }

    res.cookie("authToken", token, {
      maxAge: 48 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: true,
      ...options,
    });
    res.cookie("loggedIn", 1, {
      maxAge: 48 * 60 * 60 * 1000,
      ...options,
    });

    res.status(200).json({ success: true, user, token });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

// @desc    Logout user
// @route   GET /api/v1/users/logout
// @access  Private
export const logoutUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    req.user.tokens = req.user.tokens.filter((token: any) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.clearCookie("authToken");
    res.clearCookie("loggedIn");
    res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

// @desc    Update a user
// @route   PATCH /api/v1/users/me
// @access  Private | Public
export const updateUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["username", "password"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    throw new Error("Invalid updates!");
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};

// @desc    Delete a user
// @route   DELETE /api/v1/users/me
// @access  Private | Public
export const deleteUser = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      throw new Error();
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error });
  }
};
