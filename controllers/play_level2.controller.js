const ParadoxUser = require("../models/paradoxUser.model");
const QuestionL2CO = require("../models/questionL2CO.model");
const QuestionL2FO = require("../models/questionL2FO.model");
const Team = require("../models/team.model");

const addQues = (req, res) => {
  const { qid } = req.body;
  const newQues = new QuestionL2CO({
    id: qid,
    location: "gsgrthsrthrsj",
    image: "thstrh",
    isAnswerRequired: true,
  });
  QuestionL2CO.findOne({ id: qid }, (error, ques) => {
    if (error) {
      return res
        .status(200)
        .json({ message: error.message, success: "false", data: " " });
    } else if (ques) {
      return res.status(200).json({ message: "ques already exists" });
    } else {
      newQues.save();
      return res.status(200).json({ message: "lksfl" });
    }
  });
};

const getQues = (req, res) => {
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
      if (user.role === "CO") {
        QuestionL2CO.findOne({ id: Team.currQues }, async (error, ques) => {
          if (error) {
            return await res.status(200).json({
              message: error,
            });
          } else if (ques) {
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
              message: "Question not found",
              isAnswerCorrect: false,
              isLevelComplete: false,
            });
          }
        });
      } else if (user.role === "FO") {
        QuestionL2FO.findOne({ id: Team.currQues }, async (error, ques) => {
          if (error) {
            return await res.status(200).json({
              message: error,
            });
          } else if (ques) {
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
              message: "Question not found",
              isAnswerCorrect: false,
              isLevelComplete: false,
            });
          }
        });
      } else {
        console.log("No role");
      }
    }
  });
};
const cAns = (req, res) => {
  const { answer, uid } = req.body;
  ParadoxUser.findOne({ uid: uid }, async (error, user) => {
    if (error) {
      console.log(error);
    } else if (!user) {
      return await res.status(200).json({
        success: false,
        message: "User does not exist!",
        data: " ",
      });
    } else if (user) {
      const team = await Team.findOne({ teamCode: user.teamCode });
      console.log(team);
      if (user.role === "CO") {
        QuestionL2CO.findOne({ id: team.currQues }, async (error, ques) => {
          if (error) {
            return await res.status(200).json({
              success: false,
              message: error,
              data: " ",
            });
          } else if (!ques) {
            return await res.status(200).json({
              success: false,
              message: "Question not found",
              data: " ",
            });
          } else {
            if (ques.answer.toLowerCase() === answer.toLowerCase()) {
              team.score = team.score + 20;
              team.currQues = team.currQues + 1;
              team.save();

              const quesC = await QuestionL2CO.findOne({ id: qid });
              if (quesC) {
                return await res.status(200).json({
                  message: "Answer is correct",
                  success: true,
                  data: {
                    isAnswerCorrect: true,
                    isLevelComplete: false,
                    nextQuestion: quesC,
                  },
                });
              } else if (!quesC) {
                return await res.status(200).json({
                  message: "Answer is correct!",
                  success: false,
                  data: {
                    isAnswerCorrect: true,
                    isLevelComplete: true,
                    nextQuestion: " ",
                  },
                });
              }
            }
          }
        });
      } else if (user.role === "FO") {
        QuestionL2FO.findOne({ id: team.currQues }, async (error, ques) => {
          if (error) {
            return await res.status(200).json({
              success: false,
              message: error,
              data: " ",
            });
          } else if (!ques) {
            return await res.status(200).json({
              success: false,
              message: "Question not found",
              data: " ",
            });
          } else {
            if (ques.answer.toLowerCase() === answer.toLowerCase()) {
              team.score = team.score + 20;
              team.currQues = team.currQues + 1;
              team.save();

              const quesF = await QuestionL2FO.findOne({ id: qid });
              if (quesF) {
                return await res.status(200).json({
                  message: "Answer is correct",
                  success: true,
                  data: {
                    isAnswerCorrect: true,
                    isLevelComplete: false,
                    nextQuestion: quesF,
                  },
                });
              } else if (!quesF) {
                return await res.status(200).json({
                  message: "Answer is correct!",
                  success: false,
                  data: {
                    isAnswerCorrect: true,
                    isLevelComplete: true,
                    nextQuestion: " ",
                  },
                });
              }
            }
          }
        });
      }
    }
  });
};

module.exports = { getQues, cAns, addQues };
