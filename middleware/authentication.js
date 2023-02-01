const { UnauthenticatedError } = require("../error");
const { verifyJWT } = require("../utils/jwt");

const authentication = (req, res, next) => {
  const { token } = req.signedCookies;

  if (!token) {
    throw new UnauthenticatedError("Authentication Invalid");
  }

  try {
    const { name, userID, role } = verifyJWT({ token });
    req.user = { name, userID, role };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

module.exports = authentication;
