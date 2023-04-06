const { Router } = require("express");
const {
  joinTeam,
  createTeam,
} = require("../controllers/leaderboard.controller");

const router = Router();

router.post("/join", joinTeam);
router.post("/create", createTeam);

module.exports = router;
