const path = require("path");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const PORT = 4444;
// const corsConfig = {
//   origin: "*",
// "method":["GET", "POST", "PUT", "DELETE" ,"PATCH" ,"OPTIONS"]
//   credential: true,

//   methods: ["GET", "POST", "PUT", "DELETE"],
// };
// app.options("",cors(corsConfig));

// app.use(cors(corsConfig));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use("/", require("./router/routes"));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`http://localhost:` + PORT);
    });
  })
  .catch((err) => console.log(err));
