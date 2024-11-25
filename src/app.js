const express = require("express");
const connectDB = require("../src/config/database");
const app = express(); // creating new web server
const User = require("../src/models/user");

//routing sequence matter
//middleware chain
//route handler
//use():
app.use(express.json());
app.post("/signup", async (req, res, next) => {
  // sending the response server
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User added successfully");
  } catch (err) {
    res.status(400).send("Error while saving the user", err.message);
  }
});

// app.use((req, res, next) => {
//   res.send("hi");
// });

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
