const mongoose = require("mongoose");

const ExamDetailsSchema = new mongoose.Schema({
    semester: {
        type: Number,
        required: true,
    },
    subject: {
        type: String,
        unique: true,
        required: true,
    },
    examStartTime: {
        type: String,
        required: true,
    },
    examDate: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true
    },
    examDuration: {
        type: String,
        required: true
    }
});
module.exports = new mongoose.model("ExamDetails", ExamDetailsSchema);
