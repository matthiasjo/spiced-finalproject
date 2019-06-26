const express = require("express");
const serveStatic = require("serve-static");
const csurf = require("csurf");
const cookieSession = require("cookie-session");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const mw = require("./utils/middleware");
//////////////////// ROUTERS IMPORT \\\\\\\\\\\\\\\\\
const authRoute = require("./routers/authRoute");
const adoptionRoute = require("./routers/adoptionRoute");
const connectRoute = require("./routers/connectRoute");
/////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\

const app = express();
const port = 8081;

app.use(helmet());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  cookieSession({
    name: "session",
    secret: `trail of cookie crumbs to the secret.`,
    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  })
);

app.use(csurf());
app.use(function(req, res, next) {
  res.cookie("mytoken", req.csrfToken());
  res.setHeader(`X-FRAME-OPTIONS`, `DENY`);
  next();
});

//////////////////// ROUTERS USE \\\\\\\\\\\\\\\\\
app.use(authRoute);
app.use(adoptionRoute);
app.use(connectRoute);
/////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\

app.get("/getUserData", mw.userStatus, async (req, res) => {
  console.log("userStatus", req.userStatus);
  if (req.userStatus && !req.session.verified) {
    res.json({ success: true, userInfo: req.userStatus });
  } else if (req.userStatus && req.session.verified) {
    delete req.session.verified;
    res.json({ success: true, userInfo: req.userStatus, verified: true });
  } else {
    res.json({ success: false, error: "the server has some issues" });
  }
});

app.get("/logoutUser", async (req, res) => {
  req.session = null;
  if (req.session == null) {
    res.json({ success: true });
  } else {
    res.json({ success: false });
  }
});

app.use(serveStatic("./public"));

app.get("*", function(req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => console.log(`This server is listening on port ${port}`));
