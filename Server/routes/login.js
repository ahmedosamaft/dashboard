var express = require("express");
var router = express.Router();
const User = require("../models/User");
const { check, validationResult, sanitize } = require("express-validator");
let findUser;

router.post(
  "/",
  [
    // Validate the name field
    check("name")
      .isLength({ min: 8 })
      .withMessage("Name must be at least 3 characters long"),
    // Sanitize the email field
    sanitize("email").normalizeEmail(),
  ],
  async (req, res) => {
    try {
      console.log(`Request Body =>`);
      console.log(req.body);
      findUser = await User.findOne({ ...req.body });
      console.log(`User Found in database =>`);
      console.log(findUser);
      if (findUser)
        res.status(201).json({ user: findUser?.email, id: findUser?._id });
      else res.status(404).json({ msg: "User Not Found" });
    } catch (e) {
      console.log(e);
      res.status(404).json({ msg: "There is something goes wrong" });
    }
  }
);

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
