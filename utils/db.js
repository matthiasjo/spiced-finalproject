const spicedPg = require("spiced-pg");

const dbUrl = "postgres:postgres:postgres@localhost:5432/animalshelter";
const db = spicedPg(dbUrl);

///////////////////////// PLACEHOLDER QUERYS \\\\\\\\\\\\\\\\\\\\\

module.exports.addUser = function addUser(first, last, email, pwhash) {
  if (!/[^a-z]/i.test(first) && !/[^a-z]/i.test(last) && pwhash != "") {
    return db.query(
      `INSERT INTO users (firstname, lastname, email, password) VALUES($1, $2, $3, $4) RETURNING id`,
      [first, last, email, pwhash]
    );
  } else {
    return Promise.reject(new Error("Wrong input"));
  }
};

module.exports.verifyUser = function verifyUser(email) {
  return db.query(
    `UPDATE users SET verified = true WHERE email = $1 RETURNING id, verified`,
    [email]
  );
};

module.exports.updatePass = function updatePass(pwHash, email) {
  return db.query(
    `UPDATE users SET password = $1 WHERE email = $2 RETURNING id, admin, verified`,
    [pwHash, email]
  );
};

module.exports.getUserData = function getUserData(email) {
  return db.query(`SELECT * FROM users WHERE email=$1`, [email]);
};

module.exports.pushImage = function pushImage(id, avatar) {
  return db.query(`UPDATE users SET avatar = $2 WHERE id = $1`, [id, avatar]);
};

module.exports.updateInfoSheet = function updateInfoSheet(id, bio) {
  return db.query(`UPDATE users SET bio = $2 WHERE id = $1 RETURNING bio`, [
    id,
    bio
  ]);
};

module.exports.searchAnimals = function searchAnimals(id, name) {
  return db.query(
    `SELECT id, first, last, username, avatar
        FROM users
        WHERE (first ILIKE $2
        OR last ILIKE $2
        OR username ILIKE $2
        OR email = $3)
        AND (users.id <> $1)
        ORDER BY last
        LIMIT 20`,
    [id, `%${name}%`, name]
  );
};

//////////////////// ADOPTION SECTION ////////////////////////

//Get the image for cards
module.exports.getImage = function getImages() {
  return db.query(
    `SELECT *, (
       SELECT id FROM adoptions
       ORDER BY id ASC
       LIMIT 1)
       AS lowest_id FROM adoptions ORDER BY id DESC LIMIT 10;`
  );
};

//Insert image into card  after upload
module.exports.insertImage = function insertImage(url, name, adoption_status) {
  return db.query(
    `
    INSERT INTO adoptions (url,name, adoption_status )
    VALUES ($1, $2, $3)
    RETURNING id
    `,
    [url, name, adoption_status]
  );
};

//Render Info inside Modal
module.exports.getModal = function getModal(id) {
  return db.query(
    `
        SELECT * FROM adoptions
        WHERE id=$1;
        `,
    [id]
  );
};
//Load more cards
exports.getMoreImages = function getMoreImages(id) {
  return db.query(
    `SELECT *, (
       SELECT id FROM adoptions
       ORDER BY id ASC
       LIMIT 1)
       AS lowest_id FROM adoptions
       WHERE id < $1
       ORDER BY id DESC
       LIMIT 5;`,
    [id]
  );
};

module.exports.getImageUrl = function getImageUrl(userId) {
  return db.query(
    `
        SELECT url from adoptions
        WHERE id =$1
        `,
    [userId]
  );
};

//Update Profile Picture
module.exports.uploadPicture = function uploadPicture(id, url) {
  return db.query(
    `
        UPDATE adoptions
        SET url = $2
        WHERE id = $1
        `,
    [id, url]
  );
};

//Insert Dog
module.exports.insertDog = function insertDog(
  url,
  name,
  adoption_status,
  dob,
  sex,
  breed,
  size,
  training,
  manner
) {
  return db.query(
    `
    INSERT INTO adoptions (url, name,
    adoption_status,
    dob,
    sex,
    breed,
    size,
    training,
    manner
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING id
    `,
    [url, name, adoption_status, dob, sex, breed, size, training, manner]
  );
};
