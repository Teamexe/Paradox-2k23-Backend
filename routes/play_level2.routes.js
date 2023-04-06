const { Router } = require("express");
const {
  checkQues,
  checkAns,
} = require("../controllers/play_level2.controller");

const router = Router();

router.post("/ques", checkQues);
router.post("/answer", checkAns);

module.exports = router;
