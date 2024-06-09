const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  //esli metod raven options to propuskaem, nas interesuet tolko post get put delete
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    // console.log("req.headers.authorization", req.headers.authorization);
    const token = req.headers.authorization.split(" ")[1]; //token type - Bearer aerysadydsya
    // console.log("TOKEN", token);
    if (!token) {
      return res.status(401).json({ message: "Not authorized" });
    }
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.user = decoded;
    // console.log("req.user", req.user);
    // console.log("decoded", decoded);
    //posle etogo user vo vsekh functiakh budet dostupen
    next();
  } catch (e) {
    res.status(401).json({ message: "noT authorized" });
  }
};
