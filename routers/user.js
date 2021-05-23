//Import the Router class from express.
const { Router } = require("express");

//Import/require bcrypt algorithm. This is use to 'hash' the password on DB
const bcrypt = require("bcrypt");

//Import tables from ./models. Singular Capitalized.
const User = require("../models").user;

//Create a new Router instance.
const router = new Router();

//Register a Root "/" GET endpoint to send all users
router.get("/", async (req, res) => {
  try {
    console.log("**From usersRouter: got a request for the user list");
    const allUsers = await User.findAll();
    res.send(allUsers);
  } catch (e) {
    console.log("**From usersRouter catch/try: ", e.message);
  }
});

//Add a Root "/" POST endpoint that creates a new user. SIGNUP endpoint.
router.post("/", async (req, res, next) => {
  try {
    console.log("**From usersRouter: got a request to CREATE user");
    const { email, password, fullName } = req.body;
    if (!email || !password || !fullName) {
      res.status(400).send("missing  parameters");
    } else {
      const createUser = await User.create({
        email,
        // Here, when handing down the password to the create method we hash it.
        password: bcrypt.hashSync(password, 10),
        fullName,
      });
      res.json(createUser);
    }
  } catch (e) {
    console.log("**From usersRouter catch/try: ", e.message);
    next(e);
  }
});

//Export the router.
module.exports = router;
