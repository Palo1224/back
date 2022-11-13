const express = require("express");
const server = express();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const cors = require("cors");
const routes = require("./routes/index.js");

server.use(cors());
server.use(express.json());

server.use(express.json({ limit: "150mb", extended: true  }));


server.use(express.urlencoded({ limit: "150mb", extended: true }));
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.use("/", routes);

module.exports = server;
