const express = require("express");

const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res, next) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res
      .status(400)
      .send("Error while getting the user profile-->" + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res, next) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const logggedInUser = req.user;
    Object.keys(req.body).forEach(
      (key) => (logggedInUser[key] = req.body[key])
    );

    await logggedInUser.save();

    res.jaon({
      message: `${logggedInUser.firstName} your profile was successfully updated`,
      data: logggedInUser,
    });
  } catch (err) {
    res.status(400).send("Error-->: " + err.message);
  }
});

module.exports = profileRouter;
