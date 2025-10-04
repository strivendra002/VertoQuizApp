# 🧠 **VertoQuizApp – Online Quiz API**

[![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)](https://nodejs.org)
[![Express](https://img.shields.io/badge/Express.js-Backend-blue?logo=express)](https://expressjs.com)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-brightgreen?logo=mongodb)](https://mongodb.com)
[![Jest](https://img.shields.io/badge/Tests-Jest-red?logo=jest)](https://jestjs.io)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

> A lightweight and testable backend for online quizzes, built using **Express**, **MongoDB**, and **Jest**.  
> Manage quizzes, questions, and answer submissions with auto scoring.

---

## 🚀 **Features**

✅ Create and manage quizzes  
✅ Add questions dynamically  
✅ Submit and auto-score answers  
✅ View results with detailed feedback  
✅ Unit & integration testing with **Jest + Supertest**  
✅ Clean MVC architecture

---

## 🛠️ **Tech Stack**

| Layer     | Technology              |
| --------- | ----------------------- |
| Runtime   | Node.js                 |
| Framework | Express.js              |
| Database  | MongoDB + Mongoose      |
| Testing   | Jest & Supertest        |
| Language  | JavaScript (ES Modules) |

---

## 📂 **Project Structure**

VertoQuizApp/
├── controller/
│ ├── createQuiz.controller.js
│ ├── getAllQuiz.controller.js
│ ├── getQuestions.controller.js
│ └── submitAnswer.controller.js
│
├── model/
│ ├── quiz.model.js
│ └── question.model.js
│
├── routes/
│ └── allRoutes.js
│
├── config/
│ └── db.connection.js
│
├── tests/
│ ├── submitAnswer.test.js
│ └── submitAnswer.integration.test.js
│
├── index.js
├── package.json
└── README.md

---

## ⚙️ **Setup & Installation**

### 1️⃣ Clone the Repo

```bash
git clone https://github.com/strivendra002/VertoQuizApp.git
cd VertoQuizApp
```

2️⃣ Install Dependencies
```npm install ```
3️⃣ Add Environment Variables
MONGO_URI=your_mongodb_connection_string
PORT=4000
4️⃣ Start Development Server
npm run server
Server runs at 👉 http://localhost:4000

Curl-
//create quiz- Quiz Title
```
curl --location 'http://localhost:4000/api/create-quiz' \
--header 'Content-Type: application/json' \
--data '{
    "title":"MongoDB"
}'
```
//add - Questions
```
curl --location 'http://localhost:4000/api/68dfc4f8914e1891fb68806e/add-question' \
--header 'Content-Type: application/json' \
--data '{
  "text": "Which data format does MongoDB use internally?",
  "type": "single",
  "options": [
    { "text": "JSON" },
    { "text": "BSON" },
    { "text": "XML" },
    { "text": "YAML" }
  ],
  "correctOptions": [1]
}'
```
//get Questions -
```
curl --location 'http://localhost:4000/api/68dfc4f8914e1891fb68806e/get-questions' \
--data ''

//Submit Answer
curl --location 'http://localhost:4000/api/68dfc4f8914e1891fb68806e/submitAnswer' \
--header 'Content-Type: application/json' \
--data '{
    "answers": [
    {
      "questionId": "68dfce30e91e1a4daf5dbfe1",
      "selectedOptions": [1]
    }
    ]
}'
```

//get all Quizes
```
curl --location 'http://localhost:4000/api/get-all-quiz' \
--data ''
```
Testing
```npm test```
Example Test (submitAnswer.test.js)
```
import { submitAnswers } from "../controller/submitAnswer.controller";

test('Scores submission properly', async () => {
  const mockQuestions = [
    { id: 1, correct: [1] },
    { id: 2, correct: [2] },
    { id: 3, correct: [3] },
  ];

  const answers = [
    { questionId: 1, selected: [1] },
    { questionId: 2, selected: [2] },
    { questionId: 3, selected: [3] },
  ];

  const result = await submitAnswers(answers, mockQuestions);
  expect(result.score).toBe(3);
});


 //Sample Response
 {
  "score": 2,
  "total": 3,
  "results": [
    {
      "questionId": "652f1c5f7d3e4a001e9a9c11",
      "text": "Which data format does MongoDB use?",
      "type": "single",
      "correct": [1],
      "selected": [1],
      "isCorrect": true
    },
    {
      "questionId": "652f1c5f7d3e4a001e9a9c12",
      "text": "Default MongoDB port?",
      "type": "text",
      "correct": ["27017"],
      "selected": "27018",
      "isCorrect": false
    }
  ]
}
```
---
🧰 Available Scripts
Command	Description -
```npm run server```	Starts the development server using Nodemon

```npm test```	Runs Jest test suite

```npm start```	Starts the production server

📈 Future Enhancements

🚪 JWT-based authentication
🧮 Timed quizzes and auto-expiry
🏆 Leaderboard for top scorers
📊 Admin dashboard for quiz analytics
📚 Quiz history tracking per user

👨‍💻 Author
Trivendra Kumar
💼 Full Stack Developer — React, Node.js, MongoDB, TypeScript
📧 strivendra002@gmail.com
🌐 [strivendra002](https://portfolio-two-pi-ejaoseqvam.vercel.app/) | [LinkedIn](https://www.linkedin.com/in/trivendra-kumar-b9302a226/)

