require("dotenv").config();
const app = require("./app");
const sequelize = require("./config/db");
require("./models");
const http = require("http");
const { initializeSocket } = require("./sockets/socket");

const server = http.createServer(app);
initializeSocket(server);
const PORT = process.env.PORT || 3000;

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB Connected");

    await sequelize.sync();
    console.log("Model synced");

    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (err) {
    console.log("DB Error", err.message);
  }
};

connectDB();
