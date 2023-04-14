const { Router } = require("express");
const {
  checkQues,
  checkAns,
} = require("../controllers/play_level1.controller");
const { unlockHint } = require("../controllers/hint.controller");

const router = Router();

router.post("/ques", checkQues);
router.post("/answer", checkAns);
router.post("/hint", unlockHint);

module.exports = router;
