const Prize = require("../models/prize.model");

const getPrize = (req, res) => {
  res.status(200).send({ success: true });
};

module.exports = { getPrize };
