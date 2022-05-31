const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema({
    semester: {
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
        required: true
    },
    department: {
        type: String,
        required: true
    },
    password: {
        type: String,
        // minlength: 8
    }

});

module.exports = new mongoose.model("studentdetails", StudentSchema);