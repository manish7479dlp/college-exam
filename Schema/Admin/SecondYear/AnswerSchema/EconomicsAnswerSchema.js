const mongoose = require("mongoose");

const EconomicsAnswerSchema = new mongoose.Schema(
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

module.exports = new mongoose.model("Economics_Answer" , EconomicsAnswerSchema);