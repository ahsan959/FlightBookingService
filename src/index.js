const bodyParser = require("body-parser");
const express = require("express");
const { PORT } = require("./config/serverConfig");
const apiRoutes = require("./routes/index");
const db = require("./models/index");

const app = express();

const setupAndStartServer = () => {
  app.use(bodyParser.json());

  app.use("/api", apiRoutes);

  app.use(bodyParser.urlencoded({ extended: true }));
  app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);

    if (process.env.DB_SYNC) {
      db.sequelize.sync({ alter: true });
    }
  });
};

setupAndStartServer();
