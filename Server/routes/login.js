var express = require("express");
const { find } = require("../models/User");
var router = express.Router();
const User = require("../models/User");
let findUser;
router.post("/", async (req, res) => {
  try {
    console.log(req.body);
    findUser = await User.findOne({ ...req.body });
    console.log(findUser);
    if (findUser) res.status(201).json({ user: findUser });
    else res.status(404).json({ msg: "User Not Found" });
  } catch (e) {
    console.log(e);
    res.status(404).send("not found ");
  }
});

router.put("/changePassword", async (req, res) => {
  try {
    let r = await User.updateOne(findUser, req.body.data);
    res.status(201).send({ data: "Changed" });
  } catch (e) {
    console.log(e);
    res.status(201).send({ data: -1 });
  }
});

module.exports = router;
