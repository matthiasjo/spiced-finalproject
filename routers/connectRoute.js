const express = require("express");
const router = express.Router();
const db = require("../utils/db");
const s3 = require("../utils/s3");
const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");

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

router.route("/get-animals").get(async (req, res) => {
  try {
    const imgResult = await db.getImage();
    res.json(imgResult.rows);
  } catch (err) {
    console.log(err);
  }
});

router.route("/get-more/:id").get(async (req, res) => {
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
      size: modalResult.rows[0].size,
      training: modalResult.rows[0].training,
      manner: modalResult.rows[0].manner
    };
    res.json(modal);
  } catch (err) {
    console.log(err);
  }
});

router
  .route("/upload-connect")
  .post(uploader.single("file"), s3.upload, async function(req, res) {
    const url =
      "https://s3.amazonaws.com/spiced-salt-image-board/" + req.file.filename;
    console.log(req.body, url);
    const {
      name,
      status,
      species,
      chipped,
      gender,
      breed,
      location,
      description,
      lastSeen,
      age
    } = req.body;
    //db.insertAnimal(
    //   url,
    //   name,
    //   adoption_status,
    //   dob,
    //   sex,
    //   breed,
    //   size,
    //   training,
    //   manner
    // )
    //   .then(resultInsert => {
    //     const dog = {
    //       id: resultInsert.rows[0].id,
    //       url: url,
    //       name: name,
    //       adoption_status: adoption_status,
    //       dob: dob,
    //       sex: sex,
    //       breed: breed,
    //       size: size,
    //       training: training,
    //       manner: manner
    //     };
    //     res.json(dog);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     res.json({
    //       error: true
    //     });
    //   });
  });
