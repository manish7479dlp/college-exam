const mongoose = require("mongoose");

const TeacherSchema = new mongoose.Schema({
    userId: {
        type: Number,
        unique: true,
        required: true
    }, 
    name : {
        type: String,
        required: true,
        trim: true
    },
    department : {
        type: String,
        required: true,
        trim: true
    },
    subject : {
        type : String,
        required: true,
        trim: true
    },
    password : {
        type : String,
        required: true,
        trim: true
    }

})

module.exports = new mongoose.model("Teacherdetails" , TeacherSchema);