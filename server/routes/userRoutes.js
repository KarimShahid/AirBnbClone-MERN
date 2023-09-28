const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "shahid";
const imgDownloader = require("image-downloader"); //to download image to localmachine
const path = require("path"); //to know the path
const multer = require("multer"); //for photo upload
const fs = require("fs"); //for renaming files

const User = require("../models/User");

// Create user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const secPass = await bcrypt.hash(password, salt);
    const userDoc = await User.create({
      name,
      email,
      password: secPass,
    });
    res.json({ userDoc });
  } catch (error) {
    res.status(422).json(error);
    // res.status(500).send("Internal Server Error");
  }
});

// logging in
router.post("/login", async (req, res) => {
  let success = false;
  const { email, password } = req.body;
  try {
    const userDoc = await User.findOne({ email });
    if (userDoc) {
      const passwordCompare = bcrypt.compareSync(password, userDoc.password);
      if (passwordCompare) {
        success = true;
        const token = jwt.sign(
          {
            email: userDoc.email,
            id: userDoc._id,
          },
          JWT_SECRET
        );
        success = true;
        // store token in the cookie
        res.cookie("cookie", token, { expire: Date.now() + 99999 });
        res.json({ success, token, userDoc });
      } else {
        success = false;
        return res
          .status(400)
          .json({ success, error: "Login with correct credentials" });
      }
    } else {
      success = false;
      return res
        .status(400)
        .json({ success, error: "Login with correct credentials" });
    }
    // alert("Successfully Signed in");
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// show userprofile
router.get("/profile", (req, res) => {
  const { cookie } = req.cookies; //req.cookies is using middleware
  if (cookie) {
    // res.json(cookie);
    jwt.verify(cookie, JWT_SECRET, {}, async (err, userData) => {
      if (err) throw err;
      // console.log(userData);
      const userDetails = await User.findById(userData.id).select("-password"); //except password
      res.json(userDetails);
    });
  } else {
    res.json(null);
  }
});

// logging out
router.post("/logout", (req, res) => {
  const { cookie } = req.cookies;
  res.clearCookie("cookie");
  if (!cookie) {
    res.send("No Cookie");
  } else {
    res.json("Cookkies still");
  }
});

let reqPath = path.join(__dirname, "../");
// console.log({ reqPath });

// adding pics using the links
router.post("/upload-by-link", async (req, res) => {
  const link = req.body.photoLink;
  console.log({ link });
  const newName = "photo" + Date.now() + ".jpg";
  const options = {
    url: link,
    dest: reqPath + "/uploads/" + newName, // will be saved to 'uploads'
  };
  await imgDownloader.image(options);
  res.json(newName);
});

const photosMiddleWare = multer({ dest: "uploads" });
// posting pics using the files
router.post("/upload", photosMiddleWare.array("photos", 100), (req, res) => {
  console.log(req.files);
  const uploadedFiles = [];
  for (let i = 0; i < req.files.length; i++) {
    const { path, originalname } = req.files[i];
    const parts = originalname.split(".");
    const ext = parts[parts.length - 1];
    const newPath = path + "." + ext;
    fs.renameSync(path, newPath);
    uploadedFiles.push(newPath.replace("uploads/", ""));
  }
  res.json(uploadedFiles);
  console.log("This is from server: " + uploadedFiles);
});

module.exports = router;
