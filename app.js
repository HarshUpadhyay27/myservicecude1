const express = require("express");
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;
const bcrypt = require("bcryptjs");
const User = require("./models/userModels");
require("./db/conn");
const jwt = require('jsonwebtoken')

app.use(express.json());

app.post("/user/signup", async (req, res) => {
  try {
    const { email, name } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      res.status(400).send("User alredy exist");
    } else {
      const user = new User({
        name,
        email,
        password: bcrypt.hashSync(req.body.password, 10),
      });
      const createUser = await user.save();
      res.status(201).send({
        _id: createUser._id,
        name: createUser.name,
        email: createUser.email,
        token: jwt.sign({_id: createUser._id}, "harshupadhyay", {
          expiresIn: "30d"
        })
      });
    }
  } catch (error) {
    res.status(400).send("Invalid details");
  }
});

app.post("/user/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userEmail = await User.findOne({ email });
    const isMatch = await bcrypt.compare(password, userEmail.password);
    if (isMatch) {
      res.status(201).send({
        _id: userEmail._id,
        name: userEmail.name,
        email: userEmail.email,
        token: jwt.sign({_id: userEmail._id}, "harshupadhyay", {
          expiresIn: "30d"
        })
      });
    } else {
      res.status(400).send("Invalid Login Details");
    }
  } catch (error) {
    res.status(400).send("Invalid Login Details");
  }
});

app.listen(port, () => {
  console.log(`server is running at port no ${port}`);
});
