const ParadoxUser = require("../models/paradoxUser.model");
const Question = require("../models/question.model");

//  function to check the current ques using user id "uid"

var level1StartsAt = 1681533000000;
var level2StartsAt = 1681626600000;
var level1EndsAt = 1681583400000;
var level2EndsAt = 1681655400000;

const checkQues = async (req, res) => {
  var currTime = Date.now();

  if (currTime > level1StartsAt && currTime < level1EndsAt) {
    const { uid } = req.body;

    ParadoxUser.findOne({ uid: uid }, async (error, user) => {
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
        Question.findOne({ id: user.currQues }, async (error, ques) => {
          if (ques) {
            // unlocked hint array me user id ka curr ques hai ki ni
            if (user.unlockedHints.includes(user.currQues)) {
              console.log("hello");
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
                    hint: ques.hint,
                    isHintAvailable: ques.isHintAvailable,
                  },
                },
              });
            } else {
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
                    isHintAvailable: ques.isHintAvailable,
                  },
                },
              });
            }
          } else if (!ques) {
            return await res.status(200).json({
              message: "Level Finished",
              success: true,
              data: {
                isAnswerCorrect: false,
                isLevelComplete: true,
              },
            });
          }
        });
      }
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "Level has ended",
    });
  }
};

const checkAns = async (req, res) => {
  var currTime = Date.now();

  if (currTime > level1StartsAt && currTime < level1EndsAt) {
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
            if (
              ques.answer.toLowerCase().replace(" ", "") ===
              answer.toLowerCase()
            ) {
              // TODO: make level complete functionality proper

              if (ques.count == 0) {
                user.score = user.score + 20 + 5;
                user.currQues = user.currQues + 1;
                await user.save();
                ques.count++;
                await ques.save();
              } else if (ques.count < 5) {
                user.score = user.score + 20 + 4;
                user.currQues = user.currQues + 1;
                await user.save();
                ques.count++;
                await ques.save();
              } else if (ques.count < 10) {
                user.score = user.score + 20 + 3;
                user.currQues = user.currQues + 1;
                await user.save();
                ques.count++;
                await ques.save();
              } else if (ques.count < 20) {
                user.score = user.score + 20 + 2;
                user.currQues = user.currQues + 1;
                await user.save();
                ques.count++;
                await ques.save();
              } else if (ques.count < 50) {
                user.score = user.score + 20 + 1;
                user.currQues = user.currQues + 1;
                await user.save();
                ques.count++;
                await ques.save();
              } else {
                user.score = user.score + 20;
                user.currQues = user.currQues + 1;
                await user.save();
                ques.count++;
                await ques.save();
              }
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
                      nextQuestion: {
                        questionNo: Cques.id,
                        _id: Cques._id,
                        question: Cques.question,
                        image: Cques.image,
                        isHintAvailable: Cques.isHintAvailable,
                      },
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
                    },
                  });
                }
              });
            } else {
              return res.status(200).json({
                message: "Answer incorrect",
                success: true,
                data: {
                  isAnswerCorrect: false,
                  isLevelComplete: false,
                  nextQuestion: {
                    questionNo: ques.id,
                    _id: ques._id,
                    question: ques.question,
                    image: ques.image,
                    isHintAvailable: ques.isHintAvailable,
                  },
                },
              });
            }
          } else {
            return res.status(200).json({
              message: "Level Finished",
              success: true,
              data: {
                isAnswerCorrect: false,
                isLevelComplete: true,
                nextQuestion: " ",
              },
            });
          }
        });
      } else if (!user) {
        console.log("user not found");
      }
    });
  } else {
    return res.status(200).json({
      success: false,
      message: "Level has ended",
    });
  }
};

module.exports = { checkQues, checkAns };
