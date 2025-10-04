import { Quiz } from "../model/quiz.model.js";

export const getAllQuiz = async (req, res) => {
  try {
    const quizzes = await Quiz.find().sort({ createdAt: -1 }); 
    res.status(200).json(quizzes);
  } catch (error) {
    console.error("Error fetching quizzes:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// exports.listQuizzes = async (req, res) => {
//   const quizzes = await Quiz.find();
//   res.json(quizzes);
// };
