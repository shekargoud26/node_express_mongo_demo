const express = require('express');
const mongoose = require('mongoose');

const Task = require('../models/task');

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
        res.send(task);
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

router.post('/update-task', async (req, res, next) => {
    let taskToBeUpdated = req.body;
    // Changing id from type string to ObjectId
    taskToBeUpdated.__id = mongoose.Types.ObjectId(taskToBeUpdated.__id)
    let result = await Task.updateOne(taskToBeUpdated);
    if(result.nModified == 1){
        res.status(200).send({message: "Successfully updated the task."})
    } else {
        res.send({message: "failed to update the task."})
    }
});

router.delete('/delete-task/:taskId', async (req, res, next) => {
    let taskId = req.params.taskId;
    let task = await Task.findById(taskId)

    if(task){
        await Task.deleteOne(task)
        res.status(200).send({message: "Successfully deleted the task.."})
    } else {
        res.status(404).send({message: "Task not found."})
    }
});


module.exports = router