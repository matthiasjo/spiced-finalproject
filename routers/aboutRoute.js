const express = require("express");
const router = express.Router();

module.exports = router;

router.route("/about").get((req, res) => {
  res.render("about", {
    layout: "main"
  });
});
