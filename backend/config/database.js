const mongoose = require("mongoose");

const connectDatabase = async () => {
  const connection = await mongoose.connect(process.env.DB_URI);
  console.log(`MongoDB connected with server: ${connection.connection.host}`);
};

module.exports = connectDatabase;
