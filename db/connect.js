const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const connectDB = (MONGO_URI) => {
  return mongoose.connect(MONGO_URI);
};

module.exports = connectDB;
