const express = require("express");
const connectDB = require("../src/config/database");
const app = express(); // creating new web server
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
// const profileRouter = require("./routes/profile");
// const requestsRouter = require("./routes/requests");

app.use("/", authRouter);
// app.use("/", profileRouter);
// app.use("/", requestsRouter);

connectDB()
  .then(() => {
    console.log("DB connection established...");

    app.listen(3000, () => {
      console.log("server listening on port 3000");
    }); // server created on port 3000 is listening
  })
  .catch((err) => {
    console.log("DB cannot be connected...");
  });
