const crypto = require("crypto");

const secret = "mrigank_sir_op";
const base64Decoder = function (req, res, next) {
  // var a = Buffer.from('baseAuth').toString('base64')
  // console.log(a);
  var b = Buffer.from(req.body.data, "base64").toString();
  b = JSON.parse(b);
  req.body = b;
  next();
  // console.log(b);
};

const md5HashVerifier = function (req, res, next) {
  const { hash, salt, input, timestamp } = req.body;
  const inputString = JSON.stringify(input);

  const combinedString = salt + inputString + timestamp + secret;
  let timestamp_n = Date.now();
  console.log(timestamp_n);
  console.log(timestamp);
  let sub = (timestamp_n - timestamp) / 1000;
  if (sub > 60) {
    console.log("expired");
    return res.status(401).json({ message: "Expired" });
  } else {
  }
  let myhash = crypto.createHash("md5").update(combinedString).digest("hex");

  if (hash === myhash) {
    req.body = input;
    return next();
  } else {
    return next(res.status(401).json({ message: "Auth failed" }));
  }
};

module.exports = { base64Decoder, md5HashVerifier };
