const QuestionModel = require("../models/question.model");
const UserModel = require("../models/paradoxUser.model");

const unlockHint = async (req, res) => {
  const { uid } = await req.body;

  const currUser = await UserModel.findOne({ uid: uid });
  const ques = await QuestionModel.findOne({ id: currUser.currQues });
  if (currUser.score - 30 >= 0) {
    currUser.score = currUser.score - 30;
    const qno = ques.id;
    // const qno = await currUser.questionNo;

    currUser.unlockedHints.push(qno);

    await currUser.save();
    return await res.status(200).send({
      success: true,
      message: "Hint Unlocked",
      data: {
        nextQuestion: {
          questionNo: ques.id,
          _id: ques._id,
          question: ques.question,
          hint: ques.hint,
          image: ques.image,
          isHintAvailable: ques.isHintAvailable,
        },
      },
    });
  } else {
    return await res.status(200).send({
      success: false,
      message: "Not enough points available",
      data: {
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
};

module.exports = { unlockHint };
