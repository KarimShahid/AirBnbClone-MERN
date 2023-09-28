const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = "shahid";

const Booking = require("../models/Booking");

const getUserDataFromReq = (req) => {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.cookie, JWT_SECRET, {}, async (err, userData) => {
      if (err) throw err;
      resolve(userData);
    });
  });
};

router.post("/bookings", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
    req.body;
  Booking.create({
    place,
    checkIn,
    checkOut,
    numberOfGuests,
    name,
    phone,
    price,
    user: userData.id,
  })
    .then((doc) => {
      res.json(doc);
    })
    .catch((err) => {
      throw err;
    });
});

router.get("/bookings", async (req, res) => {
  const userData = await getUserDataFromReq(req);
  res.json(
    await Booking.find({ user: userData.id }).populate("place").populate("user")
  );
});

module.exports = router;
