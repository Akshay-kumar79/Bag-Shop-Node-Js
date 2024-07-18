const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    card: {
        type: Array,
        default: []
    },
    idAdmin: Boolean,
    orders: {
        type: Array,
        default: []
    },
    contact: Number,
    picture: String
})

module.exports = mongoose.model("user", userSchema)