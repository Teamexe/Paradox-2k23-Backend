const ParadoxUser = require("../models/paradoxUser.model");
const Question = require("../models/question.model");

//  function to check the current ques using user id "uid"

const checkQues = async (req, res) => {
  const { uid } = req.body;

  ParadoxUser.findOne({ uid: uid }, async (error, user) => {
    if (error) {
      return res
        .status(200)
        .json({ message: error.message, success: "true", data: " " });
    }
    if (!user) {
      return res
        .status(200)
        .json({ message: "user does not exist", success: "false", data: " " });
    } else {
      Question.findOne({ id: user.currQues }, async (error, ques) => {
        if (ques) {
          return await res.status(200).json({
            message: "Question found",
            success: true,
            data: {
              isAnswerCorrect: false,
              isLevelComplete: false,
              nextQuestion: ques,
            },
          });
        } else if (!ques) {
          return await res.status(200).json({
            isAnswerCorrect: false,
            isLevelComplete: false,
          });
        }
      });
    }
  });
};

const checkAns = async (req, res) => {
  const { answer, uid } = req.body;
  ParadoxUser.findOne({ uid: uid }, async (error, user) => {
    if (error) {
      console.log(error);
    } else if (user) {
      let qid = user.currQues;
      Question.findOne({ id: qid }, async (error, ques) => {
        if (error) {
          console.log(error);
        } else if (ques) {
          if (ques.answer.toLowerCase() === answer.toLowerCase()) {
            // TODO: make level complete functionality proper
            user.score = user.score + 20;
            user.currQues = user.currQues + 1;
            Question.findOne({ id: user.currQues }, async (error, Cques) => {
              if (error) {
                console.log(error);
              } else if (Cques) {
                return await res.status(200).json({
                  message: "Answer is correct",
                  success: true,
                  data: {
                    isAnswerCorrect: true,
                    isLevelComplete: false,
                    nextQuestion: Cques,
                  },
                });
              } else {
                // TODO: end the level if question are finished
                return await res.status(200).json({
                  message: "Question not found",
                  success: true,
                  data: {
                    isAnswerCorrect: true,
                    isLevelComplete: true,
                    nextQuestion: " ",
                  },
                });
              }
            });
          } else {
            return res.status(200).json({
              isAnswerCorrect: false,
              isLevelComplete: false,
              nextQuestion: ques,
            });
          }
        } else {
          console.log("ques not found");
        }
      });
    } else if (!user) {
      console.log("user not found");
    }
  });
};

module.exports = { checkQues, checkAns };
