const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    year: {
      type: Number,
      required: true
    },
    universityRoll : {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    department: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        trim: true
        // minlength: 8
    }

});

module.exports = new mongoose.model("StudentDetails", StudentSchema);