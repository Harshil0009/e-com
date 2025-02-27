const app = require("./app");
const dotenv = require("dotenv");

const connectDatabase = require("./config/database");

//handling uncaught exception

process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server dur to uncaught exception`);
  process.exit(1);
});

//config

dotenv.config({ path: "backend/config/config.env" });

//connect db

connectDatabase();

const server = app.listen(process.env.PORT, () => {
  console.log(`server is working on http://localhost:${process.env.PORT}`);
});

// unhandled Promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`shutting down the server dur to unhandele promise rejection`);

  server.close(() => {
    process.exit(1);
  });
});