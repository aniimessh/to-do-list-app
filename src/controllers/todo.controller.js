const todoModel = require("../models/todo.model");

const createTask = async (req, res) => {
  try {
    const { task, status } = req.body;
    const user = req.user;

    if (!task) {
      return res.status(400).json({
        success: false,
        message: "Task is required",
      });
    }

    if (!user || !user.userId) {
      return res.status(400).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const newTask = await todoModel.create({
      task,
      status: status || "Not Started",
      userId: user.userId,
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      task: newTask,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to create task",
      error: error.message,
      method: createTask.name,
    });
  }
};

const getMyTask = async (req, res) => {
  try {
    const user = req.user;

    const todos = await todoModel.find({
      userId: user.userId,
    });

    if (todos.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No todo found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Fetched all todos",
      count: todos.length,
      todos,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to get my todo",
      error: error.message,
      method: getMyTask.name,
    });
  }
};

const changeTaskStatus = async (req, res) => {
  try {
    const { status, id } = req.body;
    const user = req.user;

    if (!status || !id) {
      return res.status(400).json({
        success: false,
        message: "Failed to update change task",
      });
    }

    // Validate status value
    const validStatuses = ["Not Started", "Pending", "Done"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value. Must be: Not Started, Pending, or Done",
      });
    }

    const updateStatus = await todoModel.findOneAndUpdate(
      {
        _id: id,
        userId: user.userId,
      },
      {
        status: status,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updateStatus) {
      return res.status(400).json({
        success: false,
        message: "Failed to update status. Please enter correct id",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Succesfully updated the task status",
      task: updateStatus,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to change task",
      error: error.message,
      method: changeTaskStatus.name,
    });
  }
};

const filterTaskByStatus = async (req, res) => {
  try {
    const filterStatus = req.query.status;
    const user = req.user;

    // Validate status value
    const validStatuses = ["Not Started", "Pending", "Done"];
    if (!validStatuses.includes(filterStatus)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status value. Must be: Not Started, Pending, or Done",
      });
    }

    const todo = await todoModel.find({
      userId: user.userId,
      status: filterStatus,
    });

    if (todo.length === 0) {
      return res.status(404).json({
        success: false,
        message: `Failed to get any todo with status ${filterStatus}`,
      });
    }

    return res.status(200).json({
      success: true,
      messsage: "Fetched all todo",
      todo,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to filter task by status",
      method: filterTaskByStatus.name,
      error: error.message,
    });
  }
};

module.exports = {
  createTask,
  getMyTask,
  changeTaskStatus,
  filterTaskByStatus,
};
