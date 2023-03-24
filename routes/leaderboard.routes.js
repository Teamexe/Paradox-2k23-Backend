const { Router } = require("express");
const { displayLeaderBoard } = require("../controllers/leaderboard.controller");

const router = Router();

router.post("/", displayLeaderBoard);

module.exports = router;
