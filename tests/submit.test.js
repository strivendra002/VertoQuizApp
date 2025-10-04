import { submitAnswers } from "../controller/submitAnswer.controller.js";
import { Question } from "../model/question.model.js";

jest.mock("../model/question.model.js");

describe("submitAnswers Controller", () => {
  let req, res;

  beforeEach(() => {
    req = {
      body: {
        answers: [
          { questionId: "q1", selectedOptions: [1] }, // correct
          { questionId: "q2", selectedOptions: [0] }, // incorrect
          { questionId: "q3", textAnswer: "27018" }, // incorrect
        ],
      },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  test("Scores submission properly (all correct)", async () => {
    // Mock DB response
    Question.find.mockResolvedValue([
      {
        _id: "q1",
        text: "MongoDB is a ___ database?",
        type: "single",
        correctOptions: [1],
      },
      {
        _id: "q2",
        text: "Which are BSON types?",
        type: "multiple",
        correctOptions: [0, 2],
      },
      {
        _id: "q3",
        text: "Default MongoDB port?",
        type: "text",
        correctOptions: ["27017"],
      },
    ]);

    // Change answers to all correct
    req.body.answers = [
      { questionId: "q1", selectedOptions: [1] },
      { questionId: "q2", selectedOptions: [0, 2] },
      { questionId: "q3", textAnswer: "27017" },
    ];

    await submitAnswers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    const response = res.json.mock.calls[0][0];
    expect(response.score).toBe(3);
    expect(response.total).toBe(3);
  });

  test("Scores submission with some wrong answers", async () => {
    // Mock DB response
    Question.find.mockResolvedValue([
      {
        _id: "q1",
        text: "MongoDB is a ___ database?",
        type: "single",
        correctOptions: [1],
      },
      {
        _id: "q2",
        text: "Which are BSON types?",
        type: "multiple",
        correctOptions: [0, 2],
      },
      {
        _id: "q3",
        text: "Default MongoDB port?",
        type: "text",
        correctOptions: ["27017"],
      },
    ]);

    // Used the mixed answers (only q1 is correct)
    await submitAnswers(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    const response = res.json.mock.calls[0][0];

    expect(response.score).toBe(1); // ✅ only q1 correct
    expect(response.total).toBe(3);

    // Optional: Check detailed results
    expect(response.results[0].isCorrect).toBe(true);
    expect(response.results[1].isCorrect).toBe(false);
    expect(response.results[2].isCorrect).toBe(false);
  });

  test("Handles invalid answers array", async () => {
    req.body.answers = [];

    await submitAnswers(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Answers must be a non-empty array",
    });
  });
});
