const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();
const port = process.env.PORT || 4000;
const cors = require("cors");
const app = express();

const userRouter = require("./api/routes/user");

app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

app.use("/users", userRouter);

mongoose.connect(
  `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_DB_URL}/${process.env.MONGO_DATABASE}`
);

app.listen(port, (req, res) => {
  console.log(`working at ${port}`);
});
