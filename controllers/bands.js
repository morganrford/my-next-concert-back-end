const Band = require("../models/schema");
const express = require("express");
const router = express.Router();

//Create
router.post("/", async (req, res) => {
  try {
    const createdBand = await Band.create(req.body);
    res.status(201).json(createdBand); //201 means created
  } catch (err) {
    res.status(500).json({ err: err.message }); // 500 Internal Server Error
  }
});

//Index
router.get("/", async (req, res) => {
  try {
    const foundBands = await Band.find();
    res.status(200).json(foundBands);
  } catch (err) {
    res.status(500).json({ err: err.message }); // 500 Internal Server Error
  }
});

//Show
router.get("/:bandId", async (req, res) => {
  try {
    const foundBand = await Band.findById(req.params.bandId);
    if (!foundBand) {
      res.status(404);
      throw new Error("Band not found.");
    }
    res.status(200).json(foundBand);
  } catch (err) {
    if (res.statusCode === 404) {
      res.json({ err: err.message });
    } else {
      res.status(500).json({ err: err.message }); // 500 Internal Server Error
    }
  }
});

//Delete
router.delete("/:bandID", async (req, res) => {
  try {
    const deletedBand = await Band.findByIdAndDelete(req.params.bandID);
    if (!deletedBand) {
      res.status(404);
      throw new Error("Band not found.");
    }
    res.status(200).json(deletedBand);
  } catch (err) {
    if (res.statusCode === 404) {
      res.json({ err: err.message });
    } else {
      res.status(500).json({ err: err.message }); // 500 Internal Server Error
    }
  }
});

//Update
router.put("/:bandId", async (req, res) => {
  try {
    const updatedBand = await Band.findByIdAndUpdate(req.params.bandId, req.body, {
      new: true,
    });
    if (!updatedBand) {
      res.status(404);
      throw new Error("Band not found.");
    }
    res.status(200).json(updatedBand);
  } catch (err) {
    if (res.statusCode === 404) {
      res.json({ err: err.message });
    } else {
      res.status(500).json({ err: err.message });
    }
  }
});

module.exports = router;