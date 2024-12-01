const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Invalid Token");
    }

    const decodedObj = await jwt.verify(token, "DEV@CONNECT$123");
    const { _id } = decodedObj;
    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }
  } catch (err) {
    res.status(400).send("Error while logging the user", err.message);
  }
};

module.exports = userAuth;
