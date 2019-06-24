const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const bc = require("../utils/bc");
const mailer = require("../utils/mailVerify");
const mailhash = require("../utils/mailhash");

module.exports = router;

router.route("/sendReg").post(async (req, res) => {
  const { first, last, email, password } = req.body;
  try {
    const pwHash = await bc.hashPassword(password);
    const userInfo = await db.addUser(first, last, email, pwHash);
    console.log(userInfo.rows[0].id);
    const hashInfo = await mailhash.encrypt(email);
    console.log("HASHINFO", hashInfo);
    const verifyLink = `http://localhost:8080/verify/${email}/${
      hashInfo.encrypted
    }/${hashInfo.iv}`;
    await mailer.verifyMail(email, first, last, verifyLink);
    res.json({ success: true, email: email });
  } catch (e) {
    console.log(e);
  }
});

router.route("/verify/:email/:hash/:iv").get(async (req, res) => {
  const { email, hash, iv } = req.params;
  const decryptMail = await mailhash.decrypt(hash, iv);
  if (email == decryptMail) {
    const newUser = await db.verifyUser(email);
    req.session.userId = newUser.rows[0].id;
    res.redirect("/");
  } else {
    res.json({ success: false, error: "Email couldn't be verified" });
  }
});

router.route("/sendLogin").post(async (req, res) => {
  const { email, password } = req.body;
  try {
    const userData = await db.getUserData(email);
    const checkLogin = await bc.checkPassword(
      password,
      userData.rows[0].password
    );
    if (checkLogin) {
      // ADMIN AND VERIFIED COLUMN IN USER.
      // SET ADMIN && USER COOKIE SESSION COOKIE
      // REDIRECT TO HOME
      res.json({ success: true });
    } else if (!checkLogin) {
      res.json({ success: false, error: "Wrong Password" });
    }
  } catch (e) {
    console.log(e);
    res.json({ success: false, error: "User does not exist" });
  }
});

router.route("/resetAuth").post(async (req, res) => {
  const { email } = req.body;
  try {
    const userData = await db.getUserData(email);
    if (userData.rows[0]) {
      // RESET PASSWORD
      res.json({ success: true });
    } else {
      res.json({
        success: false,
        error: "Please try again"
      });
    }
  } catch (e) {
    console.log(e);
    res.json({ success: false, error: "Email is not registered" });
  }
});
