const mongoose = require("mongoose");

const Math1AnswerSchema = new mongoose.Schema(
    {
        universityRoll : {
            type: Number,
            require: true,
            unique: true,
            trim: true
        },
        name : {
            type: String,
            require: true,
            trim: true,
        },
        marks: {
            type: Number,
            require: true,
            trim: true
        }
    }
)

module.exports = new mongoose.model("Math1_Answer" , Math1AnswerSchema);