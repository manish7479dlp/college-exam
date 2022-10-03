const mongoose = require("mongoose")


const examDetailsSchema = new mongoose.Schema({
    semester: {
        type: Number,
        required: true
    },
    subject: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    examDate: {
        type: String,
        trim: true,
        required: true,
        
    },
    examStartTime: {
        type: String,
        trim: true,
        required: true
    },
    examDuration: {
        type: String,
        trim: true,
        required: true
    }
})

module.exports = new mongoose.model("examDetails", examDetailsSchema);