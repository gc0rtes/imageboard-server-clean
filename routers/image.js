//Import the Router class from express.
const { Router } = require("express");

//Import tables from ./models or ../models (PAY ATTENTION import as Singular and Capitalized)
const Image = require("../models").image;

//Import the two jsonwebtoken library functions from path/file
const { toJWT, toData } = require("../auth/jwt");

//Import authMiddleware from path/file
const authMiddleware = require("../auth/middleware");

//Create a new Router instance.
const router = new Router();

//Register a Root "/" GET endpoint to send all images
router.get("/", async (req, res, next) => {
  const limit = Math.min(req.query.limit || 25, 500); //indicates how many results are on a page. Prevent hack attack
  const offset = req.query.offset || 0; //determines how many results to skip
  try {
    console.log("**From imageRouter: I got a request for the image list");
    const result = await Image.findAndCountAll({ limit, offset }); //'findAndCountAll' to know what the total number of results is
    res.send({ images: result.rows, total: result.count });
  } catch (e) {
    next(e);
  }
});

//Register "/:imageId" GET endpoint to pick ONE image
router.get("/:imageId", async (request, response, next) => {
  try {
    const id = parseInt(request.params.imageId); //to get what user wrote
    console.log(`**From imageRouter: I got a request for /images/${id}`);
    const imageById = await Image.findByPk(id);
    if (!imageById) {
      response.status(404).send("Image not found");
    } else {
      response.send(imageById);
    }
  } catch (e) {
    next(e);
  }
});

//Add a Root path "/" POST endpoint that creates a new image in the database
router.post("/", async (req, res, next) => {
  try {
    console.log("**From imageRouter: I got a request to create a new image");
    const { title, url } = req.body;
    if (!title) {
      res.status(400).send("missing title parameter");
    } else {
      const createImage = await Image.create({
        title,
        url,
      });
      res.json(createImage);
    }
  } catch (e) {
    next(e);
  }
});

//Export the router.
module.exports = router;
