//Import the Router class from express.
const { Router } = require("express");

//Import the two jsonwebtoken library functions from path/file
const { toJWT, toData } = require("../auth/jwt");

//Import tables from ./models. Singular Capitalized.
const User = require("../models").user;

//Import bcrypt algorithm.
const bcrypt = require("bcrypt");

//Import authMiddleware from path/file
const authMiddleware = require("../auth/middleware");

//Create a new Router instance.
const router = new Router();

//Add SIGNIN ENDPOINT "/login" a POST endpoint to request a JWtoken
router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).send("Please supply an email and password");
  } else {
    // 1. find user based on email address
    const user = await User.findOne({
      where: {
        email: email,
      },
    });
    if (!user) {
      res.status(400).send({
        message: "User with that email does not exist",
      });
    }
    //2. use bcrypt.compareSync to check the received password (first argument) against the stored hash second argument
    else if (bcrypt.compareSync(password, user.password)) {
      //3. if the password is correct, return a JWT with the userId of the user (user.id)
      const jwt = toJWT({ userId: user.id });
      res.send({
        jwt,
      });
    } else {
      res.status(400).send({
        message: "Password was incorrect",
      });
    }
  }
});

module.exports = router;
