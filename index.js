const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const path = require("path");
//const morgan = require("morgan");
const allRoutes = require("./routes/allRoutes");
const authRoute = require("./routes/authRoute");
const cors = require("cors");
const cookieparser = require("cookie-parser");

app.use(express.json());
app.use(cookieparser());
//app.use(morgan("dev"));
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
app.use("/proxy", allRoutes);

app.use(express.static("frontend/build"));
app.use(express.static(path.join(__dirname, "uploads")));
app.get("*", async (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});
//console.log("stage");
//app.use(express.static(path.join(__dirname, "uploads")));

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Server up and running !");
});
