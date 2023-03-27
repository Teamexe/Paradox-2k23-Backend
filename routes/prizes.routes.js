const { Router } = require("express");
const { displayProfile } = require("../controllers/leaderboard.controller");

const router = Router();

router.post("/", displayProfile);

module.exports = router;
