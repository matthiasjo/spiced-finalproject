const spicedPg = require("spiced-pg");

const dbUrl = "postgres:postgres:postgres@localhost:5432/animalshelter";
const db = spicedPg(dbUrl);

///////////////////////// PLACEHOLDER QUERYS \\\\\\\\\\\\\\\\\\\\\

module.exports.addUser = function addUser(
  first,
  last,
  username,
  email,
  pwhash,
  bio,
  avatar
) {
  if (!/[^a-z]/i.test(first) && !/[^a-z]/i.test(last) && pwhash != "") {
    return db.query(
      `INSERT INTO users (first, last, username, email, password, bio, avatar) VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [first, last, username, email, pwhash, bio, avatar]
    );
  } else {
    return Promise.reject(new Error("Wrong input"));
  }
};

module.exports.getLoginData = function getLoginData(userinfo) {
  return db.query(`SELECT * FROM users WHERE email=$1 OR username=$1`, [
    userinfo
  ]);
};

module.exports.getUserData = function getUserData(userid) {
  return db.query(`SELECT * FROM users WHERE id=$1`, [userid]);
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
