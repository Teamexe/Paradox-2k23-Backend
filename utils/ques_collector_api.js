const { Router } = require("express");
const Question = require("../models/question.model");

const router = Router();

const addQues = async (req, res) => {
  res.render("ques_submit");
};

router.get("/", addQues);
router.post("/", async (req, res) => {
  try {
    const { text, imageUrl } = await req.body;
    console.log(req.body);
    res.send("submitted");
    // const newQuestion = new Question({ text, imageUrl });
    // await newQuestion.save();
    // res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
