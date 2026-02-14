const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    task: {
      type: String,
      required: [true, "Please fill required field"],
    },
    status: {
      type: String,
      enum: ["Not Started", "Pending", "Done"],
      default: "Not Started",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  { timestamps: true },
);

const todoModel = mongoose.model("todo", todoSchema);

module.exports = todoModel;
