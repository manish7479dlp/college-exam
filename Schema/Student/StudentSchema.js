const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    universityRoll : {
        type: Number,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    dob: {
        type: String,
        required: true
    },
    password: {
        type: String,
        // minlength: 8
    }

});

module.exports = new mongoose.model("studentdetails", StudentSchema);