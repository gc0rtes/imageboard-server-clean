//Import tables from ./models. Singular Capitalized.
const User = require("../models").user;

//Import jsonwebtoken library function from path/file
const { toData } = require("./jwt");

async function auth(req, res, next) {
  // 1. check for authorization header and "split" it.
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  if (auth && auth[0] === "Bearer" && auth[1]) {
    // 2. if authorization header is there, auth type is Bearer and we have something at auth[1] we proceed to check the token.

    try {
      //try to decode the token
      const data = toData(auth[1]);
      console.log("what is data?", data); //{ userId: 1} it returns the user!

      // 3. Use the value returned from "toData()" to look for that user in your database with User.findByPk
      const user = await User.findByPk(data.userId); // data.userId returns a number id

      // 4. If not found, set status to 404 "no user found";
      if (!user) {
        res.status(404).send("From authMiddleWare: No user found");
      } else {
        // 5. If user is found, set it to `req.user = user` and call next();
        req.user = user;
        next();
      }
    } catch (error) {
      res.status(400).send({
        message: `Middleware from try/catch: Error ${error.name}: ${error.message}`,
      });
    }
  } else {
    res.status(401).send({
      message:
        'From authMiddleWare: Please supply some valid credentials. Something like: http -v get :4000/images Authorization:"Bearer <token>"',
    });
  }
}

module.exports = auth;
