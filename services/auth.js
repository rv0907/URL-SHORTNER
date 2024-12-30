const jwt = require("jsonwebtoken");
const secreat = "1234";
function setuser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secreat
  );
}

function getuser(token) {
  if (!token) return null;
  return jwt.verify(token, secreat);
}

module.exports = {
  setuser,
  getuser,
};
