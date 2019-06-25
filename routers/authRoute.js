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
    const hashInfo = await mailhash.encrypt(email);
    const verifyLink = `http://localhost:8080/verify?email=${email}&hash=${
      hashInfo.encrypted
    }&iv=${hashInfo.iv}`;
    await mailer.verifyMail(email, first, last, verifyLink);
    res.json({ success: true, email: email });
  } catch (e) {
    console.log(e);
  }
});

router.route("/verify/").get(async (req, res) => {
  const { email, hash, iv } = req.query;
  const decryptMail = await mailhash.decrypt(hash, iv);
  if (email == decryptMail) {
    const newUser = await db.verifyUser(email);
    req.session.userId = newUser.rows[0].id;
    req.session.verified = newUser.rows[0].verified;
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
    if (checkLogin && userData.rows[0].verified) {
      if (userData.rows[0].admin == true) {
        req.session.userId = userData.rows[0].id;
        req.session.admin = true;
        res.json({ success: true });
      } else {
        req.session.userId = userData.rows[0].id;
        res.json({ success: true });
      }
    } else if (checkLogin && !userData.rows[0].verified) {
      res.json({ success: false, error: "Please verify your email!" });
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
      const hashInfo = await mailhash.encrypt(email);
      const resetLink = `http://localhost:8080/#/reset?email=${email}&hash=${
        hashInfo.encrypted
      }&iv=${hashInfo.iv}`;
      await mailer.resetPassword(
        email,
        userData.rows[0].first,
        userData.rows[0].last,
        resetLink
      );
      res.json({ success: true, email: email });
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

router.route("/resetPass").post(async (req, res) => {
  const { password, email, hash, iv } = req.body;
  const decryptMail = await mailhash.decrypt(hash, iv);
  if (email == decryptMail) {
    const pwHash = await bc.hashPassword(password);
    const userInfo = await db.updatePass(pwHash, email);
    if (userInfo.rows[0].admin && userInfo.rows[0].verified) {
      req.session.userId = userInfo.rows[0].id;
      req.session.admin = true;
      res.json({ success: true });
      res.json({ success: true });
    } else if (userInfo.rows[0].verified) {
      req.session.userId = userInfo.rows[0].id;
      res.json({ success: true });
    } else if (!userInfo.rows[0].verified) {
      res.json({
        success: false,
        error: "Password was reset, but you need to verify your email"
      });
    }
  } else {
    res.json({ success: false, error: "Email couldn't be verified" });
  }
});
