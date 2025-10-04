import { Question } from "../model/question.model.js";

export const getQuestionsForQuiz = async (req, res) => {
  try {
    const quizId = req.params.id;

    const questions = await Question.find({ quizId }).select("-correctOptions");

    if (!questions || questions.length === 0) {
      return res
        .status(404)
        .json({ message: "No questions found for this quiz" });
    }

    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// exports.getQuestionsForQuiz = async (req, res) => {
//   const questions = await Question.find({ quizId: req.params.id }).select('-correctOptions');
//   res.json(questions);
// };
