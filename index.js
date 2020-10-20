const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
const morgan = require("morgan");
const allRoutes = require("./routes/allRoutes");
const authRoute = require("./routes/authRoute");
const cors = require("cors");
const cookieparser = require("cookie-parser");

app.use(express.json());
app.use(cookieparser());
app.use(morgan("dev"));
app.use(cors());

mongoose
  .connect(process.env.DB_CONNECTION_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection to MongoDB cluster successfull !");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB cluster !");
  });

app.use("/api/user", authRoute);
app.use("/", allRoutes);
app.use(express.static(path.join(__dirname, "uploads", "games", "files")));

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("Server up and running !");
});
