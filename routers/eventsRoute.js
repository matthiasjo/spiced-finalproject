const express = require("express");
const router = express.Router();

module.exports = router;

router.route("/events").get((req, res) => {
  res.render("events", {
    layout: "main"
  });
});
