const crypto = require("crypto");

const algorithm = "aes-256-cbc";
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

module.exports.encrypt = function encrypt(mail) {
  return new Promise(function(resolve, reject) {
    try {
      let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
      let encrypted = cipher.update(mail);
      encrypted = Buffer.concat([encrypted, cipher.final()]);
      resolve({
        iv: iv.toString("hex"),
        encrypted: encrypted.toString("hex")
      });
    } catch (err) {
      return reject(err);
    }
  });
};

module.exports.decrypt = function decrypt(ecryptedMail, mailIv) {
  return new Promise(function(resolve, reject) {
    try {
      let iv = Buffer.from(mailIv, "hex");
      let encryptedMail = Buffer.from(ecryptedMail, "hex");
      let decipher = crypto.createDecipheriv(
        "aes-256-cbc",
        Buffer.from(key),
        iv
      );
      let decrypted = decipher.update(encryptedMail);
      decrypted = Buffer.concat([decrypted, decipher.final()]);
      resolve(decrypted.toString());
    } catch (err) {
      return reject(err);
    }
  });
};
