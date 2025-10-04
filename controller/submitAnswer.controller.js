import { Question } from "../model/question.model.js";

export const submitAnswers = async (req, res) => {
  try {
    const { answers } = req.body;

    if (!Array.isArray(answers) || answers.length === 0) {
      return res
        .status(400)
        .json({ error: "Answers must be a non-empty array" });
    }

    const questionIds = answers.map((ans) => ans.questionId);
    const questions = await Question.find({ _id: { $in: questionIds } });

    const questionMap = {};
    questions.forEach((q) => {
      questionMap[q._id.toString()] = q;
    });

    let score = 0;
    const total = answers.length;

    const results = [];

    for (let ans of answers) {
      const question = questionMap[ans.questionId];

      if (!question) {
        results.push({
          questionId: ans.questionId,
          correct: false,
          message: "Question not found",
        });
        continue;
      }

      let isCorrect = false;

      if (question.type === "text") {
        if (
          typeof ans.textAnswer === "string" &&
          question.correctOptions.some(
            (correct) =>
              correct.toString().trim().toLowerCase() ===
              ans.textAnswer.trim().toLowerCase()
          )
        ) {
          isCorrect = true;
          score++;
        }
      } else {
        const selected = Array.isArray(ans.selectedOptions)
          ? ans.selectedOptions.slice().sort()
          : [];
        const correct = Array.isArray(question.correctOptions)
          ? question.correctOptions.slice().sort()
          : [];

        if (JSON.stringify(selected) === JSON.stringify(correct)) {
          isCorrect = true;
          score++;
        }
      }

      results.push({
        questionId: question._id,
        text: question.text,
        type: question.type,
        isCorrect,
        selected:
          question.type === "text"
            ? ans.textAnswer || null
            : ans.selectedOptions || [],
        isCorrect,
      });
    }

    res.status(200).json({
      score,
      total,
      results,
    });
  } catch (error) {
    console.error("Error submitting answers:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
