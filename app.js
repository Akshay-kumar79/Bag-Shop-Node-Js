const express = require("express");
const app = express();
const db = require("./config/mongoos-conn");
const ownerRouter = require("./routes/ownersRouter")
const productsRouter = require("./routes/productsRouter")
const usersRouter = require("./routes/usersRouter")

const cookieParser = require("cookie-parser");
const path = require("path");

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/owners", ownerRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);

app.listen(3000);