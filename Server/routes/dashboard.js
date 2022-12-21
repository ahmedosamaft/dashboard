const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.get("/", async(req, res, next) => {
  console.log(req);
  let data = await User.find({},{password:0});
  console.log(data);
  res.send(data)
});

module.exports = router;
