var express = require("express");
var router = express.Router();
const User = require("../models/User");
const { check, validationResult, sanitize } = require("express-validator");
let findUser;

router.put("/changePassword", async (req, res) => {
  try {
    const data = req.body.data;
    console.log(`Request Body =>`);
    console.log(req.body);
    findUser = await User.findOne({ email: data.email });
    console.log(`User Found in database =>`);
    console.log(findUser);
    let r = await User.updateOne(findUser, { password: data.password });
    console.log(`User Updated in database =>`);
    console.log(r);
    if (findUser) res.status(201).send({ msg: "Changed" });
    else res.status(404).send({ msg: "Something goes Wrong!" });
  } catch (e) {
    console.log(e);
    res.status(404).send({ msg: "Something goes Wrong!" });
  }
});

module.exports = router;
