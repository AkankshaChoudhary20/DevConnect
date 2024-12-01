const express = require("express");

const requestsRouter = express.Router();
const { userAuth } = require("../middlewares/auth");

requestsRouter.post(
  "/sendConnectionRequest",
  userAuth,
  async (req, res, next) => {
    try {
      const user = req.user;
      res.send(user.firstName + "sent a connection request");
    } catch (err) {
      res.status(400).send("Error while getting the user profile", err.message);
    }
  }
);

module.exports = requestsRouter;
