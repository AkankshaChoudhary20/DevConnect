const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect(
    "mongodb+srv://akankshawork94:W9qpclZgiamoUDtE@nodejscluster.ey6ub.mongodb.net/?retryWrites=true&w=majority&appName=NodeJsCluster/devConnect"
  );
};

module.exports = connectDB;
