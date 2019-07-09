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
    const animals = await db.getAnimals();
    res.json(animals.rows);
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
    db.insertAnimal(
      url,
      name,
      species,
      status,
      chipped,
      lastSeen,
      gender,
      breed,
      location,
      description,
      age
    )
      .then(qResponse => {
        const animal = {
          id: qResponse.rows[0].id,
          url: url,
          name: name,
          species: species,
          status: status,
          chipped: chipped,
          lastseen: lastSeen,
          gender: gender,
          breed: breed,
          location: JSON.parse(location),
          description: description,
          age: age
        };
        res.json(animal);
      })
      .catch(err => {
        console.log(err);
        res.json({
          error: true
        });
      });
  });
