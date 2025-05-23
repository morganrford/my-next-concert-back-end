const { Concert } = require("../models/schema");
const express = require("express");
const router = express.Router();

//Create
router.post("/", async (req, res) => {
  try {
    const createdConcert = await Concert.create(req.body);
    res.status(201).json(createdConcert); //201 means created
  } catch (err) {
    res.status(500).json({ err: err.message }); // 500 Internal Server Error
  }
});

//Index
router.get("/", async (req, res) => {
  try {
    const foundConcerts = await Concert.find();
    res.status(200).json(foundConcerts);
  } catch (err) {
    res.status(500).json({ err: err.message }); // 500 Internal Server Error
  }
});

//Show
router.get("/:concertId", async (req, res) => {
  try {
    const foundConcert = await Concert.findById(req.params.concertId);
    if (!foundConcert) {
      res.status(404);
      throw new Error("Concert not found.");
    }
    res.status(200).json(foundConcert);
  } catch (err) {
    if (res.statusCode === 404) {
      res.json({ err: err.message });
    } else {
      res.status(500).json({ err: err.message }); // 500 Internal Server Error
    }
  }
});

//Delete
router.delete("/:concertID", async (req, res) => {
  try {
    const deletedConcert = await Concert.findByIdAndDelete(req.params.concertID);
    if (!deletedConcert) {
      res.status(404);
      throw new Error("Concert not found.");
    }
    res.status(200).json(deletedConcert);
  } catch (err) {
    if (res.statusCode === 404) {
      res.json({ err: err.message });
    } else {
      res.status(500).json({ err: err.message }); // 500 Internal Server Error
    }
  }
});

//Update
router.put("/:concertId", async (req, res) => {
  try {
    const updatedConcert = await Concert.findByIdAndUpdate(req.params.concertId, req.body, {
      new: true,
    });
    if (!updatedConcert) {
      res.status(404);
      throw new Error("Concert not found.");
    }
    res.status(200).json(updatedConcert);
  } catch (err) {
    if (res.statusCode === 404) {
      res.json({ err: err.message });
    } else {
      res.status(500).json({ err: err.message });
    }
  }
});

module.exports = router;