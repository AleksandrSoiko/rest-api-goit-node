const sendMail = (email, token) => {
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  const { MAIL_FROM, BASE_URL } = process.env;

  const msg = {
    to: email,
    from: MAIL_FROM,
    subject: "Verify email",
    text: "Click verify email",
    html: `<a target="_blank" href="http://${BASE_URL}/api/users/verify/${token}">Click verify email</a>`,
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

module.exports = sendMail;
