const db = require("./db");

module.exports = {
  userStatus
};

async function userStatus(req, res, next) {
  try {
    const userStatus = await db.getUserById(req.session.userId);
    const {
      verified,
      id,
      firstname,
      lastname,
      admin,
      email
    } = userStatus.rows[0];
    if (admin) {
      req.session.admin = true;
    }
    if (verified) {
      req.session.userId = id;
    }
    const user = {
      success: true,
      userId: id,
      first: firstname,
      last: lastname,
      admin: admin,
      email: email,
      verified: verified
    };
    req.userStatus = user;
    next();
  } catch (e) {
    const user = {
      success: false,
      userId: null
    };
    req.userStatus = user;
    next();
  }
}
