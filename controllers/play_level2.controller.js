const ParadoxUser = require("../models/paradoxUser.model");
const QuestionL2CO = require("../models/questionL2CO.model");
const QuestionL2FO = require("../models/questionL2FO.model");
const TeamModel = require("../models/team.model");

var level1StartsAt = 1681041900000;
var level2StartsAt = 1681626599000;
var level1EndsAt = 1681042500000;
var level2EndsAt = 1681655400000;

const addQues = (req, res) => {
  const { qid } = req.body;
  const newQues = new QuestionL2CO({
    id: qid,
    location: "gsgrthsrthrsj",
    image: "thstrh",
    isAnswerRequired: true,
  });
  QuestionL2CO.findOne({ id: qid }, async (error, ques) => {
    if (error) {
      return res
        .status(200)
        .json({ message: error.message, success: "false", data: " " });
    } else if (ques) {
      return res.status(200).json({ message: "ques already exists" });
    } else {
      await newQues.save();
      return res.status(200).json({ message: "lksfl" });
    }
  });
};

const getQues = (req, res) => {
  var currTime = Date.now();

  if (currTime > level2StartsAt && currTime < level2EndsAt) {
    const { uid } = req.body;

    ParadoxUser.findOne({ uid: uid }, async (error, user) => {
      const Team = await TeamModel.findOne({ teamCode: user.teamCode });
      if (error) {
        return res
          .status(200)
          .json({ message: error.message, success: "true", data: " " });
      }
      if (!user) {
        return res.status(200).json({
          message: "user does not exist",
          success: "false",
          data: " ",
        });
      } else {
        console.log(user.role);
        if (user.role === "CO") {
          QuestionL2CO.findOne({ id: Team.currQues }, async (error, ques) => {
            console.log(ques.isAnswerRequired);
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
                  nextQuestion: {
                    questionNo: ques.id,
                    _id: ques._id,
                    question: ques.question,
                    image: ques.image,
                    isAnswerRequired: ques.isAnswerRequired,
                  },
                  officerType: {
                    name: user.name,
                    photoUrl: user.image,
                    position: "CONTROL",
                    uid: user.uid,
                  },
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
              console.log(ques.question);
              console.log(ques.id);
              return await res.status(200).json({
                message: "Question found",
                success: true,
                data: {
                  isAnswerCorrect: false,
                  isLevelComplete: false,
                  nextQuestion: {
                    questionNo: ques.id,
                    _id: ques._id,
                    question: ques.question,
                    image: ques.image,
                    isAnswerRequired: ques.isAnswerRequired,
                  },
                  officerType: {
                    name: user.name,
                    photoUrl: user.image,
                    position: "FIELD",
                    uid: user.uid,
                  },
                },
              });
            } else if (!ques) {
              return await res.status(200).json({
                success: false,
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
  } else {
    return res.status(200).json({
      success: false,
      message: "Level has ended",
    });
  }
};
const cAns = (req, res) => {
  var currTime = Date.now();

  if (currTime > level2StartsAt && currTime < level2EndsAt) {
    const { answer, uid } = req.body;
    ParadoxUser.findOne({ uid: uid }, async (error, user) => {
      const team = await TeamModel.findOne({ teamCode: user.teamCode });
      if (error) {
        console.log(error);
      } else if (!user) {
        return await res.status(200).json({
          success: false,
          message: "User does not exist!",
          data: " ",
        });
      } else if (user) {
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
                await team.save();

                const quesC = await QuestionL2CO.findOne({ id: team.currQues });
                if (quesC) {
                  return await res.status(200).json({
                    message: "Answer is correct",
                    success: true,
                    data: {
                      isAnswerCorrect: true,
                      isLevelComplete: false,
                      nextQuestion: {
                        questionNo: quesC.id,
                        _id: quesC._id,
                        question: quesC.question,
                        image: quesC.image,
                        isAnswerRequired: quesC.isAnswerRequired,
                      },
                      officerType: {
                        name: user.name,
                        photoUrl: user.image,
                        position: "CONTROL",
                        uid: user.uid,
                      },
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
              } else {
                return await res.status(200).json({
                  message: "Answer is Incorrect",
                  success: false,
                  data: {
                    isAnswerCorrect: false,
                    isLevelComplete: false,
                    nextQuestion: {
                      questionNo: ques.id,
                      _id: ques._id,
                      question: ques.question,
                      image: ques.image,
                      isAnswerRequired: ques.isAnswerRequired,
                    },
                  },
                });
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
                await team.save();

                const quesF = await QuestionL2FO.findOne({ id: team.currQues });
                if (quesF) {
                  return await res.status(200).json({
                    message: "Answer is correct",
                    success: true,
                    data: {
                      isAnswerCorrect: true,
                      isLevelComplete: false,
                      nextQuestion: {
                        questionNo: quesF.id,
                        _id: quesF._id,
                        question: quesF.question,
                        image: quesF.image,
                      },
                      officerType: {
                        name: user.name,
                        photoUrl: user.image,
                        position: "FIELD",
                        uid: user.uid,
                      },
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
              } else {
                return await res.status(200).json({
                  message: "Answer is incorrect",
                  success: true,
                  data: {
                    isAnswerCorrect: false,
                    isLevelComplete: false,
                    nextQuestion: {
                      questionNo: ques.id,
                      _id: ques._id,
                      question: ques.question,
                      image: ques.image,
                    },
                  },
                });
              }
            }
          });
        } else {
          return await res.status(200).json({
            message: "User has no role",
            success: false,
            data: {
              isAnswerCorrect: false,
              isLevelComplete: false,
            },
          });
        }
      }
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "Level has ended",
    });
  }
};

module.exports = { getQues, cAns, addQues };
