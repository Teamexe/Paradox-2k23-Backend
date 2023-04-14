const { Router } = require("express");
const { unlockHint } = require("../controllers/leaderboard.controller");

const router = Router();

router.post("/unlockHint", unlockHint);
// router.post("/level2", displayLevel2LeaderBoard);

module.exports = router;
