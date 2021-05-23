// require the module
const jwt = require("jsonwebtoken");

//define a secret key for our JWT
const secret =
  process.env.JWT_SECRET || "e9rp^&^*&@9sejg)DSUA)jpfds8394jdsfn,m";

//Creates a JWT token combining the data (we gonna use userId) and sets its expiration time
function toJWT(data) {
  return jwt.sign(data, secret, { expiresIn: "2h" });
}

//verifys tokens are valid
function toData(token) {
  return jwt.verify(token, secret);
}

// Export both functions so we can use them in our routes (or middleware!)
module.exports = { toJWT, toData };
