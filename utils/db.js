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

module.exports.getUserById = function getUserById(id) {
  return db.query(`SELECT * FROM users WHERE id=$1`, [id]);
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
