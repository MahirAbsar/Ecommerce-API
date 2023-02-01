const User = require("../models/User");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../error");
const { attachCookiesToResponse, createTokenUser } = require("../utils");

const register = async (req, res) => {
  const { name, email, password } = req.body;

  const isEmailAlreadyExists = await User.findOne({ email });
  if (isEmailAlreadyExists) {
    throw new BadRequestError("Email already exists");
  }

  const isFirstUser = (await User.countDocuments({})) == 0;
  const role = isFirstUser ? "admin" : "user";

  const user = await User.create({ name, email, password, role });
  const payload = createTokenUser(user);
  attachCookiesToResponse({ res, payload });
  res.status(StatusCodes.CREATED).json({ user });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnauthenticatedError("Invalid credentials");
  }

  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const payload = createTokenUser(user);
  attachCookiesToResponse({ res, payload });
  res.status(StatusCodes.CREATED).json({ user });
};

const logout = async (req, res) => {
  res.cookie("token", "tokenValue", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.status(StatusCodes.OK).json({ msg: "User logged out" });
};

module.exports = {
  register,
  login,
  logout,
};
