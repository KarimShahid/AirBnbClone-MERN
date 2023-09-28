const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "shahid";

const Place = require("../models/Place");

// posting places uising the form
router.post("/places", async (req, res) => {
  const {
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  const { cookie } = req.cookies;
  console.log(cookie);
  if (cookie) {
    jwt.verify(cookie, JWT_SECRET, {}, async (err, userData) => {
      if (err) throw err;
      placeDoc = await Place.create({
        owner: userData.id,
        title,
        address,
        photo: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      res.json({ placeDoc });
    });
    // res.json(cookie);
  }
});

// show places of a specific user
router.get("/user-places", async (req, res) => {
  const { cookie } = req.cookies;
  jwt.verify(cookie, JWT_SECRET, {}, async (err, userData) => {
    if (err || !userData) {
      // Handle the error here, e.g. redirect the user to the login page
      return res.status(401).send("Unauthorized");
    }
    const { id } = userData;
    const placeDoc = await Place.find({ owner: id });
    // console.log(placeDoc);
    res.json(placeDoc);
  });
});

// finding the specific place to edit
router.get("/places/:id", async (req, res) => {
  // res.json(req.params);
  const { id } = req.params; //getting id from headers
  res.json(await Place.findById(id));
});

// for editing the places
router.put("/places", async (req, res) => {
  const { cookie } = req.cookies;
  const {
    id,
    title,
    address,
    addedPhotos,
    description,
    perks,
    extraInfo,
    checkIn,
    checkOut,
    maxGuests,
    price,
  } = req.body;
  console.log(id);
  jwt.verify(cookie, JWT_SECRET, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.findById(id);
    if (userData.id === placeDoc.owner.toString()) {
      //placeDoc.owner was is Json.
      placeDoc.set({
        title,
        address,
        photo: addedPhotos,
        description,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price,
      });
      await placeDoc.save();
      res.json(placeDoc);
    }
    // res.json(placeDoc);
  });
});

router.get("/places", async (req, res) => {
  res.json(await Place.find());
});

// to show places in the homepage

module.exports = router;
