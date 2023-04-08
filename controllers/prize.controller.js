const Prize = require("../models/prize.model");

const getPrize = async (req, res) => {
  const allPrizes = await Prize.find();
  await res
    .status(200)
    .send({ message: "prizes", success: true, data: { prizes: allPrizes } });
};

module.exports = { getPrize };
