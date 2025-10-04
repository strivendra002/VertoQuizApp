import mongoose from "mongoose";

const QuestionSchema = new mongoose.Schema(
  {
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quiz",
      required: true,
    },
    text: { type: String, required: true, maxlength: 300 },
    type: {
      type: String,
      enum: ["single", "multiple", "text"], 
      default: "single",
    },
    options: [
      {
        text: { type: String, required: true },
        _id: false, 
      },
    ],
    correctOptions: [
      {
        type: Number, 
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export const Question = mongoose.model("Question", QuestionSchema);
