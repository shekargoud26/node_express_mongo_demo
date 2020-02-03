const mongoose = require('mongoose');

const schema = mongoose.Schema

let taskSchema = new schema({
    task: {type: String,
           required: true},
    date: String,
    completed:{type: Boolean,
                required: true},
    priority: Number
})

module.exports = mongoose.model('Task', taskSchema);