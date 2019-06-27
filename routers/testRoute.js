const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const s3 = require("../utils/s3");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
const mailer = require("../utils/mailVerify");

const diskStorage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, `${process.cwd()}/uploads`);
  },
  filename: function(req, file, callback) {
    uidSafe(24).then(function(uid) {
      callback(null, uid + path.extname(file.originalname));
    });
  }
});

const uploader = multer({
  storage: diskStorage,
  limits: {
    fileSize: 2097152
  }
});

module.exports = router;

router.route("/get-dogs").get(async (req, res) => {
  try {
    const imgResult = await db.getImage();
    res.json(imgResult.rows);
  } catch (err) {
    console.log(err);
  }
});

router.route("/get-more-images/:id").get(async (req, res) => {
  try {
    //req.session.userId passed here, guarantees to avoid myself from being shown in search
    const moreResult = await db.getMoreImages(req.params.id);
    res.json(moreResult.rows);
  } catch (err) {
    console.log(err);
  }
});

router.route("/modal/:id").get(async (req, res) => {
  try {
    //req.session.userId passed here, guarantees to avoid myself from being shown in search
    const modalResult = await db.getModal(req.params.id);
    const modal = {
      id: modalResult.rows[0].id,
      url: modalResult.rows[0].url,
      name: modalResult.rows[0].username,
      adoption_status: modalResult.rows[0].adoption_status,
      dob: modalResult.rows[0].dob,
      sex: modalResult.rows[0].sex,
      breed: modalResult.rows[0].breed,
      dogsize: modalResult.rows[0].dogsize,
      training: modalResult.rows[0].training,
      manner: modalResult.rows[0].manner
    };
    res.json(modal);
  } catch (err) {
    console.log(err);
  }
});

router
  .route("/upload-image")
  .post(uploader.single("file"), s3.upload, async function(req, res) {
    const {
      breed,
      name,
      adoption_status,
      dob,
      sex,
      dogsize,
      training,
      manner
    } = req.body;
    console.log(req.body);
    // const imgUrl = await db.getImageUrl();
    // if (imgUrl.rows[0].url) {
    //   await s3.deleteImage(imgUrl.rows[0].url);
    // }
    const url =
      "https://s3.amazonaws.com/spiced-salt-image-board/" + req.file.filename;
    db.insertDog(
      url,
      name,
      adoption_status,
      dob,
      sex,
      breed,
      dogsize,
      training,
      manner
    )
      .then(resultInsert => {
        const dog = {
          id: resultInsert.rows[0].id,
          url: url,
          name: name,
          adoption_status: adoption_status,
          dob: dob,
          sex: sex,
          breed: breed,
          dogsize: dogsize,
          training: training,
          manner: manner
        };
        res.json(dog);
      })
      .catch(err => {
        console.log(err);
        res.json({
          error: true
        });
      });
  });

router.route("/adoptProcess").post(async (req, res) => {
  const dogOfInterest = await db.getModal(req.body.dogId);
  const hansi = dogOfInterest.rows[0].name;
  const { first, last, nameofDog, email } = req.body.form;

  try {
    //await mailer.adoptionForm(email, first, last);
    res.json({ success: true, email: email });
  } catch (err) {
    console.log(err);
  }
});
