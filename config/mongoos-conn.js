const mongoose = require("mongoose");
const debuger = require("debug")("development:mongoose");
const config = require("config");

mongoose
    .connect(`${config.get("MONGODB_URI")}/bag-shop`)
    .then(function () {
        debuger("Connected");
    })
    .catch(err => {
        debuger(err);
    })

module.exports = mongoose.connection;