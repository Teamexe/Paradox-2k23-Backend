const { Router } = require("express");
const {
  getQues,
  cAns,
  addQues,
} = require("../controllers/play_level2.controller");

const router = Router();

router.post("/ques", getQues);
router.post("/addQues", addQues);
router.post("/answer", cAns);

module.exports = router;
