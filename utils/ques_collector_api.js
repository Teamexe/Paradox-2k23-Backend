const { Router } = require("express");
const Question = require("../models/question.model");
const QuestionL2CO = require("../models/questionL2CO.model");
const QuestionL2FO = require("../models/questionL2FO.model");

const router = Router();

const addQues = async (req, res) => {
  res.render("ques_submit");
};

router.get("/", addQues);
router.post("/", async (req, res) => {
  try {
    const { questionNo, question, image, answer } = await req.body;

    console.log(questionNo, question, image, answer);
    const newQues = new Question({
      question: question,
      id: questionNo,
      image: image,
      answer: answer,
    });
    await newQues.save();

    return res.status(200).json({
      message: "submitted",
    });
    // const newQuestion = new Question({ text, imageUrl });
    // await newQuestion.save();
    // res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/LCO", async (req, res) => {
  try {
    const {
      id,
      question,
      image,
      answer,
      hint,
      isHintAvailable,
      isAnswerRequired,
    } = await req.body;

    console.log(id, question, image, answer);
    const newQues = new QuestionL2CO({
      question: question,
      id: id,
      image: image,
      answer: answer,
      hint: hint,
      isHintAvailable: isHintAvailable,
      isAnswerRequired: isAnswerRequired,
    });

    await newQues.save();

    return res.status(200).json({
      message: "submitted",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.post("/LFO", async (req, res) => {
  try {
    const {
      id,
      question,
      image,
      answer,
      hint,
      isHintAvailable,
      isAnswerRequired,
    } = await req.body;

    console.log(id, question, image, answer);
    const newQues = new QuestionL2FO({
      question: question,
      id: id,
      image: image,
      answer: answer,
      hint: hint,
      isHintAvailable: isHintAvailable,
      isAnswerRequired: isAnswerRequired,
    });
    await newQues.save();

    return res.status(200).json({
      message: "submitted",
    });
    // const newQuestion = new Question({ text, imageUrl });
    // await newQuestion.save();
    // res.status(201).json(newQuestion);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
