const userModel = require("../models/user")
const bcrypt = require("bcrypt")
const {generateToken} = require("../utils/generateToken")

module.exports.registerUser = async (req, res) => {
    try {
        let { email, password, fullname } = req.body;

        let user = await userModel.findOne({ email });
        if (user) return res.status(401).send("You already have account, Please login");

        bcrypt.genSalt(10, (err, salt) => {
            if (err) return res.send(err.message);
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message);
                else {
                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname
                    });

                    let token = generateToken(user);
                    res.cookie("token", token);
                    res.send(user);
                }

            })
        })

    } catch(err) {
        console.log(err);
    }
}

module.exports.loginUser = async (req, res) => {
    let { email, password } = req.body;
    
    let user = await userModel.findOne({ email });
    if (!user) return res.status(401).send("Email or password is incorrect");
    
    bcrypt.compare(password, user.password, (err, result) => {
        if (err) return res.status(401).send("Something went wrong");
        
        if (!result) return res.status(401).send("Email or password is incorrect");

        let token = generateToken(user);
        res.cookie = ("token", token);
        res.send("Login successfull");
    })
}