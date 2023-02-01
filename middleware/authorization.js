const { UnauthorizedError } = require("../error");

const authorization = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new UnauthorizedError("Unauthorized to view this page");
    }
    next();
  };
};

module.exports = authorization;
