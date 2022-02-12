const express = require("express");
const axios = require("axios");
require("dotenv").config();
const User = require("../models/user");
const router = express.Router();

router.post("/users", async (req, res) => {
  let urlNat;

  if (req.body.nations.length > 0) {
    urlNat = `&nat=${req.body.nations.join(",").toLowerCase()}`;
  } else {
    urlNat = "";
  }

  try {
    const usersRaw = (
      await axios.get(`https://randomuser.me/api/?results=25&page=1${urlNat}`)
    ).data.results;

    const users = usersRaw.map((user) => {
      return {
        picture: user?.picture.large,
        nameTitle: user?.name.title,
        nameFirst: user?.name.first,
        nameLast: user?.name.last,
        email: user?.email,
        country: user?.location.country,
        city: user?.location.city,
        streetName: user?.location.street.name,
        streetNumber: user?.location.street.number,
        isFav: false,
      };
    });

    res.send(users);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/users/favorites", async (req, res) => {
  try {
    const favUsers = await User.find();
    res.send(favUsers);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/users/favorites", async (req, res) => {
  try {
    const user = new User(req.body.user);
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/users/favorites/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.send(deletedUser);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
