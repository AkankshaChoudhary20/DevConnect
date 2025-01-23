const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      console.log("profile token-->", token);
      throw new Error("Invalid Token");
    }

    const decodedObj = await jwt.verify(token, "DEV@CONNECT$123");
    const { _id } = decodedObj;
    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }
    req.user = user;
    next();
  } catch (err) {
    res
      .status(400)
      .send("Error while getting the user profile--->" + err.message);
  }
};

module.exports = { userAuth };
