const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");
const {
  createTask,
  getMyTask,
  changeTaskStatus,
  filterTaskByStatus,
} = require("../controllers/todo.controller");
const router = express.Router();

router.post("/create-task", authMiddleware, createTask);
router.get("/get-task", authMiddleware, getMyTask);
router.post("/update-task", authMiddleware, changeTaskStatus);
router.get("/filter", authMiddleware, filterTaskByStatus);

module.exports = router;
