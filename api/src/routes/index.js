const { Router } = require("express");
const { Cow } = require("../models/Cows");
const bulkCreateCows =require("../bulkCowsCreate")


const router = Router();

// Cow.insertMany(bulkCreateCows)    if you want the information already in the database, you can uncomment the code

router.get("/", async (req, res) => {// route that get all cows in the db
  try {
    const cows = await Cow.find();
    res.status(200).send(cows);
  } catch (error) {
    res.status(404).send({ message: "Cows not found " });
  }
});
router.post("/", async (req, res) => {// route that post a cow in the db
  const { idSENASA, type, weight, fieldName, device, deviceNumber } = req.body;
  try {
    const newCow = new Cow({
      idSENASA,
      type,
      weight,
      fieldName,
      device,
      deviceNumber,
    });
    await newCow.save();
    res.status(200).send(newCow);
  } catch (error) {
    res.status(400).send({ message: "Error while creating" });
  }
});

router.put("/:id", async (req, res) => {// route that modifies all cows in the db
  try {
    const { idSENASA, type, weight, fieldName, device, deviceNumber } =
      req.body;
    const updateCow = await Cow.findByIdAndUpdate(req.params.id, {
      idSENASA,
      type,
      weight,
      fieldName,
      device,
      deviceNumber,
    });
    const cows = await Cow.find();
    res.status(200).send(cows);
  } catch (error) {
    res.status(400).send({ message: "Error when updating" });
  }
});
router.delete("/:id", async (req, res) => {// route that deletes a specific cow in the db
  try {
    await Cow.findByIdAndDelete(req.params.id);
    const cows = await Cow.find();
    res.status(200).send(cows);
  } catch (error) {
    res.status(400).send({ message: "Error when deleting" });
  }
});
router.get("/search", async (req, res) => {// route that search cows in the dbby query
  const { searchQuery } = req.query;

  try {
    const cowsSearch = await Cow.find({
      idSENASA: {
        $regex: searchQuery,
        $options: "i",
      },
    });
    res.status(200).send(cowsSearch);
  } catch (error) {
    res.status(404).send({ message: "Cow not found" });
  }
});
module.exports = router;
