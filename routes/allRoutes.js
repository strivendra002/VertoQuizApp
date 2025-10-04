import { Router } from "express";
import { createQuiz } from "../controller/createQuiz.controller.js";
import { addQuestion } from "../controller/addQuestion.controller.js";
import { getQuestionsForQuiz } from "../controller/getQuestions.controller.js";
import { submitAnswers } from "../controller/submitAnswer.controller.js";
import { getAllQuiz } from "../controller/getAllQuiz.controller.js";

export const allRoutes = Router();

allRoutes.post("/create-quiz", createQuiz);
allRoutes.post("/:id/add-question", addQuestion);
allRoutes.get("/:id/get-questions", getQuestionsForQuiz);
allRoutes.post("/:id/submitAnswer", submitAnswers);
allRoutes.get("/get-all-quiz", getAllQuiz);
