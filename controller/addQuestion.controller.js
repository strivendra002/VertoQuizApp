import { Question } from "../model/question.model.js";

export const addQuestion = async (req, res) => {
  try {
    const { text, type, options, correctOptions } = req.body;

    if (!text || !type) {
      return res
        .status(400)
        .json({ error: "Question text and type are required" });
    }

    if (type === "text" && text.length > 300) {
      return res.status(400).json({ error: "Text exceeds 300 characters" });
    }

    if (type === "single" || type === "multiple") {
      if (!Array.isArray(options) || options.length < 2) {
        return res
          .status(400)
          .json({ error: "MCQ must have at least 2 options" });
      }

      if (!Array.isArray(correctOptions) || correctOptions.length === 0) {
        return res.status(400).json({ error: "Correct options are required" });
      }

      const maxIndex = options.length - 1;
      const invalidIndexes = correctOptions.filter(
        (i) => i < 0 || i > maxIndex
      );
      if (invalidIndexes.length > 0) {
        return res.status(400).json({
          error: `Invalid correct option index(es): ${invalidIndexes.join(
            ", "
          )}`,
        });
      }

      if (type === "single" && correctOptions.length > 1) {
        return res
          .status(400)
          .json({ error: "Single choice can have only 1 correct option" });
      }
    }

    const question = await Question.create({
      quizId: req.params.id,
      text,
      type,
      options,
      correctOptions,
    });

    res.status(201).json(question);
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
