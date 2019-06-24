const express = require("express");
const router = express.Router();

module.exports = router;

router.route("/landing").get((req, res) => {
  res.render("landingPage", {
    layout: "main"
  });
});
