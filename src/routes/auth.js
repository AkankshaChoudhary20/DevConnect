const express = require("express");

const authRouter = express.Router();

const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");
const bcrypt = require("bcrypt");

authRouter.post("/signup", async (req, res, next) => {
  try {
    validateSignUpData(req);
    const { firstName, lastName, emailId, password, age, gender, skills } =
      req.body;

    //encrypt passowrd
    const passwordhash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordhash,
      age,
      gender,
      skills,
    });

    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error while saving the user: " + err.message);
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const { emailId, password } = req.body;

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.validatePassword(password);

    if (isPasswordValid) {
      const token = await user.getJWT();

      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });

      res.send("Login successful");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Error while logging the user" + err.message);
  }
});

authRouter.post("/logout", async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
  });

  res.send("Logout successful");
});

module.exports = authRouter;
