const nodemailer = require("nodemailer");
let secrets;
try {
  secrets = require("../secrets.json");
} catch (err) {
  console.log(err, "NO SECRETS FILE FOUND");
}

let mailer = nodemailer.createTransport({
  host: process.env.mailsmtp || secrets.mailsmpt,
  port: process.env.mailport || secrets.mailport,
  secure: true, // true for 465, false for other ports,
  auth: {
    user: process.env.mailuser || secrets.mailuser, // generated ethereal user
    pass: process.env.mailpassword || secrets.mailpassword // generated ethereal password
  }
});

module.exports.verifyMail = (mail, first, last, verifyLink) =>
  new Promise((resolve, reject) => {
    mailer
      .sendMail({
        from: secrets.mailuser,
        to: mail,
        subject: "Email-Verification for SPICED FINAL PROJECT",
        html: ` <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <html xmlns="http://www.w3.org/1999/xhtml">
                    <head><style type="text/css">
                        body {
                            margin: 0;
                            padding: 0;
                            min-width: 100%!important;
                        }
                        content {
                            margin: 10px;
                            padding: 10px;
                        }</style>
                    </head>
                    <body>
                        <h1>Hello ${first} ${last}!</h1>
                        <h2>Thanks for your registration for our final project<h2>
                        <div class="content">
                            Please verify your Email by clicking this Link: <a href="${verifyLink}">Verify</a>
                        </div>
                        <div class="content">
                            With regards,
                            Damian & Matthias
                        </div>
                    </body>
                </html>`
      })
      .then(() => {
        resolve();
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });

module.exports.adoptionForm = (mail, first, last, dogName) =>
  new Promise((resolve, reject) => {
    mailer
      .sendMail({
        from: secrets.mailuser,
        to: mail,
        subject: `Adoption Proces for  ${dogName}`,
        html: ` <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                  <html xmlns="http://www.w3.org/1999/xhtml">
                      <head><style type="text/css">
                          body {
                              margin: 0;
                              padding: 0;
                              min-width: 100%!important;
                          }
                          content {
                              margin: 10px;
                              padding: 10px;
                          }</style>
                      </head>
                      <body>
                          <h1>Hello ${first} ${last}!</h1>
                          <h2>Thanks for your interest in adodopting ${dogName}<h2>
                          <h4>We will contact you within the next 5 days for further details concerning the adoption process.</h4>
                          <div class="content">
                              With regards,
                              Damian & Matthias
                          </div>
                      </body>
                  </html>`
      })
      .then(() => {
        resolve();
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });

module.exports.resetPassword = (mail, first, last, resetLink) =>
  new Promise((resolve, reject) => {
    mailer
      .sendMail({
        from: secrets.mailuser,
        to: mail,
        subject: "Password Reset for SPICED FINAL PROJECT",
        html: ` <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                  <html xmlns="http://www.w3.org/1999/xhtml">
                      <head><style type="text/css">
                          body {
                              margin: 0;
                              padding: 0;
                              min-width: 100%!important;
                          }
                          content {
                              margin: 10px;
                              padding: 10px;
                          }</style>
                      </head>
                      <body>
                          <h1>Hello ${first} ${last}!</h1>
                          <div class="content">
                              You can reset your password by clicking this link: <a href="${resetLink}">Reset Password</a>
                          </div>
                          <div class="content">
                              With regards,
                              Damian & Matthias
                          </div>
                      </body>
                  </html>`
      })
      .then(() => {
        resolve();
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
