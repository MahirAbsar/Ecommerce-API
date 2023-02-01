const { StatusCodes } = require("http-status-codes");
const {
  createTokenUser,
  attachCookiesToResponse,
  checkPermission,
} = require("../utils");

const User = require("../models/User");
const {
  NotFoundError,
  UnauthenticatedError,
  BadRequestError,
} = require("../error");

const getAllUsers = async (req, res) => {
  const users = await User.find({}).select("-password");
  return res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findOne({ _id: id }).select("-password");

  if (!user) {
    throw new NotFoundError(`No user found with id: ${id}`);
  }

  checkPermission(req.user, user._id);

  return res.status(StatusCodes.OK).json({ user });
};

const showCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userID });

  return res.status(StatusCodes.OK).json({ user });
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  if (!oldPassword || !newPassword) {
    throw new BadRequestError("Please provide both values");
  }

  const user = await User.findOne({ _id: req.user.userID });
  const isPasswordMatch = await user.comparePassword(oldPassword);

  if (!isPasswordMatch) {
    throw new UnauthenticatedError("Authentication Invalid");
  }

  user.password = newPassword;
  await user.save();
  return res
    .status(StatusCodes.OK)
    .json({ msg: "Password changed successful!!!!" });
};

const updateUser = async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    throw new BadRequestError("Please provide both values");
  }

  const user = await User.findByIdAndUpdate(
    { _id: req.user.userID },
    { name, email },
    { new: true, runValidators: true }
  );

  const payload = createTokenUser(user);
  attachCookiesToResponse({ res, payload });
  return res.status(StatusCodes.OK).json({ user });
};

module.exports = {
  getAllUsers,
  getSingleUser,
  showCurrentUser,
  updateUser,
  updateUserPassword,
};
