const express = require('express');

const Task = require('../models/task');
const userController = require('../controllers/userController')

const router = express.Router();

router.get('/tasks', async (req, res, next) => {
    let tasks = await Task.find();
    res.send({
        tasks: tasks
    });
});

router.get('/task/:taskId', async (req, res, next) => {
    let taskId = req.params.taskId;
    let task = await Task.findById(taskId);
    if(task){
        res.send({
            task:task
        });
    } else {
        res.status(404).send({
            message:'Task not found!'
        });
    }
});

router.post('/add-task', async (req, res, next) => {
    let taskToBeAdded = req.body;
    taskToBeAdded.completed = false;
    let task = new Task(taskToBeAdded);

    task.save().then(result => {
                        console.log(result);
                        res.send({
                            message: 'Task added successfully!'
                        });
                    })
                .catch(error => {
                    console.log(error);
                        res.send({
                            message: 'Failed to add task!'
                        });
                });
});

module.exports = router