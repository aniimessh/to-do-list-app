const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  createTask,
  getMyTask,
  changeTaskStatus,
  filterTaskByStatus,
  deleteTaskById,
} = require("../controllers/todo.controller");
const router = express.Router();

router.post("/create-task", authMiddleware, createTask);
router.get("/get-task", authMiddleware, getMyTask);
router.post("/update-task", authMiddleware, changeTaskStatus);
router.get("/filter", authMiddleware, filterTaskByStatus);
router.delete("/delete-task", authMiddleware, deleteTaskById);

module.exports = router;
