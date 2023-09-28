const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");

require("dotenv").config();
require("./database/connection");
// Routing
const userRoutes = require("./routes/userRoutes");
const placeRoutes = require("./routes/placeRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

// middleware
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

// app.use(cors());

app.use("/api", userRoutes);
app.use("/api", placeRoutes);
app.use("/api", bookingRoutes);

app.get("/test", (req, res) => {
  //   res.send("Hello world");
  res.cookie("title", "GeeksforGeeks");
  res.json("Test OK");
});

// for the localhost port
const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`BookingApp has started at port ${port}`);
});
