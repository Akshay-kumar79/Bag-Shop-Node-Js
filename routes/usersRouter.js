const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Hey User");
});

module.exports = router;