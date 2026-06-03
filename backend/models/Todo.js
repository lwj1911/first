const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    list: { type: String, default: "todolist1" },
    text: String,
    done: { type: Boolean, default: false },
    createTime: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Todo", todoSchema);
