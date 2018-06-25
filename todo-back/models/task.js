//Require Mongoose
const mongoose = require('mongoose');
// Define schema
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    id: Schema.ObjectId,
    title: {
        type: String,
        required: [true, "Task title is required"],
    },
    user_id: {
        type: String,
        required: [true, "User is required"],
    },
    description: {
        type: String,
        required: [true, "Task description is required"],
    },
    status: {
        type: String,
        required: [true, "Status is required"],
    },
    priority: {
        type: String,
        required: [true, "Priority is required"],
    },
    repeat: {
        type: Boolean,
        required: [true, "Repeat is required"],
        default: false
    },
    end_date: {
        type: Date,
        required: [true, "End Date is required"],
    },
    complete: {type: Number, default: 0},
    updated: {type: Date, default: Date.now},
    created: {type: Date, default: Date.now}
});

// Compile model from schema
const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;