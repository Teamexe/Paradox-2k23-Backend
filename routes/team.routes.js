const { Router } = require("express");
const {
  joinTeam,
  createTeam,
  getTeamDetails,
} = require("../controllers/leaderboard.controller");

const router = Router();

router.post("/join", joinTeam);
router.post("/create", createTeam);
router.post("/details", getTeamDetails);

module.exports = router;
