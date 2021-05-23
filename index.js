//Import Express
const express = require("express");

//Import routers files. Ex: "./routers/image"
const imageRouter = require("./routers/image");
const userRouter = require("./routers/user");
const authRouter = require("./routers/auth");

//Import authMiddleware from path/file
const authMiddleware = require("./auth/middleware");

//Create a new express server named app
const app = express();

//Set up to handle incoming HTTP requests
const jsonParser = express.json();

//Add jsonParser as a middleware to app
app.use(jsonParser);

//Create app returns/path to the routers
app.use("/users", userRouter);

//Add authMiddleWare to secure at app level
app.use("/images", authMiddleware, imageRouter);

//Path to request a JWToken ":4000/auth/login"
app.use("/auth", authRouter);

//Define the port
const port = process.env.PORT || 4000; // "const port =4000 ||process.env.PORT" is used when go to deploy on Heruku

// Start listening the server on port 4000 and log it.
app.listen(port, () => console.log(`Server listening on port ${port}`));
