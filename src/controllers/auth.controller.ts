import { Request, Response } from "express";
import User from "../models/user.model";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const userCount = await User.countDocuments();

    const role = userCount === 0 ? "admin" : "member";

    const emailExist = await User.findOne({ email });

    if (emailExist) {
      return res.status(400).json({ message: "Email already exist" });
    }

    const nameExist = await User.findOne({ name });

    if (nameExist) {
      return res.status(400).json({ message: "Name already exist" });
    }

    const user = new User({ name, email, password, role });

    await user.save();

    res
      .status(201)
      .json({ message: "User registered successfully", data: user });
  } catch (error: any) {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findOne({
      $or: [{ email: email }, { name: name }],
    });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate Token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

    res.status(200).json({ message: "Login success", data: token });
  } catch (error: any) {
    if (error) {
      return res.status(500).json({ message: error.message });
    }
  }
};
