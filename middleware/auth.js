const { getuser } = require("../services/auth");

async function restrictologgeduserONLY(req, res, next) {
  try {
    console.log(req.cookies, "l");
    const useruid = req.cookies?.jwt;

    if (!useruid) {
      return res.redirect("/login");
    }

    // Use `await` if `getuser` is asynchronous
    const user = await getuser(useruid);

    if (!user) {
      return res.redirect("/login");
    }

    req.user = user; // Attach user data to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error in restrictologgeduserONLY middleware:", error);
    res.status(500).send("Internal Server Error");
  }
}

module.exports = restrictologgeduserONLY;
