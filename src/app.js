const express = require("express");

const app = express(); // creating new web server

app.use((req, res) => {
  res.send("Hello from server");
}); // sending the response server

app.listen(3000, () => {
  console.log("server listening on port 3000");
}); // server created on port 3000 is listening
