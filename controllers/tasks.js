const Task = require("../models/tasksModel");
const asyncWrapper = require("../middleware/asyncWrapper");
const { createCustomError } = require("../errors/custom-error");

// const getAllTasks = async (req, res) => {
//     try {
//         const tasks = await Task.find({});
//         res.status(201).json({ tasks });
//         // res.status(201).json({tasks, amount: tasks.length});
//         // res.status(201).json({status: "true",data: tasks, nbHits: tasks.length})
//     } catch (error) {
//         res.status(500).json({ msg: error });
//     }
// };

//Refactor

const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    res.status(201).json({ tasks });
});

const createTasks = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).send({ task });
});

const getTasks = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params;
    const tasks = await Task.findOne({ _id: taskID });
    if (!tasks) {
        return next(createCustomError(`not found with the ${taskID}`, 404));
    }
    return res.status(201).json({ tasks });
});

const updateTasks = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params;
    const tasks = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!tasks) {
        return next(createCustomError(`not found with the ${taskID}`, 404));
    }
    return res.status(200).json({ tasks });
});

const deleteTasks = asyncWrapper(async (req, res, next) => {
    const { id: taskID } = req.params;
    const tasks = await Task.findOneAndDelete({ _id: taskID });
    if (!tasks) {
        return next(createCustomError(`not found with the ${taskID}`, 404));
    }
    return res.status(200).json({ tasks });
});

module.exports = {
    getAllTasks,
    createTasks,
    getTasks,
    updateTasks,
    deleteTasks,
};
