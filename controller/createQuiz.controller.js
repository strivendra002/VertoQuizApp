import { Quiz } from "../model/quiz.model.js";

export const createQuiz = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Quiz title is required" });
    }

    const quiz = await Quiz.create({ title });
    res.status(201).json(quiz);
  } catch (error) {
    console.error("Error creating quiz:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};


// exports.createQuiz = async (req, res) => {
//   const quiz = await Quiz.create({ title: req.body.title });
//   res.status(201).json(quiz);
// };
